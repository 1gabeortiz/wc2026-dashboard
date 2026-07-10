import type { Match } from '../../api/types';
import { formatLocalKickoff } from '../../utils/dateUtils';
import { getMatchStatusLabel, isMatchLive } from '../../utils/matchUtils';
import LivePulse from '../ui/LivePulse';
interface MatchCardProps {
match: Match;
}
function TeamCrest({
src,
alt,
fallback,
}: {
src: string;
alt: string;
fallback: string;
}) {
return (
    <div className="flex h-6 w-6 items-center justify-center rounded bg-border 
text-[10px] font-bold text-text-secondary">
    <img
        src={src}
        alt={alt}
        className="h-6 w-6 rounded object-contain"
        onError={(e) => {
        e.currentTarget.style.display = 'none';
        e.currentTarget.parentElement!.textContent = fallback;
        }}
    />
    </div>
);
}
export default function MatchCard({ match }: MatchCardProps) {
const live = isMatchLive(match.status);
const homeScore = match.score.fullTime.home;
const awayScore = match.score.fullTime.away;
return (
    <article className="panel p-4">
    <div className="mb-3 flex items-center justify-between">
        {live ? (
        <LivePulse />
        ) : (
        <span className="text-[11px] font-semibold uppercase tracking-wider 
text-text-secondary">
            {getMatchStatusLabel(match.status)}
        </span>
        )}
        <span className="text-xs 
text-text-secondary">{formatLocalKickoff(match.utcDate)}</span>
    </div>
    <div className="space-y-2">
        <div className="grid grid-cols-[1fr_auto] items-center gap-3">
        <div className="flex items-center gap-2">
            <TeamCrest
            src={match.homeTeam.crest}
            alt={`${match.homeTeam.name} crest`}
            fallback={match.homeTeam.tla || 'H'}
            />
            <span className="truncate text-sm">{match.homeTeam.shortName || 
match.homeTeam.name}</span>
        </div>
        <span className="text-sm font-semibold tabular-nums">
            {homeScore ?? '-'}
        </span>
        </div>
        <div className="grid grid-cols-[1fr_auto] items-center gap-3">
        <div className="flex items-center gap-2">
            <TeamCrest
            src={match.awayTeam.crest}
            alt={`${match.awayTeam.name} crest`}
            fallback={match.awayTeam.tla || 'A'}
            />
            <span className="truncate text-sm">{match.awayTeam.shortName || 
match.awayTeam.name}</span>
        </div>
        <span className="text-sm font-semibold tabular-nums">
            {awayScore ?? '-'}
        </span>
        </div>
    </div>
    </article>
);
}