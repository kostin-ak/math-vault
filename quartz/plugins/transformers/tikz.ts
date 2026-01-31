import { QuartzTransformerPlugin } from "../types"
import { visit } from "unist-util-visit"

export const Tikz: QuartzTransformerPlugin = () => {
  return {
    name: "Tikz",
    markdown: (tree, file) => { // Добавили аргумент file, чтобы знать имя файла
      visit(tree, "code", (node: any) => {
        // Выводим в консоль каждый найденный блок кода
        console.log(`[DEBUG] File: ${file.path}, Lang: '${node.lang}', Meta: '${node.meta}'`)

        if (node.lang === "tikz") {
          console.log("--> MATCH! Converting to script...")
          node.type = "html"
          node.value = `<script type="text/tikz">\n${node.value}\n</script>`
          delete node.lang
          delete node.meta
        }
      })
    },
  }
}