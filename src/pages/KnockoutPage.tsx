import KnockoutBracket from '../components/bracket/KnockoutBracket';
import ErrorCard from '../components/ui/ErrorCard';
import { useKnockout } from '../hooks/useKnockout';
export default function KnockoutPage() {
const { isLoading, isError, error, matchesByStage } = useKnockout();
return (
    <section className="space-y-4">
    <div>
        <p className="panel-title">Knockout Bracket</p>
        <h2 className="mt-2 text-xl font-bold text-text-primary md:text-2xl">
        Tournament Bracket
        </h2>
    </div>
    {isLoading && (
        <div className="panel p-6 text-sm text-text-secondary">
        Loading knockout matches...
        </div>
    )}
    {isError && (
        <ErrorCard
        title="Bracket unavailable"
        message={error instanceof Error ? error.message : 'Could not load bracket data.'}
        />
    )}
    {!isLoading && !isError && <KnockoutBracket matchesByStage={matchesByStage} />}
    </section>
);
}