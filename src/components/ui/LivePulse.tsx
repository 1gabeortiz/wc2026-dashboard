export default function LivePulse() {
return (
    <span className="inline-flex items-center gap-2">
    <span className="h-2.5 w-2.5 rounded-full bg-live animate-pulse-live" />
    <span className="text-[11px] font-bold uppercase tracking-widest 
text-live">LIVE</span>
    </span>
);
}