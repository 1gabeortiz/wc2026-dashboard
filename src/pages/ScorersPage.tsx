import ScorersList from '../components/scorers/ScorersList';
import ErrorCard from '../components/ui/ErrorCard';
import { ScorersTableSkeleton } from '../components/ui/LoadingSkeletons';
import { useTopScorers } from '../hooks/useTopScorers';
export default function ScorersPage() {
const { data, isLoading, isError, error } = useTopScorers();
return (
    <section className="space-y-4">
    <div>
        <p className="panel-title">Top Scorers</p>
        <h2 className="mt-2 text-xl font-bold text-text-primary md:text-2xl">
        Golden Boot Race
        </h2>
    </div>
    {isLoading && <ScorersTableSkeleton />}
    {isError && (
        <ErrorCard
        title="Scorers unavailable"
        message={error instanceof Error ? error.message : 'Could not load scorers.'}
        />
    )}
    {!isLoading && !isError && <ScorersList scorers={data?.scorers ?? []} />}
    </section>
);
}
