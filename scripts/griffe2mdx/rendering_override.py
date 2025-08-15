from typing import Sequence

from griffe import Function, DocstringSectionFunctions, DocstringFunction


def do_heading(content: str, heading_level: int, role: str | None = None, **attributes: str) -> str:
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
        if function.overloads:
            for overload in function.overloads:
                value.append(DocstringFunction(
                    name=overload.name,
                    description=overload.docstring.value.split("\n", 1)[0] if overload.docstring else "",
                ))
        else:
            value.append(DocstringFunction(
                name=function.name,
                description=function.docstring.value.split("\n", 1)[0] if function.docstring else "",
            ))

    return DocstringSectionFunctions(value)
