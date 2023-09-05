import { assert } from "https://deno.land/std@0.193.0/_util/asserts.ts";

interface WeatherOptions {
  units: "standard" | "metric" | "imperial";
}

export interface WeatherResponse {
  coord: {
    lon: number;
    lat: number;
  };
  weather: [
    {
      id: number;
      main: string;
      description: string;
      icon: string;
    },
  ];
  base: string;
  main: {
    temp: number;
    feels_like: number;
    temp_min: number;
    temp_max: number;
    pressure: number;
    humidity: number;
    sea_level: number;
    grnd_level: number;
  };
  visibility: number;
  wind: {
    speed: number;
    deg: number;
    gust: number;
  };
  rain?: {
    "1h"?: number;
    "3h"?: number;
  };
  snow?: {
    "1h"?: number;
    "3h"?: number;
  };
  clouds: {
    all: number;
  };
  dt: number;
  sys: {
    type: number;
    id: number;
    country: string;
    sunrise: number;
    sunset: number;
  };
  timezone: number;
  id: number;
  name: string;
  cod: number;
}

export interface IOpenWeatherClient {
  getCurrentWeather: (lat: number, lon: number) => Promise<WeatherResponse>;
}

export class OpenWeatherClient implements IOpenWeatherClient {
  readonly baseUrl = "https://api.openweathermap.org/data/2.5";
  #apiKey: string;

  constructor() {
    const apiKey = Deno.env.get("OPEN_WEATHER_API_KEY");
    assert(apiKey !== undefined);
    this.#apiKey = apiKey;
  }

  async getCurrentWeather(
    lat: number,
    lon: number,
    options: WeatherOptions = { units: "metric" },
  ): Promise<WeatherResponse> {
    const params = new URLSearchParams({
      lat: lat.toString(),
      lon: lon.toString(),
      appid: this.#apiKey,
      units: options.units,
    });
    const url = `${this.baseUrl}/weather?${params}`;
    const request = new Request(url, {
      method: "GET",
    });
    const response = await fetch(
      request,
    );
    if (response.ok) {
      return await response.json();
    } else {
      throw Error("Request failed.");
    }
  }
}
