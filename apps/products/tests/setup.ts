// Example: global mock or beforeEach
import { beforeEach, vi } from 'vitest';

beforeEach(() => {
  vi.restoreAllMocks(); // clear mocks automatically
});

// Add global test utils to globalThis if needed
globalThis.sayHello = () => '👋 from global setup';
