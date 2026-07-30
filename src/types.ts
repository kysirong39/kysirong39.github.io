export type NodeType = 
  | 'Customer' 
  | 'Account' 
  | 'Device' 
  | 'PhoneNumber' 
  | 'Email' 
  | 'Address' 
  | 'IPAddress' 
  | 'Company';

export type EdgeType = 
  | 'HAS_PHONE' 
  | 'HAS_EMAIL' 
  | 'HAS_ADDRESS' 
  | 'HAS_DEVICE' 
  | 'HAS_ACCOUNT' 
  | 'TRANSFERRED_TO' 
  | 'REGISTERED_WITH_IP' 
  | 'CO_APPLICANT' 
  | 'DIRECTOR_OF'
  | 'MORTGAGED_BY';

export interface GraphNode {
  id: string;
  label: NodeType;
  name: string;
  subText?: string;
  riskScore: number; // 0 - 100
  isFraudRingMember?: boolean;
  ringId?: string;
  properties: Record<string, string | number | boolean>;
  x?: number;
  y?: number;
  vx?: number;
  vy?: number;
}

export interface GraphEdge {
  id: string;
  source: string;
  target: string;
  label: EdgeType;
  properties: Record<string, string | number | boolean>;
  isSuspicious?: boolean;
}

export interface FraudRingScenario {
  id: string;
  title: string;
  titleEn: string;
  category: 'Synthetic Identity' | 'Money Mule Network' | 'Loan Stacking & Shell Co';
  riskLevel: 'CRITICAL' | 'HIGH' | 'MEDIUM';
  description: string;
  impactEstimateVND: string;
  nodesCount: number;
  edgesCount: number;
  nodes: GraphNode[];
  edges: GraphEdge[];
  keyDetectionRule: string;
  suggestedAction: string;
}

export interface SchemaNodeDef {
  type: NodeType;
  color: string;
  iconName: string;
  description: string;
  properties: { name: string; type: string; example: string; description: string }[];
}

export interface SchemaEdgeDef {
  type: EdgeType;
  sourceTypes: NodeType[];
  targetTypes: NodeType[];
  description: string;
  properties: { name: string; type: string; example: string }[];
}

export interface CypherQueryItem {
  id: string;
  title: string;
  category: 'Pattern Matching' | 'Graph Analytics' | 'Real-time Alert' | 'Centrality & Community';
  description: string;
  cypher: string;
  businessPurpose: string;
  executionTimeAvg: string;
}

export interface EarlyWarningAlert {
  id: string;
  timestamp: string;
  ringId: string;
  ringName: string;
  severity: 'CRITICAL' | 'HIGH' | 'MEDIUM';
  triggeredRule: string;
  impactAmount: number;
  matchedNodes: string[];
  status: 'NEW' | 'INVESTIGATING' | 'ACTIONED' | 'FALSE_POSITIVE';
  rootCause: string;
  suggestedAction: string;
}

export interface ComparisonItem {
  criteria: string;
  traditionalRules: string;
  knowledgeGraph: string;
  businessImpact: string;
}
