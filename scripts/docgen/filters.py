import re
from typing import Sequence
from collections import OrderedDict

from griffe import DocstringFunction, DocstringSectionFunctions, Function
from mkdoxy.node import Node


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
