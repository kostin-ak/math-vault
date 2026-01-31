import { QuartzTransformerPlugin } from "../types"
import { visit } from "unist-util-visit"

export const Tikz: QuartzTransformerPlugin = () => {
  return {
    name: "Tikz",
    html: (tree) => {
      // Ищем <pre><code class="language-tikz">...
      visit(tree, "element", (node: any, index, parent: any) => {
        if (node.tagName === "figure" && node.properties?.["data-rehype-pretty-code-figure"] !== undefined) {
           // Внутри figure ищем pre
           const pre = node.children.find((n: any) => n.tagName === "pre")
           if (!pre) return

           // Внутри pre ищем code
           const code = pre.children.find((n: any) => n.tagName === "code")
           if (!code) return

           // Проверяем язык
           if (pre.properties?.["data-language"] === "tikz" || code.properties?.["data-language"] === "tikz") {
             
             // САМОЕ ВАЖНОЕ: Нам нужно достать исходный текст кода.
             // Shiki уже разбил его на span'ы. Собираем обратно.
             let rawCode = ""
             
             const extractText = (n: any) => {
                if (n.type === 'text') rawCode += n.value
                if (n.children) n.children.forEach(extractText)
             }
             extractText(code)

             // Заменяем весь <figure> на <script type="text/tikz">
             // TikZJax сам создаст SVG на этом месте.
             parent.children[index] = {
               type: "element",
               tagName: "script",
               properties: {
                 type: "text/tikz",
               },
               children: [{
                 type: "text",
                 value: rawCode.trim()
               }]
             }
           }
        }
      })
      return tree
    },
  }
}
