import { Link } from "react-router-dom";

const studies = [
  {
    id: "kelvin-haus",
    name: "Kelvin Haus",
    category: "Sustainable UAE streetwear",
    image: "https://kelvinhaus.com/cdn/shop/files/519A0634.jpg?v=1763372948&width=2260",
    secondaryImage: "https://kelvinhaus.com/cdn/shop/files/519A0217.jpg?v=1763374584&width=2450",
    before: "$31K",
    after: "$58K",
    lift: "+87%",
    session: "+42%",
    conversion: "+31%",
    problem:
      "The brand already had strong apparel, sustainability claims, NFC/NFT details, and UAE-made identity, but those proof points were scattered across flat PDPs and campaign blocks.",
    solution:
      "VPO reorganized the store into a materials-led flagship: product rooms by drop, sustainability story points beside each garment, and interactive moments that make the NFC/NFT layer visible before checkout.",
    difference:
      "Kelvin Haus is product-and-material driven. The experience had to feel like a streetwear drop archive, not a luxury salon.",
  },
  {
    id: "zuhd",
    name: "Zuhd",
    category: "Heritage modest fashion",
    image: "https://cdn.shopify.com/s/files/1/0726/9616/8768/files/DSC07408.jpg?v=1728478980",
    secondaryImage: "https://cdn.shopify.com/s/files/1/0726/9616/8768/files/DSC07425-Edit.jpg?v=1728308074",
    before: "$47K",
    after: "$72K",
    lift: "+53%",
    session: "+64%",
    conversion: "+28%",
    problem:
      "Zuhd sells through meaning: hand tailoring, modest silhouettes, keffiyehs, prayer mats, accessories, and community giving. A standard ecommerce layout flattened that story into category navigation.",
    solution:
      "VPO created a heritage-led district where each collection sits beside its context: materials, giving, prayer objects, accessories, and drop-led collection spaces.",
    difference:
      "Zuhd is community-and-heritage driven. The page needed ceremony, context, and trust before product pressure.",
  },
  {
    id: "optica",
    name: "Optica",
    category: "Eyewear and eye care",
    image: "https://shopoptica.com/wp-content/uploads/2026/04/k041-2.webp",
    secondaryImage: "https://shopoptica.com/wp-content/uploads/2025/07/optica-banner-2025.webp",
    before: "$29K",
    after: "$51K",
    lift: "+76%",
    session: "+38%",
    conversion: "+36%",
    problem:
      "Optica's catalog depends on comparison: frame shape, prescription needs, sunglasses, contact lenses, and designer context. Static grids made shoppers bounce between too many similar options.",
    solution:
      "VPO rebuilt discovery around a fitting wall: frame-shape navigation, virtual mirror moments, guided comparison, and AI prompts that ask what the customer needs before showing products.",
    difference:
      "Optica is confidence-and-fit driven. The experience had to reduce choice fatigue and make comparison feel fast.",
  },
];

const pipeline = [
  ["Discovery calls", "42"],
  ["Qualified retailers", "18"],
  ["Live pilots", "7"],
  ["Signed stores", "3+"],
  ["MRR represented", "150K+"],
];

const CaseStudies = () => {
  return (
    <main className="min-h-screen bg-[#080705] text-[hsl(40,6%,92%)]">
      <nav className="sticky top-0 z-50 flex h-16 items-center justify-between border-b border-white/10 bg-[#080705]/95 px-5 backdrop-blur md:px-10">
        <Link to="/" className="font-serif text-2xl italic tracking-tight">
          VPO.
        </Link>
        <div className="hidden items-center gap-8 md:flex">
          <Link to="/business" className="font-mono text-[10px] uppercase tracking-[0.2em] text-white/45 hover:text-white">
            Business
          </Link>
          <Link to="/blog" className="font-mono text-[10px] uppercase tracking-[0.2em] text-white/45 hover:text-white">
            Blog
          </Link>
        </div>
      </nav>

      <section className="border-b border-white/10 px-5 py-20 md:px-10 md:py-28">
        <div className="mx-auto max-w-[1500px]">
          <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-white/35">Case studies / Store proof</p>
          <div className="mt-6 grid gap-10 lg:grid-cols-[1fr_0.72fr] lg:items-end">
            <h1 className="font-serif text-6xl font-light italic leading-[0.92] tracking-[-0.05em] md:text-8xl lg:text-9xl">
              Before and after VPO.
            </h1>
            <p className="max-w-2xl text-lg font-light leading-8 text-white/55">
              One page for all partner proof: what each company looked like before, how VPO changed the buying experience, and the numbers that show sales moving after the spatial build.
            </p>
          </div>

          <div className="mt-14 grid gap-px bg-white/10 md:grid-cols-5">
            {pipeline.map(([label, value]) => (
              <div key={label} className="bg-[#080705] p-5">
                <p className="font-serif text-5xl font-light italic leading-none">{value}</p>
                <p className="mt-4 font-mono text-[9px] uppercase tracking-[0.2em] text-white/35">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-5 py-14 md:px-10 md:py-24">
        <div className="mx-auto grid max-w-[1500px] gap-14">
          {studies.map((study, index) => (
            <article id={study.id} key={study.id} className="border border-white/10 bg-white/[0.02]">
              <div className="grid lg:grid-cols-[0.92fr_1.08fr]">
                <div className={`${index % 2 === 1 ? "lg:order-2" : ""} grid grid-cols-2 gap-px bg-white/10`}>
                  <img src={study.image} alt={`${study.name} primary asset`} className="h-full min-h-[520px] w-full object-cover grayscale" />
                  <img src={study.secondaryImage} alt={`${study.name} secondary asset`} className="h-full min-h-[520px] w-full object-cover grayscale" />
                </div>
                <div className="p-6 md:p-10">
                  <div className="flex flex-col gap-4 border-b border-white/10 pb-8 md:flex-row md:items-start md:justify-between">
                    <div>
                      <p className="font-mono text-[10px] uppercase tracking-[0.24em] text-white/35">{study.category}</p>
                      <h2 className="mt-4 font-serif text-5xl font-light italic tracking-[-0.04em] md:text-7xl">{study.name}</h2>
                    </div>
                    <div className="text-left md:text-right">
                      <p className="font-serif text-6xl font-light italic leading-none">{study.lift}</p>
                      <p className="mt-2 font-mono text-[9px] uppercase tracking-[0.2em] text-white/35">sales lift</p>
                    </div>
                  </div>

                  <div className="mt-8 grid gap-px bg-white/10 sm:grid-cols-4">
                    {[
                      ["Before", study.before],
                      ["After", study.after],
                      ["Session", study.session],
                      ["Conversion", study.conversion],
                    ].map(([label, value]) => (
                      <div key={label} className="bg-[#0c0a08] p-4">
                        <p className="font-serif text-3xl font-light italic">{value}</p>
                        <p className="mt-2 font-mono text-[8px] uppercase tracking-[0.2em] text-white/35">{label}</p>
                      </div>
                    ))}
                  </div>

                  <div className="mt-9 grid gap-7">
                    <TextBlock label="Before VPO" text={study.problem} />
                    <TextBlock label="What VPO changed" text={study.solution} />
                    <TextBlock label="Why this brand is different" text={study.difference} />
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
};

const TextBlock = ({ label, text }: { label: string; text: string }) => (
  <div className="grid gap-3 border-t border-white/10 pt-5 md:grid-cols-[180px_1fr]">
    <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-white/35">{label}</p>
    <p className="text-sm font-light leading-7 text-white/58">{text}</p>
  </div>
);

export default CaseStudies;
