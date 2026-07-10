import type { Match } from '../../api/types';
import MatchCard from './MatchCard';
interface MatchListProps {
matches: Match[];
}
export default function MatchList({ matches }: MatchListProps) {
if (!matches.length) {
    return (
    <div className="panel p-6 text-sm text-text-secondary">
        No matches found for this filter.
    </div>
    );
}
return (
    <div className="grid grid-cols-1 gap-3 lg:grid-cols-2">
    {matches.map((match) => (
        <MatchCard key={match.id} match={match} />
    ))}
    </div>
);
}