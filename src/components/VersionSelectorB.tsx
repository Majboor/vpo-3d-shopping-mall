import { ArrowRight, ArrowUpRight } from "lucide-react";

interface VersionSelectorBProps {
  onSelect: (version: "premium" | "lite") => void;
}

/**
 * VersionSelectorB — the "B" arm of the landing A/B experiment (?variant=b).
 *
 * Distinct from the default centered card layout (VersionSelector):
 *  - Layout:   asymmetric editorial split (headline left, entry choices right)
 *              instead of two equal centered cards.
 *  - Headline: benefit-led narrative copy instead of "SELECT YOUR EXPERIENCE".
 *  - CTA:      one primary full-width action ("ENTER THE FLAGSHIP") plus a
 *              quiet secondary link, instead of two visually equal buttons.
 *
 * Keeps the exact onSelect(premium|lite) contract so it is a drop-in swap.
 */
const VersionSelectorB = ({ onSelect }: VersionSelectorBProps) => {
  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-background">
      <div className="grain-overlay" />

      {/* experiment marker */}
      <span className="absolute right-6 top-6 z-20 font-mono text-[10px] tracking-[0.3em] text-muted-foreground/50">
        VARIANT&nbsp;B
      </span>

      <div className="relative z-10 mx-auto flex h-full max-w-7xl flex-col justify-center gap-16 px-8 md:px-16 lg:grid lg:grid-cols-12 lg:items-center lg:gap-24">
        {/* Left — editorial headline */}
        <div className="lg:col-span-7">
          <span className="mb-8 block font-mono text-[11px] tracking-[0.4em] text-muted-foreground">
            VIRTUAL PREMIUM OUTLETS
          </span>
          <h1 className="font-serif text-5xl font-light leading-[1.05] text-foreground md:text-6xl lg:text-7xl">
            The store,
            <br />
            reimagined as a
            <br />
            <span className="italic">place you walk into.</span>
          </h1>
          <p className="mt-8 max-w-md font-serif text-lg font-light leading-relaxed text-foreground/70">
            Not a grid of thumbnails — a boutique you move through. Choose how
            you would like to arrive.
          </p>
        </div>

        {/* Right — entry choices */}
        <div className="flex flex-col gap-6 lg:col-span-5">
          {/* Primary CTA */}
          <button
            onClick={() => onSelect("premium")}
            className="group relative flex w-full items-center justify-between gap-6 border border-foreground bg-foreground px-8 py-7 text-left text-background transition-all hover:bg-transparent hover:text-foreground"
          >
            <span className="flex flex-col gap-1.5">
              <span className="font-display text-xl tracking-[0.15em]">
                ENTER THE FLAGSHIP
              </span>
              <span className="font-mono text-[10px] tracking-widest opacity-70">
                CINEMATIC WALKTHROUGH · FAST INTERNET
              </span>
            </span>
            <ArrowRight className="h-5 w-5 shrink-0 transition-transform group-hover:translate-x-1.5" />
          </button>

          {/* Secondary, quiet link */}
          <button
            onClick={() => onSelect("lite")}
            className="group inline-flex items-center gap-3 self-start pl-1 text-left"
          >
            <span className="border-b border-foreground/40 pb-1 font-sans text-sm tracking-wide text-foreground/80 transition-colors group-hover:border-foreground group-hover:text-foreground">
              Skip to the lookbook
            </span>
            <ArrowUpRight className="h-4 w-4 text-foreground/60 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </button>

          <span className="mt-2 max-w-[16rem] font-mono text-[10px] leading-relaxed tracking-wider text-muted-foreground/50">
            The lite entry loads instantly and drops you straight into the main
            experience.
          </span>
        </div>
      </div>
    </div>
  );
};

export default VersionSelectorB;
