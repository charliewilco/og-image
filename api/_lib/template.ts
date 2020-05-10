import { readFileSync } from "fs";
import { sanitizeHtml } from "./sanitizer";
import { ParsedRequest } from "./types";
const twemoji = require("twemoji");
const twOptions = { folder: "svg", ext: ".svg" };
const emojify = (text: string) => twemoji.parse(text, twOptions);

const rglr = readFileSync(
  `${__dirname}/../_fonts/Inter-Regular.woff2`
).toString("base64");
const bold = readFileSync(`${__dirname}/../_fonts/Inter-Bold.woff2`).toString(
  "base64"
);

const fontFace = `
    @font-face {
        font-family: "Inter";
        font-style: normal;
        font-weight: normal;
        src: url(data:font/woff2;charset=utf-8;base64,${rglr}) format("woff2");
    }

    @font-face {
        font-family: "Inter";
        font-style: normal;
        font-weight: bold;
        src: url(data:font/woff2;charset=utf-8;base64,${bold}) format("woff2");
    }

`;

function getCss(fontSize: string) {
  return `

    ${fontFace}

    * {
        box-sizing: border-box;
    }

    body {
        background: linear-gradient(to right, #6790ac 0%, #445564 100%) no-repeat;
        height: 100vh;
        width: 100vw;
        margin: 0;
        padding: 0;
        padding-top: 4vh;
    }

    .AuthorBlock {
        color: #6c757d;
        display: flex;
        flex-direction: column;
        align-items: center;
        font-size: 64px;
        font-family: 'Inter', sans-serif;
        font-weight: normal;
    }

    .AuthorBlock svg {
        margin: 2rem;
    }

    .CardContainer {
    background: #212529;
    height: 96vh;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding: 5vh;
    }

.emoji {
  height: 1em;
  width: 1em;
  margin: 0 0.05em 0 0.1em;
  vertical-align: -0.1em;
}

.heading {

  color: #dee2e6;
  text-align: center;
  flex: 1;
  margin: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

    #title {
        font-size: ${sanitizeHtml(fontSize)};
        font-family: 'Inter', sans-serif;
        font-weight: bold;
        font-style: normal;
        line-height: 1.4;
        margin: 0;
        background: red;
    }
`;
}

export function getHtml(parsedReq: ParsedRequest) {
  const { text, fontSize } = parsedReq;
  return `<!DOCTYPE html>
<html>
    <meta charset="utf-8">
    <title>Generated Image</title>
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <style>
        ${getCss(fontSize)}
    </style>
    <body>

    <div class="CardContainer">


  <div class="heading">
    <h1 id="title">${emojify(sanitizeHtml(text))}</h1>
  </div>

   <div class="AuthorBlock">
     <span>Charles Peters</span>

     <svg width="78" height="71" viewBox="0 0 78 71" fill="none" xmlns="http://www.w3.org/2000/svg">
       <path fill-rule="evenodd" clip-rule="evenodd" d="M0 10.4443L6.99689 1H32.5361V24.7713L16.2681 37.5662V70.6444L0 56.4198V10.4443ZM29.2825 4.25215H16.2681V33.428L29.2825 23.1928V4.25215ZM3.25361 11.5083L8.64647 4.25215H13.0144V35.9876L3.25361 43.6632V11.5083ZM3.25361 47.8014V54.9445L13.0144 63.4793V40.1241L3.25361 47.8014Z" fill="currentColor" />
     </svg>
   </div>

</div>
</html>`;
}
