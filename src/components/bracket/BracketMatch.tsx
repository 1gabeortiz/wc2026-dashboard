import type { Match } from '../../api/types';
import { formatLocalKickoff } from '../../utils/dateUtils';
import { getMatchStatusLabel, isMatchLive } from '../../utils/matchUtils';
import LivePulse from '../ui/LivePulse';
interface BracketMatchProps {
match: Match;
}
function teamName(name?: string) {
if (!name || name.trim().toLowerCase() === 'null') return 'TBD';
return name;
}
export default function BracketMatch({ match }: BracketMatchProps) {
const home = teamName(match.homeTeam?.shortName || match.homeTeam?.name);
const away = teamName(match.awayTeam?.shortName || match.awayTeam?.name);
const hasScore =
    match.score.fullTime.home !== null && match.score.fullTime.away !== null;
return (
    <article className="panel min-w-[240px] p-3">
    <div className="mb-2 flex items-center justify-between">
        {isMatchLive(match.status) ? (
        <LivePulse />
        ) : (
        <span className="text-[10px] font-semibold uppercase tracking-wider 
text-text-secondary">
            {getMatchStatusLabel(match.status)}
        </span>
        )}
        <span className="text-[10px] text-text-secondary">
        {formatLocalKickoff(match.utcDate)}
        </span>
    </div>
    <div className="space-y-1.5">
        <div className="flex items-center justify-between rounded-md bg-pitch/50 px-2 
py-1.5">
        <span className="truncate text-xs">{home}</span>
        <span className="text-xs font-semibold tabular-nums">
            {hasScore ? match.score.fullTime.home : '-'}
        </span>
        </div>
        <div className="flex items-center justify-between rounded-md bg-pitch/50 px-2 
py-1.5">
        <span className="truncate text-xs">{away}</span>
        <span className="text-xs font-semibold tabular-nums">
            {hasScore ? match.score.fullTime.away : '-'}
        </span>
        </div>
    </div>
    </article>
);
}