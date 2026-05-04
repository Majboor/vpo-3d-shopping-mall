import { Link } from "react-router-dom";
import ScrollReveal from "@/components/ScrollReveal";

const heroStory = {
  image: "https://images.unsplash.com/photo-1509631179647-0177331693ae?q=80&w=2576&auto=format&fit=crop",
  category: "Partner case study",
  date: "May 2026",
  title: "How VPO turned three retail catalogs into shoppable worlds.",
  description:
    "A field report on signing the first stores, using existing brand assets, and converting static ecommerce into AI-guided spatial storefronts with measurable traction.",
};

const editorials = [
  {
    image: "https://kelvinhaus.com/cdn/shop/files/519A0634.jpg?v=1763372948&width=2260",
    category: "Case Study",
    date: "Store 01",
    title: "Kelvin Haus: sustainable streetwear as a materials-led flagship.",
    description:
      "How recycled materials, NFC/NFT storytelling, and UAE-made apparel become rooms, product hotspots, and campaign moments inside VPO.",
  },
  {
    image: "https://cdn.shopify.com/s/files/1/0726/9616/8768/files/DSC07408.jpg?v=1728478980",
    category: "Case Study",
    date: "Store 02",
    title: "Zuhd: heritage, modest fashion, and community impact in one world.",
    description:
      "A visual breakdown of turning keffiyehs, thobes, prayer mats, accessories, and giving-led copy into an explorable digital district.",
  },
  {
    image: "https://shopoptica.com/wp-content/uploads/2026/04/k041-2.webp",
    category: "Case Study",
    date: "Store 03",
    title: "Optica: eyewear discovery rebuilt around try-on and shape.",
    description:
      "From frame shapes and lenses to comparison walls, virtual mirrors, and AI-assisted style guidance for higher-confidence purchases.",
  },
];

const blogs = [
  {
    label: "Go-to-market",
    title: "How we signed the first three stores.",
    copy: "The demo motion, founder-led sales notes, and the exact proof points that helped brands understand why VPO is more than a pretty 3D layer.",
  },
  {
    label: "Product",
    title: "How we used VPO to enhance existing storefront assets.",
    copy: "The playbook: wait for real pages to load, capture clean source material, map brand DNA, then build spatial rooms that preserve the retailer's actual language.",
  },
  {
    label: "AI Commerce",
    title: "Making stores AI-native after the first spatial build.",
    copy: "Why the next step is an AI concierge for style intent, bundles, room navigation, fit confidence, and operator analytics across every signed store.",
  },
  {
    label: "YC Proof",
    title: "What 150K+ MRR across stores says about the wedge.",
    copy: "The traction page behind the product: signed stores, pilot pipeline, store revenue context, visual proof, and why retailers are asking for measurable immersion.",
  },
];

const JournalSection = () => {
  return (
    <section id="journal" className="relative z-10 border-t border-stone-200 bg-[#F7F3EA] text-[#171512]">
      <div className="mx-auto max-w-[1800px] px-5 py-20 md:px-12 md:py-28">
        <ScrollReveal>
          <div className="grid gap-8 border-b border-stone-300 pb-10 lg:grid-cols-[0.75fr_1.25fr] lg:items-end">
            <div>
              <span className="font-mono text-[10px] uppercase tracking-[0.28em] text-stone-500">
                Journal / Case Studies / Field Notes
              </span>
              <h2 className="mt-5 font-serif text-6xl font-light italic leading-none tracking-[-0.04em] md:text-8xl">
                The VPO Journal.
              </h2>
            </div>
            <p className="max-w-3xl text-lg font-light leading-8 text-stone-600">
              A Vogue-style editorial archive for the business story: how VPO signs stores, turns brand assets into worlds,
              enhances retail experiences with AI, and packages traction for investors.
            </p>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={0.1}>
          <article className="grid border-b border-stone-300 py-10 lg:grid-cols-[1.15fr_0.85fr]">
            <div className="min-h-[520px] overflow-hidden bg-stone-200 lg:min-h-[680px]">
              <img src={heroStory.image} alt={heroStory.title} className="h-full w-full object-cover grayscale" />
            </div>
            <div className="flex flex-col justify-between bg-[#fffdf8] p-6 md:p-10">
              <div>
                <div className="flex items-center justify-between gap-4 border-b border-stone-200 pb-5">
                  <span className="font-mono text-[10px] uppercase tracking-[0.24em] text-stone-500">{heroStory.category}</span>
                  <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-stone-400">{heroStory.date}</span>
                </div>
                <h3 className="mt-8 font-serif text-5xl font-light italic leading-[0.98] tracking-[-0.04em] md:text-7xl">
                  {heroStory.title}
                </h3>
                <p className="mt-8 max-w-xl text-base leading-8 text-stone-600">{heroStory.description}</p>
              </div>
              <Link
                to="/case-studies"
                className="mt-10 inline-flex w-fit border border-stone-950 px-5 py-3 font-mono text-[10px] uppercase tracking-[0.22em] transition-colors hover:bg-stone-950 hover:text-white"
              >
                Read the proof
              </Link>
            </div>
          </article>
        </ScrollReveal>

        <div className="grid gap-8 border-b border-stone-300 py-10 lg:grid-cols-3">
          {editorials.map((article, index) => (
            <ScrollReveal key={article.title} delay={0.1 * index}>
              <article className="group">
                <div className="aspect-[3/4] overflow-hidden bg-stone-200">
                  <img src={article.image} alt={article.title} className="h-full w-full object-cover grayscale transition-all duration-700 group-hover:grayscale-0" />
                </div>
                <div className="mt-6 border-t border-stone-300 pt-5">
                  <div className="flex items-center justify-between gap-3">
                    <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-stone-500">{article.category}</span>
                    <span className="font-mono text-[9px] uppercase tracking-[0.18em] text-stone-400">{article.date}</span>
                  </div>
                  <h3 className="mt-4 font-serif text-3xl font-light italic leading-tight tracking-[-0.02em]">{article.title}</h3>
                  <p className="mt-4 text-sm leading-7 text-stone-600">{article.description}</p>
                </div>
              </article>
            </ScrollReveal>
          ))}
        </div>

        <div className="grid gap-10 pt-10 lg:grid-cols-[0.55fr_1.45fr]">
          <div>
            <span className="font-mono text-[10px] uppercase tracking-[0.28em] text-stone-500">Blogs</span>
            <h3 className="mt-5 font-serif text-5xl font-light italic leading-none tracking-[-0.03em]">
              How we did it.
            </h3>
          </div>
          <div className="divide-y divide-stone-300 border-y border-stone-300">
            {blogs.map((post) => (
              <article key={post.title} className="grid gap-5 py-7 md:grid-cols-[170px_1fr_32px] md:items-start">
                <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-stone-500">{post.label}</span>
                <div>
                  <h4 className="font-serif text-3xl font-light italic tracking-[-0.02em]">{post.title}</h4>
                  <p className="mt-3 max-w-3xl text-sm leading-7 text-stone-600">{post.copy}</p>
                </div>
                <Link to="/blog" className="hidden text-right font-mono text-xl text-stone-500 hover:text-stone-950 md:block">
                  →
                </Link>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default JournalSection;
