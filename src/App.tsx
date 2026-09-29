import { StoryProvider } from './context/StoryContext';
import { Navbar } from './components/layout/Navbar';
import { MoneyRain } from './components/background/MoneyRain';

// Section 01: Who Am I?
import { WhoAmIHero } from './components/section01-who/WhoAmIHero';
import { StoryTimeline } from './components/section01-who/StoryTimeline';

// Section 02: The $340B Math
import { CompoundingHero } from './components/section02-compounding/CompoundingHero';
import { CompoundingVisual } from './components/section02-compounding/CompoundingVisual';

// Section 03: Before The Fortune
import { PrinciplesHeader } from './components/section03-principles/PrinciplesHeader';
import { PrincipleCard } from './components/section03-principles/PrincipleCard';
import { VaultGateTransition } from './components/section03-principles/VaultGateTransition';

// Section 04: The Berkshire Vault (Unified Sovereign Depository)
import { TheBerkshireVault } from './components/section04-vault/TheBerkshireVault';

export function AppContent() {
  return (
    <div className="relative min-h-screen bg-transparent text-[#FAF8F2] font-sans selection:bg-[#C5A869] selection:text-[#090E0B]">
      {/* Ultra-Lightweight Ambient Wealth Particle Layer */}
      <MoneyRain />

      {/* Sticky Narrative Progress Navigation */}
      <Navbar />

      <main className="relative z-10">
        {/* SECTION 01 — WHO AM I? */}
        <section id="who-am-i" className="bg-transparent scroll-mt-20">
          <WhoAmIHero />
          <StoryTimeline />
        </section>

        {/* SECTION 02 — THE $340B MATH */}
        <section id="compounding" className="bg-transparent scroll-mt-20">
          <CompoundingHero />
          <CompoundingVisual />
        </section>

        {/* SECTION 03 — BEFORE THE FORTUNE */}
        <section id="principles" className="bg-transparent scroll-mt-20">
          <PrinciplesHeader />
          <PrincipleCard />
          <VaultGateTransition />
        </section>

        {/* SECTION 04 — THE BERKSHIRE VAULT */}
        <section id="vault" className="bg-transparent text-[#FAF8F2] scroll-mt-20">
          <TheBerkshireVault />
        </section>
      </main>
    </div>
  );
}

export default function App() {
  return (
    <StoryProvider>
      <AppContent />
    </StoryProvider>
  );
}
