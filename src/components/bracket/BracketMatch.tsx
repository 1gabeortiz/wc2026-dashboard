import type { Match, Team } from '../../api/types';
import { formatLocalKickoff } from '../../utils/dateUtils';
import { getMatchStatusLabel, isMatchLive } from '../../utils/matchUtils';
import LivePulse from '../ui/LivePulse';

interface BracketMatchProps {
  match: Match;
}

function getTeamLabel(team?: Team) {
  const label = team?.shortName || team?.name || '';
  if (!label || label.trim().toLowerCase() === 'null') return 'TBD';
  return label;
}

function TeamBadge({ team }: { team?: Team }) {
  const label = getTeamLabel(team);
  const fallback = team?.tla || 'TBD';

  return (
    <div className="flex min-w-0 items-center gap-2">
      <span className="flex h-4 w-6 items-center justify-center overflow-hidden rounded-sm bg-border text-[9px] font-bold text-text-secondary">
        {team?.crest ? (
          <img
            src={team.crest}
            alt={`${label} crest`}
            className="h-full w-full object-contain"
            onError={(e) => {
              e.currentTarget.style.display = 'none';
              e.currentTarget.parentElement!.textContent = fallback;
            }}
          />
        ) : (
          fallback
        )}
      </span>
      <span className="truncate text-xs">{label}</span>
    </div>
  );
}

export default function BracketMatch({ match }: BracketMatchProps) {
  const hasScore =
    match.score.fullTime.home !== null && match.score.fullTime.away !== null;

  return (
    <article className="panel w-full p-2">
      <div className="mb-1.5 flex items-center justify-between gap-2">
        {isMatchLive(match.status) ? (
          <LivePulse />
        ) : (
          <span className="text-[10px] font-semibold uppercase tracking-wider text-text-secondary">
            {getMatchStatusLabel(match.status)}
          </span>
        )}
        <span className="text-[10px] text-text-secondary">
          {formatLocalKickoff(match.utcDate)}
        </span>
      </div>

      <div className="space-y-1">
        <div className="flex items-center justify-between rounded-md bg-pitch/50 px-2 py-1">
          <TeamBadge team={match.homeTeam} />
          <span className="text-xs font-semibold tabular-nums">
            {hasScore ? match.score.fullTime.home : '-'}
          </span>
        </div>
        <div className="flex items-center justify-between rounded-md bg-pitch/50 px-2 py-1">
          <TeamBadge team={match.awayTeam} />
          <span className="text-xs font-semibold tabular-nums">
            {hasScore ? match.score.fullTime.away : '-'}
          </span>
        </div>
      </div>
    </article>
  );
}
