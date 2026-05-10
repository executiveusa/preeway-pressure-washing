import type {
  VisitorType,
  RequestType,
  HumanReviewFlag,
  ClassificationResult,
  AgentRequest,
  AgentResponse,
} from './types';

const HUMAN_REVIEW_ALWAYS: Record<string, HumanReviewFlag[]> = {
  final_price: ['final_price'],
  legal_statement: ['legal_statement'],
  grant_submission: ['grant_submission'],
  refund: ['refund'],
  public_commitment: ['public_commitment'],
};

function getNextStep(visitor: VisitorType, request: RequestType | null): string {
  if (visitor === 'property_owner') {
    if (request === 'graffiti') {
      return 'Submit a quote request with your surface type and urgency. Most graffiti removal quotes are returned within 2 hours during business hours.';
    }
    if (request === 'pressure_washing') {
      return 'Submit a residential or commercial pressure washing quote. Include your surface type and the scope of the area.';
    }
    return 'Submit a quote request. We\'ll contact you within 2 hours to confirm scope and pricing.';
  }

  if (visitor === 'storefront_owner') {
    return 'Storefront owners may qualify for our small business support rate. Fill out the quote form and note your business type — we\'ll check eligibility for sponsored or discounted service.';
  }

  if (visitor === 'property_manager') {
    return 'Contact us about contracted recurring service. We provide before/after documentation and invoice formats for property management reporting requirements.';
  }

  if (visitor === 'artist') {
    if (request === 'mural_recovery') {
      return 'Join our Mural Recovery Network. We\'ll register your public murals in our response database and notify you when they are tagged.';
    }
    return 'Register as an artist partner to receive first-response notifications, documentation, and access to our sponsored cleanup fund.';
  }

  if (visitor === 'sponsor') {
    if (request === 'sponsorship') {
      return 'Review our five sponsorship tiers and contact us to match you with the right opportunity. We follow up within 24 hours.';
    }
    return 'Explore our sponsorship tiers — from single storefronts ($150–$400) to full block cleanups ($500–$1,500). All sponsorships include documentation and optional recognition.';
  }

  if (visitor === 'civic_partner') {
    return 'We partner with civic organizations, BIDs, and neighborhood coalitions. Contact us to discuss bulk cleanups, grant documentation, and co-branded impact reporting.';
  }

  return 'Please fill out our quote form with your details and we will be in touch within 2 hours during business hours.';
}

function getSuggestedForm(visitor: VisitorType): ClassificationResult['suggested_form'] {
  if (visitor === 'sponsor' || visitor === 'civic_partner') return 'sponsor';
  if (visitor === 'artist') return 'artist_partner';
  if (visitor === 'property_manager') return 'quote';
  return 'quote';
}

function getUrgencyLevel(
  visitor: VisitorType,
  request: RequestType | null
): ClassificationResult['urgency_level'] {
  if (request === 'graffiti' && (visitor === 'storefront_owner' || visitor === 'property_owner')) {
    return 'high';
  }
  if (request === 'mural_recovery') return 'medium';
  if (request === 'sponsorship' || request === 'partnership') return 'low';
  return 'medium';
}

function detectHumanReviewFlags(message: string | undefined): HumanReviewFlag[] {
  const flags: HumanReviewFlag[] = [];
  if (!message) return flags;
  const lower = message.toLowerCase();
  if (lower.includes('price') || lower.includes('cost') || lower.includes('quote')) {
    flags.push('final_price');
  }
  if (lower.includes('contract') || lower.includes('legal') || lower.includes('agreement')) {
    flags.push('legal_statement');
  }
  if (lower.includes('grant') || lower.includes('application') || lower.includes('submit')) {
    flags.push('grant_submission');
  }
  if (lower.includes('refund') || lower.includes('cancel') || lower.includes('dispute')) {
    flags.push('refund');
  }
  if (lower.includes('promise') || lower.includes('guarantee') || lower.includes('commit')) {
    flags.push('public_commitment');
  }
  return flags;
}

export function classifyRequest(req: AgentRequest): ClassificationResult {
  const flags = detectHumanReviewFlags(req.message);
  const nextStep = getNextStep(req.visitor_type, req.request_type ?? null);
  const suggestedForm = getSuggestedForm(req.visitor_type);
  const urgencyLevel = getUrgencyLevel(req.visitor_type, req.request_type ?? null);

  return {
    visitor_type: req.visitor_type,
    request_type: req.request_type ?? null,
    next_step: nextStep,
    human_review_required: flags.length > 0,
    human_review_flags: flags,
    suggested_form: suggestedForm,
    urgency_level: urgencyLevel,
  };
}

export function buildAgentResponse(req: AgentRequest): AgentResponse {
  const classification = classifyRequest(req);

  return {
    classification,
    message: classification.next_step,
    disclaimer:
      'Scout helps you classify your job. Final pricing, legal commitments, and grant submissions always require human review. This response is for routing purposes only and does not constitute a quote, contract, or legal commitment.',
  };
}

export const HUMAN_REVIEW_TRIGGERS = Object.keys(HUMAN_REVIEW_ALWAYS) as HumanReviewFlag[];
