import type { APIRoute } from 'astro';
import type { QuoteSubmission, QuoteResponse } from '../../lib/types';

export const prerender = false;

export const POST: APIRoute = async ({ request }) => {
  try {
    const body = await request.json() as Partial<QuoteSubmission>;

    // Basic validation
    const required: (keyof QuoteSubmission)[] = ['name', 'phone', 'email', 'property_type', 'city', 'service'];
    const missing = required.filter((field) => !body[field]);

    if (missing.length > 0) {
      return new Response(
        JSON.stringify({ success: false, error: `Missing required fields: ${missing.join(', ')}` }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    const id = crypto.randomUUID();
    const timestamp = new Date().toISOString();

    // Log submission (TODO: persist to D1/KV when configured)
    console.log('[PREEWAY][QUOTE_SUBMISSION]', JSON.stringify({
      id,
      timestamp,
      ...body,
    }));

    const response: QuoteResponse = { success: true, id };

    return new Response(JSON.stringify(response), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
        'X-Request-Id': id,
      },
    });
  } catch {
    return new Response(
      JSON.stringify({ success: false, error: 'Invalid request body' }),
      { status: 400, headers: { 'Content-Type': 'application/json' } }
    );
  }
};
