import type { Match } from '../../api/types';
import { isMatchLive } from '../../utils/matchUtils';
import MatchList from './MatchList';
interface LiveFeedProps {
matches: Match[];
}
export default function LiveFeed({ matches }: LiveFeedProps) {
const liveMatches = matches.filter((m) => isMatchLive(m.status));
if (!liveMatches.length) return null;
return (
    <section className="space-y-3">
    <p className="panel-title">Live Now</p>
    <MatchList matches={liveMatches} />
    </section>
);
}