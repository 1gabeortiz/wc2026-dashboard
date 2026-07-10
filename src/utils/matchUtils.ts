import type { MatchStatus } from '../api/types';
export function isMatchLive(status: MatchStatus) {
return (
    status === 'IN_PLAY' ||
    status === 'PAUSED' ||
    status === 'EXTRA_TIME' ||
    status === 'PENALTY_SHOOTOUT'
);
}
export function isMatchResult(status: MatchStatus) {
return status === 'FINISHED';
}
export function isMatchUpcoming(status: MatchStatus) {
return status === 'SCHEDULED' || status === 'TIMED';
}
export function getMatchStatusLabel(status: MatchStatus) {
if (status === 'PAUSED') return 'HT';
if (status === 'EXTRA_TIME') return 'ET';
if (status === 'PENALTY_SHOOTOUT') return 'PENS';
if (status === 'FINISHED') return 'FT';
return status.replace('_', ' ');
}