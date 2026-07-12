import Nav from '@/components/sections/Nav';
import Hero from '@/components/sections/Hero';
import Concept from '@/components/sections/Concept';
import FeaturesBento from '@/components/sections/FeaturesBento';
import FeatureAI from '@/components/sections/FeatureAI';
import HowItWorks from '@/components/sections/HowItWorks';
import SeeItInAction from '@/components/sections/SeeItInAction';
import TryItYourself from '@/components/sections/TryItYourself';
import Pricing from '@/components/sections/Pricing';
import ContactDemo from '@/components/sections/ContactDemo';
import Footer from '@/components/sections/Footer';
import ClientWrapper from '@/components/ClientWrapper';

export default function Home() {
  return (
    <ClientWrapper>
      <main className="relative">
        <Nav />
        <Hero />
        <Concept />
        <div id="features">
          <FeaturesBento />
        </div>
        <FeatureAI />
        <HowItWorks />
        <SeeItInAction />
        <TryItYourself />
        <Pricing />
        <ContactDemo />
        <Footer />
      </main>
    </ClientWrapper>
  );
}
