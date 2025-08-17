import re
from pathlib import Path
from typing import Sequence
from collections import OrderedDict

from griffe import DocstringFunction, DocstringSectionFunctions, Function
from mkdoxy.node import Node

from scripts.docgen.utils import clang_format


def do_heading(
        content: str, heading_level: int, role: str | None = None, **attributes: str
) -> str:
    """Render a Markdown heading.

    Arguments:
        content: The HTML within the heading.
        heading_level: The level of heading (e.g. 3 -> `###`).
        role: An optional role for the object bound to this heading.
        **attributes: Any extra attributes of the heading.
    """

    heading = f"\n{'#' * heading_level}"

    if role:
        heading += f' <code className="doc-symbol doc-symbol-{role}"/>'

    heading += f" {content}"

    if "id" in attributes:
        heading += f" [#{attributes['id']}]"

    heading += "\n\n"
    return heading


def do_as_functions_section(
        functions: Sequence[Function],
        *,
        check_public: bool = True,
) -> DocstringSectionFunctions:
    """Build a functions section from a list of functions.

    Parameters:
        functions: The functions to build the section from.
        check_public: Whether to check if the function is public.

    Returns:
        A functions docstring section.
    """
    value = []
    for function in functions:
        if (check_public and not function.is_public) or (function.name == "__init__"):
            continue

        if function.overloads:
            value.append(
                DocstringFunction(
                    name=function.name,
                    description="\n".join(
                        list(
                            dict.fromkeys(
                                [
                                    overload.docstring.value.split("\n", 1)[0]
                                    if overload.docstring
                                    else ""
                                    for overload in function.overloads
                                ]
                            )
                        )
                    ),
                )
            )

        else:
            value.append(
                DocstringFunction(
                    name=function.name,
                    description=function.docstring.value.split("\n", 1)[0]
                    if function.docstring
                    else "",
                )
            )

    return DocstringSectionFunctions(value)


def do_format_refid(refid: str) -> str:
    """
    Examples:
      'classendstone_1_1_dimension'      -> 'dimension'
      'classfoo_1_1bar_1_1Baz'           -> 'baz'
      'structmy__type'                    -> 'my_type'
      'classns_1_1vector_3_01T_01_4'     -> 'vector'
    """
    if not refid:
        return ""
    # drop leading kind
    s = re.sub(r"^(class|struct|union|interface|namespace|enum|file)", "", refid)
    # take last namespace component
    s = re.split(r"(?:_1_1)+", s)[-1]
    # remove any stray leading underscores left by the split (e.g. '_dimension')
    s = s.lstrip("_")
    # remove template-argument encoding (anything after '_3')
    s = re.sub(r"_[3-9].*$", "", s)
    # fix doxygen’s doubled-underscore escape
    s = s.replace("__", "_")

    if s == "u_u_i_d":
        s = "uuid"

    return s.lower()


def do_filter_functions(functions: [Node]):
    out = []
    blacklists = ["ENDSTONE_EVENT"]
    for function in functions:
        n = function.name_tokens[-1]
        if not (n.startswith("operator") or n.startswith("~")) and not n in blacklists:
            out.append(function)

    return out


def do_group_overloads(functions: [Node]):
    groups = OrderedDict()

    for function in functions:
        key = function.name_short
        if key in groups:
            node = groups[key]
            if not hasattr(node, '_overloads'):
                setattr(node, '_overloads', [node])
            node._overloads.append(function)
        else:
            groups[key] = function

    out = list(groups.values())
    return out


def do_format_codeblock(node: Node) -> str:
    code = []
    if node.is_function or node.is_friend:
        if node._templateparams.has():
            code.append(f"template<{node._templateparams.plain()}>")

        typ = node._type.plain()
        if typ:
            typ += " "
        if node.is_static:
            typ = f"static {typ}"

        specifiers = node._specifiers.parsed()
        specifiers = specifiers.replace("= 0", "")
        specifiers = specifiers.strip()

        if node._params.has():
            code.append(typ + node.name_tokens[-1] + "(")
            params = node._params.array(plain=True)
            for i, param in enumerate(params):
                if i + 1 >= len(params):
                    code.append(f"    {param}")
                else:
                    code.append(f"    {param},")
            code.append(f") {specifiers}")
        else:
            code.append(typ + node.name_tokens[-1] + "() " + specifiers)

    elif node.is_enum:
        if node._values.has():
            code.append(f"enum {node.name_tokens[-1]}" + " {")

            values = []
            for enumvalue in node._xml.findall("enumvalue"):
                p = enumvalue.find("name").text
                initializer = enumvalue.find("initializer")
                if initializer is not None:
                    p += f" {node._parser.paras_as_str(initializer, plain=True)}"
                values.append(p)

            for i, value in enumerate(values):
                if i + 1 >= len(values):
                    code.append(f"    {value}")
                else:
                    code.append(f"    {value},")
            code.append("};")
        else:
            code.append(f"enum {node.name_tokens[-1]};")

    elif node.is_define:
        if node._params.has():
            code.append(f"#define {node.name_full_unescaped} (")
            params = node._params.array(plain=True)
            for i, param in enumerate(params):
                if i + 1 >= len(params):
                    code.append(f"    {param}")
                else:
                    code.append(f"    {param},")
            code.append(f") {node._initializer.plain()}")
        else:
            code.append(f"#define {node.name_full_unescaped} {node._initializer.plain()}")

    else:
        code.append(node._definition.plain())

    result = "\n".join([*code])
    try:
        result = clang_format(result)
    except:
        print(f"clang-format failed for {node.name}")

    return "\n".join(["```", result, "```"])
