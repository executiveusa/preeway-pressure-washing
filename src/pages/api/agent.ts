import type { APIRoute } from 'astro';
import type { AgentRequest, AgentResponse } from '../../lib/types';
import { buildAgentResponse } from '../../lib/agent';

export const prerender = false;

export const POST: APIRoute = async ({ request }) => {
  try {
    const body = await request.json() as Partial<AgentRequest>;

    if (!body.visitor_type) {
      return new Response(
        JSON.stringify({ error: 'visitor_type is required' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    const validVisitors = [
      'property_owner', 'storefront_owner', 'property_manager',
      'artist', 'sponsor', 'civic_partner',
    ];

    if (!validVisitors.includes(body.visitor_type)) {
      return new Response(
        JSON.stringify({ error: `Invalid visitor_type. Must be one of: ${validVisitors.join(', ')}` }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    const agentReq: AgentRequest = {
      visitor_type: body.visitor_type,
      request_type: body.request_type,
      message: body.message,
    };

    const response: AgentResponse = buildAgentResponse(agentReq);

    console.log('[PREEWAY][AGENT_REQUEST]', JSON.stringify({
      timestamp: new Date().toISOString(),
      ...agentReq,
      result: response.classification,
    }));

    return new Response(JSON.stringify(response), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch {
    return new Response(
      JSON.stringify({ error: 'Invalid request body' }),
      { status: 400, headers: { 'Content-Type': 'application/json' } }
    );
  }
};
