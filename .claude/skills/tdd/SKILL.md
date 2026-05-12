# TDD — Red-Green-Refactor

Source: mattpocock/skills — tdd

## When to use
When adding new features, API endpoints, or agent logic to this project.

## Workflow

### Red — Write failing test first
Write the smallest test that describes the desired behaviour.
Run it. Confirm it fails for the right reason.

For API routes:
```typescript
// e2e/api.spec.ts
test('POST /api/quote returns 200 with id', async ({ request }) => {
  const res = await request.post('/api/quote', {
    data: { name: 'Test', email: 'test@example.com', phone: '555-1234',
            propertyType: 'commercial', city: 'Tacoma',
            service: 'graffiti', surface: 'concrete', urgency: 'standard' }
  });
  expect(res.ok()).toBeTruthy();
  const body = await res.json();
  expect(typeof body.id).toBe('string');
});
```

### Green — Write minimum code to pass
Implement only what makes the test pass. No extras.

### Refactor — Clean without breaking
Now improve code quality, extract helpers, improve types.
Test must still pass after every change.

### Repeat
Each new behaviour = new failing test first.

## Rules
- One test per behaviour
- Tests live in `e2e/` (integration) or `src/lib/*.test.ts` (unit)
- Never write tests that test implementation details — test behaviour
- `npm run test:e2e` must pass before any commit
