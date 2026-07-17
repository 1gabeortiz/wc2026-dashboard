import { beforeEach, afterEach, describe, expect, it, vi } from 'vitest';

describe('footballData API service', () => {
  beforeEach(() => {
    vi.resetModules();
    vi.stubEnv('VITE_FD_BASE_URL', '/api');
    vi.stubGlobal('fetch', vi.fn());
  });

  afterEach(() => {
    vi.unstubAllEnvs();
    vi.unstubAllGlobals();
    vi.clearAllMocks();
  });

  it('requests standings endpoint', async () => {
    const mockResponse = { standings: [] };

    vi.mocked(fetch).mockResolvedValue({
      ok: true,
      json: async () => mockResponse,
    } as Response);

    const { footballDataApi } = await import('./footballData');
    const data = await footballDataApi.getStandings();

    expect(fetch).toHaveBeenCalledWith('/api/competitions/WC/standings');
    expect(data).toEqual(mockResponse);
  });

  it('throws when API responds non-OK', async () => {
    vi.mocked(fetch).mockResolvedValue({
      ok: false,
      status: 429,
      statusText: 'Too Many Requests',
    } as Response);

    const { footballDataApi } = await import('./footballData');

    await expect(footballDataApi.getTopScorers()).rejects.toThrow(
      /football-data\.org API error: 429 Too Many Requests/
    );
  });
});
