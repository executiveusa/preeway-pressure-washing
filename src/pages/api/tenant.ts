import type { APIRoute } from 'astro';
import type { TenantConfig } from '../../lib/types';

export const prerender = false;

const TENANT_CONFIG: TenantConfig = {
  id: 'preeway-pressure-washing',
  name: 'Preeway Pressure Washing',
  legal_name: 'Preeway Pressure Washing SPC',
  type: 'spc',
  service_area: [
    'Seattle', 'Tacoma', 'Bellevue', 'Mercer Island', 'Kirkland', 'Redmond',
    'Ballard', 'Capitol Hill', 'Fremont', 'Queen Anne', 'West Seattle',
    'Georgetown', 'SODO', 'Pioneer Square', 'North Tacoma', 'Proctor',
    'Stadium District', 'Gig Harbor', 'University Place',
  ],
  services: [
    'Graffiti Removal',
    'Mural Recovery',
    'Commercial Pressure Washing',
    'Residential Exterior Cleaning',
    'Driveways, Sidewalks & Patios',
    'Storefront & Dumpster Pad Cleanup',
    'HOA & Property Manager Maintenance',
    'Anti-Graffiti Coating & Prevention',
  ],
  contact: {
    phone: '+12535550100',
    email: 'hello@preeway.com',
    address: 'Tacoma, WA 98401',
  },
  social_purpose: {
    spc: true,
    nonprofit: false,
    tax_deductible_donations: false,
  },
  features: {
    i18n: true,
    quote_form: true,
    sponsor_tiers: true,
    artist_network: true,
    scout_agent: true,
  },
};

export const GET: APIRoute = async () => {
  return new Response(JSON.stringify(TENANT_CONFIG), {
    status: 200,
    headers: {
      'Content-Type': 'application/json',
      'Cache-Control': 'public, max-age=3600',
    },
  });
};
