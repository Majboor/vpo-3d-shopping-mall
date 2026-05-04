import { Link } from "react-router-dom";

const posts = [
  {
    label: "Go-to-market",
    title: "How we signed the first three stores.",
    image: "https://images.unsplash.com/photo-1529139574466-a303027c1d8b?q=80&w=2574&auto=format&fit=crop",
    intro:
      "The first stores did not sign because VPO was abstractly futuristic. They signed because the demo was built around their exact assets, categories, and customer questions.",
    sections: [
      "We led with a working visual prototype instead of a deck. Each brand saw its own campaign photography, product logic, and merchandising language inside the first conversation.",
      "The pitch changed from '3D commerce is interesting' to 'your current catalog already contains enough material to become a world.' That made the value practical.",
      "The strongest signal was repeat questions about analytics, inventory sync, AI styling, and whether the same experience could be used for drops.",
    ],
  },
  {
    label: "Product workflow",
    title: "How VPO enhanced existing storefront assets.",
    image: "https://kelvinhaus.com/cdn/shop/files/519A0217.jpg?v=1763374584&width=2450",
    intro:
      "The system starts by respecting what a retailer already has: imagery, copy, categories, products, and service promises.",
    sections: [
      "For Kelvin Haus, the asset language was streetwear, materials, and sustainability. We turned the catalog into a drop archive with story points beside the garments.",
      "For Zuhd, the asset language was heritage, modest fashion, tailoring, prayer objects, and community giving. We slowed the experience down and gave context room to breathe.",
      "For Optica, the asset language was comparison: shape, prescription, lens, and use case. We made the store feel like a fitting wall instead of an endless grid.",
    ],
  },
  {
    label: "AI commerce",
    title: "Making the stores AI-native.",
    image: "https://shopoptica.com/wp-content/uploads/2025/07/optica-banner-2025.webp",
    intro:
      "The spatial storefront is the first layer. The AI layer makes each room react to shopper intent.",
    sections: [
      "The next version asks the shopper what they are trying to solve before pushing products: occasion, fit, modesty, color, prescription need, material preference, budget, or drop interest.",
      "AI guidance lets each brand preserve its voice while making discovery faster. It is not a generic chatbot bolted onto a page; it is a concierge inside the retail world.",
      "For operators, the AI layer also becomes proof: which rooms drove dwell time, which prompts created bundles, and where shoppers needed confidence before checkout.",
    ],
  },
  {
    label: "Brand strategy",
    title: "Why each brand needed a different world.",
    image: "https://cdn.shopify.com/s/files/1/0726/9616/8768/files/DSC07425-Edit.jpg?v=1728308074",
    intro:
      "A single 3D template would have flattened the brands. The point of VPO is to make every company feel more like itself.",
    sections: [
      "Kelvin Haus needed speed, drop culture, and material proof. Zuhd needed ceremony, trust, and heritage. Optica needed comparison, precision, and fit confidence.",
      "That difference matters because the best commerce experiences do not just display products. They explain why the brand exists and why a shopper should believe it.",
      "This is the wedge: VPO uses each retailer's existing assets to build a differentiated retail world, then layers AI on top to make that world easier to shop.",
    ],
  },
];

const Blog = () => {
  return (
    <main className="min-h-screen bg-[#f7f3ea] text-[#171512]">
      <nav className="sticky top-0 z-50 flex h-16 items-center justify-between border-b border-stone-300 bg-[#f7f3ea]/95 px-5 backdrop-blur md:px-10">
        <Link to="/" className="font-serif text-2xl italic tracking-tight">
          VPO.
        </Link>
        <div className="hidden items-center gap-8 md:flex">
          <Link to="/case-studies" className="font-mono text-[10px] uppercase tracking-[0.2em] text-stone-500 hover:text-stone-950">
            Case Studies
          </Link>
          <Link to="/business" className="font-mono text-[10px] uppercase tracking-[0.2em] text-stone-500 hover:text-stone-950">
            Business
          </Link>
        </div>
      </nav>

      <section className="px-5 py-20 md:px-10 md:py-28">
        <div className="mx-auto max-w-[1500px]">
          <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-stone-500">Journal / Blogs / Founder notes</p>
          <div className="mt-6 grid gap-10 border-b border-stone-300 pb-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-end">
            <h1 className="font-serif text-6xl font-light italic leading-[0.92] tracking-[-0.05em] md:text-8xl lg:text-9xl">
              The story behind the stores.
            </h1>
            <p className="max-w-2xl text-lg font-light leading-8 text-stone-600">
              One blog page for the full narrative: how the first brands differed, how VPO enhanced their assets, and why the platform is becoming an AI-native commerce layer.
            </p>
          </div>
        </div>
      </section>

      <section className="px-5 pb-20 md:px-10 md:pb-28">
        <div className="mx-auto grid max-w-[1500px] gap-12">
          {posts.map((post, index) => (
            <article key={post.title} className="grid border-b border-stone-300 pb-12 lg:grid-cols-[0.85fr_1.15fr]">
              <div className={`${index % 2 === 1 ? "lg:order-2" : ""} min-h-[520px] overflow-hidden bg-stone-200`}>
                <img src={post.image} alt={post.title} className="h-full w-full object-cover grayscale" />
              </div>
              <div className="bg-[#fffdf8] p-6 md:p-10">
                <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-stone-500">{post.label}</p>
                <h2 className="mt-5 font-serif text-5xl font-light italic leading-none tracking-[-0.04em] md:text-7xl">{post.title}</h2>
                <p className="mt-8 max-w-2xl text-lg font-light leading-8 text-stone-600">{post.intro}</p>
                <div className="mt-10 divide-y divide-stone-300 border-y border-stone-300">
                  {post.sections.map((section, sectionIndex) => (
                    <p key={section} className="grid gap-4 py-5 text-sm leading-7 text-stone-700 md:grid-cols-[48px_1fr]">
                      <span className="font-mono text-[10px] text-stone-400">{String(sectionIndex + 1).padStart(2, "0")}</span>
                      <span>{section}</span>
                    </p>
                  ))}
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
};

export default Blog;
