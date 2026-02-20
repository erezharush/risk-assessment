import type {
  Environment,
  Exposure,
  SystemType,
  Classification,
  ControlEffectiveness,
  Likelihood,
  SecurityDomain,
} from "@/types/assessment";

interface ParameterOption<T> {
  value: T;
  labelKey: string;
  score: number;
}

export const ENVIRONMENT_OPTIONS: ParameterOption<Environment>[] = [
  { value: "OT", labelKey: "parameters.environment.OT", score: 100 },
  { value: "IOT", labelKey: "parameters.environment.IOT", score: 85 },
  { value: "IT", labelKey: "parameters.environment.IT", score: 75 },
  { value: "InternalCloud", labelKey: "parameters.environment.InternalCloud", score: 75 },
  { value: "ExternalCloud", labelKey: "parameters.environment.ExternalCloud", score: 40 },
];

export const EXPOSURE_OPTIONS: ParameterOption<Exposure>[] = [
  { value: "Full", labelKey: "parameters.exposure.Full", score: 100 },
  { value: "Partial", labelKey: "parameters.exposure.Partial", score: 60 },
  { value: "None", labelKey: "parameters.exposure.None", score: 40 },
];

export const SYSTEM_TYPE_OPTIONS: ParameterOption<SystemType>[] = [
  { value: "Primary", labelKey: "parameters.systemType.Primary", score: 100 },
  { value: "Secondary", labelKey: "parameters.systemType.Secondary", score: 40 },
];

export const CLASSIFICATION_OPTIONS: ParameterOption<Classification>[] = [
  { value: "Level8", labelKey: "parameters.classification.Level8", score: 100 },
  { value: "Level7", labelKey: "parameters.classification.Level7", score: 90 },
  { value: "Level6", labelKey: "parameters.classification.Level6", score: 80 },
  { value: "Level5", labelKey: "parameters.classification.Level5", score: 70 },
  { value: "Level4", labelKey: "parameters.classification.Level4", score: 55 },
  { value: "Level3", labelKey: "parameters.classification.Level3", score: 45 },
  { value: "Level2", labelKey: "parameters.classification.Level2", score: 35 },
  { value: "Level1", labelKey: "parameters.classification.Level1", score: 15 },
];

export const CONTROL_EFFECTIVENESS_OPTIONS: ParameterOption<ControlEffectiveness>[] = [
  { value: 1, labelKey: "parameters.controlEffectiveness.1", score: 100 },
  { value: 2, labelKey: "parameters.controlEffectiveness.2", score: 80 },
  { value: 3, labelKey: "parameters.controlEffectiveness.3", score: 60 },
  { value: 4, labelKey: "parameters.controlEffectiveness.4", score: 40 },
  { value: 5, labelKey: "parameters.controlEffectiveness.5", score: 20 },
];

export const LIKELIHOOD_OPTIONS: ParameterOption<Likelihood>[] = [
  { value: 1, labelKey: "parameters.likelihood.1", score: 20 },
  { value: 2, labelKey: "parameters.likelihood.2", score: 40 },
  { value: 3, labelKey: "parameters.likelihood.3", score: 60 },
  { value: 4, labelKey: "parameters.likelihood.4", score: 80 },
  { value: 5, labelKey: "parameters.likelihood.5", score: 100 },
];

export const SECURITY_DOMAINS: { value: SecurityDomain; labelKey: string }[] = [
  { value: "RiskManagement", labelKey: "domains.RiskManagement" },
  { value: "AccessControl", labelKey: "domains.AccessControl" },
  { value: "AssetSecurity", labelKey: "domains.AssetSecurity" },
  { value: "NetworkSecurity", labelKey: "domains.NetworkSecurity" },
  { value: "ApplicationSecurity", labelKey: "domains.ApplicationSecurity" },
  { value: "EndpointSecurity", labelKey: "domains.EndpointSecurity" },
  { value: "DataProtection", labelKey: "domains.DataProtection" },
  { value: "VulnerabilityManagement", labelKey: "domains.VulnerabilityManagement" },
  { value: "MonitoringThreatDetection", labelKey: "domains.MonitoringThreatDetection" },
  { value: "IncidentResponse", labelKey: "domains.IncidentResponse" },
  { value: "AwarenessTraining", labelKey: "domains.AwarenessTraining" },
  { value: "SupplyChain", labelKey: "domains.SupplyChain" },
  { value: "CloudInfrastructure", labelKey: "domains.CloudInfrastructure" },
  { value: "AIInfrastructure", labelKey: "domains.AIInfrastructure" },
];
