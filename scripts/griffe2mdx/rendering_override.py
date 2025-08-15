def do_heading(content: str, heading_level: int, **attributes: str) -> str:
    """Render a Markdown heading.

    Arguments:
        content: The HTML within the heading.
        heading_level: The level of heading (e.g. 3 -> `###`).
        **attributes: Any extra attributes of the heading.
    """

    heading = f"\n{'#' * heading_level} {content}"
    if "id" in attributes:
        heading += f" [#{attributes['id']}]"

    heading += "\n\n"
    return heading
