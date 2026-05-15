import { createServer } from "node:http";
import path from "node:path";
import { fileURLToPath } from "node:url";

import handler from "serve-handler";

const appRoot = path.dirname(fileURLToPath(import.meta.url));
const staticRoot = path.join(appRoot, "storybook-static");
const defaultStoryPath = "/story/components-button--primary-buttons";
const port = Number(process.env.PORT) || 3000;

createServer(async (request, response) => {
  const url = new URL(request.url ?? "/", `http://${request.headers.host ?? "localhost"}`);

  const isRead = request.method === "GET" || request.method === "HEAD";
  if (isRead && url.pathname === "/" && !url.searchParams.has("path")) {
    response.writeHead(302, { Location: `/?path=${defaultStoryPath}` });
    response.end();
    return;
  }

  await handler(request, response, { public: staticRoot });
}).listen(port, () => {
  console.log(`Serving Storybook at http://localhost:${port}`);
});
