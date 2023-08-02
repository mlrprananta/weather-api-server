import { GeolocationCache } from "../deps.ts";
import { OpenWeatherClient } from "../open_weather_client.ts";

interface TemperatureData {
  temperature: number;
  min: number;
  max: number;
}

export class WeatherService {
  temperatureCache: GeolocationCache<TemperatureData>;
  client: OpenWeatherClient;

  constructor() {
    this.temperatureCache = new GeolocationCache(2);
    this.client = new OpenWeatherClient();
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
