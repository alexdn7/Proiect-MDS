const { app } = require("../app.js");
const request = require("supertest");
const { StatusCodes } = require("http-status-codes");

let token;

// In order to test private routes (that require access token), I've simulated a login and stored the token received as answer.
beforeAll(async () => {
  const loginResponse = await request(app).post("/auth/login").send({
    email: process.env.TEST_EMAIL,
    password: process.env.TEST_PASSWORD,
  });

  expect(loginResponse.statusCode).toBe(StatusCodes.OK);
  token = loginResponse.body.token;
});

// As we know, when an user send a request, first time we check if the user provided an access token. If not, it will be automatically
// returned response status unauthorized. So, order is check if the user is authenticated, then check the request properly.
// So, for routes that requires an ID (eg. projects/:id), if the user didn't provide an access token, the answer will be still unauthorized
// even if the ID is invalid.

describe("Auth tests", () => {
  test("Register without request body, should return BAD REQUEST!", async () => {
    const response = await request(app).post("/auth/register");
    expect(response.statusCode).toBe(StatusCodes.BAD_REQUEST);
  });

  test("Login without request body, should return BAD REQUEST!", async () => {
    const response = await request(app).post("/auth/login");
    expect(response.statusCode).toBe(StatusCodes.BAD_REQUEST);
  });

  test("Login with an invalid email address. Should return BAD REQUEST!", async () => {
    const response = await request(app)
      .post("/auth/login")
      .send({ email: "invalidemail", password: "test" });
    expect(response.statusCode).toBe(StatusCodes.BAD_REQUEST);
  });
});

describe("Project tests", () => {
  test("Trying to create a project, without providing an access token. Should return UNAUTHORIZED!", async () => {
    const response = await request(app).post("/projects");
    expect(response.statusCode).toBe(StatusCodes.UNAUTHORIZED);
  });

  test("Trying to get all projects, without providing an access token. Should return UNAUTHORIZED!", async () => {
    const response = await request(app).get("/projects");
    expect(response.statusCode).toBe(StatusCodes.UNAUTHORIZED);
  });

  test("Trying to get all projects, this time with access token included. Should return status 200 and an Array with all projects!", async () => {
    const response = await request(app)
      .get("/projects")
      .set("Authorization", `Bearer ${token}`);
    expect(response.statusCode).toBe(StatusCodes.OK);
    expect(Array.isArray(response.body)).toBe(true);
  });

  test("Trying to delete a project, without providing an access token. Should return UNAUTHORIZED!", async () => {
    const response = await request(app).delete("/projects/12121313");
    expect(response.statusCode).toBe(StatusCodes.UNAUTHORIZED);
  });

  test("Trying to delete a project with an invalid ID. Should return BAD_REQUEST!", async () => {
    const response = await request(app)
      .delete("/projects/12121313")
      .set("Authorization", `Bearer ${token}`);
    expect(response.statusCode).toBe(StatusCodes.BAD_REQUEST);
  });
});

describe("Ticket tests", () => {
  test("Trying to get all tickets, this time with access token included. Should return status 200 and an Array with all tickets!", async () => {
    const response = await request(app)
      .get("/tickets")
      .set("Authorization", `Bearer ${token}`);
    expect(response.statusCode).toBe(StatusCodes.OK);
    expect(Array.isArray(response.body)).toBe(true);
  });

  test("Trying to delete a ticket, without providing an access token. Should return UNAUTHORIZED!", async () => {
    const response = await request(app).delete("/tickets/1112112");
    expect(response.statusCode).toBe(StatusCodes.UNAUTHORIZED);
  });
});
