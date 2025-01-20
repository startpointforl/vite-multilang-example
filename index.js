"use strict";

const server = require("./dist/server").default;

const port = process.env.PORT || 8080;

// eslint-disable-next-line no-console
server.listen(port, () => console.info(`Listening on port ${port}`));
