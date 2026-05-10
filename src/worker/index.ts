// Cloudflare Worker entry point stub
// The Astro Cloudflare adapter generates dist/_worker.js for production.
// Add custom edge middleware, auth, or caching logic here.

export interface Env {
  // QUOTES_KV: KVNamespace;  // add when KV binding is configured
  // DB: D1Database;           // add when D1 binding is configured
  // PHOTOS_R2: R2Bucket;      // add when R2 binding is configured
}

export interface WorkerContext {
  waitUntil(promise: Promise<unknown>): void;
  passThroughOnException(): void;
}

export const workerStub = {
  async fetch(_request: Request, _env: Env, _ctx: WorkerContext): Promise<Response> {
    return new Response('Preeway Worker — use Astro build for production.', {
      status: 200,
      headers: { 'Content-Type': 'text/plain' },
    });
  },
};
