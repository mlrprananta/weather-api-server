import { Context, getQuery, Status } from "../deps.ts";
import { WeatherService } from "../services/weather_service.ts";

export class WeatherController {
  #service: WeatherService;

  constructor(service: WeatherService) {
    this.#service = service;
  }

  static #validateQueryParams(queryParams: Map<string, string>) {
    if (!queryParams.has("lon") || !queryParams.has("lat")) {
      throw new Error("No coordinates provided.");
    }
    const lon = queryParams.get("lon") as string;
    const lat = queryParams.get("lat") as string;
    if (isNaN(parseFloat(lon))) {
      throw new Error("Coordinate must be a number.");
    }
    if (isNaN(parseFloat(lat))) {
      throw new Error("Coordinate must be a number.");
    }
  }

  getTemperatures(ctx: Context) {
    try {
      const queryParams: Map<string, string> = getQuery(ctx, { asMap: true });
      WeatherController.#validateQueryParams(queryParams);
      ctx.response.body = {
        lon: queryParams.get("lon"),
        lat: queryParams.get("lat"),
      };
    } catch (e) {
      const error = e as Error;
      console.error(error);
      ctx.response.status = Status.BadRequest;
      ctx.response.body = { message: error.message };
    }
  }
}
