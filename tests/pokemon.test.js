const request = require("supertest");
const app = require("../app");
const jwt = require("jsonwebtoken");

const prisma = require('../db');
const token = jwt.sign({ userId: 1 }, process.env.JWT_SECRET);

beforeEach(async () => {
  await prisma.pokemons.deleteMany();
});

afterAll(async () => {
  await prisma.$disconnect();
});

describe("Pokemon API", () => {
  it("GET /pokemon - devuelve lista con status 200", async () => {
    const res = await request(app)
      .get("/pokemon")
      .set("Authorization", `Bearer ${token}`);

    expect(res.status).toBe(200);
    expect(res.headers["content-type"]).toMatch(/json/);
    expect(Array.isArray(res.body)).toBe(true);
  });

  it("POST /pokemon - devuelve body insertado status 201", async () => {
    const res = await request(app)
      .post("/pokemon")
      .set("Authorization", `Bearer ${token}`)
      .send({
        nombre: "Ghost",
      });

    expect(res.status).toBe(201);
    expect(res.headers["content-type"]).toMatch(/json/);
    expect(res.body.nombre).toBe("Ghost");
  });
});
