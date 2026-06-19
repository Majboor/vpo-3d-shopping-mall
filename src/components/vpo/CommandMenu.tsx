import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Command,
  Sparkles,
  Home,
  Images,
  BookOpen,
  Briefcase,
  FileText,
  Layers,
  DoorOpen,
  ArrowUpRight,
  ArrowUp,
  type LucideIcon,
} from "lucide-react";
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command";
import { DialogTitle } from "@/components/ui/dialog";

/**
 * CommandMenu — a keyboard-first quick navigator for the VPO experience.
 *
 * Press ⌘K / Ctrl+K anywhere (or tap the floating crest, bottom-right) to
 * open a palette that jumps across the outlet: routes, on-page districts,
 * and quick actions. Fully additive — mounts once at the app root and owns
 * its own state, so it never fights the existing scroll or nav components.
 */

type PaletteAction = () => void;

interface PaletteEntry {
  id: string;
  label: string;
  hint?: string;
  keywords?: string;
  icon: LucideIcon;
  run: (ctx: { navigate: ReturnType<typeof useNavigate>; go: (fn: PaletteAction) => void }) => void;
}

/** Smoothly reveal an on-page section; navigate home first if we're elsewhere. */
function scrollToSection(navigate: ReturnType<typeof useNavigate>, hash: string) {
  const target = document.querySelector(hash);
  if (target) {
    target.scrollIntoView({ behavior: "smooth" });
    return;
  }
  // Section lives on the home route — route there, then scroll after paint.
  navigate("/");
  window.setTimeout(() => {
    document.querySelector(hash)?.scrollIntoView({ behavior: "smooth" });
  }, 220);
}

const ROUTES: PaletteEntry[] = [
  { id: "home", label: "Home", hint: "The outlet floor", icon: Home, run: ({ go, navigate }) => go(() => navigate("/")) },
  { id: "gallery", label: "Editorial Gallery", hint: "3D lookbook", keywords: "gallery lookbook 3d", icon: Images, run: ({ go, navigate }) => go(() => navigate("/gallery")) },
  { id: "journal", label: "Journal", hint: "Field notes", keywords: "blog journal writing", icon: BookOpen, run: ({ go, navigate }) => go(() => navigate("/blog")) },
  { id: "business", label: "For Businesses", hint: "Partner with VPO", keywords: "business brands partner b2b", icon: Briefcase, run: ({ go, navigate }) => go(() => navigate("/business")) },
  { id: "cases", label: "Case Studies", hint: "Proof of work", keywords: "case studies results proof", icon: FileText, run: ({ go, navigate }) => go(() => navigate("/case-studies")) },
];

const SECTIONS: PaletteEntry[] = [
  { id: "runway", label: "The Runway", keywords: "runway show", icon: Sparkles, run: ({ go, navigate }) => go(() => scrollToSection(navigate, "#runway")) },
  { id: "spaces", label: "Spaces", keywords: "spaces districts stores", icon: Layers, run: ({ go, navigate }) => go(() => scrollToSection(navigate, "#spaces")) },
  { id: "account", label: "Request Access", keywords: "access account waitlist join invite", icon: DoorOpen, run: ({ go, navigate }) => go(() => scrollToSection(navigate, "#account")) },
];

const CommandMenu = () => {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  // ⌘K / Ctrl+K toggles the palette from anywhere.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key.toLowerCase() === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((v) => !v);
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, []);

  // Close first, then run on the next tick: Radix locks body scroll while the
  // dialog is open, so a scrollIntoView fired mid-close would be swallowed.
  const go = useCallback((fn: PaletteAction) => {
    setOpen(false);
    window.setTimeout(fn, 60);
  }, []);

  const scrollTop: PaletteAction = () =>
    window.scrollTo({ top: 0, behavior: "smooth" });

  const render = (entries: PaletteEntry[]) =>
    entries.map((entry) => {
      const Icon = entry.icon;
      return (
        <CommandItem
          key={entry.id}
          value={`${entry.label} ${entry.keywords ?? ""}`}
          onSelect={() => entry.run({ navigate, go })}
          className="group/item flex items-center gap-3 !py-3"
        >
          <Icon size={16} strokeWidth={1.5} />
          <span className="flex-1 text-sm">{entry.label}</span>
          {entry.hint && (
            <span className="text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
              {entry.hint}
            </span>
          )}
          <ArrowUpRight
            size={13}
            strokeWidth={1.5}
            className="opacity-0 -translate-x-1 transition-all group-aria-selected/item:opacity-60 group-aria-selected/item:translate-x-0"
          />
        </CommandItem>
      );
    });

  return (
    <>
      {/* Floating crest — discoverable trigger for touch + mouse users. */}
      <button
        type="button"
        aria-label="Open quick navigator (Command K)"
        onClick={() => setOpen(true)}
        className="fixed bottom-6 right-6 z-[90] hidden md:inline-flex items-center gap-2 rounded-full border border-white/15 bg-black/40 px-4 py-2.5 text-white backdrop-blur-md transition-all duration-300 hover:border-white/40 hover:bg-black/70"
      >
        <Command size={14} strokeWidth={1.5} />
        <span className="text-[10px] uppercase tracking-[0.2em]">Navigate</span>
        <kbd className="ml-1 rounded border border-white/20 px-1.5 py-0.5 font-mono text-[9px] leading-none text-white/70">
          ⌘K
        </kbd>
      </button>

      <CommandDialog open={open} onOpenChange={setOpen}>
        <DialogTitle className="sr-only">Quick navigator</DialogTitle>
        <CommandInput placeholder="Where to? Search the outlet…" />
        <CommandList>
          <CommandEmpty>Nothing on that rail — try another word.</CommandEmpty>
          <CommandGroup heading="Destinations">{render(ROUTES)}</CommandGroup>
          <CommandSeparator />
          <CommandGroup heading="On this floor">{render(SECTIONS)}</CommandGroup>
          <CommandSeparator />
          <CommandGroup heading="Quick actions">
            <CommandItem
              value="scroll to top back up"
              onSelect={() => go(scrollTop)}
              className="flex items-center gap-3 !py-3"
            >
              <ArrowUp size={16} strokeWidth={1.5} />
              <span className="flex-1 text-sm">Back to top</span>
            </CommandItem>
          </CommandGroup>
        </CommandList>
      </CommandDialog>
    </>
  );
};

export default CommandMenu;
