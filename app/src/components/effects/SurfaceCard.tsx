export function SurfaceCard({ children, heightClass = 'min-h-[17.5rem] md:min-h-[20rem]' }: { children: React.ReactNode; heightClass?: string }) {
  return (
    <div className={`relative flex min-w-0 w-full ${heightClass} border border-border bg-card shadow-md transition-colors duration-300 hover:border-primary/50`}>
      <div className="relative z-10 flex min-w-0 flex-1 flex-col justify-between bg-card/90 p-5 sm:p-6">{children}</div>
    </div>
  );
}
