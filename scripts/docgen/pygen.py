from __future__ import annotations

import sys
from pathlib import Path

import griffe
import griffe2md.rendering
import mdformat
import _rendering
from griffe import GriffeLoader, Object, Parser, Kind
from griffe2md import rendering
from griffe2md.main import prepare_context, prepare_env
from jinja2 import FileSystemLoader
from extension import StubOverloadExtension


def render_object_docs(obj: Object, config: dict | None = None) -> str:
    env = prepare_env()
    assert isinstance(env.loader, FileSystemLoader)
    loader: FileSystemLoader = env.loader
    loader.searchpath.insert(0, str(Path(__file__).parent / "templates" / "griffe2md"))
    env.filters["heading"] = _rendering.do_heading
    env.filters["as_functions_section"] = _rendering.do_as_functions_section
    context = prepare_context(obj, config)
    rendered = env.get_template(f"{obj.kind.value}.md.jinja").render(**context)
    return mdformat.text(rendered)


def render_package_docs(package: str, config: dict | None = None) -> str:
    config = config or dict(rendering.default_config)
    parser = config["docstring_style"] and Parser(config["docstring_style"])
    extensions = griffe.load_extensions(StubOverloadExtension)
    loader = GriffeLoader(docstring_parser=parser, extensions=extensions)
    module = loader.load(package, find_stubs_package=True)
    loader.resolve_aliases(external=True)
    return render_object_docs(module, config)  # type: ignore[arg-type]


def generate(base_dir: Path):
    sys.path.append(str(base_dir.absolute()))
    output_path = (
            Path(__file__).parent.parent.parent / "content" / "reference" / "python"
    )
    config = griffe2md.rendering.default_config
    config["docstring_section_style"] = "table"
    config["inherited_members"] = False
    config["show_root_members_full_path"] = False
    config["show_object_full_path"] = False
    config["show_signature_annotations"] = True
    config["signature_crossrefs"] = True
    config["show_submodules"] = False
    config["group_by_category"] = True

    loader = GriffeLoader()
    module = loader.load("endstone")

    # Handle documentation for the root `endstone` module
    root_output_path = output_path / "index.mdx"
    root_output_path.parent.mkdir(parents=True, exist_ok=True)

    with root_output_path.open("w", encoding="utf-8") as f:
        f.write('---\n')
        f.write('title: "endstone"\n')
        f.write('---\n\n')
        f.write(render_package_docs("endstone", config))

    # Iterate over submodules of the `endstone` root module
    for submodule_name, submodule in module.members.items():
        if submodule.kind != Kind.MODULE:
            continue

        if submodule_name.startswith("_"):
            continue

        submodule_output_path = output_path / f"{submodule_name}.mdx"
        submodule_output_path.parent.mkdir(parents=True, exist_ok=True)

        with submodule_output_path.open("w", encoding="utf-8") as f:
            f.write('---\n')
            f.write(f'title: "endstone.{submodule_name}"\n')  # Dynamic title
            f.write('---\n\n')
            f.write(render_package_docs(f"endstone.{submodule_name}", config))
