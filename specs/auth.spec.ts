const request = require('supertest')
import { AuthResponseBody } from '../api/auth'
require('dotenv').config()
// import * as supertest from "supertest";
// const request = supertest(process.env.BASE_URL || "http://localhost:3000");

describe('AUTHENTICATION & AUTHORIZATION', () => {
  let res: { status: number; body: AuthResponseBody }

  describe('POSITIVE', () => {
    beforeEach(async () => {
      res = await request(process.env.BASE_URL).post('/auth').send({        // await request.post("/auth").send({
        login: process.env.LOGIN,
        password: process.env.PASSWORD,
      })
    })

    it('Sign in with valid credentials', () => {
      expect(res.status).toEqual(200)
      expect(res.body.token).toEqual(expect.any(String))
      expect(res.body).toEqual<AuthResponseBody>({ token: expect.any(String) })
      // console.log(res.body.token, '------TOKEN------')
    })
  })
  describe('NEGATIVE', () => {
    beforeEach(async () => {
      res = await request(process.env.BASE_URL).post('/auth').send({        // await request.post("/auth").send({
        login: process.env.LOGIN,
        password: 'invalid-password',
      })
    })
    it('Sign in with invalid credentials', async () => {
      expect(res.status).toEqual(404)
      expect(res.body.message).toEqual('Wrong login or password.')
      expect(res.body.message).toEqual(expect.any(String))
      // console.log(res.body.message, '------ MESSAGE ------')
    })
  })
})
