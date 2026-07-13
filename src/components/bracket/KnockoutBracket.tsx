import type { Match } from '../../api/types';
import BracketMatch from './BracketMatch';
type KnockoutStage =
| 'LAST_32'
| 'LAST_16'
| 'QUARTER_FINALS'
| 'SEMI_FINALS'
| 'THIRD_PLACE'
| 'FINAL';
interface KnockoutBracketProps {
matchesByStage: Record<KnockoutStage, Match[]>;
}
const STAGE_COLUMNS: { key: KnockoutStage; label: string }[] = [
{ key: 'LAST_32', label: 'Round of 32' },
{ key: 'LAST_16', label: 'Round of 16' },
{ key: 'QUARTER_FINALS', label: 'Quarter Finals' },
{ key: 'SEMI_FINALS', label: 'Semi Finals' },
{ key: 'THIRD_PLACE', label: 'Third Place' },
{ key: 'FINAL', label: 'Final' },
];
function sortMatches(matches: Match[]) {
return [...matches].sort(
    (a, b) => new Date(a.utcDate).getTime() - new Date(b.utcDate).getTime()
);
}
export default function KnockoutBracket({ matchesByStage }: KnockoutBracketProps) {
return (
    <div className="overflow-x-auto pb-2">
    <div className="flex min-w-[1280px] gap-4">
        {STAGE_COLUMNS.map((stage) => {
        const matches = sortMatches(matchesByStage[stage.key] ?? []);
        return (
            <section key={stage.key} className="w-[240px] shrink-0 space-y-3">
            <div className="rounded-md border border-border bg-surface px-3 py-2">
                <p className="text-xs font-bold uppercase tracking-widest text-gold">
                {stage.label}
                </p>
            </div>
            {matches.length ? (
                <div className="space-y-3">
                {matches.map((match) => (
                    <BracketMatch key={match.id} match={match} />
                ))}
                </div>
            ) : (
                <div className="panel p-3 text-xs text-text-secondary">
                No matches yet.
                </div>
            )}
            </section>
        );
        })}
    </div>
    </div>
);
}