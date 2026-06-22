type Props = { children: React.ReactNode };

export function DurationBadge({ children }: Props) {
 return (
 <div className="mb-6 flex justify-end">
 <span className="inline-flex items-center gap-1.5 rounded-full border border-primary/30 bg-primary/10 px-3 py-1.5 text-xs font-medium text-primary">
 {children}
 </span>
 </div>
 );
}
