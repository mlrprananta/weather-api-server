import { Application } from "./deps.ts";
import routes from "./routes.ts";

const app = new Application();

app.use(routes);
app.addEventListener("listen", ({ hostname, port, secure }) => {
  console.log(
    `Listening on: ${secure ? "https://" : "http://"}${
      hostname ?? "localhost"
    }:${port}`,
  );
});

await app.listen({ port: 8000 });
