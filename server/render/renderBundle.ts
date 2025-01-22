import path from "path";
import { getStaticLinks } from "./getStaticLinks";
import { IS_DEV, IS_PROD } from "../env";

const staticDevHost = "http://vite.example.ru:5173";

export default (lang: string = "en") => {
  const htmlTags = getStaticLinks({
    manifestFilePath: path.resolve(
      __dirname,
      "../../",
      // for all lang import "client/.vite/manifest.json"
      `client/.vite/manifest.${lang}.json`
    ),
    entryPoint: "src/main.tsx",
  });

  const html = `
    <html>
      <head>
        ${
          IS_DEV
            ? `<link rel="icon" type="image/svg+xml" href="${staticDevHost}/vite.svg" />`
            : ""
        }
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Vite + React + TS</title>

        <meta name="render-params" content='{"LANG": "${lang}"}' />

        ${
          IS_DEV
            ? `<script type="module">
          import RefreshRuntime from '${staticDevHost}/@react-refresh'
          RefreshRuntime.injectIntoGlobalHook(window)
          window.$RefreshReg$ = () => {}
          window.$RefreshSig$ = () => (type) => type
          window.__vite_plugin_react_preamble_installed__ = true
        </script>
        `
            : ""
        }

        ${IS_PROD ? htmlTags : ""}
      </head>
      <body>
        <div id="root"></div>
        ${
          IS_DEV
            ? `<script type="module" src="${staticDevHost}/@vite/client"></script>`
            : ""
        }
        ${
          IS_DEV
            ? `<script type="module" src="${staticDevHost}/src/main.tsx"></script>`
            : ""
        }
      </body>
    </html>
  `;

  return `<!doctype html>${html}`;
};
