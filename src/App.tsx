import { lazy, Suspense } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import SkipToContent from "@/components/SkipToContent";
import Index from "./pages/Index";
import CommandMenu from "./components/vpo/CommandMenu";

// Route-level code splitting. The heavy 3D (Three.js) and secondary pages are
// lazy-loaded so the landing route ships without the ~1.1 MB Three.js bundle;
// each page's code is fetched only when its route is actually visited.
const NotFound = lazy(() => import("./pages/NotFound"));
const Scene2Test = lazy(() => import("./pages/Scene2Test"));
const Scene3Test = lazy(() => import("./pages/Scene3Test"));
const GalleryEditorial = lazy(() => import("./pages/GalleryEditorial"));
const Atelier = lazy(() => import("./pages/Atelier"));
const Fashion3DTest = lazy(() => import("./pages/Fashion3DTest"));
const VPOBusiness = lazy(() => import("./pages/VPOBusiness"));
const CaseStudies = lazy(() => import("./pages/CaseStudies"));
const Blog = lazy(() => import("./pages/Blog"));

const queryClient = new QueryClient();

const RouteFallback = () => (
  <div
    className="flex min-h-screen items-center justify-center bg-background"
    role="status"
    aria-live="polite"
  >
    <span className="sr-only">Loading…</span>
    <div
      className="h-10 w-10 animate-spin rounded-full border-2 border-muted border-t-foreground motion-reduce:animate-none"
      aria-hidden="true"
    />
  </div>
);

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <SkipToContent />
        <CommandMenu />
        <Suspense fallback={<RouteFallback />}>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/scene2-test" element={<Scene2Test />} />
            <Route path="/scene3-test" element={<Scene3Test />} />
            <Route path="/gallery" element={<GalleryEditorial />} />
            <Route path="/atelier" element={<Atelier />} />
            <Route path="/fashion-3d-test" element={<Fashion3DTest />} />
            <Route path="/vpo-business" element={<VPOBusiness />} />
            <Route path="/business" element={<VPOBusiness />} />
            <Route path="/case-studies" element={<CaseStudies />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/journal" element={<Blog />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
