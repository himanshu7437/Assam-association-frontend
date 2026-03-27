/// <reference types="jest" />
import { sendBookingEmails } from "../src/lib/email/sendBookingEmails";

// Mock the Resend SDK
jest.mock("resend", () => {
  return {
    Resend: jest.fn().mockImplementation(() => {
      return {
        emails: {
          send: jest.fn().mockResolvedValue({ id: "mock-email-id" }),
        },
      };
    }),
  };
});

describe("Email Service Layer", () => {
  const mockPayload = {
    userEmail: "test@example.com",
    userName: "Test User",
    facility: "Library",
    date: "2026-03-27",
  };

  it("should send emails successfully", async () => {
    const result = await sendBookingEmails(mockPayload);
    expect(result.success).toBe(true);
    expect(result.error).toBeUndefined();
  });

  it("should handle failures gracefully", async () => {
    // Override the mock for failure case
    const { Resend } = require("resend");
    Resend.mockImplementationOnce(() => ({
      emails: {
        send: jest.fn().mockRejectedValue(new Error("Network Error")),
      },
    }));

    const result = await sendBookingEmails(mockPayload);
    expect(result.success).toBe(false);
    expect(result.error).toBeDefined();
  });
});
