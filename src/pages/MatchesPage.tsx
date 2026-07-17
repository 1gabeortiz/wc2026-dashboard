import { useMemo, useState } from 'react';
import type { Match } from '../api/types';
import LiveFeed from '../components/matches/LiveFeed';
import MatchList from '../components/matches/MatchList';
import ErrorCard from '../components/ui/ErrorCard';
import { MatchListSkeleton } from '../components/ui/LoadingSkeletons';
import { useMatches } from '../hooks/useMatches';
import { isMatchLive, isMatchResult, isMatchUpcoming } from '../utils/matchUtils';

type MatchFilter = 'all' | 'live' | 'results' | 'upcoming';
type SortOrder = 'desc' | 'asc';

const FILTERS: { key: MatchFilter; label: string }[] = [
  { key: 'all', label: 'All' },
  { key: 'live', label: 'Live' },
  { key: 'results', label: 'Results' },
  { key: 'upcoming', label: 'Upcoming' },
];

function sortByKickoff(matches: Match[], order: SortOrder) {
  const sorted = [...matches].sort(
    (a, b) => new Date(a.utcDate).getTime() - new Date(b.utcDate).getTime()
  );
  return order === 'desc' ? sorted.reverse() : sorted;
}

export default function MatchesPage() {
  const [activeFilter, setActiveFilter] = useState<MatchFilter>('all');
  const [sortOrder, setSortOrder] = useState<SortOrder>('asc');

  const { data, isLoading, isError, error } = useMatches({
    refetchInterval: activeFilter === 'live' ? 30 * 1000 : false,
  });

  const allMatches = useMemo(() => data?.matches ?? [], [data?.matches]);
  const liveMatches = useMemo(
    () => sortByKickoff(allMatches.filter((m) => isMatchLive(m.status)), 'asc'),
    [allMatches]
  );

  const filteredMatches = useMemo(() => {
    if (activeFilter === 'live') return allMatches.filter((m) => isMatchLive(m.status));
    if (activeFilter === 'results') return allMatches.filter((m) => isMatchResult(m.status));
    if (activeFilter === 'upcoming') return allMatches.filter((m) => isMatchUpcoming(m.status));
    return allMatches;
  }, [activeFilter, allMatches]);

  const sortedMatches = useMemo(
    () => sortByKickoff(filteredMatches, sortOrder),
    [filteredMatches, sortOrder]
  );

  return (
    <section className="space-y-4">
      <div>
        <p className="panel-title">Matches</p>
        <h2 className="mt-2 text-xl font-bold text-text-primary md:text-2xl">
          World Cup Match Center
        </h2>
      </div>

      {liveMatches.length > 0 && <LiveFeed matches={liveMatches} />}

      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex flex-wrap gap-2">
          {FILTERS.map((filter) => {
            const isActive = activeFilter === filter.key;
            return (
              <button
                key={filter.key}
                type="button"
                onClick={() => setActiveFilter(filter.key)}
                className={
                  isActive
                    ? 'rounded-md bg-gold/20 px-3 py-1.5 text-sm font-semibold text-gold'
                    : 'rounded-md border border-border px-3 py-1.5 text-sm text-text-secondary hover:text-text-primary'
                }
              >
                {filter.label}
              </button>
            );
          })}
        </div>

        <label className="flex items-center gap-2 text-xs text-text-secondary">
          Sort
          <select
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value as SortOrder)}
            className="rounded-md border border-border bg-surface px-2 py-1.5 text-xs text-text-primary outline-none"
          >
            <option value="desc">Most recent -&gt; least recent</option>
            <option value="asc">Least recent -&gt; most recent</option>
          </select>
        </label>
      </div>

      {isLoading && <MatchListSkeleton />}

      {isError && (
        <ErrorCard
          title="Matches unavailable"
          message={error instanceof Error ? error.message : 'Could not load matches.'}
        />
      )}

      {!isLoading && !isError && <MatchList matches={sortedMatches} />}
    </section>
  );
}
