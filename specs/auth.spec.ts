///const request = require('supertest');
import * as supertest from "supertest";
const request = supertest("http://localhost:3000");

import { AuthResponseBody } from "../api/auth";

describe("AUTHENTICATION & AUTHORIZATION", () => {
  describe("POSITIVE", () => {
    let res: {status : number, body: AuthResponseBody}
    beforeEach(async() => {
            res = await request.post("/auth").send({        // await request("http://localhost:3000").post("/auth").send({
            login: "admin",
            password: "admin",
          });
    });

    it("Sign in with valid credentials", async () => {
      expect(res.status).toEqual(200);
      expect(res.body.token).toEqual(expect.any(String));
      expect(res.body).toEqual<AuthResponseBody>({
        token: expect.any(String),
      });
      console.log(res.body.token, "------TOKEN------");
    });

  });
  describe("NEGATIVE", () => {
    it("Sign in with invalid credentials", async () => {
      const res = await request.post("/auth").send({
        // await request("http://localhost:3000").post("/auth").send({
        login: "admin",
        password: "invalid_password"
      });

      expect(res.status).toEqual(404);
      expect(res.body.message).toEqual('Wrong login or password.');
      expect(res.body.message).toEqual(expect.any(String));

      console.log(res.body.message, "------ MESSAGE ------");
    });
  });
});
