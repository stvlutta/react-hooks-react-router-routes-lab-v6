import { afterEach, vi } from 'vitest'
import { cleanup } from '@testing-library/react'
import '@testing-library/jest-dom/vitest'
import 'whatwg-fetch';
import {Blob} from 'node:buffer';

// Mock environment
if (!import.meta.env) {
  import.meta.env = { MODE: 'test' };
} else {
  import.meta.env.MODE = 'test';
}

// Mock fetch
vi.stubGlobal('fetch', vi.fn());

afterEach(() => {
    cleanup();
    vi.resetAllMocks();
})
