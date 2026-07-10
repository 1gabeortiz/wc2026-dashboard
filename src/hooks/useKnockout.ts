import { useQueries } from '@tanstack/react-query';
import { footballDataApi } from '../api/footballData';
import type { Match, MatchStage } from '../api/types';
type KnockoutStage = Exclude<MatchStage, 'GROUP_STAGE'>;
const KNOCKOUT_STAGES: KnockoutStage[] = [
  'LAST_32',
  'LAST_16',
  'QUARTER_FINALS',
  'SEMI_FINALS',
  'THIRD_PLACE',
  'FINAL',
];
export function useKnockout() {
  const stageQueries = useQueries({
    queries: KNOCKOUT_STAGES.map((stage) => ({
      queryKey: ['wc2026', 'knockout', stage],
      queryFn: () => footballDataApi.getMatches({ stage }),
      staleTime: 2 * 60 * 1000,
    })),
  });
  const isLoading = stageQueries.some((q) => q.isLoading);
  const isError = stageQueries.some((q) => q.isError);
  const error = stageQueries.find((q) => q.error)?.error;
  const matchesByStage = KNOCKOUT_STAGES.reduce<Record<KnockoutStage, Match[]>>(
    (acc, stage, index) => {
      acc[stage] = stageQueries[index].data?.matches ?? [];
      return acc;
    },
    {
      LAST_32: [],
      LAST_16: [],
      QUARTER_FINALS: [],
      SEMI_FINALS: [],
      THIRD_PLACE: [],
      FINAL: [],
    }
  );
  return {
    isLoading,
    isError,
    error,
    matchesByStage,
    stageQueries,
  };
}