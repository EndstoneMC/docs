import ast
from typing import Any

from griffe import (
    Class,
    Extension,
    Function,
    Inspector,
    Kind,
    ObjectNode,
    Visitor,
    typing_overload,
)


class StubOverloadExtension(Extension):
    def on_function_instance(
        self,
        *,
        node: ast.AST | ObjectNode,
        func: Function,
        agent: Visitor | Inspector,
        **kwargs: Any,
    ) -> None:
        """
        Fix overloads with implementations in stub files not detected
        by adding a dummy function to class members

        For original issue, please see: https://github.com/mkdocstrings/griffe/issues/116
        """

        if isinstance(node, ObjectNode):
            return

        if func.parent.kind != Kind.CLASS:
            return

        overload = False
        for decorator in func.decorators:
            overload |= decorator.callable_path in typing_overload

        if not overload:
            return

        parent_class: Class = func.parent
        try:
            function = parent_class.members[func.name]
        except KeyError:
            function = Function(name=func.name)
            parent_class.set_member(func.name, function)

        if function.overloads is None:
            function.overloads = []

        function.overloads.append(func)
