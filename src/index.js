import createBareServer from "@tomp" + "http/bare-" + "server-node";
import express from "express";
import { createServer } from "node:http";
import { publicPath } from "ultra" + "violet-" + "static";
import { uvPath } from "@titanium" + "network-dev/ultra" + "violet";
import { join } from "node:path";
import { hostname } from "node:os";

const bare = createBareServer("/bare/");
const app = express();
// rrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrr
// Load our publicPath first and prioritize it over UV.
app.use(express.static(publicPath));
// Load vendor files last.
// The vendor's uv.config.js won't conflict with our uv.config.js inside the publicPath directory.
app.use("/uv/", express.static(uvPath));

// Error for everything else
app.use((req, res) => {
  res.status(404);
  res.sendFile(join(publicPath, "404.html"));
});

const server = createServer();

server.on("request", (req, res) => {
  if (bare.shouldRoute(req)) {
    bare.routeRequest(req, res);
  } else {
    app(req, res);
  }
});

server.on("upgrade", (req, socket, head) => {
  if (bare.shouldRoute(req)) {
    bare.routeUpgrade(req, socket, head);
  } else {
    socket.end();
  }
});

let port = parseInt(process.env.PORT || "");
// idurio3uroihriohsuihuigsgsfgsggggggsgsg
if (isNaN(port)) port = 8080;

server.on("listening", () => {
  const address = server.address();

  // by default we are listening on 0.0.0.0 (every interface)
  // we just need to list a few
  console.log("Listening on:");
  console.log(`\thttp://localhost:${address.port}`);
  console.log(`\thttp://${hostname()}:${address.port}`);
  console.log(
    `\thttp://${
      address.family === "IPv6" ? `[${address.address}]` : address.address
    }:${address.port}`
  );
});

// https://expressjs.com/en/advanced/healthcheck-graceful-shutdown.html
process.on("SIGINT", shutdown)
process.on("SIGTERM", shutdown)
// 1947017459817981780673895273523895623895369856789235792385623956892

function shutdown() {
  console.log('SIGTERM signal received: closing HTTP server')
  server.close(() => {
    console.log('Server closed.');
    process.exit(0);
  });
}

server.listen({
  port,
});
