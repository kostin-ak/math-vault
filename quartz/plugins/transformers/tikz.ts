import { QuartzTransformerPlugin } from "../types"
import { visit } from "unist-util-visit"

export const Tikz: QuartzTransformerPlugin = () => {
  return {
    name: "Tikz",
    markdown: (tree) => { // Обратите внимание: markdown, а не html
      visit(tree, "code", (node: any) => {
        // Проверяем язык блока ```tikz
        if (node.lang === "tikz") {
          // Превращаем блок кода в HTML-узел (прямая инъекция)
          node.type = "html"
          node.value = `<script type="text/tikz">\n${node.value}\n</script>`
        }
      })
    },
  }
}
