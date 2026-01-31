import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "./types"

const TikzJax: QuartzComponent = () => {
  return (
    <>
      <link rel="stylesheet" type="text/css" href="https://tikzjax.com/v1/fonts.css" />
      <script src="https://tikzjax.com/v1/tikzjax.js"></script>
    </>
  )
}

export default (() => TikzJax) satisfies QuartzComponentConstructor
