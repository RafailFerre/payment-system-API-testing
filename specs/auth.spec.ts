///const request = require('supertest');
import * as supertest from "supertest";
const request = supertest("http://localhost:3000");

describe("AUTHENTICATION & AUTHORIZATION", () => {
  it("Sign in with valid credentials", async () => {
    const res = await request.post("/auth").send({           // await request("http://localhost:3000").post("/auth").send({
      login: "admin",
      password: "admin"
    });

    expect(res.status).toBe(200);
    expect(typeof(res.body.token)).toBe('string');

    console.log(res.body.token, '------TOKEN------');
    
  });
});
