import { Link } from 'react-router';

import { Button } from '../components/ui/button';
import { PageHero } from '../components/ui/page-hero';
import { editorialIllustrations } from '../lib/editorialIllustrations';

// Words that cycle in place of "Begins" — chosen for resonance with EduPlus mission
const HERO_CYCLING_WORDS = [
  'Begins',
  'Transforms',
  'Flourishes',
  'Connects',
  'Inspires',
  'Evolves',
];

export default function Hero() {
  return (
    <PageHero
      eyebrow="Foundation"
      title="Where Learning Begins"
      titleSuffixWords={HERO_CYCLING_WORDS}
      description="Intimate classrooms where curiosity is kindled through mentorship and collaboration. From learner to leader — shaping the future through expertise, vision, and purpose."
      illustration={editorialIllustrations.home}
    >
      <Button
        asChild
        size="md"
        className="rounded-none bg-foreground text-background transition-colors duration-200 hover:bg-primary hover:text-primary-foreground"
      >
        <Link to="/contact">Start</Link>
      </Button>
      <Button
        asChild
        size="md"
        variant="outline"
        className="rounded-none border-foreground bg-transparent text-foreground transition-colors duration-200 hover:bg-foreground hover:text-background"
      >
        <Link to="/about">Explore</Link>
      </Button>
    </PageHero>
  );
}
