import type { Match } from '../../api/types';
import BracketMatch from './BracketMatch';

type KnockoutStage =
  | 'LAST_32'
  | 'LAST_16'
  | 'QUARTER_FINALS'
  | 'SEMI_FINALS'
  | 'THIRD_PLACE'
  | 'FINAL';

type Side = 'left' | 'right';
type SideStage = Exclude<KnockoutStage, 'THIRD_PLACE' | 'FINAL'>;

interface KnockoutBracketProps {
  matchesByStage: Record<KnockoutStage, Match[]>;
}

const LEFT_ORDER: { key: SideStage; label: string }[] = [
  { key: 'LAST_32', label: 'Round of 32' },
  { key: 'LAST_16', label: 'Round of 16' },
  { key: 'QUARTER_FINALS', label: 'Quarter Finals' },
  { key: 'SEMI_FINALS', label: 'Semi Finals' },
];

const RIGHT_ORDER = [...LEFT_ORDER].reverse();

function sortByKickoff(matches: Match[]) {
  return [...matches].sort(
    (a, b) => new Date(a.utcDate).getTime() - new Date(b.utcDate).getTime()
  );
}

function splitSides(matches: Match[]) {
  const sorted = sortByKickoff(matches);
  const half = Math.ceil(sorted.length / 2);
  return {
    left: sorted.slice(0, half),
    right: sorted.slice(half).reverse(),
  };
}

function getSideStageMatches(
  matchesByStage: Record<KnockoutStage, Match[]>,
  stage: SideStage,
  side: Side
) {
  return splitSides(matchesByStage[stage] ?? [])[side];
}

function getRowStart(index: number, count: number, totalRows: number) {
  if (count <= 0) return 1;
  const step = totalRows / count;
  return Math.max(1, Math.round(index * step + step / 2));
}

function StageColumn({
  label,
  matches,
  totalRows,
}: {
  label: string;
  matches: Match[];
  totalRows: number;
}) {
  return (
    <section className="min-w-0">
      <div
        className="grid gap-2"
        style={{ gridTemplateRows: `repeat(${totalRows}, minmax(0, 1fr))` }}
      >
        {matches.length ? (
          matches.map((match, idx) => (
            <div
              key={match.id}
              style={{
                gridRow: `${getRowStart(idx, matches.length, totalRows)} / span 3`,
              }}
            >
              {idx === 0 && (
                <p className="mb-1 pl-0.5 text-[10px] font-semibold uppercase tracking-[0.14em] text-text-secondary">
                  {label}
                </p>
              )}
              <BracketMatch match={match} />
            </div>
          ))
        ) : (
          <div style={{ gridRow: `1 / span 3` }}>
            <p className="mb-1 pl-0.5 text-[10px] font-semibold uppercase tracking-[0.14em] text-text-secondary">
              {label}
            </p>
            <div className="panel p-3 text-xs text-text-secondary">No matches yet.</div>
          </div>
        )}
      </div>
    </section>
  );
}

function CenterColumn({
  finalMatches,
  thirdPlaceMatches,
  totalRows,
}: {
  finalMatches: Match[];
  thirdPlaceMatches: Match[];
  totalRows: number;
}) {
  const finalStart = Math.round(totalRows / 2);
  const thirdStart = Math.max(totalRows - 4, 1);

  return (
    <section className="min-w-0">
      <div
        className="grid gap-2"
        style={{ gridTemplateRows: `repeat(${totalRows}, minmax(0, 1fr))` }}
      >
        {finalMatches.length ? (
          finalMatches.map((match) => (
            <div key={match.id} style={{ gridRow: `${finalStart} / span 3` }}>
              <p className="mb-1 pl-0.5 text-[10px] font-semibold uppercase tracking-[0.14em] text-text-secondary">
                Final
              </p>
              <BracketMatch match={match} />
            </div>
          ))
        ) : (
          <div style={{ gridRow: `${finalStart} / span 3` }}>
            <p className="mb-1 pl-0.5 text-[10px] font-semibold uppercase tracking-[0.14em] text-text-secondary">
              Final
            </p>
            <div className="panel p-3 text-xs text-text-secondary">Final matchup pending.</div>
          </div>
        )}

        {thirdPlaceMatches.length ? (
          thirdPlaceMatches.map((match) => (
            <div key={match.id} style={{ gridRow: `${thirdStart} / span 3` }}>
              <p className="mb-1 pl-0.5 text-[10px] font-semibold uppercase tracking-[0.14em] text-text-secondary">
                Third Place
              </p>
              <BracketMatch match={match} />
            </div>
          ))
        ) : (
          <div style={{ gridRow: `${thirdStart} / span 3` }}>
            <p className="mb-1 pl-0.5 text-[10px] font-semibold uppercase tracking-[0.14em] text-text-secondary">
              Third Place
            </p>
            <div className="panel p-3 text-xs text-text-secondary">Third-place match pending.</div>
          </div>
        )}
      </div>
    </section>
  );
}

function MobileStageSection({ label, matches }: { label: string; matches: Match[] }) {
  return (
    <section className="space-y-2">
      <p className="pl-0.5 text-[10px] font-semibold uppercase tracking-[0.14em] text-text-secondary">
        {label}
      </p>
      {matches.length ? (
        <div className="space-y-2">
          {matches.map((match) => (
            <BracketMatch key={match.id} match={match} />
          ))}
        </div>
      ) : (
        <div className="panel p-3 text-xs text-text-secondary">No matches yet.</div>
      )}
    </section>
  );
}

export default function KnockoutBracket({ matchesByStage }: KnockoutBracketProps) {
  const left32 = getSideStageMatches(matchesByStage, 'LAST_32', 'left');
  const left16 = getSideStageMatches(matchesByStage, 'LAST_16', 'left');
  const leftQf = getSideStageMatches(matchesByStage, 'QUARTER_FINALS', 'left');
  const leftSf = getSideStageMatches(matchesByStage, 'SEMI_FINALS', 'left');

  const right32 = getSideStageMatches(matchesByStage, 'LAST_32', 'right');
  const right16 = getSideStageMatches(matchesByStage, 'LAST_16', 'right');
  const rightQf = getSideStageMatches(matchesByStage, 'QUARTER_FINALS', 'right');
  const rightSf = getSideStageMatches(matchesByStage, 'SEMI_FINALS', 'right');

  const baseMatchesPerSide = Math.max(
    left32.length,
    right32.length,
    left16.length,
    right16.length,
    leftQf.length,
    rightQf.length,
    leftSf.length,
    rightSf.length,
    1
  );
  const totalRows = baseMatchesPerSide * 4;

  return (
    <div className="space-y-5">
      <div className="space-y-4 xl:hidden">
        {LEFT_ORDER.map((stage) => (
          <MobileStageSection
            key={`mobile-${stage.key}`}
            label={stage.label}
            matches={sortByKickoff(matchesByStage[stage.key] ?? [])}
          />
        ))}
        <MobileStageSection label="Final" matches={sortByKickoff(matchesByStage.FINAL ?? [])} />
        <MobileStageSection
          label="Third Place"
          matches={sortByKickoff(matchesByStage.THIRD_PLACE ?? [])}
        />
      </div>

      <div className="hidden xl:grid xl:grid-cols-9 xl:gap-3">
        <StageColumn label={LEFT_ORDER[0].label} matches={left32} totalRows={totalRows} />
        <StageColumn label={LEFT_ORDER[1].label} matches={left16} totalRows={totalRows} />
        <StageColumn label={LEFT_ORDER[2].label} matches={leftQf} totalRows={totalRows} />
        <StageColumn label={LEFT_ORDER[3].label} matches={leftSf} totalRows={totalRows} />

        <CenterColumn
          finalMatches={sortByKickoff(matchesByStage.FINAL ?? [])}
          thirdPlaceMatches={sortByKickoff(matchesByStage.THIRD_PLACE ?? [])}
          totalRows={totalRows}
        />

        <StageColumn label={RIGHT_ORDER[0].label} matches={rightSf} totalRows={totalRows} />
        <StageColumn label={RIGHT_ORDER[1].label} matches={rightQf} totalRows={totalRows} />
        <StageColumn label={RIGHT_ORDER[2].label} matches={right16} totalRows={totalRows} />
        <StageColumn label={RIGHT_ORDER[3].label} matches={right32} totalRows={totalRows} />
      </div>
    </div>
  );
}
