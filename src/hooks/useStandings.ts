import { useQuery } from '@tanstack/react-query';
import { footballDataApi } from '../api/footballData';
export const STANDINGS_QUERY_KEY = ['wc2026', 'standings'] as const;
export function useStandings() {
return useQuery({
    queryKey: STANDINGS_QUERY_KEY,
    queryFn: footballDataApi.getStandings,
    staleTime: 5 * 60 * 1000,
});
}
