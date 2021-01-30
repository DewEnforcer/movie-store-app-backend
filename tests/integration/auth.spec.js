const request = require("supertest");
const {User} = require("../../models/userModel");
let server;

describe("Authorization middleware", () => {
    let token;

    beforeEach(() => {
        server = require("../../index");
        token = User.generateAuthToken();
    })
    afterEach(async () => {
        server.close();
        await Genre.remove({}); //removes all documents
    })
    const exec = () => {
        return request(server).post("/api/genres").set("x-auth-token", token).send({name: "Genre1"});
    }

   it("should return 401 if token is not provided", async () => {
        token = "";
        const res = await exec();
        expect(res.status).toBe(401);
   }) 
   it("should return 400 if token is invalid", async () => {
        token = null;
        const res = await exec();
        expect(res.status).toBe(400);
   }) 
   it("should return 200 if token is valid", async () => {
        const res = await exec();
        expect(res.status).toBe(200);
   }) 
});