import { rest } from 'msw';
import { url200, data, url404, url500 } from '../constants';

export const handlers = [
  rest.post(url200, (_, res, ctx) => {
    return res(
      // Respond with a 200 status code
      ctx.status(200),
      ctx.body(JSON.stringify(data))
    );
  }),
  rest.post(url404, (_, res, ctx) => {
    return res(
      // Respond with a 200 status code
      ctx.status(404)
    );
  }),
  rest.post(url500, (_, res, ctx) => {
    return res(
      // Respond with a 200 status code
      ctx.status(500)
    );
  }),
];
