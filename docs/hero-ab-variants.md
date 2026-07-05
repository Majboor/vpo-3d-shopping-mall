# Landing Hero A/B Variants

The landing entry screen (the "select your experience" gate rendered before the
3D walkthrough) supports a lightweight client-side A/B experiment, toggled by a
URL query parameter.

## How to switch

| URL | Variant | Component |
| --- | --- | --- |
| `/` or `/?variant=a` | **A** (default / control) | `src/components/VersionSelector.tsx` |
| `/?variant=b` | **B** (alternate) | `src/components/VersionSelectorB.tsx` |

The parameter is read once at mount by `src/hooks/useHeroVariant.ts`
(`readHeroVariant` / `useHeroVariant`). Any value other than `b` falls back to
variant A, so existing links are unaffected.

## What differs

Both arms share the identical `onSelect(premium | lite)` contract, so the rest
of the flow (frame-sequence loading, lite hero) is untouched.

| Dimension | Variant A (control) | Variant B |
| --- | --- | --- |
| **Layout** | Centered stack, two equal bordered option cards side by side | Asymmetric editorial split — headline left, entry choices right |
| **Headline** | `VIRTUAL PREMIUM OUTLETS` / `SELECT YOUR EXPERIENCE` | `The store, reimagined as a place you walk into.` (benefit-led) |
| **CTA** | Two visually equal buttons (`PREMIUM` / `LITE`) | One primary action (`ENTER THE FLAGSHIP` → premium) + a quiet secondary link (`Skip to the lookbook` → lite) |

Variant B also shows a small `VARIANT B` marker in the top-right corner for
quick QA identification.

## Where it is wired

`src/components/FrameSequence.tsx` picks the component while `viewMode === 'select'`:

```tsx
if (viewMode === 'select') {
  return heroVariant === 'b'
    ? <VersionSelectorB onSelect={handleVersionSelect} />
    : <VersionSelector onSelect={handleVersionSelect} />;
}
```

## Verification

Built with `npm run build` and exercised on a `vite preview` server with headless
Chromium:

- `/` renders variant A (`SELECT YOUR EXPERIENCE`), no variant-B copy present.
- `/?variant=b` renders variant B (`ENTER THE FLAGSHIP`), no variant-A copy present.
- Clicking the variant-B primary CTA advances past the select screen into the
  premium loader — the `onSelect` contract is honored.
- Zero console/page errors in either arm.
