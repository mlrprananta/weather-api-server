import { GeolocationCache } from "../deps.ts";
import { IOpenWeatherClient } from "../open_weather_client.ts";

interface TemperatureData {
  temperature: number;
  min: number;
  max: number;
}

interface IWeatherService {
  getTemperatures: (lat: number, lon: number) => Promise<TemperatureData>;
}

export class WeatherService implements IWeatherService {
  temperatureCache: GeolocationCache<TemperatureData>;
  client: IOpenWeatherClient;

  constructor(client: IOpenWeatherClient) {
    this.temperatureCache = new GeolocationCache(2);
    this.client = client;
  }

  async getTemperatures(lat: number, lon: number) {
    const cached = this.temperatureCache.get(lat, lon);
    if (cached === undefined) {
      const weatherData = await this.client.getCurrentWeather(lat, lon);
      const data: TemperatureData = {
        temperature: weatherData.main.temp,
        min: weatherData.main.temp_min,
        max: weatherData.main.temp_max,
      };
      this.temperatureCache.put(lat, lon, data);
      return data;
    }
    console.debug(`Cache hit: (${lat}, ${lon})`);
    return cached;
  }
}
