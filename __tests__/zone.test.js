const fs = require("fs");
const path = require("path");
const fastCsv = require("fast-csv");
const request = require("supertest");
const server = require("../app");

const csvFilePath = path.join(__dirname, "..", "zone.csv");

const initialZone = {
    name: "Test Zone",
    points: [[1.0, 1.0],[2.0, 1.0],[2.0, 2.0],[1.0, 2.0]]
};

describe("Zone Backend API", () => {

    beforeEach(() => {

        /* Add a default row before run the test */
        const headers = ["id", "name", "points"];
        const rows = [{ id: "1", ...initialZone, points: JSON.stringify(initialZone.points) }];
        const ws = fs.createWriteStream(csvFilePath);
        fastCsv.write(rows, { headers }).pipe(ws);

    });

    afterAll((done) => {
        const ws = fs.createWriteStream(csvFilePath);
        fastCsv.write([], { headers: false }).pipe(ws);
        server.close(done);
    });

    test("GET /zones - should fetch all data", async () => {
        const response = await request(server).get("/zones");
        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty("data", [
            { id: "1", name: "Test Zone", points: [[1.0, 1.0], [2.0, 1.0], [2.0, 2.0], [1.0, 2.0]] }
        ]);
    });

    test("POST /zones - should create a new zone", async () => {

        const response = await request(server)
            .post("/zones")
            .send(initialZone)
            .expect("Content-Type", /json/)
            .expect(201);

        const data = response.body.data;
        expect(data).toHaveProperty("id");
        expect(data.name).toBe(initialZone.name);
        expect(data.points).toEqual(initialZone.points);

    });

    test("DELETE /zones/:id - should delete a zone by ID", async () => {

        /* Add a test zone to the CSV file */
        const response = await request(server).delete("/zones/1").expect(200);
        expect(response.body).toHaveProperty("success", true);

    });

    test("POST /zones - should return 400 for invalid values", async () => {

        const response = await request(server)
            .post("/zones")
            .send({ name: "Invalid Zone" })
            .expect("Content-Type", /json/)
            .expect(400);

        expect(response.body).toHaveProperty("error.message", "Invalid data");

    });

    test("DELETE /zones/:id - should throw 'No zones were found' error", async () => {

        const id = 2;
        const response = await request(server).delete(`/zones/${id}`).expect(404);
        expect(response.body).toHaveProperty("error.message", `No zones were found with id ${id} to delete.`);

    });
});
