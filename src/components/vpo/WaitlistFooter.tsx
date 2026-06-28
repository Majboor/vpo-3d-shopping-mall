import { useState } from "react";
import { Link } from "react-router-dom";
import { Check, Loader2 } from "lucide-react";

type Status = "idle" | "loading" | "success";

const WaitlistFooter = () => {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<Status>("idle");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (status === "loading") return;
    setStatus("loading");
    // Simulate the request lifecycle so the UI reflects real states.
    window.setTimeout(() => {
      console.log("Email submitted:", email);
      setEmail("");
      setStatus("success");
      window.setTimeout(() => setStatus("idle"), 4000);
    }, 900);
  };

  return (
    <footer className="relative z-10 bg-[#050505] border-t border-white/5">
      {/* Waitlist CTA */}
      <div className="max-w-[1600px] mx-auto px-6 md:px-10 py-24 md:py-32">
        <div className="max-w-xl mx-auto text-center">
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl text-white italic mb-6">
            Join the Vanguard.
          </h2>
          <p className="text-base text-white/40 font-sans leading-relaxed mb-10">
            Access is currently limited to waitlist members and partner invites. Secure your place in the queue.
          </p>
          <Link
            to="/business#bp-join"
            className="mb-10 inline-flex border border-white/20 px-6 py-3 text-[10px] uppercase tracking-[0.22em] text-white hover:bg-white hover:text-black transition-colors"
          >
            Contact Us
          </Link>

          {/* Email Form */}
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1 relative group">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                disabled={status !== "idle"}
                className="w-full bg-transparent border-b border-white/20 py-3 text-white placeholder:text-white/30 font-sans text-sm focus:outline-none focus:border-white transition-colors disabled:opacity-50"
                required
              />
              {/* Animated focus underline that draws in from the left */}
              <span className="pointer-events-none absolute bottom-0 left-0 h-px w-full origin-left scale-x-0 bg-white transition-transform duration-500 ease-out group-focus-within:scale-x-100" />
            </div>
            <button
              type="submit"
              disabled={status === "loading"}
              className="group relative overflow-hidden px-8 py-3 bg-white text-black text-sm tracking-[0.15em] uppercase font-sans transition-colors whitespace-nowrap disabled:cursor-not-allowed"
            >
              {/* Sheen sweep on hover */}
              <span className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-black/10 to-transparent transition-transform duration-700 ease-out group-hover:translate-x-full" />
              <span className="relative flex items-center justify-center gap-2">
                {status === "loading" && (
                  <>
                    <Loader2 size={14} className="animate-spin" />
                    Securing…
                  </>
                )}
                {status === "success" && (
                  <>
                    <Check size={14} strokeWidth={2.5} />
                    You&apos;re on the list
                  </>
                )}
                {status === "idle" && "Request Access"}
              </span>
            </button>
          </form>
          {/* Live status line — a quiet confirmation, editorial in tone */}
          <p
            aria-live="polite"
            className={`mt-4 text-[11px] uppercase tracking-[0.2em] text-vpo-secure transition-opacity duration-500 ${
              status === "success" ? "opacity-100" : "opacity-0"
            }`}
          >
            Welcome to the vanguard — watch your inbox.
          </p>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/5">
        <div className="max-w-[1600px] mx-auto px-6 md:px-10 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-xs text-white/30 font-sans">
              © 2024 VPO Labs.
            </p>
            <div className="flex items-center gap-6">
              <a
                href="#"
                className="link-underline text-xs text-white/30 font-sans hover:text-white transition-colors"
              >
                Instagram
              </a>
              <a
                href="#"
                className="link-underline text-xs text-white/30 font-sans hover:text-white transition-colors"
              >
                Twitter
              </a>
              <a
                href="#"
                className="link-underline text-xs text-white/30 font-sans hover:text-white transition-colors"
              >
                Discord
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default WaitlistFooter;
