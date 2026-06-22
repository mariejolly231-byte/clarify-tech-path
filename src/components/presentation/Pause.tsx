export function Pause({ minutes = 15 }: { minutes?: number }) {
  return (
    <section
      aria-label={`Pause ${minutes} minutes`}
      className="border-y-2 border-primary/30 bg-gradient-to-br from-sand/50 via-accent/30 to-stone-soft/60 px-6 py-20 md:px-16 md:py-24"
    >
      <div className="mx-auto flex max-w-3xl flex-col items-center text-center">
        <div className="mb-4 inline-flex h-20 w-20 items-center justify-center rounded-full border-2 border-primary/40 bg-background text-4xl shadow-sm">
          ☕
        </div>
        <div className="font-mono text-[11px] uppercase tracking-[0.3em] text-primary">
          On souffle
        </div>
        <h2 className="mt-3 font-serif text-5xl text-foreground md:text-6xl">
          Pause
        </h2>
        <div className="mt-4 inline-flex items-center gap-2 rounded-full border border-primary/40 bg-background px-5 py-2 font-mono text-sm text-primary">
          ⏱ {minutes} minutes
        </div>
        <p className="mt-6 max-w-xl text-base italic text-muted-foreground md:text-lg">
          On se dégourdit les jambes, on note ses questions, et on se retrouve juste après.
        </p>
      </div>
    </section>
  );
}
