import { Application } from "jsr:@oak/oak";
import { oakCors } from "jsr:@tajpouria/cors";
import "jsr:@std/dotenv/load";
import router from "./src/routes.ts";

const app = new Application();

app.use(oakCors());
app.use(router.routes());
app.use(router.allowedMethods());

app.addEventListener("listen", ({ hostname, port, secure }) => {
  console.log(
    `Listening on: ${secure ? "https://" : "http://"}${
      hostname ?? "localhost"
    }:${port}`,
  );
});

await app.listen({ port: 8000 });
