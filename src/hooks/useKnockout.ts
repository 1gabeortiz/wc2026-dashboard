import { useQuery } from "@tanstack/react-query";
import { footballDataApi } from "../api/footballData";
import type { Match, MatchStage } from "../api/types";

type KnockoutStage = Exclude<MatchStage, "GROUP_STAGE">;

const KNOCKOUT_STAGES: KnockoutStage[] = [
  "LAST_32",
  "LAST_16",
  "QUARTER_FINALS",
  "SEMI_FINALS",
  "THIRD_PLACE",
  "FINAL",
];

export function useKnockout() {
  const allMatchesQuery = useQuery({
    queryKey: ["wc2026", "matches", "knockout"],
    queryFn: () => footballDataApi.getMatches(),
    staleTime: 2 * 60 * 1000,
  });

  const allMatches = allMatchesQuery.data?.matches ?? [];

  const matchesByStage = KNOCKOUT_STAGES.reduce<Record<KnockoutStage, Match[]>>(
    (acc, stage) => {
      acc[stage] = allMatches.filter((match) => match.stage === stage);
      return acc;
    },
    {
      LAST_32: [],
      LAST_16: [],
      QUARTER_FINALS: [],
      SEMI_FINALS: [],
      THIRD_PLACE: [],
      FINAL: [],
    },
  );
  return {
    isLoading: allMatchesQuery.isLoading,
    isError: allMatchesQuery.isError,
    error: allMatchesQuery.error,
    matchesByStage,
  };
}
