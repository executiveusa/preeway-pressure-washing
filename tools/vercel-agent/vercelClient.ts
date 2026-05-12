import 'dotenv/config';

const VERCEL_TOKEN = process.env.VERCEL_TOKEN;
const VERCEL_PROJECT_ID = process.env.VERCEL_PROJECT_ID;
const VERCEL_TEAM_ID = process.env.VERCEL_TEAM_ID;
const VERCEL_API = 'https://api.vercel.com';

export interface DeploymentResponse {
  id: string;
  url: string;
  state?: 'BUILDING' | 'READY' | 'ERROR' | 'CANCELED';
  readyState?: 'BUILDING' | 'READY' | 'ERROR' | 'CANCELED';
  meta?: Record<string, string>;
}

async function vercelFetch(endpoint: string, options: RequestInit = {}): Promise<unknown> {
  if (!VERCEL_TOKEN) throw new Error('VERCEL_TOKEN not set in .env');

  const teamQuery = VERCEL_TEAM_ID ? `?teamId=${VERCEL_TEAM_ID}` : '';
  const url = `${VERCEL_API}${endpoint}${endpoint.includes('?') ? '&' : '?'}${VERCEL_TEAM_ID ? `teamId=${VERCEL_TEAM_ID}` : ''}`;

  const response = await fetch(url, {
    ...options,
    headers: {
      Authorization: `Bearer ${VERCEL_TOKEN}`,
      'Content-Type': 'application/json',
      ...options.headers,
    },
  });

  if (!response.ok) {
    const error = await response.text();
    throw new Error(`Vercel API ${response.status}: ${error}`);
  }

  return response.json();
}

export async function listDeployments(limit = 5): Promise<DeploymentResponse[]> {
  if (!VERCEL_PROJECT_ID) throw new Error('VERCEL_PROJECT_ID not set in .env');
  const data = await vercelFetch(`/v9/projects/${VERCEL_PROJECT_ID}/deployments?limit=${limit}`) as { deployments: DeploymentResponse[] };
  return data.deployments ?? [];
}

export async function getDeploymentStatus(deploymentId: string): Promise<DeploymentResponse> {
  return vercelFetch(`/v13/deployments/${deploymentId}`) as Promise<DeploymentResponse>;
}

export async function getDeploymentLogs(deploymentId: string): Promise<string[]> {
  try {
    const data = await vercelFetch(`/v2/deployments/${deploymentId}/events`) as Array<{ text?: string }>;
    return data.map(e => e.text ?? '').filter(Boolean);
  } catch {
    return [];
  }
}
