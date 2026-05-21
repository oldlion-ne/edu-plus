import Hero from '../sections/Hero';
import PartnerMarquee from '../sections/PartnerMarquee';
import TelemetryStats from '../sections/TelemetryStats';
import Vision from '../sections/Vision';
import PathwaySimulator from '../sections/PathwaySimulator';
import ServicesMatrix from '../sections/ServicesMatrix';
import PedigreeShowcase from '../sections/PedigreeShowcase';

export default function Home() {
  return (
    <>
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

