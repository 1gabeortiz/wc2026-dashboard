import type { Group } from '../../api/types';
import StandingsRow from './StandingsRow';
interface GroupCardProps {
group: Group;
qualifiedTeamIds: Set<number>;
}
function formatGroupLabel(groupCode: string) {
return groupCode.replace('GROUP_', 'Group ');
}
export default function GroupCard({ group, qualifiedTeamIds }: GroupCardProps) {
return (
    <article className="panel overflow-hidden">
    <header className="border-b border-border px-4 py-3">
        <h3 className="text-sm font-bold uppercase tracking-widest text-gold">
        {formatGroupLabel(group.group)}
        </h3>
    </header>
    <div className="overflow-x-auto">
        <table className="w-full min-w-[540px] border-collapse">
        <thead>
            <tr className="border-b border-border">
            <th className="px-2 py-2 text-center text-[11px] font-semibold uppercase
tracking-wide text-text-secondary">
                #
            </th>
            <th className="px-2 py-2 text-left text-[11px] font-semibold uppercase 
tracking-wide text-text-secondary">
                Team
            </th>
            <th className="px-1 py-2 text-center text-[11px] font-semibold uppercase
tracking-wide text-text-secondary">
                GP
            </th>
            <th className="px-1 py-2 text-center text-[11px] font-semibold uppercase
tracking-wide text-text-secondary">
                W
            </th>
            <th className="px-1 py-2 text-center text-[11px] font-semibold uppercase
tracking-wide text-text-secondary">
                D
            </th>
            <th className="px-1 py-2 text-center text-[11px] font-semibold uppercase
tracking-wide text-text-secondary">
                L
            </th>
            <th className="px-1 py-2 text-center text-[11px] font-semibold uppercase
tracking-wide text-text-secondary">
                GF
            </th>
            <th className="px-1 py-2 text-center text-[11px] font-semibold uppercase
tracking-wide text-text-secondary">
                GA
            </th>
            <th className="px-1 py-2 text-center text-[11px] font-semibold uppercase
tracking-wide text-text-secondary">
                GD
            </th>
            <th className="px-2 py-2 text-center text-[11px] font-semibold uppercase
tracking-wide text-text-secondary">
                Pts
            </th>
            </tr>
        </thead>
        <tbody>
            {group.table.map((entry) => (
            <StandingsRow
                key={entry.team.id}
                entry={entry}
                isQualified={qualifiedTeamIds.has(entry.team.id)}
            />
            ))}
        </tbody>
        </table>
    </div>
    </article>
);
}