export default () => {
  const html = `
    <html>
      <head>
        <link rel="icon" type="image/svg+xml" href="http://vite.example.ru:5173/vite.svg" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Vite + React + TS</title>
        <meta name="render-params" content='{"LANG": "en"}' />
        <script type="module">
          import RefreshRuntime from 'http://vite.example.ru:5173/@react-refresh'
          RefreshRuntime.injectIntoGlobalHook(window)
          window.$RefreshReg$ = () => {}
          window.$RefreshSig$ = () => (type) => type
          window.__vite_plugin_react_preamble_installed__ = true
        </script>
      </head>
      <body>
        <div id="root"></div>
        <script type="module" src="http://vite.example.ru:5173/@vite/client"></script>
        <script type="module" src="http://vite.example.ru:5173/src/main.tsx"></script>
      </body>
    </html>
  `;

  return `<!doctype html>${html}`;
};
