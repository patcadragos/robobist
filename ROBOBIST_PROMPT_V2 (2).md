# ROBOBIST — Website Development Prompt v3.0
> Citește TOT înainte să scrii o singură linie de cod.

---

## MISIUNEA

Construiește un website internațional B2B pentru **Robobist** — o companie de robotică ce vinde un singur produs deocamdată: **Robobist RPT-1000** (cunoscut și ca RPT-1T), un stivuitor autonom de paleți (rebranding autorizat al SEER SPT-1000, specificații identice).

**Partener strategic:** Flacăra Electric — https://flacara-electric.ro/en/

---

## INSPIRAȚIE VIZUALĂ

| Sursă | Ce preiei |
|---|---|
| **apple.com** | Simplitate radicală, produsul este vedeta, scroll storytelling, ierarhie tipografică clară, spațiu generos, animații subtile |
| **propain-bikes.com** | Configurator interactiv step-by-step, UX fluid, carduri de selecție vizuale |
| **seer-robotics.ai** | Referință tehnică produs, layout specificații |
| **bosch.com / kuka.com** | Ton serios, premium, industrial, internațional |

**Ton:** Premium industrial. Nu startup, nu jucăuș. Gândește Bosch meets Apple.

---

## STACK TEHNIC

```
Framework:     Next.js 14 (App Router)
Styling:       Tailwind CSS
Animații:      Framer Motion
Formulare:     React Hook Form + Zod
Font:          Inter (Google Fonts / next/font) — toate greutățile
Icons:         Lucide React
Images:        next/image cu placeholder blur
Deploy-ready:  Vercel
```

> ⚠️ NU există integrare AI pentru prețuri. Estimarea se calculează 100% în JavaScript pe client, instant, pe baza unui tabel de prețuri fix definit mai jos.

---

## DESIGN SYSTEM

### Culori (STRICT — zero excepții)
```css
--orange:      #F36D21;   /* CTA-uri, accente, highlights, hover states */
--white:       #FFFFFF;   /* fundal principal, text pe dark */
--gray:        #545554;   /* body text, labels, secundar */
--black:       #000000;   /* headings, footer bg */
--light-bg:    #F5F5F5;   /* secțiuni alternate */
--surface:     #FAFAFA;   /* carduri, inputs */
--border:      #E8E8E8;   /* borduri subtile */
--glass-bg:    rgba(255,255,255,0.72);  /* frosted glass surfaces */
--glass-dark:  rgba(0,0,0,0.65);       /* frosted glass dark */
```

> ⚠️ TEMĂ DESCHISĂ (LIGHT). Fundal negru DOAR pe: footer și secțiunea product-showcase.
> ⚠️ NU folosi niciun alt verde, albastru, violet, roz — NICIUNUL.

### Tipografie — Inter (ca Apple)

```css
/* IERARHIE COMPLETĂ — respectă-o PESTE TOT în site */

h1  — Inter 700, 64px desktop / 40px tablet / 32px mobile, line-height 1.05, tracking -0.02em, color #000
h2  — Inter 600, 48px desktop / 36px tablet / 28px mobile, line-height 1.1,  tracking -0.015em, color #000
h3  — Inter 600, 32px desktop / 24px tablet / 22px mobile, line-height 1.2,  tracking -0.01em, color #000
h4  — Inter 500, 20px, line-height 1.3, color #000
body      — Inter 400, 17px, line-height 1.65, color #545554
body-sm   — Inter 400, 15px, line-height 1.6,  color #545554
label     — Inter 500, 13px, uppercase, tracking 0.08em, color #545554
caption   — Inter 400, 13px, color #888
spec-num  — Inter 700, 48px, tracking -0.03em, color #000  (para numere tehnice mari)
```

Import în `layout.tsx`:
```tsx
import { Inter } from 'next/font/google'
const inter = Inter({ subsets: ['latin'], variable: '--font-inter', display: 'swap' })
```

### Frosted Glass — rețetă CSS
```css
.glass {
  background: rgba(255, 255, 255, 0.72);
  backdrop-filter: blur(20px) saturate(180%);
  -webkit-backdrop-filter: blur(20px) saturate(180%);
  border: 1px solid rgba(255, 255, 255, 0.3);
}
.glass-dark {
  background: rgba(0, 0, 0, 0.65);
  backdrop-filter: blur(20px) saturate(180%);
  -webkit-backdrop-filter: blur(20px) saturate(180%);
  border: 1px solid rgba(255,255,255,0.08);
}
```

Folosit pe: Navbar, tooltips hotspot, badge-uri flotante, carduri peste imagini.

### Imagini — Folder local `/public/ROBOBIST/`

> ⚠️ TOATE imaginile se iau DIN FOLDERUL LOCAL `/public/ROBOBIST/`. Nu folosi URL-uri externe.
> La build, Next.js servește tot ce e în `/public/` ca asset static.

**Structura așteptată a folderului (clientul o va popula):**
```
/public/ROBOBIST/
├── robot-1.png          ← imagine produs față
├── robot-2.png          ← imagine produs lateral
├── robot-3.png          ← imagine produs detaliu
├── logo-alb.png         ← logo alb (pe fundal negru: navbar, footer)
├── logo-negru.png       ← logo negru (pe fundal alb: hero, pagini deschise)
├── hero-bg.jpg          ← imagine fundal hero (opțional)
├── warehouse.jpg        ← imagine depozit (About, Contact hero)
└── partner-logo.png     ← logo Flacăra Electric
```

**Cum se referențiază în cod:**
```tsx
// Exemplu Next.js
<img src="/ROBOBIST/robot-1.png" alt="Robobist RPT-1000 autonomous pallet truck" />
<img src="/ROBOBIST/logo-alb.png" alt="Robobist" />

// SAU cu next/image (recomandat pentru performanță):
import Image from 'next/image'
<Image src="/ROBOBIST/robot-1.png" alt="Robobist RPT-1000" width={800} height={600} />
```

**Fallback temporar** — dacă un fișier lipsește din folder, folosește aceste URL-uri temporare
până clientul adaugă imaginile proprii:
```
robot-1.png  → https://cdn1.seer-group.com/static/products/SPT-1000/1.png
robot-2.png  → https://cdn1.seer-group.com/static/products/SPT-1000/2.png
robot-3.png  → https://cdn1.seer-group.com/static/products/SPT-1000/3.png
warehouse.jpg→ https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=1200&q=80
partner-logo → https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=800&q=80
```

> Implementează un helper `getImage(filename)` care încearcă `/ROBOBIST/filename` și
> cade pe fallback dacă fișierul nu există (sau pur și simplu lasă fallback-urile hardcodate
> ca `src` până clientul înlocuiește cu fișierele din folder).
> Toate imaginile TREBUIE să fie vizibile la render — zero broken icons.

---

## STRUCTURA SITE

```
/              → Home
/product       → Produs RPT-1000
/configurator  → Configurator AI ⭐ (pagina cea mai importantă)
/about         → Despre Robobist + Flacăra Electric
/contact       → Contact + Request Quote
```

API route internă:
```
/api/estimate  → POST, server-side, apelează Anthropic API (NU expune key-ul în client)
```

---

## COMPONENTE GLOBALE

### NAVBAR
- **Frosted glass** (`.glass` sau `.glass-dark` dacă e peste imagine întunecată)
- `position: fixed`, `top: 0`, `z-index: 50`, `width: 100%`
- Logo stânga: text "ROBOBIST" Inter 700 sau `<img src="/assets/logo.png" />` cu fallback text
- Linkuri centru: `Product` | `Configurator` | `About` | `Contact`
- Dreapta: language switcher `EN / RO` (vizual only) + buton CTA portocaliu `Get a Quote`
- Link activ: border-bottom 2px portocaliu
- Mobile (<1024px): hamburger → drawer animat Framer Motion cu blur overlay
- La scroll > 20px: `border-bottom: 1px solid rgba(0,0,0,0.08)`

### FOOTER
```
Background: #000000
Layout: 4 coloane desktop, 2 tablet, 1 mobile

Col 1: Logo + tagline + social icons (LinkedIn, YouTube — SVG)
Col 2: Navigation — Home, Product, Configurator, About, Contact
Col 3: Company — About Us, Partner (Flacăra Electric), Careers
Col 4: Contact — contact@robobist.com, Based in Romania · Europe

Bottom bar:
"© 2025 Robobist. All rights reserved."  |  Privacy Policy  |  Terms of Use
"In partnership with Flacăra Electric"
```

---

## HOME PAGE (`/`) — SECȚIUNI

### HERO
**Layout desktop:** 50/50 split — text stânga, imagine dreapta
**Layout mobile:** stacked — imagine sus, text jos

```
Stânga:
  [label]    "AUTONOMOUS PALLET ROBOTICS"  ← Inter 500 13px uppercase orange
  [h1]       "Logistics that
              moves itself."
  [body]     "The Robobist RPT-1000 handles 1,000 kg payloads
              with AI navigation — zero infrastructure changes required."
  [CTA 1]    "Configure Your Robot →"   ← buton portocaliu fill, 48px height
  [CTA 2]    "View Specifications"      ← link cu underline sau outline button

Dreapta:
  Imaginea robotului (SEER SPT-1000 img 1) pe fundal alb
  3 badge-uri glass flotante poziționate absolut:
    - "1,000 kg" + "Max Payload"    → stânga-sus, animat float
    - "8h"       + "Battery Life"   → dreapta-mijloc, animat float delay 0.3s
    - "±10mm"    + "Accuracy"       → stânga-jos, animat float delay 0.6s
  Badge design: .glass, Inter 700 pentru număr, Inter 400 pentru label
```

Background hero: fundal alb cu **blob gradient** portocaliu difuz (stilul din imaginea de referință — forme moi, organice, cu grain texture deasupra):

```css
/* Hero background — blob orange pe alb */
.hero-bg {
  background-color: #ffffff;
  background-image:
    radial-gradient(ellipse 80% 60% at 75% 45%, rgba(243,109,33,0.15) 0%, transparent 70%),
    radial-gradient(ellipse 50% 50% at 15% 75%, rgba(243,109,33,0.08) 0%, transparent 60%),
    radial-gradient(ellipse 35% 35% at 85% 15%, rgba(0,0,0,0.03) 0%, transparent 50%);
}

/* Grain overlay — aplicat peste orice secțiune cu gradient blob */
/* Adaugă textura premium "noise" ca în imaginea de referință */
.grain::after {
  content: '';
  position: absolute;
  inset: 0;
  background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.04'/%3E%3C/svg%3E");
  pointer-events: none;
  z-index: 1;
}
```

**Gradiențe per secțiune** — același stil blob, culori adaptate:

```css
/* Secțiuni light (Features, How It Works, Partner) */
.gradient-light {
  background-color: #F5F5F5;
  background-image:
    radial-gradient(ellipse 60% 50% at 88% 12%, rgba(243,109,33,0.10) 0%, transparent 65%),
    radial-gradient(ellipse 45% 55% at 8% 88%, rgba(243,109,33,0.07) 0%, transparent 60%);
}

/* Secțiuni dark (Stats bar, Product Showcase) */
.gradient-dark {
  background-color: #0A0A0A;
  background-image:
    radial-gradient(ellipse 65% 55% at 25% 50%, rgba(243,109,33,0.22) 0%, transparent 65%),
    radial-gradient(ellipse 40% 40% at 80% 15%, rgba(243,109,33,0.12) 0%, transparent 55%),
    radial-gradient(ellipse 45% 45% at 65% 88%, rgba(243,109,33,0.07) 0%, transparent 60%);
}

/* CTA Banner (pe portocaliu solid) */
.gradient-cta {
  background-color: #F36D21;
  background-image:
    radial-gradient(ellipse 55% 75% at 15% 50%, rgba(255,255,255,0.18) 0%, transparent 60%),
    radial-gradient(ellipse 40% 40% at 85% 15%, rgba(255,255,255,0.10) 0%, transparent 50%),
    radial-gradient(ellipse 45% 45% at 88% 82%, rgba(0,0,0,0.10) 0%, transparent 55%);
}

/* Configurator background */
.gradient-configurator {
  background-color: #ffffff;
  background-image:
    radial-gradient(ellipse 70% 50% at 5% 30%, rgba(243,109,33,0.08) 0%, transparent 65%),
    radial-gradient(ellipse 60% 60% at 95% 70%, rgba(243,109,33,0.10) 0%, transparent 65%);
}
```

> Aplică `.grain` pe toate secțiunile cu gradient blob pentru textura noise premium.
> Blob-urile sunt **decorative, în fundal** — nu interferează cu lizibilitatea textului.
> Intensitatea (opacity) rămâne subtilă pe secțiunile light (0.08–0.15), mai dramatică pe dark (0.22).

Scroll indicator: `↓` animat bounce la baza heroului

**Animații hero (Framer Motion, stagger):**
```
label:   delay 0s,   fade+slideUp 20px
h1:      delay 0.1s, fade+slideUp 30px
body:    delay 0.2s, fade+slideUp 20px
CTAs:    delay 0.3s, fade+slideUp 20px
imagine: delay 0.2s, fade+slideLeft 40px
badges:  delay 0.6s, fade+scale
```

---

### STATS BAR
Background `#111111`, padding 60px 0

4 numere aliniate orizontal (2×2 pe mobile):
```
1,000 kg     1.1 m/s      8 h         ±10 mm
Max Payload  Travel Speed Battery Life Positioning
```
Cifre: Inter 700, 56px, white. Label: Inter 400, 14px, #888.
Separator: linie verticală 1px `#333` între ele.
**Animație:** count-up la Intersection Observer (folosește requestAnimationFrame).

---

### FEATURES
Background `#FFFFFF`, padding 120px 0

Header secțiune centrat:
```
[label]  "WHY ROBOBIST"
[h2]     "Built for real-world warehouses."
[body]   "No compromises on reliability, compatibility, or safety."
```

4 carduri, grid 2×2 desktop / 1×4 mobile:
```
Card design:
- Background: #FAFAFA
- Border: 1px solid #E8E8E8
- Border-top: 3px solid #F36D21
- Padding: 32px
- Border-radius: 12px
- Hover: translateY(-4px), shadow 0 12px 32px rgba(0,0,0,0.08)
- Tranziție: 0.3s ease

[Icon SVG portocaliu 32px]
[h4]   Titlu feature
[body-sm] Descriere

1. Universal Pallet Compatibility
   "Handles open and closed pallets of all standard sizes — Euro,
    block, custom. No pallet left behind."

2. 1,200mm Slim Profile
   "Navigate aisles as narrow as 1,300mm with zero infrastructure
    changes. Retrofit-ready from day one."

3. AI Deep Learning Vision
   "Identifies pallets from any angle — wrapped, damaged, or
    non-standard — with millimeter precision."

4. Four Navigation Modes
   "SLAM, reflector, NFL, and hybrid navigation. Adapts to any
    warehouse layout out of the box."
```

---

### PRODUCT SHOWCASE
Background `#0A0A0A`, padding 120px 0

```
[label white opacity-50]  "THE ROBOT"
[h2 white]  "RPT-1000. Every detail engineered."
```

Imagine robot (SEER img 2) centrată, max-width 700px, cu **parallax subtil la scroll**.

4 hotspot-uri pe imagine (cercuri portocalii, `position: absolute`):
```css
.hotspot {
  width: 16px; height: 16px;
  background: #F36D21;
  border-radius: 50%;
  cursor: pointer;
  position: absolute;
}
.hotspot::before {
  content: '';
  position: absolute;
  inset: -6px;
  border-radius: 50%;
  border: 2px solid #F36D21;
  animation: pulse 2s infinite;
  opacity: 0.5;
}
```

Tooltip la hover (`.glass-dark`, Inter, slide-in animat):
```
Hotspot 1 (top-left):  "HMI Control Panel — 7" touchscreen + emergency stop"
Hotspot 2 (top-right): "360° Lidar Array — 5 sensors, ±10mm accuracy"
Hotspot 3 (bottom):    "Heavy-Duty Forks — 1,220mm length, 1,000kg rated"
Hotspot 4 (mid-right): "Perimeter Safety — Auto-stop on obstacle detection"
```

CTA sub imagine: buton alb outline → `/product`

---

### HOW IT WORKS
Background `#F5F5F5`, padding 120px 0

Header centrat:
```
[label]  "THE PROCESS"
[h2]     "From configuration to deployment."
```

3 pași în linie (desktop) / verticali (mobile):
```
[01]                    [02]                    [03]
Configure               Get Your Estimate       Deploy
────────                ─────────────────       ──────
Fill our 5-minute       Receive an AI-powered   Our team handles
wizard with your        price estimate &        full installation
warehouse data.         custom recommendation.  with Flacăra Electric.
```

Număr: Inter 800, 80px, #F36D21, opacity 0.2 (watermark în spate).
Linie de conectare portocalie între pași (display:none pe mobile).

CTA centrat: `"Start Configuring →"` portocaliu

---

### PARTNER SECTION
Background `#FFFFFF`, padding 120px 0

2 coloane (60/40):
```
Stânga:
  [label]  "STRATEGIC PARTNER"
  [h2]     "Backed by Flacăra Electric."
  [body]   "Robobist operates in close collaboration with Flacăra Electric —
            Romania's leading electrical engineering firm. Together we deliver
            end-to-end warehouse automation across Europe: from integration
            to ongoing maintenance."
  [link]   "Visit flacara-electric.ro →"  ← opens in new tab

Dreapta:
  Imagine (Unsplash warehouse sau logo placeholder)
  Container cu border-radius 16px, overflow hidden
```

---

### CTA BANNER
Background `#F36D21`, padding 80px 0, centrat

```
[h2 white]    "Ready to automate your warehouse?"
[body white]  "Configure your Robobist RPT-1000 in under 5 minutes."
[button]      "Start Configurator →"  ← alb, text negru, hover: bg #000 text alb
```

---

## PRODUCT PAGE (`/product`)

### Layout Desktop: Sticky gallery stânga + Scroll content dreapta

**Stânga (sticky, top: 80px):**
- Imagine mare activă (SEER img 1/2/3)
- 3 thumbnail-uri jos — click schimbă imaginea cu fade
- Buton: `"Download Datasheet"` (link placeholder #)

**Dreapta (scroll):**
```
[label]  "AUTONOMOUS PALLET TRUCK"
[h1]     "Robobist RPT-1000"
[body]   "High Compatibility. Fearless of Pallet Types."

4 selling points cu icoane SVG:
✓ Compatible with all standard pallet types
✓ 1,200mm slim body — 1T rated capacity
✓ AI deep learning pallet recognition
✓ 4 navigation options, ±10mm accuracy

[buton orange mare]  "Configure & Get a Quote →"
[link]  "Request a Quote Directly"
```

**Tab-uri: Overview | Specifications | Safety**

### Tab: Specifications — tabel complet

```
BASIC PARAMETERS
Product Name             Robobist RPT-1000
Also known as            RPT-1T
Operation Type           Automatic Navigation
Navigation               Laser SLAM (Reflector & NFL optional)
Pallet Types             Open / Closed
Rated Load Capacity      1,000 kg  (2,204 lbs)
Robot Weight             450 kg  (992 lbs)
Standard Lifting Height  190 mm  (7.48 in)
Dimensions L×W×H         1,450 × 1,200 × 556 mm
Fork Dimensions L×W×H   1,220 × 168 × 60 mm
Fork Outer Width         610 mm  (24.02 in)
Min. Turning Radius      900 mm  (35.43 in)
Operating Temp / RH      0°C – 50°C / 10–90% RH

PERFORMANCE
Driving Speed            1.1 m/s  (full & no load)
Slope / Step / Gap       < 3% / 5 mm / 10 mm
Positioning Accuracy     ± 10 mm
Angle Accuracy           ± 1°

BATTERY
Battery                  48V / 36Ah LiFePO4
Battery Life             8 hours
Charge Time (10→80%)     1.5 hours
Charging Method          Manual / Automatic

SENSORS
Main Lidar               1× H1E0 / Mid-360
Perimeter Lidar          4× C214
Wi-Fi Roaming            Standard ●
HMI Display              Standard ●
3D Obstacle Avoidance    Optional ○
Pallet Recognition AI    Optional ○

SAFETY
E-Stop Button            Standard ●
Sound & Light Indicator  Standard ●
360° Laser Protection    Standard ●
Fork Height Protection   Standard ●
Bumper Strip             Optional ○
Braking (1m/s / 1.5m/s)  ≤30 cm / ≤50 cm
```

Stil tabel: header rows background `#F36D21` text alb, alternating rows `#FAFAFA` / `#FFFFFF`, font Inter, valori numerice `font-variant-numeric: tabular-nums`.

Mobile: tabel scrollabil orizontal sau card-based layout.

---

## CONFIGURATOR PAGE (`/configurator`) ⭐

Aceasta este pagina cea mai importantă. Wizard în 5 pași cu AI estimate la final.

### Layout
- Progress bar sus: 5 cercuri conectate cu linie
  - Activ: portocaliu fill + text alb
  - Completat: check icon portocaliu
  - Inactiv: gri outline
- Container card central: max-width 680px, centrat, shadow, border-radius 20px
- Butoane navigare: `← Back` (outline) și `Continue →` (portocaliu)
- Animație între pași: `x: -40px → 0` la forward, `x: 40px → 0` la backward

---

### PAS 1 — Warehouse Profile

**Q1:** "What type of facility do you operate?"
```
5 carduri selectabile (grid, cu icoane SVG):
┌─────────┐ ┌─────────┐ ┌──────────┐ ┌───────────┐ ┌────────┐
│ 🏭      │ │ ⚙️      │ │ ❄️       │ │ 📦        │ │ ⬜     │
│ Distrib.│ │ Manufact│ │ Cold     │ │ E-commerce│ │ Other  │
│ Center  │ │         │ │ Storage  │ │           │ │        │
└─────────┘ └─────────┘ └──────────┘ └───────────┘ └────────┘
Selectat: border 2px #F36D21, background rgba(243,109,33,0.06)
```

**Q2:** "Warehouse floor area"
Slider custom (thumb portocaliu): 500m² → 50,000m²
Valoare live: `"5,000 m²"` afișată bold deasupra

**Q3:** "Shifts per day"
```
[  1 Shift  ]  [  2 Shifts  ]  [  24/7  ]
```
Toggle buttons: selectat = background #000, text alb

---

### PAS 2 — Operations

**Q1:** "Maximum payload per move?"
```
[  < 500 kg  ]  [  500–1,000 kg ✅  ]  [  > 1,000 kg  ]
                 badge: "RPT-1000 Compatible"
```
Dacă selectează > 1,000 kg: warning inline: "⚠️ Our current model handles up to 1,000 kg. Contact us for custom solutions."

**Q2:** "Pallets moved per day"
Slider: 50 → 2,000+ cu valoare live

**Q3:** "Pallet types used" (multi-select checkboxes stilizate):
```
☐ Euro Pallet (800×1200)   ☐ Open Pallet   ☐ Closed Pallet   ☐ Custom
```

**Q4:** "Minimum aisle width"
```
[< 1,300mm ⚠️]  [1,300–1,500mm]  [1,500–2,000mm]  [> 2,000mm]
```
Dacă `< 1,300mm`: banner warning portocaliu: "The RPT-1000 requires a minimum 1,300mm aisle width."

---

### PAS 3 — Infrastructure

**Q1:** "Existing WMS?"
```
[ ✅ Yes, active ]  [ ❌ No ]  [ 🔄 Planning ]
```

**Q2:** "Wi-Fi coverage?"
```
[ Full Coverage ]  [ Partial ]  [ None ]
```
Dacă None: info box: "Full Wi-Fi coverage is recommended for optimal performance."

**Q3:** "How many robots do you need?"
Slider: 1 → 20 unități

Sub slider, live update:
```
1–2 units:   Standard pricing
3–5 units:   🏷️ -5% volume discount applied
6–10 units:  🏷️ -8% volume discount applied
11+ units:   🏷️ -12% volume discount applied
```

---

### PAS 4 — Customization

**Q1:** Fork width
```
[ Standard 610mm ]  [ Custom width: [___mm] ]
```

**Q2:** Color scheme — 4 swatches circulare 40px:
```
⚪🟠 White + Orange (default, selectat)
⬛🟠 Black + Orange
⬜⬛ Gray + Black
🎨 Custom Brand Colors
```

**Q3:** Company co-branding
```
Add your company branding on the robot?

[ No branding — Standard Robobist ]
[ Co-branding: Your Company × Robobist ]   ← + €800–€1,200/unit
```

> ⚠️ IMPORTANT: Robobist logo/name rămâne MEREU pe robot, indiferent de opțiune.
> Opțiunea "Co-branding" adaugă logo-ul clientului ALĂTURI de Robobist.
> Formatul afișat pe robot: **"[Client Company] × Robobist"**
> Dacă selectează Co-branding: apare un câmp text: `"Your company name: [____________]"`
> Preview text live sub câmp: `"Will appear as: Acme Corp × Robobist"`

**Q4:** Optional add-ons (checklist):
```
☐  3D Obstacle Avoidance         + €2,500 / unit
☐  Pallet Recognition AI          + €3,000 / unit
☐  3D Obstacle Avoidance              + €3,800 – €4,500 / unit
☐  Pallet Recognition AI              + €4,500 – €5,500 / unit
☐  Automatic Charging Station         + €6,500 – €7,500 / station
☐  Extended Warranty (3 years)        + €3,200 – €3,800 / unit
```

**Live price preview** (updatabil la fiecare selecție, afișat permanent jos în card):
```
┌──────────────────────────────────────────┐
│  Live Estimate                           │
│  Per unit:   € 60,000 – € 70,000        │
│  × 1 unit                               │
│  ─────────────────────────────────────  │
│  Total:      € 60,000 – € 70,000        │
│  (No discount — 1 unit)                 │
└──────────────────────────────────────────┘
```
Se actualizează instant la orice selecție. Recalculare cu `calculatePrice()` din `lib/pricing.ts`.

---

### PAS 5 — Contact Details

```
First Name *          Last Name *
Company Name *        Job Title
Email Address *       Phone Number
Country *             [select dropdown — lista țări EU + global]

How did you hear about us?  [select]

[ ] I agree to Robobist's Privacy Policy *
[ ] I'd like to receive product updates (optional)

[  Calculate My Estimate  →  ] ← portocaliu, full-width, height 56px, rezultat instant (fără loading)
```

Validare: React Hook Form + Zod. Erori inline sub fiecare câmp.

---

### PAS 6 — PRICE RESULT (calculat instant în JS, fără server)

Calculul se face imediat după ce utilizatorul apasă "Calculate My Estimate" — **zero loading**, rezultat instant.

**Result card (Framer Motion scaleIn + fadeIn):**
```
┌─────────────────────────────────────────────────────────────┐
│  ✅  Your Configuration Summary                              │
│  ─────────────────────────────────────────────────────────  │
│  Facility: Distribution Center  |  Area: 5,000 m²           │
│  Shifts: 2/day  |  Pallets: ~300/day                        │
│  Units: 3  |  Branding: Acme Corp × Robobist               │
│  Add-ons: Pallet Recognition AI, Auto Charging Station      │
│  Volume discount: -5% (3 units)                             │
│  ─────────────────────────────────────────────────────────  │
│                                                             │
│  PRICE BREAKDOWN (per unit)                                 │
│  Base RPT-1000              € 60,000 – € 70,000            │
│  Co-branding                +€ 800   – € 1,200             │
│  Pallet Recognition AI      +€ 4,500 – € 5,500             │
│  Auto Charging Station      +€ 6,500 – € 7,500             │
│  ─────────────────────────────────────────────────────────  │
│  Per unit subtotal          € 71,800 – € 84,200            │
│  × 3 units                  €215,400 – €252,600            │
│  Volume discount (-5%)      -€10,770 – -€12,630            │
│  ─────────────────────────────────────────────────────────  │
│  TOTAL ESTIMATE             €204,630 – €239,970            │
│  ≈ €68,210 – €79,990 / unit (after discount)               │
│                                                             │
│  * This is a preliminary estimate. Final price confirmed    │
│    in official quotation.                                   │
│                                                             │
│  [  Request Official Quote  ]       [ Reconfigure ]         │
│       portocaliu, fill                  outline             │
└─────────────────────────────────────────────────────────────┘
```

"Request Official Quote" → redirect la `/contact` cu datele prefilled în formular (query params sau sessionStorage).

---

## MOTOR DE PREȚURI — `lib/pricing.ts`

```typescript
// lib/pricing.ts
// Calculul se face 100% client-side, instantaneu.
// Piața europeană — prețuri includ: CE certification, EU support, integrare locală, garanție.

export const PRICING = {
  base_min: 60_000,
  base_max: 70_000,

  addons: {
    custom_fork_width:       { min: 1_500, max: 2_000 },
    co_branding:             { min: 800,   max: 1_200 },  // "ClientCo × Robobist"
    obstacle_avoidance_3d:   { min: 3_800, max: 4_500 },
    pallet_recognition_ai:   { min: 4_500, max: 5_500 },
    auto_charging_station:   { min: 6_500, max: 7_500 },  // per stație
    extended_warranty_3y:    { min: 3_200, max: 3_800 },
    cold_storage_kit:        { min: 2_000, max: 3_000 },  // dacă selectează Cold Storage
  },

  volume_discounts: [
    { min: 1,  max: 2,  pct: 0    },
    { min: 3,  max: 5,  pct: 0.05 },
    { min: 6,  max: 10, pct: 0.08 },
    { min: 11, max: 99, pct: 0.12 },
  ],
}

export interface PriceResult {
  per_unit_min: number
  per_unit_max: number
  total_min: number
  total_max: number
  discount_pct: number
  breakdown: { label: string; min: number; max: number }[]
}

export function calculatePrice(config: ConfiguratorState): PriceResult {
  let unit_min = PRICING.base_min
  let unit_max = PRICING.base_max
  const breakdown: { label: string; min: number; max: number }[] = [
    { label: 'Base RPT-1000', min: unit_min, max: unit_max },
  ]

  // Add-ons
  if (config.custom_fork) {
    unit_min += PRICING.addons.custom_fork_width.min
    unit_max += PRICING.addons.custom_fork_width.max
    breakdown.push({ label: 'Custom Fork Width', ...PRICING.addons.custom_fork_width })
  }
  if (config.co_branding) {
    unit_min += PRICING.addons.co_branding.min
    unit_max += PRICING.addons.co_branding.max
    breakdown.push({ label: `Co-branding (${config.company_name} × Robobist)`, ...PRICING.addons.co_branding })
  }
  if (config.obstacle_avoidance) {
    unit_min += PRICING.addons.obstacle_avoidance_3d.min
    unit_max += PRICING.addons.obstacle_avoidance_3d.max
    breakdown.push({ label: '3D Obstacle Avoidance', ...PRICING.addons.obstacle_avoidance_3d })
  }
  if (config.pallet_ai) {
    unit_min += PRICING.addons.pallet_recognition_ai.min
    unit_max += PRICING.addons.pallet_recognition_ai.max
    breakdown.push({ label: 'Pallet Recognition AI', ...PRICING.addons.pallet_recognition_ai })
  }
  if (config.auto_charging) {
    unit_min += PRICING.addons.auto_charging_station.min
    unit_max += PRICING.addons.auto_charging_station.max
    breakdown.push({ label: 'Auto Charging Station', ...PRICING.addons.auto_charging_station })
  }
  if (config.warranty_3y) {
    unit_min += PRICING.addons.extended_warranty_3y.min
    unit_max += PRICING.addons.extended_warranty_3y.max
    breakdown.push({ label: 'Extended Warranty 3Y', ...PRICING.addons.extended_warranty_3y })
  }
  if (config.facility_type === 'cold_storage') {
    unit_min += PRICING.addons.cold_storage_kit.min
    unit_max += PRICING.addons.cold_storage_kit.max
    breakdown.push({ label: 'Cold Storage Kit', ...PRICING.addons.cold_storage_kit })
  }

  // Volume discount
  const n = config.units
  const disc = PRICING.volume_discounts.find(d => n >= d.min && n <= d.max)
  const discount_pct = disc?.pct ?? 0

  const total_min = Math.round(unit_min * n * (1 - discount_pct))
  const total_max = Math.round(unit_max * n * (1 - discount_pct))

  return {
    per_unit_min: unit_min,
    per_unit_max: unit_max,
    total_min,
    total_max,
    discount_pct,
    breakdown,
  }
}
```

> ⚠️ Nu există niciun API call pentru prețuri. Totul e calculat local, instant.
> ⚠️ Robobist rămâne MEREU în denumire — co-branding înseamnă "ClientCo × Robobist", niciodată înlocuire.

---

## ABOUT PAGE (`/about`)

```
HERO
  background: imagine warehouse Unsplash (overlay negru 50%)
  [h1 white]  "The Future of Warehouse Automation"
  [body white] "We build robots that work, so your people don't have to."

SECTION: Mission
  2 coloane: text stânga (h2 + 2 paragrafe), imagine dreapta

SECTION: Robobist × Flacăra Electric
  Timeline sau 2-column layout
  Logo Flacăra Electric placeholder
  Text despre parteneriat

SECTION: Values (3 carduri)
  Innovation | Reliability | Partnership
  Card: icon + h4 + body-sm

SECTION: CTA → /contact
```

---

## CONTACT PAGE (`/contact`)

2 coloane desktop / stacked mobile:

```
Stânga:
  [h2]    "Let's talk automation."
  [body]  "Tell us about your warehouse and we'll get back within 24 hours."

  📧 contact@robobist.com
  🌍 Romania — Serving Europe & Beyond
  🤝 In partnership with Flacăra Electric

  Social: LinkedIn | YouTube (icoane SVG)

Dreapta — Formular:
  First Name *     Last Name *
  Company *        Job Title
  Email *          Phone
  Country *        [dropdown]
  Message          [textarea 4 rows]

  [ ] Interested in a demo
  [ ] Already used the Configurator
  [ ] Urgent inquiry

  [  Send Message  ]  ← portocaliu full-width

  Success state: checkmark animat + "Thank you! We'll be in touch within 24 hours."
```

---

## ANIMAȚII COMPLETE (Framer Motion)

```typescript
// Reutilizabile:
const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] } }
}

const stagger = {
  visible: { transition: { staggerChildren: 0.1 } }
}

const scaleIn = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.5 } }
}
```

Lista animații:
1. **Navbar** — fade-in la load, border la scroll
2. **Hero** — stagger: label → h1 → body → CTAs → imagine → badges
3. **Badge-uri flotante** — CSS `@keyframes float` cu translateY ±8px, 3s ease-in-out infinite
4. **Stats counters** — count-up cu requestAnimationFrame la IntersectionObserver
5. **Feature cards** — fadeUp stagger la scroll
6. **Product parallax** — `useScroll` + `useTransform` Framer Motion
7. **Hotspot pulse** — CSS `@keyframes pulse` ring portocaliu
8. **Hotspot tooltip** — `opacity 0→1`, `translateY 4px→0`
9. **How It Works** — pașii intră staggered la scroll
10. **Configurator steps** — slide lateral animat (x: ±40px)
11. **Live price preview** — numărul se actualizează cu counter animat (0 → valoare) la orice schimbare
12. **Result card** — `scaleIn` cu spring easing, instant (fără loading)
13. **Hover CTAs** — `scale: 1.02`, `brightness: 1.05`, `0.2s`
14. **Page transitions** — `opacity 0→1` la mount

---

## RESPONSIVE BREAKPOINTS

```
xs:  < 480px   (small mobile)
sm:  480–639px  (mobile)
md:  640–1023px (tablet)
lg:  1024–1279px (laptop)
xl:  1280px+    (desktop)
```

Reguli critice:
- Navbar: hamburger `< lg` (< 1024px)
- Hero: stacked `< md`, split `>= md`
- Feature grid: 1col `< md`, 2col `>= md`
- Stats: 2×2 `< md`, 4×1 `>= md`
- Product page: stacked `< lg`, sticky split `>= lg`
- Configurator wizard: full-screen pe mobile (no card borders)
- Footer: 1col `< sm`, 2col `< lg`, 4col `>= lg`
- Touch targets: min 44×44px peste tot
- Font sizes scale down 10–15% pe mobile

---

## CHECKLIST FINAL ÎNAINTE DE LIVRARE

- [ ] Toate imaginile se încarcă și sunt vizibile (nu broken)
- [ ] Navbar frosted glass funcționează (testează pe Chrome, Safari)
- [ ] Configuratorul merge complet pe mobile (all 5 steps)
- [ ] `calculatePrice()` returnează interval corect pentru toate combinațiile de add-on-uri
- [ ] Live price preview se actualizează instant la orice selecție
- [ ] Co-branding afișează "ClientCo × Robobist" (Robobist rămâne MEREU)
- [ ] Preview text "Will appear as: [Company] × Robobist" funcționează live
- [ ] Discount volum aplicat corect (5% / 8% / 12%)
- [ ] Cold Storage kit (+€2,000–€3,000) adăugat automat dacă facilitatea e Cold Storage
- [ ] Toate animațiile funcționează și nu cauzează layout shift
- [ ] Tabelul de specs e complet și corect aliniat
- [ ] Formularul de contact validează corect
- [ ] Ierarhia tipografică h1/h2/h3/body respectată în toate paginile
- [ ] Culorile: NICIUN albastru, verde, violet nicăieri
- [ ] Mobile hamburger menu funcționează
- [ ] `npm run build` fără erori

---

*Robobist Website Brief v3.0 — Mai 2025*
*Preț bazat pe piața europeană (include: CE certification, EU support local, integrare, garanție)*
*Produs rebranded cu acordul SEER Robotics*
*Co-branding: [Client] × Robobist — Robobist rămâne întotdeauna prezent*
- [ ] Culorile: NICIUN albastru, verde, violet nicăieri
- [ ] Mobile hamburger menu funcționează
- [ ] `npm run build` fără erori

---

*Robobist Website Brief v2.0 — Mai 2025*
*Produs rebranded cu acordul SEER Robotics*
