import { Application } from "./deps.ts";
import { weatherRouter } from "./weather_controller.ts";

const app = new Application();

app.use(weatherRouter.routes());

app.addEventListener("listen", ({ hostname, port, secure }) => {
  console.log(
    `Listening on: ${secure ? "https://" : "http://"}${
      hostname ?? "localhost"
    }:${port}`,
  );
});

await app.listen({ port: 8000 });
