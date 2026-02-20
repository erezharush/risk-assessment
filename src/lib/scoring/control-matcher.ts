import type { RiskLevel, SecurityDomain } from "@/types/assessment";
import { DOMAIN_CONTROLS, type ControlRecommendation } from "@/data/domain-controls";

export interface MatchedControl {
  control: ControlRecommendation;
  domain: SecurityDomain;
  relevance: number;
  matchedTerms: string[];
}

const KEYWORD_MAP: Record<string, { domains: SecurityDomain[]; weight: number }> = {
  // Access & Authentication
  "access": { domains: ["AccessControl"], weight: 2 },
  "password": { domains: ["AccessControl"], weight: 2 },
  "authentication": { domains: ["AccessControl"], weight: 3 },
  "mfa": { domains: ["AccessControl"], weight: 3 },
  "login": { domains: ["AccessControl"], weight: 2 },
  "credential": { domains: ["AccessControl"], weight: 3 },
  "privilege": { domains: ["AccessControl"], weight: 3 },
  "admin": { domains: ["AccessControl", "EndpointSecurity"], weight: 2 },
  "unauthorized": { domains: ["AccessControl", "MonitoringThreatDetection"], weight: 3 },
  "identity": { domains: ["AccessControl"], weight: 2 },
  "sso": { domains: ["AccessControl"], weight: 2 },
  "permission": { domains: ["AccessControl"], weight: 2 },
  "role": { domains: ["AccessControl"], weight: 1 },
  "account": { domains: ["AccessControl"], weight: 2 },
  "גישה": { domains: ["AccessControl"], weight: 3 },
  "הזדהות": { domains: ["AccessControl"], weight: 3 },
  "סיסמה": { domains: ["AccessControl"], weight: 3 },
  "הרשאות": { domains: ["AccessControl"], weight: 3 },
  "הרשאה": { domains: ["AccessControl"], weight: 3 },

  // Network
  "network": { domains: ["NetworkSecurity"], weight: 2 },
  "firewall": { domains: ["NetworkSecurity"], weight: 3 },
  "segmentation": { domains: ["NetworkSecurity"], weight: 3 },
  "vpn": { domains: ["NetworkSecurity", "AccessControl"], weight: 2 },
  "remote": { domains: ["NetworkSecurity", "AccessControl"], weight: 2 },
  "dns": { domains: ["NetworkSecurity"], weight: 2 },
  "ddos": { domains: ["NetworkSecurity"], weight: 3 },
  "lateral": { domains: ["NetworkSecurity", "MonitoringThreatDetection"], weight: 3 },
  "traffic": { domains: ["NetworkSecurity", "MonitoringThreatDetection"], weight: 2 },
  "port": { domains: ["NetworkSecurity"], weight: 2 },
  "protocol": { domains: ["NetworkSecurity"], weight: 1 },
  "wifi": { domains: ["NetworkSecurity"], weight: 2 },
  "wireless": { domains: ["NetworkSecurity"], weight: 2 },
  "רשת": { domains: ["NetworkSecurity"], weight: 3 },
  "חומתאש": { domains: ["NetworkSecurity"], weight: 3 },

  // Application
  "application": { domains: ["ApplicationSecurity"], weight: 2 },
  "app": { domains: ["ApplicationSecurity"], weight: 1 },
  "web": { domains: ["ApplicationSecurity"], weight: 2 },
  "api": { domains: ["ApplicationSecurity"], weight: 3 },
  "injection": { domains: ["ApplicationSecurity"], weight: 3 },
  "sql": { domains: ["ApplicationSecurity"], weight: 3 },
  "xss": { domains: ["ApplicationSecurity"], weight: 3 },
  "code": { domains: ["ApplicationSecurity"], weight: 2 },
  "software": { domains: ["ApplicationSecurity", "SupplyChain"], weight: 2 },
  "vulnerability": { domains: ["VulnerabilityManagement", "ApplicationSecurity"], weight: 3 },
  "patch": { domains: ["VulnerabilityManagement"], weight: 3 },
  "update": { domains: ["VulnerabilityManagement"], weight: 2 },
  "cve": { domains: ["VulnerabilityManagement"], weight: 3 },
  "exploit": { domains: ["VulnerabilityManagement", "ApplicationSecurity"], weight: 3 },
  "אפליקציה": { domains: ["ApplicationSecurity"], weight: 3 },
  "חולשה": { domains: ["VulnerabilityManagement"], weight: 3 },
  "חולשות": { domains: ["VulnerabilityManagement"], weight: 3 },
  "עדכון": { domains: ["VulnerabilityManagement"], weight: 2 },

  // OT / ICS / SCADA
  "ot": { domains: ["NetworkSecurity", "EndpointSecurity", "AssetSecurity"], weight: 3 },
  "scada": { domains: ["NetworkSecurity", "MonitoringThreatDetection", "AssetSecurity"], weight: 3 },
  "ics": { domains: ["NetworkSecurity", "AssetSecurity"], weight: 3 },
  "plc": { domains: ["NetworkSecurity", "EndpointSecurity"], weight: 3 },
  "hmi": { domains: ["EndpointSecurity", "ApplicationSecurity"], weight: 3 },
  "industrial": { domains: ["NetworkSecurity", "AssetSecurity"], weight: 2 },
  "operational": { domains: ["NetworkSecurity", "AssetSecurity"], weight: 2 },
  "תפעולי": { domains: ["NetworkSecurity", "AssetSecurity"], weight: 3 },
  "בקר": { domains: ["NetworkSecurity", "EndpointSecurity"], weight: 2 },

  // Data
  "data": { domains: ["DataProtection"], weight: 2 },
  "encryption": { domains: ["DataProtection"], weight: 3 },
  "leak": { domains: ["DataProtection", "MonitoringThreatDetection"], weight: 3 },
  "leakage": { domains: ["DataProtection"], weight: 3 },
  "exfiltration": { domains: ["DataProtection", "MonitoringThreatDetection"], weight: 3 },
  "database": { domains: ["DataProtection", "ApplicationSecurity"], weight: 2 },
  "backup": { domains: ["DataProtection"], weight: 2 },
  "privacy": { domains: ["DataProtection"], weight: 2 },
  "pii": { domains: ["DataProtection"], weight: 3 },
  "classified": { domains: ["DataProtection"], weight: 2 },
  "sensitive": { domains: ["DataProtection"], weight: 2 },
  "מידע": { domains: ["DataProtection"], weight: 2 },
  "הצפנה": { domains: ["DataProtection"], weight: 3 },
  "דליפה": { domains: ["DataProtection"], weight: 3 },
  "גיבוי": { domains: ["DataProtection"], weight: 2 },

  // Endpoint
  "endpoint": { domains: ["EndpointSecurity"], weight: 3 },
  "malware": { domains: ["EndpointSecurity", "MonitoringThreatDetection"], weight: 3 },
  "ransomware": { domains: ["EndpointSecurity", "IncidentResponse", "DataProtection"], weight: 3 },
  "virus": { domains: ["EndpointSecurity"], weight: 2 },
  "trojan": { domains: ["EndpointSecurity"], weight: 3 },
  "workstation": { domains: ["EndpointSecurity"], weight: 2 },
  "laptop": { domains: ["EndpointSecurity"], weight: 2 },
  "server": { domains: ["EndpointSecurity", "AssetSecurity"], weight: 2 },
  "usb": { domains: ["EndpointSecurity"], weight: 3 },
  "device": { domains: ["EndpointSecurity", "AssetSecurity"], weight: 2 },
  "mobile": { domains: ["EndpointSecurity"], weight: 2 },
  "תחנה": { domains: ["EndpointSecurity"], weight: 2 },
  "נוזקה": { domains: ["EndpointSecurity"], weight: 3 },
  "כופר": { domains: ["EndpointSecurity", "IncidentResponse"], weight: 3 },

  // Monitoring & Detection
  "monitoring": { domains: ["MonitoringThreatDetection"], weight: 3 },
  "detection": { domains: ["MonitoringThreatDetection"], weight: 3 },
  "siem": { domains: ["MonitoringThreatDetection"], weight: 3 },
  "soc": { domains: ["MonitoringThreatDetection"], weight: 3 },
  "alert": { domains: ["MonitoringThreatDetection"], weight: 2 },
  "log": { domains: ["MonitoringThreatDetection"], weight: 2 },
  "anomaly": { domains: ["MonitoringThreatDetection"], weight: 3 },
  "threat": { domains: ["MonitoringThreatDetection"], weight: 2 },
  "insider": { domains: ["MonitoringThreatDetection", "AccessControl"], weight: 3 },
  "ניטור": { domains: ["MonitoringThreatDetection"], weight: 3 },
  "איום": { domains: ["MonitoringThreatDetection"], weight: 3 },
  "זיהוי": { domains: ["MonitoringThreatDetection"], weight: 2 },

  // Incident Response
  "incident": { domains: ["IncidentResponse"], weight: 3 },
  "response": { domains: ["IncidentResponse"], weight: 2 },
  "breach": { domains: ["IncidentResponse", "MonitoringThreatDetection"], weight: 3 },
  "attack": { domains: ["IncidentResponse", "MonitoringThreatDetection"], weight: 2 },
  "compromise": { domains: ["IncidentResponse"], weight: 3 },
  "recovery": { domains: ["IncidentResponse", "DataProtection"], weight: 2 },
  "forensic": { domains: ["IncidentResponse"], weight: 3 },
  "אירוע": { domains: ["IncidentResponse"], weight: 3 },
  "תקיפה": { domains: ["IncidentResponse", "MonitoringThreatDetection"], weight: 3 },
  "פריצה": { domains: ["IncidentResponse"], weight: 3 },

  // Awareness
  "phishing": { domains: ["AwarenessTraining", "EndpointSecurity"], weight: 3 },
  "social": { domains: ["AwarenessTraining"], weight: 2 },
  "training": { domains: ["AwarenessTraining"], weight: 2 },
  "awareness": { domains: ["AwarenessTraining"], weight: 3 },
  "human": { domains: ["AwarenessTraining"], weight: 2 },
  "employee": { domains: ["AwarenessTraining"], weight: 2 },
  "פישינג": { domains: ["AwarenessTraining"], weight: 3 },
  "מודעות": { domains: ["AwarenessTraining"], weight: 3 },
  "עובד": { domains: ["AwarenessTraining"], weight: 2 },
  "הנדסה חברתית": { domains: ["AwarenessTraining"], weight: 3 },

  // Supply Chain
  "supply": { domains: ["SupplyChain"], weight: 2 },
  "vendor": { domains: ["SupplyChain"], weight: 3 },
  "third-party": { domains: ["SupplyChain"], weight: 3 },
  "supplier": { domains: ["SupplyChain"], weight: 3 },
  "open-source": { domains: ["SupplyChain", "ApplicationSecurity"], weight: 2 },
  "dependency": { domains: ["SupplyChain"], weight: 2 },
  "sbom": { domains: ["SupplyChain"], weight: 3 },
  "ספק": { domains: ["SupplyChain"], weight: 3 },
  "שרשרת": { domains: ["SupplyChain"], weight: 3 },
  "צד שלישי": { domains: ["SupplyChain"], weight: 3 },

  // Cloud
  "cloud": { domains: ["CloudInfrastructure"], weight: 3 },
  "aws": { domains: ["CloudInfrastructure"], weight: 3 },
  "azure": { domains: ["CloudInfrastructure"], weight: 3 },
  "gcp": { domains: ["CloudInfrastructure"], weight: 3 },
  "saas": { domains: ["CloudInfrastructure"], weight: 2 },
  "iaas": { domains: ["CloudInfrastructure"], weight: 2 },
  "container": { domains: ["CloudInfrastructure", "ApplicationSecurity"], weight: 2 },
  "kubernetes": { domains: ["CloudInfrastructure"], weight: 3 },
  "docker": { domains: ["CloudInfrastructure"], weight: 2 },
  "serverless": { domains: ["CloudInfrastructure"], weight: 2 },
  "ענן": { domains: ["CloudInfrastructure"], weight: 3 },

  // AI
  "ai": { domains: ["AIInfrastructure"], weight: 3 },
  "ml": { domains: ["AIInfrastructure"], weight: 3 },
  "model": { domains: ["AIInfrastructure"], weight: 2 },
  "llm": { domains: ["AIInfrastructure"], weight: 3 },
  "prompt": { domains: ["AIInfrastructure"], weight: 3 },
  "chatgpt": { domains: ["AIInfrastructure"], weight: 3 },
  "copilot": { domains: ["AIInfrastructure"], weight: 3 },
  "בינה מלאכותית": { domains: ["AIInfrastructure"], weight: 3 },

  // Assets
  "asset": { domains: ["AssetSecurity"], weight: 2 },
  "inventory": { domains: ["AssetSecurity"], weight: 2 },
  "hardware": { domains: ["AssetSecurity", "EndpointSecurity"], weight: 2 },
  "infrastructure": { domains: ["AssetSecurity", "NetworkSecurity"], weight: 2 },
  "נכס": { domains: ["AssetSecurity"], weight: 2 },
  "תשתית": { domains: ["AssetSecurity", "NetworkSecurity"], weight: 2 },

  // Risk Management
  "compliance": { domains: ["RiskManagement"], weight: 2 },
  "regulation": { domains: ["RiskManagement"], weight: 2 },
  "audit": { domains: ["RiskManagement"], weight: 2 },
  "policy": { domains: ["RiskManagement"], weight: 2 },
  "governance": { domains: ["RiskManagement"], weight: 2 },
  "רגולציה": { domains: ["RiskManagement"], weight: 2 },
  "ציות": { domains: ["RiskManagement"], weight: 2 },
  "מדיניות": { domains: ["RiskManagement"], weight: 2 },
};

function tokenize(text: string): string[] {
  const normalized = text.toLowerCase().trim();
  const tokens: string[] = [];

  // Check multi-word phrases first
  for (const phrase of Object.keys(KEYWORD_MAP)) {
    if (phrase.includes(" ") && normalized.includes(phrase)) {
      tokens.push(phrase);
    }
  }

  // Then single words
  const words = normalized.split(/[\s,.\-;:!?()\/]+/).filter((w) => w.length > 1);
  tokens.push(...words);

  return tokens;
}

export function matchControlsToDescription(
  description: string,
  riskLevel: RiskLevel,
): MatchedControl[] {
  if (!description.trim()) {
    return [];
  }

  const tokens = tokenize(description);
  const domainScores = new Map<SecurityDomain, { score: number; terms: string[] }>();

  for (const token of tokens) {
    const mapping = KEYWORD_MAP[token];
    if (!mapping) continue;

    for (const domain of mapping.domains) {
      const existing = domainScores.get(domain) ?? { score: 0, terms: [] };
      existing.score += mapping.weight;
      if (!existing.terms.includes(token)) {
        existing.terms.push(token);
      }
      domainScores.set(domain, existing);
    }
  }

  const results: MatchedControl[] = [];

  const sortedDomains = [...domainScores.entries()]
    .sort((a, b) => b[1].score - a[1].score)
    .slice(0, 4);

  for (const [domain, { score, terms }] of sortedDomains) {
    const controls = DOMAIN_CONTROLS[domain][riskLevel];
    for (const control of controls) {
      results.push({
        control,
        domain,
        relevance: score,
        matchedTerms: terms,
      });
    }
  }

  return results;
}
