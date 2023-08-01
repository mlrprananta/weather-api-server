import { GeolocationCache } from "../deps.ts";

interface TemperatureData {
  temperature: number;
  min: number;
  max: number;
}

export class WeatherService {
  #temperatureCache: GeolocationCache<TemperatureData> = new GeolocationCache(
    2,
  );
}
