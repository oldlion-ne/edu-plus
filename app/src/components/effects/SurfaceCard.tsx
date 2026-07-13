export function SurfaceCard({ children, heightClass = 'h-[280px] md:h-[340px]' }: { children: React.ReactNode; heightClass?: string }) {
  return (
    <div className={`relative w-full ${heightClass} overflow-hidden border border-border bg-card shadow-md transition-colors duration-300 hover:border-primary/50`}>
      <div className="relative z-10 flex size-full flex-col justify-between bg-card/90 p-6">{children}</div>
    </div>
  );
}
