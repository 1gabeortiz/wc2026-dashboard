export function GroupCardSkeleton() {
return (
    <article className="panel p-4">
    <div className="mb-4 h-4 w-28 animate-pulse rounded bg-border" />
    <div className="space-y-2">
        {Array.from({ length: 6 }).map((_, idx) => (
        <div
            key={idx}
            className="grid grid-cols-[24px_1fr_repeat(8,32px)] items-center gap-2"
        >
            <div className="h-3 w-4 animate-pulse rounded bg-border" />
            <div className="h-3 w-24 animate-pulse rounded bg-border" />
            {Array.from({ length: 8 }).map((__, statIdx) => (
            <div key={statIdx} className="h-3 w-6 animate-pulse rounded bg-border" 
/>
            ))}
        </div>
        ))}
    </div>
    </article>
);
}

export function GroupGridSkeleton() {
return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
    {Array.from({ length: 12 }).map((_, idx) => (
        <GroupCardSkeleton key={idx} />
    ))}
    </div>
);
}

export function MatchListSkeleton() {
return (
    <div className="grid grid-cols-1 gap-3 lg:grid-cols-2">
    {Array.from({ length: 6 }).map((_, i) => (
        <article key={i} className="panel p-4">
        <div className="mb-3 h-4 w-32 animate-pulse rounded bg-border" />
        <div className="space-y-3">
            <div className="h-4 w-full animate-pulse rounded bg-border" />
            <div className="h-4 w-full animate-pulse rounded bg-border" />
        </div>
        </article>
    ))}
    </div>
);
}

export function ScorersTableSkeleton() {
return (
    <div className="panel p-4">
    <div className="space-y-3">
        {Array.from({ length: 10 }).map((_, i) => (
        <div key={i} className="h-6 w-full animate-pulse rounded bg-border" />
        ))}
    </div>
    </div>
);
}
