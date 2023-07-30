export function validateQueryParams(queryParams: Map<string, string>) {
  if (!queryParams.has("lon") || !queryParams.has("lat")) {
    throw new Error("No coordinates provided.");
  }
  const lon = queryParams.get("lon") as string;
  const lat = queryParams.get("lat") as string;
  if (isNaN(parseFloat(lon))) {
    throw new Error("Coordinate should be a number.");
  }
  if (isNaN(parseFloat(lat))) {
    throw new Error("Coordinate should be a number.");
  }
}
