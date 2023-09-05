import { Context, getQuery, Status } from "../deps.ts";
import { IWeatherService } from "../services/weather_service.ts";

export class WeatherController {
  #service: IWeatherService;

  constructor(service: IWeatherService) {
    this.#service = service;
    this.getTemperatures.bind(this);
  }

  static #validateQueryParams(queryParams: Map<string, string>) {
    if (!queryParams.has("lat") || !queryParams.has("lon")) {
      throw new Error("No coordinates provided.");
    }
    const lat = parseFloat(queryParams.get("lat") as string);
    const lon = parseFloat(queryParams.get("lon") as string);
    if (isNaN(lat)) {
      throw new Error("Coordinate must be a number.");
    }
    if (isNaN(lon)) {
      throw new Error("Coordinate must be a number.");
    }
  }

  async getTemperatures(ctx: Context) {
    try {
      const { lat, lon } = this.#getCoordinates(ctx);
      const temperatures = await this.#service.getTemperatures(lat, lon);
      ctx.response.body = temperatures;
    } catch (e) {
      const error = e as Error;
      console.error(error);
      ctx.response.status = Status.BadRequest;
      ctx.response.body = { message: error.message };
    }
  }

  async getWeather(ctx: Context) {
    try {
      const { lat, lon } = this.#getCoordinates(ctx);
      const weather = await this.#service.getWeatherReport(lat, lon);
      ctx.response.body = weather;
    } catch (e) {
      const error = e as Error;
      console.error(error);
      ctx.response.status = Status.BadRequest;
      ctx.response.body = { message: error.message };
    }
  }

  #getCoordinates(ctx: Context) {
    const queryParams: Map<string, string> = getQuery(ctx, { asMap: true });
    WeatherController.#validateQueryParams(queryParams);
    const lat = parseFloat(queryParams.get("lat") as string);
    const lon = parseFloat(queryParams.get("lon") as string);
    return { lat, lon };
  }
}
