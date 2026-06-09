import type { ReactNode } from "react";

interface Props {
  id: string;
  num: string;
  eyebrow?: string;
  title: ReactNode;
  children: ReactNode;
  tint?: "default" | "sand" | "sage";
}

export function Section({ id, num, eyebrow, title, children, tint = "default" }: Props) {
  const bg =
    tint === "sand"
      ? "bg-sand/40"
      : tint === "sage"
      ? "bg-accent/40"
      : "bg-background";
  return (
    <section
      id={id}
      className={`scroll-mt-20 ${bg} border-b border-border/60 px-6 py-20 md:px-16 md:py-28`}
    >
      <div className="mx-auto max-w-5xl">
        <div className="mb-10 flex items-center gap-4">
          <span className="font-mono text-xs text-primary">{num}</span>
          <span className="h-px flex-1 bg-border" />
          {eyebrow && (
            <span className="text-[11px] uppercase tracking-[0.2em] text-muted-foreground">
              {eyebrow}
            </span>
          )}
        </div>
        <h2 className="mb-8 text-3xl leading-tight text-foreground md:text-5xl">{title}</h2>
        {children}
      </div>
    </section>
  );
}
