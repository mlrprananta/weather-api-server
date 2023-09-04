import { Router } from "./deps.ts";
import { WeatherController } from "./controllers/weather_controller.ts";
import { WeatherService } from "./services/weather_service.ts";
import { OpenWeatherClient } from "./open_weather_client.ts";

const router: Router = new Router();

const openWeatherClient = new OpenWeatherClient();
const weatherService = new WeatherService(openWeatherClient);
const weatherController = new WeatherController(
  weatherService,
);

router.get("/temperatures", (ctx) => {
  return weatherController.getTemperatures(ctx);
});

export default router;
