import { Application } from "./deps.ts";
import router from "./routes.ts";
import "https://deno.land/std@0.196.0/dotenv/load.ts";

// if (Deno.env.get("DENO_ENV") === "dev") {
//   for (const key in env) {
//     Deno.env.set(key, env[key]);
//   }
// }

const app = new Application();

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
