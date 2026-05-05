# 🎯 Hero Section - Visual Reference & File Map

## 📂 Project Structure After Implementation

```
indians-in-korea/
│
├── src/
│   ├── app/
│   │   ├── layout.tsx
│   │   ├── page.tsx ⭐ Uses: <Hero />
│   │   ├── globals.css
│   │   └── favicon.ico
│   │
│   ├── components/
│   │   ├── atoms/
│   │   │   ├── Button.tsx ✨ NEW - Reusable button
│   │   │   │   └── Variants: primary | secondary
│   │   │   ├── Heading.tsx
│   │   │   ├── Link.tsx
│   │   │   ├── Logo.tsx
│   │   │   ├── Paragraph.tsx
│   │   │   └── index.ts (exports Button)
│   │   │
│   │   ├── molecules/
│   │   │   ├── FloatingCard.tsx ✨ NEW - Info overlay cards
│   │   │   │   └── Positions: top-right | middle-right | bottom-center
│   │   │   ├── ButtonGroup.tsx
│   │   │   ├── IconButton.tsx
│   │   │   ├── SecondaryButton.tsx
│   │   │   ├── TextSection.tsx
│   │   │   └── index.ts (exports FloatingCard)
│   │   │
│   │   ├── organisms/
│   │   │   ├── Hero.tsx ✨ REFACTORED - Main section
│   │   │   │   └── Client component with GSAP animations
│   │   │   ├── HeroText.tsx ✨ NEW - Left content
│   │   │   │   ├── Badge
│   │   │   │   ├── Headline (orange highlight)
│   │   │   │   ├── Description
│   │   │   │   ├── Buttons (Primary + Secondary)
│   │   │   │   └── Stats
│   │   │   ├── HeroVisual.tsx ✨ NEW - Right content
│   │   │   │   ├── Circular image container
│   │   │   │   └── FloatingCard overlays
│   │   │   └── index.ts (exports all)
│   │   │
│   │   ├── templates/
│   │   │   ├── MainLayout.tsx (updated)
│   │   │   └── index.ts
│   │   │
│   │   └── index.ts (barrel export)
│   │
│   ├── hooks/
│   │   ├── useHeroAnimations.ts ✨ NEW - GSAP logic
│   │   └── index.ts (exports hook)
│   │
│   ├── constants/
│   │   └── index.ts (HERO_CONSTANTS added)
│   │
│   ├── config/
│   ├── context/
│   ├── i18n/
│   ├── assets/
│   └── util/
│
├── public/
│   ├── next.svg
│   ├── vercel.svg
│   └── bridge-illustration.jpg ← ADD YOUR IMAGE HERE
│
├── package.json ✨ UPDATED (added gsap)
├── tsconfig.json
├── next.config.ts
├── tailwind.config.js
├── postcss.config.mjs
├── eslint.config.mjs
```

---

## 🎨 Component Dependency Graph

```
page.tsx
│
└─── MainLayout (Template)
     │
     └─── Hero (Organism) 🎬 Client Component
          │
          ├─── HeroText (Organism)
          │    ├─── Button (Atom) x2
          │    │    └─── Tailwind styles
          │    ├─── Badge (text)
          │    ├─── Headline (split + orange highlight)
          │    ├─── Description (text)
          │    └─── Stats (3 items)
          │
          └─── HeroVisual (Organism)
               ├─── Image (Next.js optimized)
               └─── FloatingCard (Molecule) x3
                    ├─── Title
                    ├─── Subtitle
                    ├─── Icon (emoji)
                    └─── Position props

useHeroAnimations Hook
│
├─── gsap.fromTo() - Text animation
├─── gsap.fromTo() - Visual animation
└─── gsap.to() - Floating cards loop

HERO_CONSTANTS
│
├─── badge text
├─── headline + highlight word
├─── description
├─── primaryCta config
├─── secondaryCta config
├─── stats array
└─── floatingCards array
```

---

## 🔄 Data Flow

```
HERO_CONSTANTS (src/constants/index.ts)
    ↓
    ├─→ Hero.tsx receives via direct import
    │   ├─→ HeroText (props: badge, headline, etc.)
    │   │   └─→ Renders: Badge, Headline, Description, Buttons, Stats
    │   └─→ HeroVisual (props: floatingCards)
    │       └─→ FloatingCard × 3 for each item
    │
    └─→ useHeroAnimations Hook
        ├─→ containerRef (Hero section)
        ├─→ textRef (HeroText container)
        └─→ visualRef (HeroVisual container)
            └─→ gsap animations trigger on page load
```

---

## 📊 Component Tree (HTML Structure)

```html
<section> ← Hero (with ref for GSAP)
  ref="containerRef"
  class="relative w-full bg-gradient-to-br from-orange-50 to-blue-50"

  <div> ← Main container
    class="max-w-7xl mx-auto px-4 md:px-8 lg:px-16 py-12 md:py-20 lg:py-32"

    <div> ← Grid container
      class="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 lg:gap-16"

      <!-- TEXT SECTION -->
      <div ref="textRef"> ← HeroText (fade-in + slide-up animation)

        <div> ← Badge
          class="inline-flex items-center gap-2 bg-orange-100 text-orange-600"
          ⊙ KOREA'S LARGEST INDIAN NETWORK

        <h1> ← Headline
          Connecting <span class="text-orange-500">Indians</span> Across Korea

        <p> ← Description
          Bridging cultures and communities...

        <div> ← Button Group
          <Button variant="primary" icon="→">Explore Events</Button>
          <Button variant="secondary">Our Mission</Button>

        <div> ← Stats
          <div>5k+<p>Members</p></div>
          <div>120+<p>Events</p></div>
          <div>15+<p>Organizations</p></div>

      <!-- VISUAL SECTION -->
      <div ref="visualRef"> ← HeroVisual (fade-in + scale animation)

        <div> ← Image container
          class="relative w-72 h-72 md:w-96 md:h-96 rounded-full overflow-hidden shadow-2xl"

          <Image src="/bridge-illustration.jpg" />

        <div> ← Floating cards container
          class="absolute inset-0"

          <div data-floating-card> ← Card 1 (bob animation)
            <FloatingCard
              title="Live Connections"
              subtitle="842 online now"
              icon="🌐"
              position="top-right"
            />

          <div data-floating-card> ← Card 2
            <FloatingCard ... position="middle-right" />

          <div data-floating-card> ← Card 3
            <FloatingCard ... position="bottom-center" />

      <!-- DECORATIVE ELEMENTS -->
      <div> ← Gradient blur (top-right)
        class="absolute top-0 right-0 w-96 h-96 bg-blue-200 blur-3xl opacity-20 -z-10"

      <div> ← Gradient blur (bottom-left)
        class="absolute bottom-0 left-0 w-72 h-72 bg-orange-200 blur-3xl opacity-20 -z-10"
</section>
```

---

## 🎬 Animation Timeline

```javascript
Timeline:
0ms    ┌─────────────────────────────────────────────┐
       │ Text Fade-in + Slide-up (800ms)             │
       │ opacity: 0 → 1, y: 40px → 0                 │
       └─────────────────────────────────────────────┘
       │
200ms  │           ┌─────────────────────────────────┐
       │           │ Visual Fade-in + Scale (800ms)  │
       │           │ opacity: 0 → 1, scale: 0.9 → 1  │
       │           └─────────────────────────────────┘
       │
1000ms │                    ┌───────────────────────────────────────────────┐
       │                    │ Floating Cards Bob Animation (infinite)      │
       │                    │ ↑ ↓ ↑ ↓ ↑ ↓ ... (sine wave, 3s each)        │
       │                    └───────────────────────────────────────────────┘
       │
       └─────────────────────────────────────────────────────────────────────►
         Time (milliseconds)
```

---

## 🎯 Responsive Breakpoints

```
Mobile                  Tablet                  Desktop
(< 768px)              (768px - 1024px)        (> 1024px)

┌──────────────┐       ┌──────────┬──────────┐  ┌──────────┬──────────┐
│   Text       │       │   Text   │          │  │   Text   │          │
│   Content    │       │          │ Visual   │  │          │ Visual   │
├──────────────┤       │          │  with    │  │          │  with    │
│              │       ├──────────┤ Floating │  ├──────────┤ Floating │
│   Visual     │       │ Floating │  Cards   │  │ Floating │  Cards   │
│   with       │       │  Cards   │          │  │  Cards   │          │
│   Cards      │       │          │          │  │          │          │
│              │       │          │          │  │          │          │
└──────────────┘       └──────────┴──────────┘  └──────────┴──────────┘

Heading:              Heading:                 Heading:
text-4xl             text-5xl                 text-6xl

Padding:             Padding:                 Padding:
px-4, py-12          px-8, py-20              px-16, py-32

Gap:                 Gap:                     Gap:
gap-8                gap-12                   gap-16

Classes:             Classes:                 Classes:
grid-cols-1          grid-cols-2 (from md:)   grid-cols-2 (from lg:)
```

---

## 🎨 Color Palette

```
Primary Orange
┌─────────────────────────────────┐
│ #F97316 (orange-500)            │
│ Used for:                       │
│ • Buttons (primary)             │
│ • Headline highlight            │
│ • Stats numbers                 │
│ • Badge text                    │
└─────────────────────────────────┘

Badge Background
┌─────────────────────────────────┐
│ #FED7AA (orange-100)            │
│ Used for:                       │
│ • Badge container background    │
└─────────────────────────────────┘

Background Gradient
┌─────────────────────────────────┐
│ From: #fff7ed (orange-50)       │
│ To: #e0f2fe (blue-50)           │
│ Used for:                       │
│ • Hero section background       │
└─────────────────────────────────┘

Text Colors
┌─────────────────────────────────┐
│ Primary: #111827 (gray-900)     │
│ Used for: Headlines, body text  │
│                                 │
│ Secondary: #4b5563 (gray-600)   │
│ Used for: Descriptions, subtexts│
└─────────────────────────────────┘

Accents
┌─────────────────────────────────┐
│ Shadows: #1f2937 (gray-900)     │
│ Borders: #e5e7eb (gray-200)     │
│ Overlay: #0369a1 (blue-600)     │
└─────────────────────────────────┘
```

---

## 📝 Configuration Map

```
HERO_CONSTANTS (src/constants/index.ts)
│
├─ badge: string
│  └─ "KOREA'S LARGEST INDIAN NETWORK"
│
├─ headline: string
│  └─ "Connecting Indians Across Korea"
│
├─ highlightWord: string
│  └─ "Indians" (must exist in headline)
│
├─ description: string
│  └─ "Bridging cultures and communities..."
│
├─ primaryCta: object
│  ├─ label: "Explore Events"
│  ├─ href: "/events"
│  └─ icon: "→"
│
├─ secondaryCta: object
│  ├─ label: "Our Mission"
│  └─ href: "/mission"
│
├─ stats: array
│  ├─ { value: "5k+", label: "Members" }
│  ├─ { value: "120+", label: "Events" }
│  └─ { value: "15+", label: "Organizations" }
│
└─ floatingCards: array
   ├─ Card 1 (Live Connections)
   │  ├─ id: "live-connections"
   │  ├─ title: "Live Connections"
   │  ├─ subtitle: "842 online now"
   │  ├─ icon: "🌐"
   │  └─ position: "top-right"
   ├─ Card 2 (Bengali Association)
   │  ├─ id: "bengali-assoc"
   │  ├─ title: "Bengali Association"
   │  ├─ subtitle: "Cultural"
   │  ├─ icon: "🎭"
   │  └─ position: "middle-right"
   └─ Card 3 (Tamil Nanbargal)
      ├─ id: "tamil-nanbargal"
      ├─ title: "Tamil Nanbargal"
      ├─ subtitle: "Social"
      ├─ icon: "👥"
      └─ position: "bottom-center"
```

---

## 🚀 Implementation Checklist

### Components ✅

- [x] Button atom (primary + secondary)
- [x] FloatingCard molecule
- [x] HeroText organism
- [x] HeroVisual organism
- [x] Hero organism (main section)
- [x] useHeroAnimations hook

### Styling ✅

- [x] Tailwind CSS classes
- [x] Responsive breakpoints
- [x] Color scheme
- [x] Typography hierarchy
- [x] Spacing consistency
- [x] Shadow effects

### Animations ✅

- [x] GSAP fade-in and slide-up
- [x] GSAP fade-in and scale
- [x] GSAP infinite floating cards
- [x] Staggered animations
- [x] Smooth easing

### Features ✅

- [x] TypeScript types
- [x] Next.js Image optimization
- [x] Responsive layout
- [x] Constants centralization
- [x] Clean code separation
- [x] Documentation

---

## 📚 Documentation Files

```
Project Root/
├── HERO_IMPLEMENTATION.md ← Comprehensive technical guide
├── HERO_QUICK_REFERENCE.md ← Quick start & customization
├── HERO_CODE_EXAMPLES.md ← Copy-paste code examples
└── IMPLEMENTATION_COMPLETE.md ← This summary
```

---

## ✨ Quick Navigation

| Need              | File                       | Section                     |
| ----------------- | -------------------------- | --------------------------- |
| Full details      | HERO_IMPLEMENTATION.md     | All sections                |
| Quick start       | HERO_QUICK_REFERENCE.md    | "Quick Start"               |
| Code examples     | HERO_CODE_EXAMPLES.md      | "Component Usage"           |
| Customization     | HERO_QUICK_REFERENCE.md    | "Optional Improvements"     |
| TypeScript types  | HERO_CODE_EXAMPLES.md      | "Component Props Reference" |
| Animation details | IMPLEMENTATION_COMPLETE.md | "Animations (GSAP)"         |

---

**Status:** ✅ PRODUCTION READY  
**Date:** May 5, 2026  
**Version:** 1.0.0
