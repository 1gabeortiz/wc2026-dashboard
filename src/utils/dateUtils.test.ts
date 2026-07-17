import { describe, expect, it } from 'vitest';
import { formatLocalKickoff } from './dateUtils';

describe('dateUtils', () => {
  it('returns a formatted local date string', () => {
    const value = formatLocalKickoff('2026-07-01T18:00:00Z');
    expect(typeof value).toBe('string');
    expect(value.length).toBeGreaterThan(0);
  });
});
