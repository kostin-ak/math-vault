import { QuartzComponent, QuartzComponentConstructor } from "./types"

const TikzJax: QuartzComponent = () => {
  return (
    <>
      <link rel="stylesheet" type="text/css" href="https://tikzjax.com/v1/fonts.css" />
      <script src="https://tikzjax.com/v1/tikzjax.js"></script>
      
      {/* Скрипт-патчер: находит <pre> с кодом tikz и превращает его в <script type="text/tikz"> */}
      <script dangerouslySetInnerHTML={{ __html: `
        document.addEventListener('DOMContentLoaded', function() {
          // Ищем все блоки, которые Quartz/Shiki пометил как tikz
          // Обычно это <figure data-rehype-pretty-code-figure> ... <code data-language="tikz">
          
          const codeBlocks = document.querySelectorAll('pre > code[data-language="tikz"], pre[data-language="tikz"] > code');
          
          codeBlocks.forEach(code => {
            // Находим родительский <figure> или <pre>
            const pre = code.closest('pre');
            const figure = code.closest('figure') || pre;
            
            if (!figure) return;

            // Достаем исходный текст (innerText склеит все span'ы обратно в строку)
            const rawTikz = code.innerText;

            // Создаем скрипт для TikZJax
            const script = document.createElement('script');
            script.type = 'text/tikz';
            script.textContent = rawTikz;

            // Заменяем блок кода на скрипт
            figure.parentNode.replaceChild(script, figure);
          });
        });
      ` }} />
    </>
  )
}

export default (() => TikzJax) satisfies QuartzComponentConstructor
