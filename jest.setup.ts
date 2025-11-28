import server from "./src/test/server";

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => {
  server.dispose();
  server.close();
});
