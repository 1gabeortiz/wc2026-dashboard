import type { StandingEntry } from '../../api/types';
interface StandingsRowProps {
entry: StandingEntry;
isQualified: boolean;
}
export default function StandingsRow({ entry, isQualified }: StandingsRowProps) {
const crestFallback = entry.team.tla || entry.team.shortName?.slice(0, 3) || 'TBD';
return (
    <tr className={isQualified ? 'bg-gold/15' : ''}>
    <td className="px-2 py-2 text-center text-xs 
text-text-secondary">{entry.position}</td>
    <td className="px-2 py-2">
        <div className="flex items-center gap-2">
        <img
            src={entry.team.crest}
            alt={`${entry.team.name} crest`}
            className="h-5 w-5 rounded-sm object-contain"
            onError={(e) => {
            e.currentTarget.style.display = 'none';
            }}
        />
        <span className="inline-block min-w-[22px] text-xs text-text-secondary 
md:hidden">
            {crestFallback}
        </span>
        <span className="truncate text-xs font-medium text-text-primary md:text-sm">
            {entry.team.shortName || entry.team.name}
        </span>
        </div>
    </td>
    <td className="px-1 py-2 text-center text-xs 
text-text-secondary">{entry.playedGames}</td>
    <td className="px-1 py-2 text-center text-xs 
text-text-secondary">{entry.won}</td>
    <td className="px-1 py-2 text-center text-xs 
text-text-secondary">{entry.draw}</td>
    <td className="px-1 py-2 text-center text-xs 
text-text-secondary">{entry.lost}</td>
    <td className="px-1 py-2 text-center text-xs 
text-text-secondary">{entry.goalsFor}</td>
    <td className="px-1 py-2 text-center text-xs 
text-text-secondary">{entry.goalsAgainst}</td>
    <td className="px-1 py-2 text-center text-xs text-text-secondary">
        {entry.goalDifference > 0 ? `+${entry.goalDifference}` : entry.goalDifference}
    </td>
    <td className="px-2 py-2 text-center text-xs font-semibold 
text-gold">{entry.points}</td>
    </tr>
);
}