import { IBuienradarClient } from "../buienradar_client.ts";
import { IOpenWeatherClient, WeatherResponse } from "../open_weather_client.ts";
import { WeatherService } from "./weather_service.ts";
import { assertEquals } from "https://deno.land/std@0.196.0/assert/mod.ts";

Deno.test({
  name: "test weather service get temperatures",
  async fn() {
    const weatherData: WeatherResponse = {
      main: {
        temp: 1,
        temp_min: 1,
        temp_max: 1,
        feels_like: 0,
        pressure: 0,
        humidity: 0,
        sea_level: 0,
        grnd_level: 0,
      },
      coord: {
        lon: 0,
        lat: 0,
      },
      weather: [{
        id: 0,
        main: "",
        description: "",
        icon: "",
      }],
      base: "",
      visibility: 0,
      wind: {
        speed: 0,
        deg: 0,
        gust: 0,
      },
      clouds: {
        all: 0,
      },
      dt: 0,
      sys: {
        type: 0,
        id: 0,
        country: "",
        sunrise: 0,
        sunset: 0,
      },
      timezone: 0,
      id: 0,
      name: "",
      cod: 0,
    };
    const mockOpenWeatherClient: IOpenWeatherClient = {
      getCurrentWeather: (_lat: number, _lon: number) =>
        new Promise((resolve, _reject) => {
          resolve(weatherData);
        }),
    };
    const mockBuienradarClient: IBuienradarClient = {
      getPrecipitation: (_lat: number, _lon: number) =>
        new Promise((resolve, _reject) => {
          resolve([]);
        }),
    };
    const service = new WeatherService(
      mockOpenWeatherClient,
      mockBuienradarClient,
    );
    const actual = await service.getTemperatures(0, 0);
    const expected = {
      temperature: 1,
      min: 1,
      max: 1,
    };
    assertEquals(actual, expected);
  },
});

Deno.test({
  name: "test weather service get temperatures cache hit",
  async fn() {
    const weatherData: WeatherResponse = {
      main: {
        temp: 1,
        temp_min: 1,
        temp_max: 1,
        feels_like: 0,
        pressure: 0,
        humidity: 0,
        sea_level: 0,
        grnd_level: 0,
      },
      coord: {
        lon: 0,
        lat: 0,
      },
      weather: [{
        id: 0,
        main: "",
        description: "",
        icon: "",
      }],
      base: "",
      visibility: 0,
      wind: {
        speed: 0,
        deg: 0,
        gust: 0,
      },
      clouds: {
        all: 0,
      },
      dt: 0,
      sys: {
        type: 0,
        id: 0,
        country: "",
        sunrise: 0,
        sunset: 0,
      },
      timezone: 0,
      id: 0,
      name: "",
      cod: 0,
    };
    const mockOpenWeatherClient: IOpenWeatherClient = {
      getCurrentWeather: (_lat: number, _lon: number) =>
        new Promise((resolve, _reject) => {
          resolve(weatherData);
        }),
    };
    const mockBuienradarClient: IBuienradarClient = {
      getPrecipitation: (_lat: number, _lon: number) =>
        new Promise((resolve, _reject) => {
          resolve([]);
        }),
    };
    const service = new WeatherService(
      mockOpenWeatherClient,
      mockBuienradarClient,
    );
    await service.getTemperatures(0, 0);
    const actual = await service.getTemperatures(0, 0);
    const expected = {
      temperature: 1,
      min: 1,
      max: 1,
    };
    assertEquals(actual, expected);
  },
});
