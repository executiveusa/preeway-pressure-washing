// Visitor and request classification types for Preeway Scout / agent

export type VisitorType =
  | 'property_owner'
  | 'storefront_owner'
  | 'property_manager'
  | 'artist'
  | 'sponsor'
  | 'civic_partner';

export type RequestType =
  | 'graffiti'
  | 'mural_recovery'
  | 'pressure_washing'
  | 'sponsorship'
  | 'partnership';

export type HumanReviewFlag =
  | 'final_price'
  | 'legal_statement'
  | 'grant_submission'
  | 'refund'
  | 'public_commitment';

export interface ClassificationResult {
  visitor_type: VisitorType;
  request_type: RequestType | null;
  next_step: string;
  human_review_required: boolean;
  human_review_flags: HumanReviewFlag[];
  suggested_form: 'quote' | 'sponsor' | 'artist_partner' | 'contact';
  urgency_level: 'low' | 'medium' | 'high' | 'emergency';
}

export interface QuoteSubmission {
  name: string;
  phone: string;
  email: string;
  property_type: 'residential' | 'commercial' | 'hoa' | 'civic';
  city: string;
  service: 'graffiti' | 'mural' | 'pressure' | 'storefront' | 'driveway' | 'coating' | 'other';
  surface: 'concrete' | 'brick' | 'siding' | 'wood' | 'metal' | 'stone' | 'other';
  urgency: 'emergency' | 'urgent' | 'standard' | 'planning';
  message?: string;
}

export interface QuoteResponse {
  success: boolean;
  id: string;
  message?: string;
}

export interface AgentRequest {
  visitor_type: VisitorType;
  request_type?: RequestType;
  message?: string;
}

export interface AgentResponse {
  classification: ClassificationResult;
  message: string;
  disclaimer: string;
}

export interface TenantConfig {
  id: string;
  name: string;
  legal_name: string;
  type: string;
  service_area: string[];
  services: string[];
  contact: {
    phone: string;
    email: string;
    address: string;
  };
  social_purpose: {
    spc: boolean;
    nonprofit: boolean;
    tax_deductible_donations: boolean;
  };
  features: {
    i18n: boolean;
    quote_form: boolean;
    sponsor_tiers: boolean;
    artist_network: boolean;
    scout_agent: boolean;
  };
}

export interface ImpactStat {
  label: string;
  value: number | string;
  suffix?: string;
}

export interface ServiceCard {
  name: string;
  desc: string;
}

export interface SponsorTier {
  name: string;
  price: string;
  desc: string;
  includes: string[];
}

export interface FAQItem {
  q: string;
  a: string;
}

export interface PainPoint {
  title: string;
  desc: string;
}
