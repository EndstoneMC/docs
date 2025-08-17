import os

from mkdocs.structure import files
from mkdoxy.generatorAuto import GeneratorAuto
from mkdoxy.node import Node
import inflection


class Generator(GeneratorAuto):
    def save(self, path: str, output: str):
        rel_path = os.path.join(self.apiPath, path)
        self.fullDocFiles.append(files.File(rel_path, self.tempDoxyDir, self.siteDir, self.useDirectoryUrls))
        with open(os.path.join(self.siteDir, rel_path), "w", encoding="utf-8") as file:
            file.write(output)

    def member(self, node: Node, config: dict = None):
        path = inflection.underscore(node.name_short) + ".mdx"

        output = ""
        output += '---\n'
        output += f'title: "{node.name_short}"\n'
        output += '---\n\n'
        output += self.generatorBase.member(node, config)
        self.save(path, output)

        if node.is_language or node.is_group or node.is_file or node.is_dir:
            self.members(node.children, config)

    def classes(self, nodes: [Node], config: dict = None):
        path = "index.mdx"

        output = ""
        output += '---\n'
        output += f'asIndexPage: true"\n'
        output += '---\n\n'
        output += self.generatorBase.classes(nodes, config)
        self.save(path, output)
