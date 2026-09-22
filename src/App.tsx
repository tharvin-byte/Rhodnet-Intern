import { StoryProvider } from './context/StoryContext';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { MoneyRain } from './components/background/MoneyRain';

// Section 01: Who Am I?
import { WhoAmIHero } from './components/section01-who/WhoAmIHero';
import { StoryTimeline } from './components/section01-who/StoryTimeline';
import { Section01Transition } from './components/section01-who/Section01Transition';

// Section 02: Compounding Journey
import { CompoundingHero } from './components/section02-compounding/CompoundingHero';
import { CinematicJourney } from './components/section02-compounding/CinematicJourney';
import { CompoundingVisual } from './components/section02-compounding/CompoundingVisual';
import { Section02Transition } from './components/section02-compounding/Section02Transition';

// Section 03: Principles & Mindset
import { PrinciplesHeader } from './components/section03-principles/PrinciplesHeader';
import { PrincipleCard } from './components/section03-principles/PrincipleCard';
import { VaultGateTransition } from './components/section03-principles/VaultGateTransition';

// Section 04: The Vault
import { VaultUnlock } from './components/section04-vault/VaultUnlock';
import { PortfolioOverview } from './components/section04-vault/PortfolioOverview';
import { HoldingsVisualizer } from './components/section04-vault/HoldingsVisualizer';
import { TopPositionsRank } from './components/section04-vault/TopPositionsRank';
import { HoldingsGrid } from './components/section04-vault/HoldingsGrid';
import { PortfolioChanges } from './components/section04-vault/PortfolioChanges';
import { OperatingEmpire } from './components/section04-vault/OperatingEmpire';
import { WarChest } from './components/section04-vault/WarChest';
import { VaultReflection } from './components/section04-vault/VaultReflection';

export function AppContent() {
  return (
    <div className="relative min-h-screen bg-transparent text-[#FAF8F2] font-sans selection:bg-[#C5A869] selection:text-[#090E0B]">
      {/* Atmospheric Falling Money Layer */}
      <MoneyRain />

      {/* Sticky Narrative Progress Navigation */}
      <Navbar />

      <main className="relative z-10">
        {/* SECTION 01 — WHO AM I? */}
        <section id="who-am-i" className="min-h-screen bg-transparent">
          <WhoAmIHero />
          <StoryTimeline />
          <Section01Transition />
        </section>

        {/* SECTION 02 — HOW I ENDED UP WITH $340 BILLION */}
        <section id="compounding" className="min-h-screen bg-transparent">
          <CompoundingHero />
          <CinematicJourney />
          <CompoundingVisual />
          <Section02Transition />
        </section>

        {/* SECTION 03 — BEFORE YOU OPEN THE FORTUNE */}
        <section id="principles" className="min-h-screen bg-transparent">
          <PrinciplesHeader />
          <PrincipleCard />
          <VaultGateTransition />
        </section>

        {/* SECTION 04 — INSIDE THE VAULT (Dark Obsidian Theme) */}
        <section id="vault" className="min-h-screen bg-transparent text-[#FAF8F2]">
          <VaultUnlock />
          <PortfolioOverview />
          <HoldingsVisualizer />
          <TopPositionsRank />
          <HoldingsGrid />
          <PortfolioChanges />
          <OperatingEmpire />
          <WarChest />
          <VaultReflection />
        </section>
      </main>

      {/* Editorial Colophon & Citations */}
      <Footer />
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
