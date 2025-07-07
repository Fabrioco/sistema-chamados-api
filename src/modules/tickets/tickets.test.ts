import { expect, it, describe, beforeAll, afterAll, beforeEach } from "vitest";
import request from "supertest";
import app from "../../app";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

describe("Tickets", () => {
  beforeAll(async () => {
    await prisma.$connect();
  });

  afterAll(async () => {
    await prisma.ticket.deleteMany();
    await prisma.$disconnect();
  });

  beforeEach(async () => {
    await prisma.ticket.deleteMany();
    await prisma.ticket.create({
      data: {
        title: "Ticket 1",
        description: "Description 1",
        userId: "user123",
        category: "General",
        priority: "MEDIUM",
        status: "OPEN",
      },
    });
  });

  it("should create a ticket", async () => {
    const response = await request(app).post("/tickets").send({
      title: "Ticket 2",
      description: "Description 2",
      userId: "user456",
      category: "Bug",
      priority: "HIGH",
      status: "OPEN",
    });

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty("id");
    expect(response.body).toHaveProperty("title", "Ticket 2");
  });

  it("should get all tickets", async () => {
    const response = await request(app).get("/tickets");

    expect(response.status).toBe(200);
    expect(response.body).toHaveLength(1); // espera só 1 (criado no beforeEach)
    expect(response.body[0]).toHaveProperty("title", "Ticket 1");
  });
});
