import { IBuienradarClient } from "../buienradar_client.ts";
import { GeolocationCache } from "../deps.ts";
import { IOpenWeatherClient } from "../open_weather_client.ts";

interface TemperatureData {
  temperature: number;
  min: number;
  max: number;
}

interface WeatherData extends TemperatureData {
  precipitation: { intensity: number; time: string }[];
}

export interface IWeatherService {
  getTemperatures: (lat: number, lon: number) => Promise<TemperatureData>;
  getWeatherReport: (lat: number, lon: number) => Promise<WeatherData>;
}

export class WeatherService implements IWeatherService {
  temperatureCache: GeolocationCache<TemperatureData>;
  openWeatherClient: IOpenWeatherClient;
  buienradarClient: IBuienradarClient;

  constructor(
    openWeatherClient: IOpenWeatherClient,
    buienradarClient: IBuienradarClient,
  ) {
    this.temperatureCache = new GeolocationCache(2);
    this.openWeatherClient = openWeatherClient;
    this.buienradarClient = buienradarClient;
  }

  async getTemperatures(lat: number, lon: number) {
    console.debug(`Temperature requested for: (${lat}, ${lon})`);
    const cached = this.temperatureCache.get(lat, lon);
    if (cached === undefined) {
      const weatherData = await this.openWeatherClient.getCurrentWeather(
        lat,
        lon,
      );
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

  async getWeatherReport(lat: number, lon: number) {
    console.debug(`Weather requested for: (${lat}, ${lon})`);
    const temperatureData = await this.getTemperatures(lat, lon);
    const precipitation = await this.buienradarClient.getPrecipitation(
      lat,
      lon,
    );
    return { precipitation: precipitation, ...temperatureData };
  }
}
