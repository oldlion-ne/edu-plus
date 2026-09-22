import Hero from '../sections/Hero';
import { PageMeta } from '@/components/PageMeta';
import PartnerMarquee from '../sections/PartnerMarquee';
import TelemetryStats from '../sections/TelemetryStats';
import Vision from '../sections/Vision';
import PathwaySimulator from '../sections/PathwaySimulator';
import ServicesMatrix from '../sections/ServicesMatrix';
import PedigreeShowcase from '../sections/PedigreeShowcase';

export default function Home() {
  return (
    <>
      <PageMeta 
        title="Home"
        description="EduPlus Skills empowers learners with future-ready programs, psychometric guidance, and global career pathways."
      />
      <Hero />
      <PartnerMarquee />
      <TelemetryStats />
      <Vision />
      <PathwaySimulator />
      <ServicesMatrix />
      <PedigreeShowcase />
    </>
  );
}

