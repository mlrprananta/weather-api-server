import { Router } from "./deps.ts";
import { WeatherController } from "./controllers/weather_controller.ts";
import { WeatherService } from "./services/weather_service.ts";

const router: Router = new Router();

const weatherService: WeatherService = new WeatherService();
const weatherController: WeatherController = new WeatherController(
  weatherService,
);

router.get("/temperatures", weatherController.getTemperatures);

export default router.routes();
