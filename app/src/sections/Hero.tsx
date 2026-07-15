import { Link } from 'react-router';

import { Button } from '../components/ui/button';
import { PageHero } from '../components/ui/page-hero';
import { editorialIllustrations } from '../lib/editorialIllustrations';

export default function Hero() {
  return (
    <PageHero
      eyebrow="Foundation"
      title="Where Learning Begins"
      description="Intimate classrooms where curiosity is kindled through mentorship and collaboration. From learner to leader — shaping the future through expertise, vision, and purpose."
      illustration={editorialIllustrations.home}
    >
      <Button
        asChild
        className="h-[44px] rounded-none bg-foreground px-8 text-sm text-background transition-colors duration-200 hover:bg-primary hover:text-primary-foreground"
      >
        <Link to="/contact">Start Your Pathway</Link>
      </Button>
      <Button
        asChild
        variant="outline"
        className="h-[44px] rounded-none border-foreground bg-transparent px-8 text-sm text-foreground transition-colors duration-200 hover:bg-foreground hover:text-background"
      >
        <Link to="/about">Explore Network</Link>
      </Button>
    </PageHero>
  );
}
