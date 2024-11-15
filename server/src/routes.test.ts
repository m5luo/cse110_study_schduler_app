const request = require('supertest');
const express = require('express');
const app = express();


// Currently just a mock test. Still need to figure out how to test endpoints
describe('Get Endpoints', () => {
    // it('should get endpoint', async () => {
    //   const res = await request(app).get('/')
    //   expect(res.statusCode).toBe(200)
    // //   console.log(res.statusCode)
    // //   expect(res.data).toEqual('Hello, TypeScript Express!')
    // })
    it('should test that true === true', () => {
        expect(true).toBe(true)
    })
})