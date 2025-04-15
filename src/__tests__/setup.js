import { afterEach, beforeEach, vi } from 'vitest'
import { cleanup } from '@testing-library/react'
import '@testing-library/jest-dom/vitest'
import 'whatwg-fetch';
import {Blob} from 'node:buffer';

// Ensure mock environment is always set properly
global.testEnv = true;

// Make sure import.meta.env exists and is properly set
if (typeof import.meta === 'undefined') {
  global.import = { meta: { env: { MODE: 'test' } } };
} else if (!import.meta.env) {
  import.meta.env = { MODE: 'test' };
} else {
  import.meta.env.MODE = 'test';
}

// Mock fetch with more robust implementation
const mockFetch = vi.fn().mockImplementation(() => 
  Promise.resolve({
    json: () => Promise.resolve({
      // Mock data for various endpoints
      id: 1, 
      title: "Doctor Strange", 
      time: 115, 
      genres: ["Action", "Adventure", "Fantasy"]
    })
  })
);

vi.stubGlobal('fetch', mockFetch);

beforeEach(() => {
  // Reset mocks before each test
  vi.resetAllMocks();
});

afterEach(() => {
  cleanup();
})
