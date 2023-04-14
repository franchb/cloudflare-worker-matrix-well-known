import worker from "../src/index";
import { expect, test } from 'vitest';

test("responds well-known matrix client", async () => {
  const req: Request = new Request("http://localhost/.well-known/matrix/client");

  const addr = "matrix.some-blog.com:8447"

  const resp: Response = await worker.fetch(req, {MATRIX_SERVER_ADDR: addr}, {});
  const json = await resp.json();
  expect(json).toEqual({'m.homeserver': {base_url: 'https://' + addr}});
  expect(resp.status).toBe(200);
});

test("responds well-known matrix server", async () => {
  const req: Request = new Request("http://localhost/.well-known/matrix/server");

  const addr = "matrix.another-blog.com:8457"

  const resp: Response = await worker.fetch(req, {MATRIX_SERVER_ADDR: addr}, {});
  const json = await resp.json();
  expect(json).toEqual({'m.server': addr});
  expect(resp.status).toBe(200);
});
