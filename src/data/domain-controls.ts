import type { SecurityDomain, RiskLevel } from "@/types/assessment";

export interface ControlRecommendation {
  control: string;
  framework: string;
  products: string[];
}

type ControlRecommendations = Record<RiskLevel, ControlRecommendation[]>;

export const DOMAIN_CONTROLS: Record<SecurityDomain, ControlRecommendations> = {
  RiskManagement: {
    VeryHigh: [
      { control: "Deploy continuous risk monitoring with automated scoring and executive dashboards", framework: "NIST CSF ID.RM / ISO 27005", products: ["Archer IRM", "ServiceNow GRC", "LogicGate"] },
      { control: "Engage third-party red team and risk assessment firm for independent validation", framework: "NIST SP 800-30 / ISO 27001 A.18", products: ["Mandiant", "CrowdStrike Services", "Deloitte Cyber"] },
      { control: "Establish emergency risk committee with weekly C-level reporting cadence", framework: "NIST CSF GV.RM / CISO best practice", products: ["OneTrust", "Diligent Boards"] },
      { control: "Implement quantitative risk analysis (FAIR model) for critical assets", framework: "FAIR / NIST SP 800-30", products: ["RiskLens", "Safe Security", "Axio360"] },
    ],
    High: [
      { control: "Increase risk assessment frequency to quarterly with automated scanning", framework: "NIST CSF ID.RA / CIS Control 16", products: ["Qualys VMDR", "Rapid7 InsightVM", "Tenable.io"] },
      { control: "Implement integrated risk management platform with automated risk scoring", framework: "ISO 27005 / NIST CSF", products: ["Archer IRM", "MetricStream", "RSA Archer"] },
      { control: "Review and update risk appetite and tolerance framework with board approval", framework: "ISO 27001 Clause 6.1", products: ["OneTrust", "ServiceNow GRC"] },
    ],
    Medium: [
      { control: "Conduct semi-annual risk assessments aligned with business objectives", framework: "NIST CSF ID.RA / ISO 27001 A.8", products: ["vCISO platforms", "Qualys"] },
      { control: "Implement risk register with tracking and treatment plans", framework: "ISO 27001 Clause 6.1.2", products: ["Jira + Risk plugin", "ServiceNow GRC", "ZenGRC"] },
    ],
    Low: [
      { control: "Maintain annual risk assessment cycle with documented methodology", framework: "ISO 27001 A.8.2", products: ["Simple spreadsheet-based tracking", "ZenGRC"] },
    ],
    VeryLow: [
      { control: "Continue periodic policy reviews and maintain compliance documentation", framework: "ISO 27001 Clause 9.3", products: ["Existing GRC tools"] },
    ],
  },
  AccessControl: {
    VeryHigh: [
      { control: "Implement zero-trust architecture with micro-segmentation and continuous verification", framework: "NIST SP 800-207 / CIS Control 6", products: ["Zscaler ZPA", "Palo Alto Prisma Access", "Illumio"] },
      { control: "Deploy phishing-resistant MFA (FIDO2/WebAuthn) across all systems and VPN", framework: "NIST SP 800-63B / CIS Control 6.3", products: ["YubiKey", "Microsoft Entra ID", "Duo Security"] },
      { control: "Implement just-in-time (JIT) privileged access with session recording", framework: "CIS Control 6.8 / NIST AC-2", products: ["CyberArk PAM", "BeyondTrust", "Delinea Secret Server"] },
      { control: "Deploy identity threat detection and response (ITDR)", framework: "Gartner ITDR / NIST AC-7", products: ["Microsoft Defender for Identity", "CrowdStrike Falcon Identity", "Semperis"] },
    ],
    High: [
      { control: "Enforce MFA for all privileged and remote accounts with conditional access policies", framework: "CIS Control 6.3 / NIST IA-2", products: ["Microsoft Entra Conditional Access", "Okta", "Duo"] },
      { control: "Implement RBAC with quarterly access certification reviews", framework: "NIST AC-2 / ISO 27001 A.9.2", products: ["SailPoint", "Saviynt", "CyberArk Identity"] },
      { control: "Deploy privileged access workstations (PAWs) for admin tasks", framework: "Microsoft PAW model / NIST AC-6", products: ["Microsoft PAW", "CyberArk EPM"] },
    ],
    Medium: [
      { control: "Implement regular access certification reviews and clean up stale accounts", framework: "CIS Control 5.3 / NIST AC-2", products: ["SailPoint", "Microsoft Entra Access Reviews"] },
      { control: "Deploy session monitoring for privileged users", framework: "NIST AU-14 / CIS Control 8", products: ["CyberArk PSM", "ObserveIT (Proofpoint)"] },
    ],
    Low: [
      { control: "Maintain quarterly access reviews and enforce strong password policies", framework: "CIS Control 5 / NIST IA-5", products: ["Active Directory GPO", "Okta"] },
    ],
    VeryLow: [
      { control: "Continue current access controls with periodic audits", framework: "ISO 27001 A.9", products: ["Existing IAM tools"] },
    ],
  },
  AssetSecurity: {
    VeryHigh: [
      { control: "Deploy comprehensive CAASM (Cyber Asset Attack Surface Management) with real-time discovery", framework: "CIS Control 1 / NIST ID.AM", products: ["Axonius", "Sevco", "runZero", "JupiterOne"] },
      { control: "Implement automated asset classification and data labeling with DLP enforcement", framework: "NIST ID.AM-5 / ISO 27001 A.8.2", products: ["Microsoft Purview", "Varonis", "Digital Guardian"] },
      { control: "Deploy hardware security modules (HSM) for cryptographic key management of critical assets", framework: "NIST SC-12 / PCI DSS 3.5", products: ["Thales Luna HSM", "AWS CloudHSM", "Entrust nShield"] },
      { control: "Conduct emergency audit of all OT/ICS assets with firmware integrity verification", framework: "IEC 62443 / NIST SP 800-82", products: ["Claroty", "Nozomi Networks", "Dragos"] },
    ],
    High: [
      { control: "Automate asset inventory with agent and agentless discovery", framework: "CIS Control 1.1 / NIST ID.AM-1", products: ["Axonius", "ServiceNow ITAM", "Qualys CSAM"] },
      { control: "Implement asset lifecycle management with automated decommissioning workflows", framework: "ISO 27001 A.8.3 / NIST ID.AM", products: ["ServiceNow ITAM", "Freshservice"] },
    ],
    Medium: [
      { control: "Maintain up-to-date asset inventory with classification scheme", framework: "CIS Control 1 / ISO 27001 A.8.1", products: ["Snipe-IT", "Lansweeper", "ManageEngine"] },
    ],
    Low: [
      { control: "Conduct annual asset inventory reviews with disposal documentation", framework: "ISO 27001 A.8.3", products: ["Spreadsheet-based tracking", "Snipe-IT"] },
    ],
    VeryLow: [
      { control: "Continue periodic asset reviews and maintain inventory documentation", framework: "ISO 27001 A.8", products: ["Existing ITAM tools"] },
    ],
  },
  NetworkSecurity: {
    VeryHigh: [
      { control: "Implement network micro-segmentation with zero-trust network access (ZTNA)", framework: "NIST SP 800-207 / CIS Control 12", products: ["Illumio", "Guardicore (Akamai)", "Zscaler ZPA"] },
      { control: "Deploy NDR (Network Detection and Response) with ML-based anomaly detection", framework: "NIST DE.CM / MITRE ATT&CK", products: ["Darktrace", "ExtraHop Reveal(x)", "Vectra AI"] },
      { control: "Implement encrypted east-west traffic with mutual TLS for all internal services", framework: "NIST SC-8 / CIS Control 3.10", products: ["Istio Service Mesh", "HashiCorp Consul", "Linkerd"] },
      { control: "Deploy next-gen firewall with IPS, SSL inspection, and threat intelligence feeds", framework: "CIS Control 13 / NIST SC-7", products: ["Palo Alto NGFW", "Fortinet FortiGate", "Check Point Quantum"] },
    ],
    High: [
      { control: "Strengthen network segmentation with VLAN isolation and firewall rules review", framework: "CIS Control 12.2 / NIST SC-7", products: ["Palo Alto", "Cisco ISE", "Fortinet"] },
      { control: "Deploy IDS/IPS with automated blocking and SOC integration", framework: "CIS Control 13.3 / NIST SI-4", products: ["Snort/Suricata", "Palo Alto Threat Prevention", "Cisco Firepower"] },
      { control: "Implement DNS security and filtering to block malicious domains", framework: "CIS Control 9.2 / NIST SC-20", products: ["Cisco Umbrella", "Infoblox BloxOne", "Cloudflare Gateway"] },
    ],
    Medium: [
      { control: "Review and audit firewall rules, remove unnecessary open ports", framework: "CIS Control 4.4 / NIST CM-7", products: ["Tufin", "AlgoSec", "FireMon"] },
      { control: "Implement network monitoring and NetFlow analysis", framework: "CIS Control 12.6 / NIST SI-4", products: ["SolarWinds", "PRTG", "Elastic SIEM"] },
    ],
    Low: [
      { control: "Maintain current network controls with quarterly firewall rule reviews", framework: "CIS Control 4 / NIST SC-7", products: ["Existing firewall management"] },
    ],
    VeryLow: [
      { control: "Continue periodic network reviews and maintain perimeter defenses", framework: "ISO 27001 A.13", products: ["Existing network tools"] },
    ],
  },
  ApplicationSecurity: {
    VeryHigh: [
      { control: "Implement SAST + DAST + SCA in CI/CD pipeline with automated build-breaking on critical findings", framework: "OWASP ASVS / CIS Control 16", products: ["Checkmarx", "Snyk", "Veracode", "SonarQube Enterprise"] },
      { control: "Deploy WAF with virtual patching and bot protection for all internet-facing apps", framework: "OWASP Top 10 / NIST SI-10", products: ["Cloudflare WAF", "AWS WAF + Shield", "Imperva WAF"] },
      { control: "Implement RASP (Runtime Application Self-Protection) for critical production apps", framework: "OWASP / Gartner AppSec", products: ["Contrast Security", "Dynatrace AppSec", "Imperva RASP"] },
      { control: "Conduct quarterly penetration testing by certified third-party (CREST/OSCP)", framework: "PTES / OWASP Testing Guide", products: ["Synack", "HackerOne", "Bugcrowd"] },
    ],
    High: [
      { control: "Integrate SAST/DAST in CI/CD with developer security training", framework: "OWASP SAMM / CIS Control 16.12", products: ["Snyk", "SonarQube", "Semgrep"] },
      { control: "Deploy API security gateway with rate limiting and schema validation", framework: "OWASP API Top 10 / NIST AC-4", products: ["Salt Security", "42Crunch", "Kong Gateway"] },
    ],
    Medium: [
      { control: "Implement secure coding standards with code review requirements", framework: "OWASP Secure Coding / CIS Control 16", products: ["SonarQube", "GitHub CodeQL", "ESLint security plugins"] },
      { control: "Deploy application logging with centralized monitoring", framework: "OWASP Logging / CIS Control 8", products: ["ELK Stack", "Datadog APM", "Splunk"] },
    ],
    Low: [
      { control: "Maintain secure development lifecycle practices with annual security assessments", framework: "OWASP SAMM", products: ["GitHub Dependabot", "npm audit"] },
    ],
    VeryLow: [
      { control: "Continue current application security practices with periodic reviews", framework: "ISO 27001 A.14", products: ["Existing AppSec tools"] },
    ],
  },
  EndpointSecurity: {
    VeryHigh: [
      { control: "Deploy EDR/XDR across all endpoints with 24/7 MDR (Managed Detection & Response)", framework: "CIS Control 10 / NIST DE.CM-4", products: ["CrowdStrike Falcon", "Microsoft Defender for Endpoint", "SentinelOne Singularity"] },
      { control: "Implement application whitelisting/allowlisting on all critical OT and server systems", framework: "CIS Control 2.5 / NIST CM-7(5)", products: ["CrowdStrike Falcon Device Control", "Carbon Black App Control", "Airlock Digital"] },
      { control: "Deploy endpoint privilege management (EPM) to remove local admin rights", framework: "CIS Control 5.4 / NIST AC-6(2)", products: ["CyberArk EPM", "BeyondTrust Privilege Management", "Delinea"] },
      { control: "Implement disk encryption and USB device control across all endpoints", framework: "CIS Control 10.4 / NIST SC-28", products: ["BitLocker", "FileVault", "Symantec Endpoint Encryption"] },
    ],
    High: [
      { control: "Upgrade to advanced EPP/EDR platform with behavioral analysis", framework: "CIS Control 10 / NIST SI-3", products: ["CrowdStrike", "Microsoft Defender", "SentinelOne"] },
      { control: "Implement mobile device management (MDM) with compliance policies", framework: "CIS Control 1.2 / NIST AC-19", products: ["Microsoft Intune", "Jamf Pro", "VMware Workspace ONE"] },
    ],
    Medium: [
      { control: "Ensure all endpoints have updated EDR/antimalware with centralized management", framework: "CIS Control 10.1 / NIST SI-3", products: ["Microsoft Defender", "ESET PROTECT", "Sophos"] },
      { control: "Implement automated endpoint patch management", framework: "CIS Control 7 / NIST SI-2", products: ["WSUS", "Ivanti Patch", "ManageEngine Patch Manager"] },
    ],
    Low: [
      { control: "Maintain current endpoint protection with annual policy review", framework: "CIS Control 10 / NIST SI-3", products: ["Existing EDR/AV tools"] },
    ],
    VeryLow: [
      { control: "Continue current endpoint security measures with periodic audits", framework: "ISO 27001 A.12.2", products: ["Existing endpoint tools"] },
    ],
  },
  DataProtection: {
    VeryHigh: [
      { control: "Deploy enterprise DLP solution with automated classification and policy enforcement", framework: "CIS Control 3 / NIST SC-28", products: ["Microsoft Purview DLP", "Symantec DLP", "Digital Guardian"] },
      { control: "Implement encryption at rest (AES-256) and in transit (TLS 1.3) for all sensitive data", framework: "NIST SC-28 / PCI DSS 3.4-4.1", products: ["Thales CipherTrust", "Vormetric", "Native cloud KMS"] },
      { control: "Deploy database activity monitoring (DAM) with real-time alerting on anomalous queries", framework: "CIS Control 3.14 / NIST AU-12", products: ["Imperva DAM", "IBM Guardium", "Oracle Audit Vault"] },
      { control: "Implement data masking/tokenization for non-production environments", framework: "NIST MP-6 / PCI DSS 6.4.3", products: ["Delphix", "Informatica Dynamic Data Masking", "Protegrity"] },
    ],
    High: [
      { control: "Strengthen encryption standards and implement centralized key management", framework: "NIST SC-12 / CIS Control 3.11", products: ["HashiCorp Vault", "AWS KMS", "Azure Key Vault"] },
      { control: "Deploy CASB for SaaS data protection and shadow IT visibility", framework: "Gartner CASB / NIST AC-4", products: ["Netskope", "Microsoft Defender for Cloud Apps", "Zscaler"] },
    ],
    Medium: [
      { control: "Implement backup encryption and test recovery procedures quarterly", framework: "CIS Control 11 / NIST CP-9", products: ["Veeam", "Commvault", "Rubrik"] },
      { control: "Review data retention policies and implement automated deletion", framework: "GDPR Art.17 / ISO 27001 A.8.10", products: ["Microsoft Purview Lifecycle", "Varonis"] },
    ],
    Low: [
      { control: "Maintain current data protection controls with annual review", framework: "ISO 27001 A.8.2", products: ["Existing DLP and encryption tools"] },
    ],
    VeryLow: [
      { control: "Continue current data protection practices with periodic audits", framework: "ISO 27001 A.8", products: ["Existing tools"] },
    ],
  },
  VulnerabilityManagement: {
    VeryHigh: [
      { control: "Implement continuous vulnerability scanning with risk-based prioritization (CVSS + EPSS + asset criticality)", framework: "CIS Control 7 / NIST RA-5", products: ["Tenable.io", "Qualys VMDR", "Rapid7 InsightVM"] },
      { control: "Deploy automated patch management with SLA: critical=24h, high=72h, medium=30d", framework: "CIS Control 7.4 / NIST SI-2", products: ["Ivanti Patch", "Microsoft SCCM/Intune", "Automox"] },
      { control: "Implement virtual patching via WAF/IPS for systems that cannot be immediately patched", framework: "NIST SI-2(1) / Compensating control", products: ["Palo Alto Threat Prevention", "Trend Micro Virtual Patch", "Cloudflare WAF"] },
      { control: "Deploy attack surface management (ASM) for external-facing assets", framework: "NIST ID.RA / Gartner EASM", products: ["Mandiant ASM", "CrowdStrike Falcon Surface", "Microsoft Defender EASM"] },
    ],
    High: [
      { control: "Increase scanning frequency to weekly with authenticated scans", framework: "CIS Control 7.5 / NIST RA-5", products: ["Tenable.sc", "Qualys", "Nessus Professional"] },
      { control: "Implement vulnerability intelligence feeds for exploit prediction", framework: "NIST SI-5 / MITRE ATT&CK", products: ["Recorded Future", "Mandiant Threat Intelligence", "VulnDB"] },
    ],
    Medium: [
      { control: "Conduct monthly vulnerability scans with documented remediation tracking", framework: "CIS Control 7 / NIST RA-5", products: ["OpenVAS", "Tenable.io", "Qualys Community"] },
      { control: "Implement patch management process with approval and testing workflows", framework: "CIS Control 7.3 / NIST SI-2", products: ["WSUS", "ManageEngine Patch Manager"] },
    ],
    Low: [
      { control: "Maintain quarterly vulnerability scanning with remediation tracking", framework: "CIS Control 7 / NIST RA-5", products: ["Nessus Essentials", "OpenVAS"] },
    ],
    VeryLow: [
      { control: "Continue current vulnerability management practices", framework: "ISO 27001 A.12.6", products: ["Existing scanning tools"] },
    ],
  },
  MonitoringThreatDetection: {
    VeryHigh: [
      { control: "Deploy SIEM/SOAR with 24/7 SOC (in-house or MSSP) and automated response playbooks", framework: "CIS Control 8 / NIST DE.CM", products: ["Splunk Enterprise Security", "Microsoft Sentinel", "IBM QRadar", "Palo Alto XSOAR"] },
      { control: "Implement threat intelligence platform (TIP) with IOC auto-enrichment and blocking", framework: "NIST DE.CM-8 / MITRE ATT&CK", products: ["Recorded Future", "ThreatConnect", "MISP", "Anomali"] },
      { control: "Deploy deception technology (honeypots/honeytokens) in critical network segments", framework: "MITRE D3FEND / NIST DE.DP", products: ["Attivo (SentinelOne)", "Illusive Networks", "Thinkst Canary"] },
      { control: "Implement UEBA (User and Entity Behavior Analytics) for insider threat detection", framework: "NIST AC-2(12) / Gartner UEBA", products: ["Microsoft Sentinel UEBA", "Exabeam", "Securonix"] },
    ],
    High: [
      { control: "Enhance SIEM correlation rules aligned with MITRE ATT&CK framework", framework: "MITRE ATT&CK / CIS Control 8", products: ["Sigma rules", "Splunk Security Content", "Microsoft Sentinel Analytics"] },
      { control: "Establish threat hunting capability with dedicated analyst team", framework: "NIST DE.DP / SANS Threat Hunting", products: ["Velociraptor", "CrowdStrike Falcon OverWatch", "Elastic Security"] },
    ],
    Medium: [
      { control: "Implement centralized log management with 90-day retention minimum", framework: "CIS Control 8.1 / NIST AU-4", products: ["ELK Stack", "Graylog", "Splunk Free"] },
      { control: "Deploy basic SIEM with alerting for critical security events", framework: "CIS Control 8.5 / NIST SI-4", products: ["Wazuh", "Microsoft Sentinel", "Elastic SIEM"] },
    ],
    Low: [
      { control: "Maintain current monitoring with quarterly alerting threshold review", framework: "CIS Control 8 / NIST AU-6", products: ["Existing SIEM/logging tools"] },
    ],
    VeryLow: [
      { control: "Continue current monitoring and logging practices", framework: "ISO 27001 A.12.4", products: ["Existing tools"] },
    ],
  },
  IncidentResponse: {
    VeryHigh: [
      { control: "Establish 24/7 incident response with SOAR automation and pre-approved response playbooks", framework: "NIST SP 800-61 / CIS Control 17", products: ["Palo Alto XSOAR", "Splunk SOAR", "IBM Resilient", "TheHive"] },
      { control: "Engage incident response retainer with SLA for on-site within 4 hours", framework: "NIST IR-4 / CISO best practice", products: ["CrowdStrike Services", "Mandiant IR", "Secureworks"] },
      { control: "Conduct monthly tabletop exercises simulating OT/ICS attack scenarios", framework: "NIST IR-3 / IEC 62443", products: ["AttackIQ", "SafeBreach", "Immersive Labs"] },
      { control: "Implement automated containment: network isolation, account lockout, EDR quarantine", framework: "NIST IR-4(1) / SOAR best practice", products: ["CrowdStrike RTR", "Microsoft Defender Live Response", "XSOAR"] },
    ],
    High: [
      { control: "Update incident response plan with communication templates and stakeholder matrix", framework: "NIST SP 800-61 / ISO 27001 A.16", products: ["PagerDuty", "Jira Service Management", "Opsgenie"] },
      { control: "Conduct quarterly IR drills with purple team exercises", framework: "NIST IR-3 / MITRE ATT&CK", products: ["AttackIQ", "Atomic Red Team", "Cobalt Strike (licensed)"] },
    ],
    Medium: [
      { control: "Develop incident response playbooks for top 10 attack scenarios", framework: "NIST SP 800-61 / SANS IR", products: ["Confluence/Wiki", "TheHive", "Jira"] },
      { control: "Conduct semi-annual tabletop exercises with cross-functional teams", framework: "NIST IR-3 / CIS Control 17.7", products: ["Internal workshops", "Immersive Labs"] },
    ],
    Low: [
      { control: "Review incident response plan annually and update contact lists", framework: "NIST IR-1 / ISO 27001 A.16.1", products: ["Existing IR documentation"] },
    ],
    VeryLow: [
      { control: "Maintain current IR procedures with periodic reviews", framework: "ISO 27001 A.16", products: ["Existing tools"] },
    ],
  },
  AwarenessTraining: {
    VeryHigh: [
      { control: "Deploy continuous security awareness platform with monthly phishing simulations", framework: "CIS Control 14 / NIST AT-2", products: ["KnowBe4", "Proofpoint Security Awareness", "SANS Security Awareness"] },
      { control: "Implement targeted training for high-risk roles (admins, finance, executives)", framework: "NIST AT-3 / CIS Control 14.1", products: ["KnowBe4 Role-Based", "Cofense PhishMe", "Hoxhunt"] },
      { control: "Establish security champions program across all departments", framework: "OWASP Security Champions / BSIMM", products: ["Internal program", "Security Journey", "Secure Code Warrior"] },
      { control: "Implement real-time phishing reporting button with automated triage", framework: "CIS Control 14.3 / NIST IR-6", products: ["Cofense Reporter", "KnowBe4 Phish Alert", "Microsoft Report Message"] },
    ],
    High: [
      { control: "Increase training to quarterly with gamification and tracking metrics", framework: "CIS Control 14 / NIST AT-2", products: ["KnowBe4", "Proofpoint", "Wombat (Proofpoint)"] },
      { control: "Deploy advanced phishing simulations including spear-phishing and vishing", framework: "NIST AT-2(1) / SE best practice", products: ["Cofense", "GoPhish", "Lucy Security"] },
    ],
    Medium: [
      { control: "Conduct semi-annual security awareness training with completion tracking", framework: "CIS Control 14 / NIST AT-2", products: ["KnowBe4", "Infosec IQ", "SANS Awareness"] },
    ],
    Low: [
      { control: "Maintain annual security awareness training program", framework: "ISO 27001 A.7.2.2", products: ["Existing training platform"] },
    ],
    VeryLow: [
      { control: "Continue current training program with periodic content updates", framework: "ISO 27001 A.7.2", products: ["Existing tools"] },
    ],
  },
  SupplyChain: {
    VeryHigh: [
      { control: "Implement vendor security assessment program with continuous monitoring for all critical suppliers", framework: "NIST C-SCRM / CIS Control 15", products: ["SecurityScorecard", "BitSight", "UpGuard"] },
      { control: "Deploy SCA (Software Composition Analysis) with SBOM generation for all third-party components", framework: "NIST SP 800-161 / EO 14028", products: ["Snyk", "Sonatype Nexus", "Black Duck (Synopsys)"] },
      { control: "Implement supply chain integrity verification with code signing and provenance attestation", framework: "SLSA Framework / NIST SSDF", products: ["Sigstore/Cosign", "in-toto", "Codenotary"] },
      { control: "Require SOC 2 Type II / ISO 27001 certification from all critical vendors", framework: "ISO 27001 A.15 / NIST SR-6", products: ["Vanta", "Drata", "Tugboat Logic"] },
    ],
    High: [
      { control: "Conduct vendor security risk assessments with standardized questionnaires (SIG/CAIQ)", framework: "Shared Assessments SIG / CSA CAIQ", products: ["OneTrust Vendorpedia", "ProcessUnity", "Whistic"] },
      { control: "Implement third-party access controls with least-privilege and session monitoring", framework: "CIS Control 15 / NIST AC-17", products: ["CyberArk Vendor PAM", "BeyondTrust PRA"] },
    ],
    Medium: [
      { control: "Review vendor security agreements and implement risk scoring", framework: "ISO 27001 A.15.1 / NIST SR-3", products: ["SecurityScorecard", "BitSight", "RiskRecon"] },
    ],
    Low: [
      { control: "Maintain vendor assessment program with annual reviews", framework: "ISO 27001 A.15.2", products: ["Existing vendor management tools"] },
    ],
    VeryLow: [
      { control: "Continue periodic vendor reviews and contract reviews", framework: "ISO 27001 A.15", products: ["Existing tools"] },
    ],
  },
  CloudInfrastructure: {
    VeryHigh: [
      { control: "Deploy CSPM (Cloud Security Posture Management) with automated remediation", framework: "CIS Benchmarks / NIST AC-4", products: ["Wiz", "Orca Security", "Prisma Cloud (Palo Alto)"] },
      { control: "Implement CWPP (Cloud Workload Protection) for all production workloads", framework: "Gartner CWPP / NIST SC-7", products: ["CrowdStrike Falcon Cloud", "Aqua Security", "Sysdig Secure"] },
      { control: "Deploy CASB and CNAPP for unified cloud security and governance", framework: "Gartner CNAPP / NIST AC-3", products: ["Wiz", "Netskope", "Microsoft Defender for Cloud"] },
      { control: "Implement cloud infrastructure entitlement management (CIEM)", framework: "Gartner CIEM / NIST AC-6", products: ["CrowdStrike Falcon Cloud Security", "Ermetic (Tenable)", "Wiz"] },
    ],
    High: [
      { control: "Strengthen cloud IAM with federation, SSO, and service account hygiene", framework: "CIS Cloud Benchmarks / NIST IA-8", products: ["AWS IAM Identity Center", "Azure Entra ID", "Okta"] },
      { control: "Implement cloud-native security monitoring with GuardDuty/Security Center", framework: "CIS Control 8 / NIST SI-4", products: ["AWS GuardDuty", "Azure Defender", "GCP Security Command Center"] },
    ],
    Medium: [
      { control: "Review cloud security configurations against CIS Benchmarks", framework: "CIS Cloud Benchmarks / CSA CCM", products: ["Prowler", "ScoutSuite", "CloudSploit"] },
      { control: "Implement cloud logging and monitoring with centralized SIEM integration", framework: "CIS Control 8 / NIST AU-6", products: ["CloudTrail", "Azure Monitor", "GCP Cloud Logging"] },
    ],
    Low: [
      { control: "Maintain current cloud security controls with annual configuration review", framework: "CIS Benchmarks / ISO 27017", products: ["Cloud-native security tools"] },
    ],
    VeryLow: [
      { control: "Continue current cloud security practices with periodic audits", framework: "ISO 27017 / 27018", products: ["Existing tools"] },
    ],
  },
  AIInfrastructure: {
    VeryHigh: [
      { control: "Implement AI security framework with model access controls, input validation, and output filtering", framework: "NIST AI RMF / OWASP LLM Top 10", products: ["Robust Intelligence", "HiddenLayer", "Protect AI"] },
      { control: "Deploy adversarial ML testing and red teaming for all production AI/ML models", framework: "MITRE ATLAS / NIST AI 100-2", products: ["Microsoft Counterfit", "Adversa AI", "Garak (LLM)"] },
      { control: "Implement model versioning, integrity verification, and supply chain security for ML pipelines", framework: "NIST AI RMF / MLSecOps", products: ["MLflow", "DVC", "Weights & Biases", "Seldon"] },
      { control: "Establish AI governance board with ethics review and bias testing requirements", framework: "EU AI Act / NIST AI RMF GV", products: ["Credo AI", "IBM AI Fairness 360", "Fiddler AI"] },
    ],
    High: [
      { control: "Implement AI model monitoring with drift detection and anomaly alerting", framework: "NIST AI RMF MG / MLOps best practice", products: ["Arize AI", "WhyLabs", "Evidently AI", "Fiddler"] },
      { control: "Deploy prompt injection protection and LLM firewalls", framework: "OWASP LLM Top 10 / LLM Security", products: ["Lakera Guard", "Rebuff", "LLM Guard"] },
    ],
    Medium: [
      { control: "Review AI data pipeline security and implement access controls on training data", framework: "NIST AI RMF MP / CIS Control 3", products: ["DataRobot", "Tecton", "Native cloud IAM"] },
      { control: "Implement model documentation with audit trails (model cards)", framework: "Google Model Cards / NIST AI RMF", products: ["MLflow", "Hugging Face Model Cards"] },
    ],
    Low: [
      { control: "Maintain AI security documentation and review policies periodically", framework: "NIST AI RMF / ISO 42001", products: ["Existing documentation tools"] },
    ],
    VeryLow: [
      { control: "Monitor AI security best practices and emerging standards", framework: "NIST AI RMF / EU AI Act", products: ["Industry newsletters and advisories"] },
    ],
  },
};
