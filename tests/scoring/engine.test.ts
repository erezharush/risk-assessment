import { describe, it, expect } from "vitest";
import { calculateRiskScore } from "@/lib/scoring/engine";
import type { AssessmentInput } from "@/types/assessment";

describe("calculateRiskScore", () => {
  it("returns VeryHigh for maximum risk inputs", () => {
    const input: AssessmentInput = {
      environment: "OT",
      exposure: "Full",
      systemType: "Primary",
      classification: "Level8",
      controlEffectiveness: 1,
      likelihood: 5,
      securityDomain: "NetworkSecurity",
      hasCompensatingControl: false,
      riskDescription: "",
    };

    const result = calculateRiskScore(input);

    // All values are 100, so raw = 100*0.15 + 100*0.15 + 100*0.15 + 100*0.20 + 100*0.15 + 100*0.20 = 100
    expect(result.rawScore).toBe(100);
    expect(result.finalScore).toBe(100);
    expect(result.riskLevel).toBe("VeryHigh");
    expect(result.hasCompensatingControl).toBe(false);
  });

  it("applies compensating control factor of 0.80", () => {
    const input: AssessmentInput = {
      environment: "OT",
      exposure: "Full",
      systemType: "Primary",
      classification: "Level8",
      controlEffectiveness: 1,
      likelihood: 5,
      securityDomain: "NetworkSecurity",
      hasCompensatingControl: true,
      riskDescription: "",
    };

    const result = calculateRiskScore(input);

    expect(result.rawScore).toBe(100);
    expect(result.finalScore).toBe(80);
    expect(result.riskLevel).toBe("High");
  });

  it("returns VeryLow for minimum risk inputs", () => {
    const input: AssessmentInput = {
      environment: "ExternalCloud",
      exposure: "None",
      systemType: "Secondary",
      classification: "Level1",
      controlEffectiveness: 5,
      likelihood: 1,
      securityDomain: "RiskManagement",
      hasCompensatingControl: false,
      riskDescription: "",
    };

    const result = calculateRiskScore(input);

    // 40*0.15 + 40*0.15 + 40*0.15 + 15*0.20 + 20*0.15 + 20*0.20 = 6+6+6+3+3+4 = 28
    expect(result.rawScore).toBe(28);
    expect(result.finalScore).toBe(28);
    expect(result.riskLevel).toBe("VeryLow");
  });

  it("correctly computes a medium risk scenario", () => {
    const input: AssessmentInput = {
      environment: "IT",
      exposure: "Partial",
      systemType: "Primary",
      classification: "Level5",
      controlEffectiveness: 3,
      likelihood: 3,
      securityDomain: "AccessControl",
      hasCompensatingControl: false,
      riskDescription: "",
    };

    const result = calculateRiskScore(input);

    // 75*0.15 + 60*0.15 + 100*0.15 + 70*0.20 + 60*0.15 + 60*0.20
    // = 11.25 + 9 + 15 + 14 + 9 + 12 = 70.25
    expect(result.rawScore).toBeCloseTo(70.25);
    expect(result.finalScore).toBeCloseTo(70.25);
    expect(result.riskLevel).toBe("Medium");
  });

  it("correctly computes high risk OT scenario", () => {
    const input: AssessmentInput = {
      environment: "OT",
      exposure: "Full",
      systemType: "Primary",
      classification: "Level7",
      controlEffectiveness: 2,
      likelihood: 4,
      securityDomain: "NetworkSecurity",
      hasCompensatingControl: false,
      riskDescription: "",
    };

    const result = calculateRiskScore(input);

    // 100*0.15 + 100*0.15 + 100*0.15 + 90*0.20 + 80*0.15 + 80*0.20
    // = 15 + 15 + 15 + 18 + 12 + 16 = 91
    expect(result.rawScore).toBe(91);
    expect(result.finalScore).toBe(91);
    expect(result.riskLevel).toBe("VeryHigh");
  });

  it("compensating control can lower risk from VeryHigh to High", () => {
    const input: AssessmentInput = {
      environment: "OT",
      exposure: "Full",
      systemType: "Primary",
      classification: "Level7",
      controlEffectiveness: 2,
      likelihood: 4,
      securityDomain: "NetworkSecurity",
      hasCompensatingControl: true,
      riskDescription: "",
    };

    const result = calculateRiskScore(input);

    // raw = 91, final = 91 * 0.80 = 72.8
    expect(result.rawScore).toBe(91);
    expect(result.finalScore).toBeCloseTo(72.8);
    expect(result.riskLevel).toBe("Medium");
  });

  it("correctly computes IOT scenario", () => {
    const input: AssessmentInput = {
      environment: "IOT",
      exposure: "Partial",
      systemType: "Secondary",
      classification: "Level4",
      controlEffectiveness: 4,
      likelihood: 2,
      securityDomain: "EndpointSecurity",
      hasCompensatingControl: false,
      riskDescription: "",
    };

    const result = calculateRiskScore(input);

    // 85*0.15 + 60*0.15 + 40*0.15 + 55*0.20 + 40*0.15 + 40*0.20
    // = 12.75 + 9 + 6 + 11 + 6 + 8 = 52.75
    expect(result.rawScore).toBeCloseTo(52.75);
    expect(result.riskLevel).toBe("Low");
  });

  it("returns correct parameter scores breakdown", () => {
    const input: AssessmentInput = {
      environment: "IT",
      exposure: "Full",
      systemType: "Primary",
      classification: "Level6",
      controlEffectiveness: 3,
      likelihood: 4,
      securityDomain: "DataProtection",
      hasCompensatingControl: false,
      riskDescription: "",
    };

    const result = calculateRiskScore(input);

    expect(result.parameterScores).toHaveLength(6);

    const envScore = result.parameterScores.find((p) => p.parameter === "environment");
    expect(envScore?.rawValue).toBe(75);
    expect(envScore?.weight).toBe(0.15);
    expect(envScore?.weightedScore).toBeCloseTo(11.25);
  });

  it("boundary test: score exactly at 90 is VeryHigh", () => {
    const input: AssessmentInput = {
      environment: "OT",
      exposure: "Full",
      systemType: "Primary",
      classification: "Level6",
      controlEffectiveness: 1,
      likelihood: 5,
      securityDomain: "RiskManagement",
      hasCompensatingControl: false,
      riskDescription: "",
    };

    const result = calculateRiskScore(input);

    // 100*0.15 + 100*0.15 + 100*0.15 + 80*0.20 + 100*0.15 + 100*0.20
    // = 15 + 15 + 15 + 16 + 15 + 20 = 96
    expect(result.rawScore).toBe(96);
    expect(result.riskLevel).toBe("VeryHigh");
  });

  it("boundary test: score at 75 is High", () => {
    const input: AssessmentInput = {
      environment: "IT",
      exposure: "Full",
      systemType: "Primary",
      classification: "Level6",
      controlEffectiveness: 2,
      likelihood: 4,
      securityDomain: "AccessControl",
      hasCompensatingControl: false,
      riskDescription: "",
    };

    const result = calculateRiskScore(input);

    // 75*0.15 + 100*0.15 + 100*0.15 + 80*0.20 + 80*0.15 + 80*0.20
    // = 11.25 + 15 + 15 + 16 + 12 + 16 = 85.25
    expect(result.rawScore).toBeCloseTo(85.25);
    expect(result.riskLevel).toBe("High");
  });

  it("InternalCloud same score as IT (75)", () => {
    const base = {
      exposure: "Full" as const,
      systemType: "Primary" as const,
      classification: "Level5" as const,
      controlEffectiveness: 3 as const,
      likelihood: 3 as const,
      securityDomain: "RiskManagement" as const,
      hasCompensatingControl: false,
      riskDescription: "",
    };

    const itResult = calculateRiskScore({ ...base, environment: "IT" });
    const cloudResult = calculateRiskScore({ ...base, environment: "InternalCloud" });

    expect(itResult.rawScore).toBe(cloudResult.rawScore);
  });

  it("low risk scenario with excellent controls", () => {
    const input: AssessmentInput = {
      environment: "ExternalCloud",
      exposure: "None",
      systemType: "Secondary",
      classification: "Level3",
      controlEffectiveness: 5,
      likelihood: 1,
      securityDomain: "AwarenessTraining",
      hasCompensatingControl: false,
      riskDescription: "",
    };

    const result = calculateRiskScore(input);

    // 40*0.15 + 40*0.15 + 40*0.15 + 45*0.20 + 20*0.15 + 20*0.20
    // = 6 + 6 + 6 + 9 + 3 + 4 = 34
    expect(result.rawScore).toBe(34);
    expect(result.riskLevel).toBe("VeryLow");
  });

  it("compensating control with low risk stays VeryLow", () => {
    const input: AssessmentInput = {
      environment: "ExternalCloud",
      exposure: "None",
      systemType: "Secondary",
      classification: "Level3",
      controlEffectiveness: 5,
      likelihood: 1,
      securityDomain: "AwarenessTraining",
      hasCompensatingControl: true,
      riskDescription: "",
    };

    const result = calculateRiskScore(input);

    // raw = 34, final = 34 * 0.80 = 27.2
    expect(result.rawScore).toBe(34);
    expect(result.finalScore).toBeCloseTo(27.2);
    expect(result.riskLevel).toBe("VeryLow");
  });
});
