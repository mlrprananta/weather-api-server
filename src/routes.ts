import { Router } from "jsr:@oak/oak";
import { Status } from "jsr:@oak/commons@1/status";

import { WeatherService } from "./services/weather-service.ts";
import { OpenWeatherClient } from "./clients/open-weather-client.ts";
import { BuienradarClient } from "./clients/buienradar-client.ts";

const router = new Router();

const weatherService = new WeatherService(
  new OpenWeatherClient(),
  new BuienradarClient(),
);

router
  .get("/temperatures", async (context) => {
    try {
      console.log(context.request);
      const { lat, lon } = getCoordinates(context.request.url.searchParams);
      const temperatures = await weatherService.getTemperatures(lat, lon);
      context.response.body = temperatures;
    } catch (error) {
      console.error(error);
      if (error instanceof Error) {
        context.response.status = Status.BadRequest;
        context.response.body = { message: error.message };
      }
    }
  })
  .get("/weather", async (context) => {
    try {
      const { lat, lon } = getCoordinates(context.request.url.searchParams);
      const weather = await weatherService.getWeatherReport(lat, lon);
      context.response.body = weather;
    } catch (error) {
      console.error(error);
      if (error instanceof Error) {
        context.response.status = Status.BadRequest;
        context.response.body = { message: error.message };
      }
    }
  });

export default router;

function getCoordinates(params: URLSearchParams) {
  const lat = Number(params.get("lat"));
  const lon = Number(params.get("lon"));
  if (isNaN(lat) || isNaN(lon)) {
    throw new Error("Coordinate must be a number.");
  }
  return { lat, lon };
}
