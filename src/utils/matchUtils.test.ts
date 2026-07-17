import { describe, expect, it } from 'vitest';
import {
  getMatchStatusLabel,
  isMatchLive,
  isMatchResult,
  isMatchUpcoming,
} from './matchUtils';

describe('matchUtils', () => {
  it('detects live statuses', () => {
    expect(isMatchLive('IN_PLAY')).toBe(true);
    expect(isMatchLive('PAUSED')).toBe(true);
    expect(isMatchLive('EXTRA_TIME')).toBe(true);
    expect(isMatchLive('PENALTY_SHOOTOUT')).toBe(true);
    expect(isMatchLive('FINISHED')).toBe(false);
  });

  it('detects result statuses', () => {
    expect(isMatchResult('FINISHED')).toBe(true);
    expect(isMatchResult('SCHEDULED')).toBe(false);
  });

  it('detects upcoming statuses', () => {
    expect(isMatchUpcoming('SCHEDULED')).toBe(true);
    expect(isMatchUpcoming('TIMED')).toBe(true);
    expect(isMatchUpcoming('IN_PLAY')).toBe(false);
  });

  it('formats status labels', () => {
    expect(getMatchStatusLabel('PAUSED')).toBe('HT');
    expect(getMatchStatusLabel('EXTRA_TIME')).toBe('ET');
    expect(getMatchStatusLabel('PENALTY_SHOOTOUT')).toBe('PENS');
    expect(getMatchStatusLabel('FINISHED')).toBe('FT');
  });
});
