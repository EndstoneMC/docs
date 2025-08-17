import argparse
import logging
from pathlib import Path

from generator import Generator, BaseGenerator
from mkdoxy.cache import Cache
from mkdoxy.constants import Kind
from mkdoxy.doxygen import Doxygen
from mkdoxy.doxyrun import DoxygenRun
from mkdoxy.generatorBase import GeneratorBase
from mkdoxy.xml_parser import XmlParser

logging.basicConfig()
log: logging.Logger = logging.getLogger("mkdocs")
log.setLevel(logging.DEBUG)


def generate(base_dir: Path, debug: bool = True):
    temp_dir = Path(__file__).parent.parent.parent / ".doxygen"
    temp_dir.mkdir(parents=True, exist_ok=True)

    site_dir = Path(__file__).parent.parent.parent / "content"
    site_dir.mkdir(parents=True, exist_ok=True)

    config = {
        "FILE_PATTERNS": "*.h",
        "EXCLUDE_PATTERNS": "*/detail/*",
        "RECURSIVE": True,
        "STRIP_FROM_INC_PATH": str(base_dir / "include"),
    }

    runner = DoxygenRun(
        "doxygen", str(base_dir / "include" / "endstone"), str(temp_dir), config, ""
    )
    if runner.checkAndRun():
        log.info("  -> generating Doxygen files")
    else:
        log.info("  -> skip generating Doxygen files (nothing changes)")

    # Parse XML to basic structure
    cache = Cache()
    parser = XmlParser(cache=cache, debug=debug)

    # Parse basic structure to recursive Nodes
    doxygen = Doxygen(str(runner.getOutputFolder()), parser=parser, cache=cache)

    # Print parsed files
    # if debug:
    #     doxygen.printStructure()

    # Prepare generator for future use (GeneratorAuto, SnippetGenerator)
    template_dir = str(Path(__file__).parent / "templates" / "mkdoxy")
    base_generator = BaseGenerator(template_dir, ignore_errors=False, debug=debug)

    generator = Generator(
        generatorBase=base_generator,
        tempDoxyDir=str(temp_dir),
        siteDir=str(site_dir),
        apiPath="reference/cpp",
        doxygen=doxygen,
        useDirectoryUrls=True,
    )

    template_config = {}
    root_node = None
    for node in generator.doxygen.root.children:
        if node.kind == Kind.NAMESPACE and node.refid == "namespaceendstone":
            root_node = node
            break

    assert root_node is not None, "root node not found"
    nodes = [node for node in root_node.children if node.kind == Kind.CLASS]
    generator.members(nodes, template_config)
    generator.classes(nodes, template_config)
