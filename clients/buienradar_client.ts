export type BuienradarResponse = Array<{ intensity: number; time: string }>;

export interface IBuienradarClient {
  getPrecipitation: (lat: number, lon: number) => Promise<BuienradarResponse>;
}

export class BuienradarClient implements IBuienradarClient {
  readonly baseUrl = "https://gps.buienradar.nl";

  constructor() {}

  async getPrecipitation(
    lat: number,
    lon: number,
  ): Promise<BuienradarResponse> {
    const params = new URLSearchParams({
      lat: lat.toString(),
      lon: lon.toString(),
    });
    const url = `${this.baseUrl}/getrr.php?${params}`;
    const request = new Request(url, {
      method: "GET",
    });
    const response = await fetch(
      request,
    );
    if (response.ok) {
      return response.text()
        .then((text) => this.parseResponse(text));
    } else {
      throw Error(`Request failed: ${await response.text()}`);
    }
  }

  parseResponse(text: string): BuienradarResponse {
    return text.split("\n")
      .filter((line) => line !== "")
      .map((line) => line.split("|"))
      .map((tuple) => {
        return {
          intensity: Math.pow(10, (parseInt(tuple[0]) - 109) / 32),
          time: tuple[1],
        };
      });
  }
}
