import GroupGrid from '../components/standings/GroupGrid';
import ErrorCard from '../components/ui/ErrorCard';
import { GroupGridSkeleton } from '../components/ui/LoadingSkeletons';
import { useStandings } from '../hooks/useStandings';
import type { Group, StandingEntry } from '../api/types';
function sortGroups(groups: Group[]) {
return [...groups].sort((a, b) => a.group.localeCompare(b.group));
}
function computeQualifiedTeamIds(groups: Group[]) {
const qualified = new Set<number>();

// Top 2 in each group auto-qualify (24 teams)
groups.forEach((group) => {
    group.table
    .filter((entry) => entry.position <= 2)
    .forEach((entry) => qualified.add(entry.team.id));
});

// Best 8 third-place teams qualify (48-team WC -> LAST_32)
const thirdPlaceEntries: StandingEntry[] = groups
    .map((group) => group.table.find((entry) => entry.position === 3))
    .filter((entry): entry is StandingEntry => Boolean(entry));
thirdPlaceEntries
    .sort((a, b) => {
    if (b.points !== a.points) return b.points - a.points;
    if (b.goalDifference !== a.goalDifference) return b.goalDifference - 
a.goalDifference;
    if (b.goalsFor !== a.goalsFor) return b.goalsFor - a.goalsFor;
    return a.team.name.localeCompare(b.team.name);
    })
    .slice(0, 8)
    .forEach((entry) => qualified.add(entry.team.id));
return qualified;
}
export default function GroupStagePage() {
const { data, isLoading, isError, error } = useStandings();
if (isLoading) {
    return (
    <section>
        <div className="mb-5">
        <p className="panel-title">Group Stage</p>
        <h2 className="mt-2 text-xl font-bold text-text-primary md:text-2xl">
            Loading live standings...
        </h2>
        </div>
        <GroupGridSkeleton />
    </section>
    );
}
if (isError) {
    return (
    <section className="space-y-4">
        <div>
        <p className="panel-title">Group Stage</p>
        <h2 className="mt-2 text-xl font-bold text-text-primary md:text-2xl">
            Group Standings
        </h2>
        </div>
        <ErrorCard
        title="Standings unavailable"
        message={
            error instanceof Error
            ? error.message
            : 'Could not load group standings from football-data.org.'
        }
        />
    </section>
    );
}
const groups = sortGroups(data?.standings ?? []);
const qualifiedTeamIds = computeQualifiedTeamIds(groups);
return (
    <section className="space-y-4">
    <div className="flex flex-col gap-2 md:flex-row md:items-end 
md:justify-between">
        <div>
        <p className="panel-title">Group Stage</p>
        <h2 className="mt-2 text-xl font-bold text-text-primary md:text-2xl">
            Live Group Standings
        </h2>
        </div>
        <p className="text-xs text-text-secondary">
        Highlighted rows indicate current qualification positions.
        </p>
    </div>
    <GroupGrid groups={groups} qualifiedTeamIds={qualifiedTeamIds} />
    </section>
);
}