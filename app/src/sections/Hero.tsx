import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router';
import { EditorialHero } from '../components/layout/EditorialHero';
import { Button } from '../components/ui/button';

const STATS = [
  { value: '4,200+', label: 'learners supported' },
  { value: '98%', label: 'placement rate' },
  { value: '38', label: 'countries reached' },
];

export default function Hero() {
  return (
    <EditorialHero
      variant="full-bleed"
      eyebrow="Learning, held in balance"
      title={<>A calmer way to <span className="text-primary">move forward.</span></>}
      description="Practical learning, trusted guidance, and a connected East Asian community."
      image="/images/HomeHeroVisual.webp"
      imageAlt="East Asian learners and mentors collaborating in a calm modern learning space"
      actions={
        <>
          <Button asChild size="lg" variant="raised">
            <Link to="/programs" /* ui-ignore */>Explore pathways <ArrowRight className="size-4" /></Link>
          </Button>
          <Button asChild size="lg" variant="outline"><Link to="/about" /* ui-ignore */>Meet the community</Link></Button>
        </>
      }
      proof={
        <dl className="grid grid-cols-3 gap-5">
          {STATS.map((stat) => (
            <div key={stat.label}>
              <dt className="text-xs leading-4 text-muted-foreground">{stat.label}</dt>
              <dd className="mt-1 font-heading text-xl font-semibold text-foreground">{stat.value}</dd>
            </div>
          ))}
        </dl>
      }
    />
  );
}
