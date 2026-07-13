import { useQuery } from '@tanstack/react-query';
import { footballDataApi } from '../api/footballData.ts';
import type { MatchStage, MatchStatus } from '../api/types';
interface UseMatchesOptions {
status?: MatchStatus;
stage?: MatchStage;
refetchInterval?: number | false;
}
export function useMatches(options: UseMatchesOptions = {}) {
const { status, stage, refetchInterval = false } = options;
return useQuery({
    queryKey: ['wc2026', 'matches', { status, stage }],
    queryFn: () => footballDataApi.getMatches({ status, stage }),
    staleTime: status === 'IN_PLAY' ? 30 * 1000 : 2 * 60 * 1000,
    refetchInterval,
});
}