import { getQuery, Router, Status } from "./deps.ts";
import { validateQueryParams } from "./util.ts";

export const weatherRouter = new Router();

weatherRouter.get("/temperatures", (ctx) => {
  try {
    const queryParams: Map<string, string> = getQuery(ctx, { asMap: true });
    validateQueryParams(queryParams);
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
});
