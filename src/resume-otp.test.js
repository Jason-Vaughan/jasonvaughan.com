import { describe, it, expect } from "vitest";
import { isWorkEmail, sendResumeOtp, verifyResumeOtp } from "./utils/otpService";

describe("Work Email OTP Verification Service [TASK-RESUME-3]", () => {
  it("correctly identifies work emails and rejects personal throwaways", () => {
    expect(isWorkEmail("recruiter@nvidia.com")).toBe(true);
    expect(isWorkEmail("hiring@anthropic.com")).toBe(true);
    expect(isWorkEmail("tpm@google.com")).toBe(true);

    expect(isWorkEmail("randomuser@gmail.com")).toBe(false);
    expect(isWorkEmail("test@yahoo.com")).toBe(false);
    expect(isWorkEmail("person@hotmail.com")).toBe(false);
    expect(isWorkEmail("invalid-email-format")).toBe(false);
  });

  it("generates a 6-digit OTP code for a valid work email", async () => {
    const res = await sendResumeOtp("recruiter@nvidia.com");
    expect(res.success).toBe(true);
    expect(res.email).toBe("recruiter@nvidia.com");
    expect(res.company).toBe("NVIDIA");
    expect(res.devCode).toHaveLength(6);
  });

  it("verifies the generated 6-digit OTP code successfully", async () => {
    const email = "lead@anthropic.com";
    const res = await sendResumeOtp(email);
    const code = res.devCode;

    const verifyRes = verifyResumeOtp(email, code);
    expect(verifyRes.success).toBe(true);
  });

  it("supports master fallback OTP code 123456 for testing", () => {
    const verifyRes = verifyResumeOtp("test@company.com", "123456");
    expect(verifyRes.success).toBe(true);
  });

  it("rejects invalid OTP codes", async () => {
    const email = "evaluator@google.com";
    await sendResumeOtp(email);

    const verifyRes = verifyResumeOtp(email, "999999");
    expect(verifyRes.success).toBe(false);
    expect(verifyRes.error).toContain("Invalid 6-digit verification code");
  });
});
