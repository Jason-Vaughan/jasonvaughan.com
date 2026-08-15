import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { sendResumeOtp, verifyResumeOtp, isWorkEmail } from "../utils/otpService";

export function ResumeGateModal({ isOpen, onClose, onUnlockSuccess, passcodeConfigs = {} }) {
  const [gateMode, setGateMode] = useState("otp"); // 'otp' or 'passcode'
  
  // OTP States
  const [otpStep, setOtpStep] = useState(1); // 1: Email, 2: Code
  const [emailInput, setEmailInput] = useState("");
  const [otpCodeInput, setOtpCodeInput] = useState("");
  const [isSending, setIsSending] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);
  const [otpError, setOtpError] = useState("");
  const [sentNotice, setSentNotice] = useState("");
  const [demoCodeHint, setDemoCodeHint] = useState("");

  // Passcode States
  const [passcodeInput, setPasscodeInput] = useState("");
  const [passcodeError, setPasscodeError] = useState(false);

  if (!isOpen) return null;

  const handleSendOtp = async (e) => {
    e.preventDefault();
    setOtpError("");
    setSentNotice("");
    setDemoCodeHint("");

    const email = emailInput.trim();
    if (!email) {
      setOtpError("Please enter your work email address.");
      return;
    }

    if (!isWorkEmail(email)) {
      setOtpError("Please use your official company work email (e.g. name@nvidia.com or name@anthropic.com).");
      return;
    }

    setIsSending(true);
    try {
      const res = await sendResumeOtp(email);
      setIsSending(false);
      setOtpStep(2);
      setSentNotice(`6-Digit verification code sent to ${res.email}!`);
      if (res.devCode) {
        setDemoCodeHint(`Verification Code: ${res.devCode} (or use 123456)`);
      }
    } catch (err) {
      setIsSending(false);
      setOtpError(err.message || "Failed to send verification code. Please try again.");
    }
  };

  const handleVerifyOtp = (e) => {
    e.preventDefault();
    setOtpError("");

    const code = otpCodeInput.trim();
    if (!code) {
      setOtpError("Please enter the 6-digit code sent to your email.");
      return;
    }

    setIsVerifying(true);
    const res = verifyResumeOtp(emailInput, code);
    setIsVerifying(false);

    if (res.success) {
      const domain = emailInput.split("@")[1] || "company.com";
      const companyName = domain.split(".")[0].toUpperCase();
      onUnlockSuccess({
        type: "otp",
        email: emailInput,
        bannerNote: `Welcome ${companyName} Hiring Team · Resume Unlocked`
      });
      onClose();
    } else {
      setOtpError(res.error || "Invalid 6-digit code.");
    }
  };

  const handlePasscodeSubmit = (e) => {
    e.preventDefault();
    setPasscodeError(false);
    const normalized = passcodeInput.trim().toLowerCase();
    
    if (passcodeConfigs[normalized]) {
      const cfg = passcodeConfigs[normalized];
      onUnlockSuccess({
        type: "passcode",
        variant: cfg.variant,
        bannerNote: cfg.bannerNote,
        persona: cfg.persona,
        roleFilter: cfg.roleFilter
      });
      onClose();
    } else {
      setPasscodeError(true);
    }
  };

  return (
    <AnimatePresence>
      <div 
        style={{
          position: "fixed",
          inset: 0,
          zIndex: 9999,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: 16,
          background: "rgba(0, 0, 0, 0.75)",
          backdropFilter: "blur(8px)"
        }}
        onClick={onClose}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 10 }}
          transition={{ duration: 0.2 }}
          style={{
            background: "#18181b",
            border: "1px solid #27272a",
            borderRadius: 16,
            padding: 28,
            maxWidth: 440,
            width: "100%",
            boxShadow: "0 20px 50px rgba(0,0,0,0.6)",
            color: "#f4f4f5"
          }}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <span style={{ fontSize: 20 }}>🔒</span>
              <h3 style={{ fontSize: 18, fontWeight: 700, margin: 0, color: "#fff" }}>
                {gateMode === "otp" ? "Work Email Resume Unlock" : "VIP Passcode Unlock"}
              </h3>
            </div>
            <button
              onClick={onClose}
              style={{
                background: "transparent",
                border: "none",
                color: "#71717a",
                fontSize: 20,
                cursor: "pointer"
              }}
            >
              ✕
            </button>
          </div>

          {/* Mode Switcher Tabs */}
          <div style={{ display: "flex", gap: 6, marginBottom: 20, background: "#09090b", padding: 4, borderRadius: 10 }}>
            <button
              onClick={() => { setGateMode("otp"); setOtpError(""); }}
              style={{
                flex: 1,
                padding: "6px 12px",
                borderRadius: 7,
                fontSize: 12.5,
                fontWeight: 700,
                border: "none",
                cursor: "pointer",
                background: gateMode === "otp" ? "#fbbf24" : "transparent",
                color: gateMode === "otp" ? "#000" : "#a1a1aa",
                transition: "all 0.15s ease"
              }}
            >
              ✉️ Work Email OTP
            </button>
            <button
              onClick={() => { setGateMode("passcode"); setPasscodeError(false); }}
              style={{
                flex: 1,
                padding: "6px 12px",
                borderRadius: 7,
                fontSize: 12.5,
                fontWeight: 700,
                border: "none",
                cursor: "pointer",
                background: gateMode === "passcode" ? "#fbbf24" : "transparent",
                color: gateMode === "passcode" ? "#000" : "#a1a1aa",
                transition: "all 0.15s ease"
              }}
            >
              🔑 VIP Passcode
            </button>
          </div>

          {/* MODE A: WORK EMAIL OTP */}
          {gateMode === "otp" && (
            <div>
              {otpStep === 1 ? (
                <form onSubmit={handleSendOtp}>
                  <p style={{ fontSize: 13.5, color: "#a1a1aa", marginTop: 0, marginBottom: 14, lineHeight: 1.5 }}>
                    Enter your official work email to receive a 6-digit verification code and instant PDF download.
                  </p>
                  
                  <div style={{ marginBottom: 14 }}>
                    <label style={{ display: "block", fontSize: 12, fontWeight: 700, textTransform: "uppercase", letterSpacing: 0.5, color: "#71717a", marginBottom: 6 }}>
                      Work Email Address
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="e.g. recruiter@nvidia.com"
                      value={emailInput}
                      onChange={(e) => setEmailInput(e.target.value)}
                      style={{
                        width: "100%",
                        padding: "10px 14px",
                        borderRadius: 8,
                        background: "#09090b",
                        border: otpError ? "1px solid #ef4444" : "1px solid #27272a",
                        color: "#fff",
                        fontSize: 14,
                        outline: "none"
                      }}
                    />
                  </div>

                  {otpError && (
                    <p style={{ color: "#f87171", fontSize: 12.5, marginTop: 6, marginBottom: 12 }}>
                      ⚠️ {otpError}
                    </p>
                  )}

                  <button
                    type="submit"
                    disabled={isSending}
                    style={{
                      width: "100%",
                      padding: "11px 16px",
                      borderRadius: 8,
                      background: "linear-gradient(135deg, #f59e0b 0%, #d97706 100%)",
                      color: "#000",
                      fontWeight: 800,
                      fontSize: 14,
                      border: "none",
                      cursor: isSending ? "wait" : "pointer",
                      boxShadow: "0 4px 15px rgba(245, 158, 11, 0.3)"
                    }}
                  >
                    {isSending ? "Sending Verification Code..." : "Send 6-Digit OTP Code ➔"}
                  </button>
                </form>
              ) : (
                <form onSubmit={handleVerifyOtp}>
                  <p style={{ fontSize: 13.5, color: "#4ade80", marginTop: 0, marginBottom: 12, fontWeight: 600 }}>
                    {sentNotice}
                  </p>
                  
                  {demoCodeHint && (
                    <div style={{ background: "rgba(251, 191, 36, 0.1)", border: "1px solid rgba(251, 191, 36, 0.3)", padding: "8px 12px", borderRadius: 8, fontSize: 12, color: "#fbbf24", marginBottom: 14 }}>
                      💡 <strong>Instant Test Code:</strong> {demoCodeHint}
                    </div>
                  )}

                  <div style={{ marginBottom: 14 }}>
                    <label style={{ display: "block", fontSize: 12, fontWeight: 700, textTransform: "uppercase", letterSpacing: 0.5, color: "#71717a", marginBottom: 6 }}>
                      Enter 6-Digit OTP Code
                    </label>
                    <input
                      type="text"
                      maxLength={6}
                      required
                      placeholder="e.g. 123456"
                      value={otpCodeInput}
                      onChange={(e) => setOtpCodeInput(e.target.value)}
                      style={{
                        width: "100%",
                        padding: "10px 14px",
                        borderRadius: 8,
                        background: "#09090b",
                        border: otpError ? "1px solid #ef4444" : "1px solid #27272a",
                        color: "#fff",
                        fontSize: 16,
                        letterSpacing: 4,
                        textAlign: "center",
                        fontWeight: 700,
                        outline: "none"
                      }}
                    />
                  </div>

                  {otpError && (
                    <p style={{ color: "#f87171", fontSize: 12.5, marginTop: 6, marginBottom: 12 }}>
                      ⚠️ {otpError}
                    </p>
                  )}

                  <div style={{ display: "flex", gap: 10 }}>
                    <button
                      type="button"
                      onClick={() => setOtpStep(1)}
                      style={{
                        padding: "11px 14px",
                        borderRadius: 8,
                        background: "#27272a",
                        color: "#d4d4d8",
                        fontWeight: 600,
                        fontSize: 13,
                        border: "none",
                        cursor: "pointer"
                      }}
                    >
                      ← Back
                    </button>
                    <button
                      type="submit"
                      disabled={isVerifying}
                      style={{
                        flex: 1,
                        padding: "11px 16px",
                        borderRadius: 8,
                        background: "linear-gradient(135deg, #22c55e 0%, #16a34a 100%)",
                        color: "#fff",
                        fontWeight: 800,
                        fontSize: 14,
                        border: "none",
                        cursor: isVerifying ? "wait" : "pointer",
                        boxShadow: "0 4px 15px rgba(34, 197, 94, 0.3)"
                      }}
                    >
                      {isVerifying ? "Verifying Code..." : "Verify & Download PDF 📥"}
                    </button>
                  </div>
                </form>
              )}
            </div>
          )}

          {/* MODE B: VIP PASSCODE */}
          {gateMode === "passcode" && (
            <form onSubmit={handlePasscodeSubmit}>
              <p style={{ fontSize: 13.5, color: "#a1a1aa", marginTop: 0, marginBottom: 14, lineHeight: 1.5 }}>
                Enter your invite passcode (e.g. <code>anthropic</code>, <code>nvidia</code>, <code>tpm2026</code>, or <code>master</code>) to unlock instantly.
              </p>
              
              <div style={{ marginBottom: 14 }}>
                <input
                  type="password"
                  placeholder="Enter passcode..."
                  value={passcodeInput}
                  onChange={(e) => setPasscodeInput(e.target.value)}
                  style={{
                    width: "100%",
                    padding: "10px 14px",
                    borderRadius: 8,
                    background: "#09090b",
                    border: passcodeError ? "1px solid #ef4444" : "1px solid #27272a",
                    color: "#fff",
                    fontSize: 14,
                    outline: "none"
                  }}
                />
              </div>

              {passcodeError && (
                <p style={{ color: "#f87171", fontSize: 12.5, marginTop: 6, marginBottom: 12 }}>
                  ⚠️ Invalid passcode. Try <code>nvidia</code>, <code>anthropic</code>, <code>tpm2026</code>, or <code>master</code>.
                </p>
              )}

              <button
                type="submit"
                style={{
                  width: "100%",
                  padding: "11px 16px",
                  borderRadius: 8,
                  background: "linear-gradient(135deg, #f59e0b 0%, #d97706 100%)",
                  color: "#000",
                  fontWeight: 800,
                  fontSize: 14,
                  border: "none",
                  cursor: "pointer",
                  boxShadow: "0 4px 15px rgba(245, 158, 11, 0.3)"
                }}
              >
                Unlock Portfolio & PDF 🔓
              </button>
            </form>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
