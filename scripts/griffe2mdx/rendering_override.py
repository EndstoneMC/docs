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
