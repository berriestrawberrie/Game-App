// src/__tests__/controllers/players.test.ts
jest.mock("firebase-admin");
import type { Request, Response } from "express";
import { getAllUsers } from "../../controllers/players";
import { prisma } from "../../prisma";

// jest.mock tells Jest to replace the real module with a mock
jest.mock("../../prisma", () => ({
  prisma: {
    user: {
      findMany: jest.fn(),
    },
  },
}));

beforeAll(() => {
  jest.spyOn(console, "error").mockImplementation(() => {});
});
// Cast the imported prisma to the mocked shape so TypeScript is happy
const mockedPrisma = prisma as unknown as {
  user: {
    findMany: jest.Mock;
  };
};

const createMockResponse = () => {
  const res: Partial<Response> = {};
  res.status = jest.fn().mockReturnValue(res);
  res.json = jest.fn().mockReturnValue(res);
  return res as Response & {
    status: jest.Mock;
    json: jest.Mock;
  };
};

describe("getAllUsers controller", () => {
  let req: Request;
  let res: ReturnType<typeof createMockResponse>;

  beforeEach(() => {
    req = {} as Request;
    res = createMockResponse();
    mockedPrisma.user.findMany.mockReset();
  });

  test("returns 200 and list of users when users exist", async () => {
    const fakeUsers = [
      { id: 1, name: "Alice" },
      { id: 2, name: "Bob" },
    ];

    mockedPrisma.user.findMany.mockResolvedValue(fakeUsers);

    await getAllUsers(req, res);

    expect(mockedPrisma.user.findMany).toHaveBeenCalledTimes(1);
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(fakeUsers);
  });

  test("returns 404 and empty users array when no users found", async () => {
    mockedPrisma.user.findMany.mockResolvedValue([]);

    await getAllUsers(req, res);

    expect(mockedPrisma.user.findMany).toHaveBeenCalledTimes(1);
    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({
      error: "No students found",
      users: [],
    });
  });

  test("returns 500 when prisma throws an error", async () => {
    mockedPrisma.user.findMany.mockRejectedValue(new Error("DB error"));

    await getAllUsers(req, res);

    expect(mockedPrisma.user.findMany).toHaveBeenCalledTimes(1);
    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({
      error: "Failed to fetch students",
    });
  });
});
