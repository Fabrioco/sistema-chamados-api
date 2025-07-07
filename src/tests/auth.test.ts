import request from "supertest";
import app from "../app";
import { PrismaClient } from "@prisma/client";
import { describe, it, beforeAll, afterAll, expect } from "vitest";

const prisma = new PrismaClient();

describe("Auth", () => {
  beforeAll(async () => {
    await prisma.$connect();
  });

  afterAll(async () => {
    await prisma.user.deleteMany();
    await prisma.$disconnect();
  });

  it("should register a user", async () => {
    const response = await request(app).post("/auth/register").send({
      email: "V4o5V@example.com",
      password: "123456",
      name: "John Doe",
    });
    expect(response.statusCode).toBe(201);
    expect(response.body).toHaveProperty("email");
    expect(response.body).toHaveProperty("name");
  });

  it("should login a user", async () => {
    const response = await request(app).post("/auth/login").send({
      email: "V4o5V@example.com",
      password: "123456",
    });
    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty("email");
    expect(response.body).toHaveProperty("name");
  });
});
