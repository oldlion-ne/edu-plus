import { Link } from 'react-router';
import { Button } from '../components/ui/button';


export default function Hero() {
  return (
    <section
      id="story"
      className="relative w-full bg-background pt-40 pb-32 flex flex-col justify-center overflow-hidden"
    >
      <div className="relative z-10 flex flex-col items-center text-center px-6 md:px-12 max-w-5xl mx-auto w-full">
        {/* Eyebrow */}
        <span className="text-[13px] font-medium tracking-wide uppercase text-muted-foreground mb-6 block">
          Investing · Building · Advisory
        </span>

        {/* Headline */}
        <h1 className="text-4xl sm:text-5xl md:text-[3.5rem] lg:text-[4rem] font-medium tracking-tight leading-[1.15] text-foreground mb-6 max-w-3xl">
          Elevate Tomorrow
        </h1>

        {/* Subtext */}
        <p className="max-w-xl text-base md:text-lg text-muted-foreground leading-relaxed mb-10 text-balance">
          A global network redefining human potential through AI-powered learning.
        </p>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row items-center gap-3">
          <Button asChild size="lg" className="rounded-none h-[52px] px-[28px] bg-foreground text-background hover:bg-primary transition-colors duration-200">
            <Link to="/contact" /* ui-ignore */>
              Start Your Pathway
            </Link>
          </Button>
          <Button asChild variant="outline" size="lg" className="rounded-none h-[52px] px-[28px] border-foreground text-foreground bg-transparent hover:bg-foreground hover:text-background transition-colors duration-200">
            <Link to="/about" /* ui-ignore */>
              Explore Network
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
