import type { Group } from '../../api/types';
import GroupCard from './GroupCard';
interface GroupGridProps {
groups: Group[];
qualifiedTeamIds: Set<number>;
}
export default function GroupGrid({ groups, qualifiedTeamIds }: GroupGridProps) {
return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 2xl:grid-cols-3">
    {groups.map((group) => (
        <GroupCard key={group.group} group={group} qualifiedTeamIds={qualifiedTeamIds}
/>
    ))}
    </div>
);
}