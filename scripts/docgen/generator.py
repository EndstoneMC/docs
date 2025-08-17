import logging
import os

import filters
import mkdoxy
from jinja2 import BaseLoader, Environment, Template
from mkdocs import exceptions
from mkdocs.structure import files
from mkdoxy.filters import use_code_language
from mkdoxy.generatorAuto import GeneratorAuto
from mkdoxy.generatorBase import GeneratorBase
from mkdoxy.node import Node
from mkdoxy.utils import parseTemplateFile
from tqdm import tqdm

from filters import do_format_refid, do_filter_functions, do_group_overloads, do_format_codeblock

log: logging.Logger = logging.getLogger("mkdocs")


class BaseGenerator(GeneratorBase):
    def __init__(
            self, templateDir: str = "", ignore_errors: bool = False, debug: bool = False
    ):
        """! Constructor.
        @details
        @param templateDir (str): Path to the directory with custom templates (default: "")
        @param ignore_errors (bool): If True, errors will be ignored (default: False)
        @param debug (bool): If True, debug messages will be printed (default: False)
        """

        """! Constructor.
        @details
        @param templateDir (str): Path to the directory with custom templates (default: "")
        @param ignore_errors (bool): If True, errors will be ignored (default: False)
        @param debug (bool): If True, debug messages will be printed (default: False)
        """

        self.debug: bool = debug  # if True, debug messages will be printed
        self.templates: dict[str, Template] = {}
        self.metaData: dict[str, list[str]] = {}

        environment = Environment(loader=BaseLoader())
        environment.filters["use_code_language"] = use_code_language
        environment.filters["format_refid"] = do_format_refid
        environment.filters["filter_functions"] = do_filter_functions
        environment.filters["group_overloads"] = do_group_overloads
        environment.filters["format_codeblock"] = do_format_codeblock
        # code from https://github.com/daizutabi/mkapi/blob/master/mkapi/core/renderer.py#L29-L38
        path = os.path.join(os.path.dirname(mkdoxy.__file__), "templates")
        ENDING = (".jinja2", ".j2", ".jinja")
        for fileName in os.listdir(path):
            filePath = os.path.join(path, fileName)

            # accept any case of the file ending
            if fileName.lower().endswith(ENDING):
                with open(filePath, "r") as file:
                    name = os.path.splitext(fileName)[0]
                    fileTemplate, metaData = parseTemplateFile(file.read())
                    self.templates[name] = environment.from_string(fileTemplate)
                    self.metaData[name] = metaData
            else:
                log.error(
                    f"Trying to load unsupported file '{filePath}'. Supported file ends with {ENDING}."
                    f"Look at documentation: https://mkdoxy.kubaandrysek.cz/usage/#custom-jinja-templates."
                )

        # test if templateDir is existing
        if templateDir:
            if not os.path.exists(templateDir):
                raise exceptions.ConfigurationError(
                    f"Custom template directory '{templateDir}' does not exist."
                )
            # load custom templates and overwrite default templates - if they exist
            for fileName in os.listdir(templateDir):
                filePath = os.path.join(templateDir, fileName)
                if fileName.lower().endswith(ENDING):
                    with open(filePath, "r") as file:
                        name = os.path.splitext(fileName)[0]
                        fileTemplate, metaData = parseTemplateFile(file.read())
                        self.templates[name] = environment.from_string(fileTemplate)
                        self.metaData[name] = metaData
                        log.info(f"Overwriting template '{name}' with custom template.")
                else:
                    log.error(
                        f"Trying to load unsupported file '{filePath}'. Supported file ends with {ENDING}."
                        f"Look at documentation: https://mkdoxy.kubaandrysek.cz/usage/#custom-jinja-templates."
                    )


class Generator(GeneratorAuto):
    def save(self, path: str, output: str):
        rel_path = os.path.join(self.apiPath, path)
        self.fullDocFiles.append(
            files.File(rel_path, self.tempDoxyDir, self.siteDir, self.useDirectoryUrls)
        )
        with open(os.path.join(self.siteDir, rel_path), "w", encoding="utf-8") as file:
            file.write(output)

    def member(self, node: Node, config: dict = None):
        path = filters.do_format_refid(node.refid) + ".mdx"

        output = ""
        output += "---\n"
        output += f'title: "{node.name_short}"\n'
        output += "---\n\n"
        output += self.generatorBase.member(node, config)
        self.save(path, output)

        if node.is_language or node.is_group or node.is_file or node.is_dir:
            self.members(node.children, config)

    def classes(self, nodes: [Node], config: dict = None):
        path = "index.mdx"

        output = ""
        output += "---\n"
        output += f'asIndexPage: true"\n'
        output += "---\n\n"
        output += self.generatorBase.classes(nodes, config)
        self.save(path, output)
