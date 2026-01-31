import { QuartzTransformerPlugin } from "../types"
import { visit } from "unist-util-visit"

export const Tikz: QuartzTransformerPlugin = () => {
  return {
    name: "Tikz",
    html: (tree) => {
      visit(tree, "element", (node: any, index, parent: any) => {
        // Ищем стандартный блок кода: <pre><code class="language-tikz">
        if (node.tagName === "pre" && node.children?.[0]?.tagName === "code") {
          const codeNode = node.children[0]
          const className = codeNode.properties?.className || []
          
          // Проверяем, есть ли класс language-tikz
          if (className.some((c: string) => c === "language-tikz" || c === "tikz")) {
             // Достаем исходный текст (он тут еще целый, одной строкой)
             const text = codeNode.children[0]?.value || ""
             
             // Заменяем <pre>...</code> на <script type="text/tikz">...</script>
             parent.children[index] = {
               type: "element",
               tagName: "script",
               properties: {
                 type: "text/tikz",
                 // Можно добавить data-show-console="true" для отладки, если не рисует
               },
               children: [{
                 type: "text",
                 value: text
               }]
             }
          }
        }
      })
      return tree
    },
  }
}
