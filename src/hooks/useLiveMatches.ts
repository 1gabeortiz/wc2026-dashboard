import { useQuery } from '@tanstack/react-query';
import { footballDataApi } from '../api/footballData';
export function useLiveMatches() {
return useQuery({
    queryKey: ['wc2026', 'matches', 'live'],
    queryFn: () => footballDataApi.getMatches({ status: 'IN_PLAY' }),
    staleTime: 30 * 1000,
    refetchInterval: (query) => {
    const liveCount = query.state.data?.matches?.length ?? 0;
    return liveCount > 0 ? 30 * 1000 : false;
    },
});
}