const request = require("supertest");
const {Genre} = require("../../models/genreModel");
const {User} = require("../.../models/userModel");
const mongoose = require("mongoose");
let server;

describe("/api/genres", () => {
    beforeEach(() => {
        server = require("../../index");
    })
    afterEach(async () => {
        server.close();
        await Genre.remove({});
    })
    describe("GET /", () => {
        it("should return all genres", async () => {
            const genres = [
                {name: "Genre1"},
                {name: "Genre2"},
            ]
            await Genre.insertMany(genres);

            const res = await request(server).get("/api/genres");
            expect(res.status).toBe(200);
            expect(res.body.length).toBe(genres.length);
            expect(res.body.some(g => g.name === "Genre1")).toBe(true);
            expect(res.body.some(g => g.name === "Genre2")).toBe(true);
        })
    })
    describe("GET /:id", () => {
        it("should return genre with given correct id", async () => {
            const genre = new Genre({name: "Genre1"});
            await genre.save();

            const res = await request(server).get(`/api/genres/${genre._id}`);
            expect(res.status).toBe(200);
            expect(res.body).toHaveProperty("name", genre.name);
        })
        it("should return status 404 to request with invalid id", async () => {
            const res = await request(server).get("/api/genres/1");
            expect(res.status).toBe(404);
        })
        it("should return status 404 to request with id that doesnt match any genre id", async () => {
            const objectId = mongoose.Types.ObjectId().toHexString();
            const res = await request(server).get("/api/genres/"+objectId);
            expect(res.status).toBe(404);
        })
    })
    describe("POST /", () => {
        let token = undefined, payload = undefined;

        const exec = () => {
            return request(server).post("/api/genres/").set("x-auth-token", token).send(payload); //happy path
        }

        beforeEach(() => {
            token = new User().generateAuthToken();  
            payload = {name: "genre1"};          
        })

        it("should return 401 if client is not logged in", async () => {
            token = "";
            const res = await exec();
            expect(res.status).toBe(401);
        });
        it("should return 400 if genre is less than 3 characters", async () => {
            payload.name = "a";
            const res = await exec();
            expect(res.status).toBe(400);
        });
        it("should return 400 if genre is more than 50 characters", async () => {
            payload.name = new array(52).join("a");
            const res = await exec();
            expect(res.status).toBe(400);
        });
        it("should save the genre if it is valid", async () => {
            const res = await exec();
            const genre = await Genre.find(payload);
            expect(genre).not.toBeNull();
        });
        it("should return the genre if it is valid", async () => {
            const res = await exec();
            //const res = await request(server).post("/api/genres/").set("x-auth-token", token).send({name: "genre1"}); //creates 51 characters
            expect(res).toHaveProperty("_id");
            expect(res).toHaveProperty("name", "genre1");
        });
    })
})