export type Environment = "OT" | "IOT" | "IT" | "InternalCloud" | "ExternalCloud";

export type Exposure = "Full" | "Partial" | "None";

export type SystemType = "Primary" | "Secondary";

export type Classification =
  | "Level8"
  | "Level7"
  | "Level6"
  | "Level5"
  | "Level4"
  | "Level3"
  | "Level2"
  | "Level1";

export type ControlEffectiveness = 1 | 2 | 3 | 4 | 5;

export type Likelihood = 1 | 2 | 3 | 4 | 5;

export type RiskLevel = "VeryHigh" | "High" | "Medium" | "Low" | "VeryLow";

export type SecurityDomain =
  | "RiskManagement"
  | "AccessControl"
  | "AssetSecurity"
  | "NetworkSecurity"
  | "ApplicationSecurity"
  | "EndpointSecurity"
  | "DataProtection"
  | "VulnerabilityManagement"
  | "MonitoringThreatDetection"
  | "IncidentResponse"
  | "AwarenessTraining"
  | "SupplyChain"
  | "CloudInfrastructure"
  | "AIInfrastructure";

export interface AssessmentInput {
  environment: Environment;
  exposure: Exposure;
  systemType: SystemType;
  classification: Classification;
  controlEffectiveness: ControlEffectiveness;
  likelihood: Likelihood;
  securityDomain: SecurityDomain;
  hasCompensatingControl: boolean;
  riskDescription: string;
}

export interface ParameterScore {
  parameter: string;
  rawValue: number;
  weight: number;
  weightedScore: number;
}

export interface AssessmentResult {
  rawScore: number;
  finalScore: number;
  riskLevel: RiskLevel;
  parameterScores: ParameterScore[];
  hasCompensatingControl: boolean;
}
