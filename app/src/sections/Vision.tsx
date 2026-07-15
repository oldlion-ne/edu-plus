export default function Vision() {
  return (
    <section id="investing" className="relative w-full py-24 md:py-32 lg:py-40 bg-background border-b border-border/50">
      <div className="max-w-7xl mx-auto px-8 md:px-12 lg:px-24">
        
        {/* Mission Section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24 mb-24 lg:mb-32">
          <div className="lg:col-span-4">
            <span className="text-[10px] font-medium tracking-[0.3em] uppercase text-primary block">
              Our Mission
            </span>
          </div>
          <div className="lg:col-span-8">
            <h2 className="text-3xl md:text-4xl lg:text-[2.75rem] font-medium tracking-tight leading-[1.15] text-foreground">
              To become a leading skills development platform that reimagines how people learn, grow, and work — creating measurable impact on the global workforce and the communities we serve.
            </h2>
            <p className="mt-8 text-sm md:text-base text-muted-foreground leading-relaxed max-w-2xl">
              We aim to make world-class skill development accessible, practical, and outcomes-driven for every learner, irrespective of geography or background.
            </p>
          </div>
        </div>

        {/* Vision Section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24">
          <div className="lg:col-span-4">
            <span className="text-[10px] font-medium tracking-[0.3em] uppercase text-primary block">
              Our Vision
            </span>
          </div>
          <div className="lg:col-span-8">
            <div className="border-l border-border/50 pl-8 lg:pl-12">
              <p className="text-xl md:text-2xl font-medium tracking-tight leading-[1.4] text-foreground max-w-3xl">
                To empower individuals to acquire future-ready, in-demand skills; to close the gap between education and industry; and to cultivate a global community of lifelong learners who are confident, employable, and resilient in the face of change.
              </p>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
