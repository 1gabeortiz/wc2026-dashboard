export function formatLocalKickoff(utcDate: string) {
return new Intl.DateTimeFormat(undefined, {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
}).format(new Date(utcDate));
}