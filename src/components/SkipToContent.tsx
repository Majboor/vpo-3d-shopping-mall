/**
 * A keyboard-only "skip to content" link. It is visually hidden until it
 * receives focus, letting keyboard and screen-reader users jump past the
 * fixed navigation straight to the primary content region.
 *
 * Pair with an element that has `id="main-content"` and `tabIndex={-1}`.
 */
const SkipToContent = () => (
  <a
    href="#main-content"
    className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[200] focus:rounded-sm focus:bg-white focus:px-4 focus:py-2 focus:text-sm focus:font-medium focus:uppercase focus:tracking-widest focus:text-black focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-black"
  >
    Skip to content
  </a>
);

export default SkipToContent;
