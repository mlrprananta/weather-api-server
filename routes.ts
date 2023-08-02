import { Router } from "./deps.ts";
import { WeatherController } from "./controllers/weather_controller.ts";
import { WeatherService } from "./services/weather_service.ts";

const router: Router = new Router();

const weatherService = new WeatherService();
const weatherController = new WeatherController(
  weatherService,
);
router.get("/temperatures", (ctx) => {
  return weatherController.getTemperatures(ctx);
});

export default router;
