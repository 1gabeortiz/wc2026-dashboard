import type { Scorer } from '../../api/types';
interface ScorersListProps {
scorers: Scorer[];
}
function crestFallback(teamName?: string) {
if (!teamName) return 'TBD';
return teamName.slice(0, 3).toUpperCase();
}
export default function ScorersList({ scorers }: ScorersListProps) {
if (!scorers.length) {
    return (
    <div className="panel p-6 text-sm text-text-secondary">
        No scorer data available yet.
    </div>
    );
}
return (
    <div className="panel overflow-x-auto">
    <table className="w-full min-w-[720px] border-collapse">
        <thead>
        <tr className="border-b border-border">
            <th className="px-3 py-3 text-left text-[11px] font-semibold uppercase 
tracking-wide text-text-secondary">
            #
            </th>
            <th className="px-3 py-3 text-left text-[11px] font-semibold uppercase 
tracking-wide text-text-secondary">
            Player
            </th>
            <th className="px-3 py-3 text-left text-[11px] font-semibold uppercase 
tracking-wide text-text-secondary">
            Nationality
            </th>
            <th className="px-3 py-3 text-left text-[11px] font-semibold uppercase 
tracking-wide text-text-secondary">
            Team
            </th>
            <th className="px-3 py-3 text-center text-[11px] font-semibold uppercase 
tracking-wide text-text-secondary">
            Goals
            </th>
            <th className="px-3 py-3 text-center text-[11px] font-semibold uppercase 
tracking-wide text-text-secondary">
            Assists
            </th>
            <th className="px-3 py-3 text-center text-[11px] font-semibold uppercase 
tracking-wide text-text-secondary">
            Pens
            </th>
        </tr>
        </thead>
        <tbody>
        {scorers.map((scorer, index) => (
            <tr key={`${scorer.player.id}-${index}`} className="border-b 
border-border/60">
            <td className="px-3 py-3 text-sm text-text-secondary">{index + 1}</td>
            <td className="px-3 py-3 text-sm font-medium text-text-primary">
                {scorer.player.name}
            </td>
            <td className="px-3 py-3 text-sm text-text-secondary">
                {scorer.player.nationality ?? '—'}
            </td>
            <td className="px-3 py-3">
                <div className="flex items-center gap-2">
                <div className="flex h-5 w-5 items-center justify-center rounded 
bg-border text-[9px] font-bold text-text-secondary">
                    <img
                    src={scorer.team.crest}
                    alt={`${scorer.team.name} crest`}
                    className="h-5 w-5 rounded object-contain"
                    onError={(e) => {
                        e.currentTarget.style.display = 'none';
                        e.currentTarget.parentElement!.textContent = crestFallback(
                        scorer.team.shortName || scorer.team.name
                        );
                    }}
                    />
                </div>
                <span className="text-sm text-text-primary">
                    {scorer.team.shortName || scorer.team.name}
                </span>
                </div>
            </td>
            <td className="px-3 py-3 text-center text-sm font-semibold text-gold 
tabular-nums">
                {scorer.goals}
            </td>
            <td className="px-3 py-3 text-center text-sm text-text-secondary 
tabular-nums">
                {scorer.assists ?? 0}
            </td>
            <td className="px-3 py-3 text-center text-sm text-text-secondary 
tabular-nums">
                {scorer.penalties ?? 0}
            </td>
            </tr>
        ))}
        </tbody>
    </table>
    </div>
);
}