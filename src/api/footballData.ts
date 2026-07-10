import type {
  MatchStage,
  MatchStatus,
  MatchesResponse,
  ScorersResponse,
  StandingsResponse,
} from './types';
const BASE_URL = import.meta.env.VITE_FD_BASE_URL as string | undefined;
const API_KEY = import.meta.env.VITE_FD_API_KEY as string | undefined;
function assertEnv(): { baseUrl: string; apiKey: string } {
  if (!BASE_URL) {
    throw new Error('Missing VITE_FD_BASE_URL in environment variables.');
  }
  if (!API_KEY) {
    throw new Error('Missing VITE_FD_API_KEY in environment variables.');
  }
  return { baseUrl: BASE_URL, apiKey: API_KEY };
}
async function get<T>(path: string): Promise<T> {
  const { baseUrl, apiKey } = assertEnv();
  const response = await fetch(`${baseUrl}${path}`, {
    headers: {
      'X-Auth-Token': apiKey,
    },
  });
  if (!response.ok) {
    throw new Error(
      `football-data.org API error: ${response.status} ${response.statusText} 
(${path})`
    );
  }
  return (await response.json()) as T;
}
export const footballDataApi = {
  getStandings: () => get<StandingsResponse>('/competitions/WC/standings'),
  getMatches: (params?: { status?: MatchStatus; stage?: MatchStage }) => {
    const query = new URLSearchParams();
    if (params?.status) query.set('status', params.status);
    if (params?.stage) query.set('stage', params.stage);
    const queryString = query.toString();
    const endpoint = queryString
      ? `/competitions/WC/matches?${queryString}`
      : '/competitions/WC/matches';
    return get<MatchesResponse>(endpoint);
  },
  getTopScorers: () => get<ScorersResponse>('/competitions/WC/scorers'),
};