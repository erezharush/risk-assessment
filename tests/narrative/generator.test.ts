import { describe, it, expect } from "vitest";
import { generateNarrative } from "@/lib/narrative/generator";
import type { AssessmentInput, AssessmentResult } from "@/types/assessment";

describe("generateNarrative", () => {
  const mockInput: AssessmentInput = {
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

  const mockResult: AssessmentResult = {
    rawScore: 100,
    finalScore: 100,
    riskLevel: "VeryHigh",
    hasCompensatingControl: false,
    parameterScores: [],
  };

  it("replaces all template placeholders", () => {
    const template =
      "Score: {score}, Env: {environment}, Exp: {exposure}, Sys: {systemType}, Class: {classification}, Ctrl: {controlEffectiveness}, Like: {likelihood}, Dom: {domain}";

    const result = generateNarrative({
      input: mockInput,
      result: mockResult,
      template,
      domainLabel: "Network Security",
      environmentLabel: "OT",
      exposureLabel: "Full Exposure",
      systemTypeLabel: "Primary System",
      classificationLabel: "Level 8",
    });

    expect(result).toBe(
      "Score: 100.0, Env: OT, Exp: Full Exposure, Sys: Primary System, Class: Level 8, Ctrl: 1, Like: 5, Dom: Network Security",
    );
  });

  it("handles decimal scores correctly", () => {
    const template = "Risk score is {score}";
    const resultWithDecimal = { ...mockResult, finalScore: 72.86 };

    const narrative = generateNarrative({
      input: mockInput,
      result: resultWithDecimal,
      template,
      domainLabel: "Test",
      environmentLabel: "Test",
      exposureLabel: "Test",
      systemTypeLabel: "Test",
      classificationLabel: "Test",
    });

    expect(narrative).toBe("Risk score is 72.9");
  });

  it("works with Hebrew template", () => {
    const template = "ציון הסיכון הוא {score} בתחום {domain}";

    const result = generateNarrative({
      input: mockInput,
      result: mockResult,
      template,
      domainLabel: "אבטחת רשת",
      environmentLabel: "OT",
      exposureLabel: "מלאה",
      systemTypeLabel: "ראשית",
      classificationLabel: "רמה 8",
    });

    expect(result).toBe("ציון הסיכון הוא 100.0 בתחום אבטחת רשת");
  });

  it("preserves markdown bold markers in template", () => {
    const template = "This is **critical** with score {score}";

    const result = generateNarrative({
      input: mockInput,
      result: mockResult,
      template,
      domainLabel: "Test",
      environmentLabel: "Test",
      exposureLabel: "Test",
      systemTypeLabel: "Test",
      classificationLabel: "Test",
    });

    expect(result).toContain("**critical**");
    expect(result).toContain("100.0");
  });
});
