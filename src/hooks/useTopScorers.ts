import { useQuery } from '@tanstack/react-query';
import { footballDataApi } from '../api/footballData.ts';
export const TOP_SCORERS_QUERY_KEY = ['wc2026', 'top-scorers'] as const;
export function useTopScorers() {
return useQuery({
    queryKey: TOP_SCORERS_QUERY_KEY,
    queryFn: footballDataApi.getTopScorers,
    staleTime: 10 * 60 * 1000,
});
}
