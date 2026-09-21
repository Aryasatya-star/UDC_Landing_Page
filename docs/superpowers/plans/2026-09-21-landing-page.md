# Landing Page UDC Implementation Plan

**Goal:** Build a static single-page landing page for the United Developer Community (UDC), deployable to GitHub Pages from the repo root, structured so a 4-person team can extend it later.

**Architecture:** Vanilla static site: `index.html` (structure + content), `css/style.css` (design tokens + all styles), `js/main.js` (vanilla progressive-enhancement interactions). No build tool, no library, no framework.

> Deviation from the design spec: the spec's folder diagram listed an `assets/` folder, but this plan renders placeholders inline — simple SVG icons in the HTML and CSS-gradient photo tiles — so no `assets/` directory is needed (YAGNI). Real photos added later go in `assets/`.

**Tech stack:** HTML5, CSS3 (custom properties, grid, media queries), vanilla JavaScript (IntersectionObserver), Google Fonts (Space Grotesk + Inter).

## Global Constraints

- No build tool, no package manager, no CSS framework, no JS library. Only `index.html`, `css/style.css`, `js/main.js`.
- All visible content is in Indonesian.
- Dark "tech" theme. Colors come from CSS custom properties in `:root`. Accent: violet `#8b5cf6` + cyan `#22d3ee`; gradient `linear-gradient(135deg, #8b5cf6 0%, #22d3ee 100%)`.
- Heading font `Space Grotesk`, body `Inter`, loaded via Google Fonts `<link>` in `<head>`.
- All asset paths relative (`css/style.css`, `js/main.js`) so they work on GitHub Pages root.
- Anchor ids: `#home` (navbar/hero), `#tentang`, `#galeri`, `#gabung`. Every `href="#name"` must have a matching `id` (auto-checked in Task 2).
- Real content (gallery photos, WA/Discord/Instagram/email links) is NOT available — keep placeholders (`href="#"` and CSS-gradient gallery tiles labeled FOTO 1..6).
- The old README is UTF-16 encoded; it must be deleted and rewritten as UTF-8.
- No emoji. Placeholder visuals use simple inline SVG, not emoji.
- Commit at the end of every task. Do not push until Task 8.

---

### Task 1: Scaffold + rewrite README

**Files:**
- Create: `.gitignore`, `.nojekyll`
- Rewrite: `README.md`

**Interfaces:**
- Consumes: nothing (empty repo).
- Produces: `css/` and `js/` directories, a UTF-8 README, and repo hygiene files.

- [ ] **Step 1: Remove the UTF-16 README and create directories**

Run:
```bash
rm README.md && mkdir -p css js && touch .nojekyll
```
`file README.md` should now report "No such file".

- [ ] **Step 2: Write `.gitignore`**

```gitignore
.DS_Store
Thumbs.db
*.log
.idea/
.vscode/
```

- [ ] **Step 3: Write `README.md` (UTF-8)**

````markdown
# United Developer Community — Landing Page

Website resmi komunitas **United Developer Community (UDC)** — komunitas developer yang
saling belajar, berkolaborasi dalam project nyata, dan bertumbuh lewat networking.

Dibangun dengan HTML, CSS, dan JavaScript murni (tanpa build tool / framework).

## Menjalankan Lokal

```bash
python3 -m http.server 8000
```

Buka `http://localhost:8000` di browser.

## Struktur

```
├── index.html      # struktur & konten halaman
├── css/style.css   # seluruh gaya (dark theme)
├── js/main.js      # interaksi: hamburger menu + scroll-reveal
├── docs/           # dokumen desain & rencana project
└── README.md
```

## Kontribusi

Semua anggota mengerjakan di device masing-masing lewat flow Git/GitHub:

1. Clone repository.
2. Buat branch sendiri (`git checkout -b fitur/nama-fitur`).
3. Commit perubahan kecil.
4. Push branch, buat Pull Request, minta review anggota lain.

## Roadmap

- [x] Landing page v1 (hero, tentang, galeri, gabung/kontak)
- [ ] Konten asli (foto kegiatan, link WA/Discord/Instagram/email)
- [ ] Program & kegiatan, testimoni (menyusul)
````

- [ ] **Step 4: Verify scaffold**

Run:
```bash
git status --short
file README.md
```
Expected: README present as UTF-8 Unicode text, `.gitignore` and `.nojekyll` as untracked files, `css/` and `js/` empty (empty dirs are not tracked until they contain files).

- [ ] **Step 5: Commit**

```bash
git add .gitignore .nojekyll README.md && git commit -m "chore: scaffold project and rewrite README as UTF-8"
```

---

### Task 2: `index.html` — semantic structure + content

**Files:**
- Create: `index.html`

**Interfaces:**
- Produces: the markup contract the CSS (Tasks 3-6) and JS (Task 7) depend on. Section ids `#home`, `#tentang`, `#galeri`, `#gabung`; classes `.nav-logo`, `.nav-menu`, `.nav-link`, `.nav-toggle`, `.nav-toggle-bar`, `.hero-*`, `.cards`/`.card`/`.card-icon`, `.gallery-grid`/`.gallery-item`/`.gallery-ph`/`.gallery-caption`, `.cta-*`, `.contact-link`, `.footer`, `.btn`+`.btn-primary`/`.btn-ghost`, `.text-gradient`, `.section-*`, `.reveal`.

- [ ] **Step 1: Write `index.html`**

```html
<!DOCTYPE html>
<html lang="id">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta name="description" content="United Developer Community — komunitas developer yang saling belajar, berkolaborasi dalam project nyata, dan bertumbuh lewat networking.">
  <title>United Developer Community</title>

  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&family=Space+Grotesk:wght@500;700&display=swap" rel="stylesheet">

  <link rel="stylesheet" href="css/style.css">
</head>
<body>

  <header class="navbar" id="home">
    <nav class="nav container" aria-label="Navigasi utama">
      <a href="#home" class="nav-logo">UDC<span class="nav-logo-dot">.</span></a>

      <button class="nav-toggle" aria-label="Buka menu" aria-expanded="false" aria-controls="nav-menu">
        <span class="nav-toggle-bar"></span>
        <span class="nav-toggle-bar"></span>
        <span class="nav-toggle-bar"></span>
      </button>

      <ul class="nav-menu" id="nav-menu">
        <li><a class="nav-link" href="#tentang">Tentang</a></li>
        <li><a class="nav-link" href="#galeri">Galeri</a></li>
        <li><a class="nav-link nav-link-cta" href="#gabung">Gabung</a></li>
      </ul>
    </nav>
  </header>

  <main>
    <section class="hero">
      <div class="container hero-inner">
        <p class="hero-eyebrow reveal">United Developer Community</p>
        <h1 class="hero-title reveal">Berkembang bersama<br><span class="text-gradient">developer Indonesia.</span></h1>
        <p class="hero-subtitle reveal">Komunitas developer yang saling belajar, mengerjakan project nyata bareng-bareng, dan bertumbuh lewat networking yang sehat.</p>
        <div class="hero-actions reveal">
          <a href="#gabung" class="btn btn-primary">Gabung Komunitas</a>
          <a href="#tentang" class="btn btn-ghost">Kenali Kami</a>
        </div>
      </div>
    </section>

    <section class="section" id="tentang">
      <div class="container">
        <p class="section-eyebrow reveal">Tentang</p>
        <h2 class="section-title reveal">Apa itu UDC?</h2>
        <p class="section-lead reveal">United Developer Community (UDC) adalah komunitas developer yang dibangun dari semangat berbagi: dari yang baru mulai sampai yang sudah lama berkecimpung, semua punya tempat untuk belajar dan berkembang bersama.</p>

        <div class="cards">
          <article class="card reveal">
            <div class="card-icon" aria-hidden="true">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round">
                <path d="M12 6.5C10 5 7 4.5 4 5v12c3-.5 6 0 8 1.5 2-1.5 5-2 8-1.5V5c-3-.5-6 0-8 1.5Z"/>
                <path d="M12 6.5V18.5"/>
              </svg>
            </div>
            <h3 class="card-title">Belajar Bareng</h3>
            <p class="card-text">Diskusi, sharing session, dan mentoring antar anggota — karena ilmu paling cepat dikuasai saat dibagikan.</p>
          </article>

          <article class="card reveal">
            <div class="card-icon" aria-hidden="true">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round">
                <path d="M8 7 3 12l5 5"/>
                <path d="m16 7 5 5-5 5"/>
              </svg>
            </div>
            <h3 class="card-title">Project Bareng</h3>
            <p class="card-text">Kolaborasi dalam project nyata untuk mengasah skill sekaligus membangun portfolio tim.</p>
          </article>

          <article class="card reveal">
            <div class="card-icon" aria-hidden="true">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round">
                <circle cx="12" cy="5" r="2.5"/>
                <circle cx="5" cy="18" r="2.5"/>
                <circle cx="19" cy="18" r="2.5"/>
                <path d="M10.5 7.2 6.5 15.5"/>
                <path d="m13.5 7.2 4 8.3"/>
              </svg>
            </div>
            <h3 class="card-title">Networking</h3>
            <p class="card-text">Bertemu developer lain, bertukar pengalaman, dan memperluas relasi yang bermanfaat untuk karier.</p>
          </article>
        </div>
      </div>
    </section>

    <section class="section section-alt" id="galeri">
      <div class="container">
        <p class="section-eyebrow reveal">Galeri</p>
        <h2 class="section-title reveal">Suasana Kegiatan Kami</h2>
        <p class="section-lead reveal">Foto-foto placeholder yang nanti diganti gambar kegiatan komunitas yang sesungguhnya.</p>

        <div class="gallery-grid">
          <figure class="gallery-item reveal">
            <div class="gallery-ph ph-1">FOTO 1</div>
            <figcaption class="gallery-caption">Meetup rutin anggota</figcaption>
          </figure>
          <figure class="gallery-item reveal">
            <div class="gallery-ph ph-2">FOTO 2</div>
            <figcaption class="gallery-caption">Workshop coding bersama</figcaption>
          </figure>
          <figure class="gallery-item reveal">
            <div class="gallery-ph ph-3">FOTO 3</div>
            <figcaption class="gallery-caption">Sharing session</figcaption>
          </figure>
          <figure class="gallery-item reveal">
            <div class="gallery-ph ph-4">FOTO 4</div>
            <figcaption class="gallery-caption">Hackathon komunitas</figcaption>
          </figure>
          <figure class="gallery-item reveal">
            <div class="gallery-ph ph-5">FOTO 5</div>
            <figcaption class="gallery-caption">Project collaboration</figcaption>
          </figure>
          <figure class="gallery-item reveal">
            <div class="gallery-ph ph-6">FOTO 6</div>
            <figcaption class="gallery-caption">Networking santai</figcaption>
          </figure>
        </div>
      </div>
    </section>

    <section class="section" id="gabung">
      <div class="container">
        <div class="cta reveal">
          <h2 class="cta-title">Siap jadi bagian dari UDC?</h2>
          <p class="cta-text">Ajak dirimu terlibat: belajar, membangun project, dan bertemu orang-orang baru yang satu visi.</p>
          <div class="cta-actions">
            <a href="#" class="btn btn-primary">Mulai Gabung</a>
          </div>
          <div class="contact-links">
            <a href="#" class="contact-link">WhatsApp</a>
            <a href="#" class="contact-link">Discord</a>
            <a href="#" class="contact-link">Instagram</a>
            <a href="#" class="contact-link">Email</a>
          </div>
        </div>
      </div>
    </section>
  </main>

  <footer class="footer">
    <div class="container">
      <p><strong>UDC.</strong> United Developer Community</p>
      <p style="margin-bottom:0;">&copy; 2026 United Developer Community. Dibuat dengan semangat kolaborasi.</p>
    </div>
  </footer>

  <script src="js/main.js"></script>
</body>
</html>
```

- [ ] **Step 2: Verify structure and anchor ids**

Run:
```bash
python3 - <<'EOF'
import re
h = open("index.html", encoding="utf-8").read()
ids = set(re.findall(r'id="([^"]+)"', h))
hrefs = set(re.findall(r'href="#([^"]+)"', h))
missing = hrefs - ids
assert not missing, f"anchor without target id: {missing}"
assert {"home", "tentang", "galeri", "gabung"} <= ids
assert h.count("<section") == 4 and h.count("</section>") == 4
print("PASS: anchors ok, 4 sections, ids:", sorted(ids - {"nav-menu"}))
EOF
```
Expected: `PASS: anchors ok, 4 sections, ids: ['galeri', 'gabung', 'home', 'tentang']`. (Plain `href="#"` links are intentionally excluded by the regex.)

- [ ] **Step 3: Commit**

```bash
git add index.html && git commit -m "feat: add semantic landing page markup"
```

---

### Task 3: `css/style.css` — design tokens, reset, base, buttons, reveal

**Files:**
- Create: `css/style.css` (with the full CSS built up through Tasks 3-6, appended in order).

**Interfaces:**
- Consumes: markup contract from Task 2.
- Produces: base layer all later CSS blocks extend. Sets CSS variables used everywhere: `--bg`, `--bg-elev`, `--bg-elev-2`, `--border`, `--text`, `--text-muted`, `--violet`, `--cyan`, `--gradient`, `--shadow`, `--radius`, `--nav-height`.

- [ ] **Step 1: Write the base CSS block**

```css
/* ===== Tokens & Reset ===== */
:root {
  --bg: #0a0a0f;
  --bg-elev: #13131f;
  --bg-elev-2: #1b1b2b;
  --border: #26263a;
  --text: #ececf4;
  --text-muted: #9d9db6;
  --violet: #8b5cf6;
  --cyan: #22d3ee;
  --gradient: linear-gradient(135deg, #8b5cf6 0%, #22d3ee 100%);
  --shadow: 0 12px 32px rgba(0, 0, 0, 0.35);
  --radius: 14px;
  --nav-height: 64px;
}

*, *::before, *::after {
  box-sizing: border-box;
}

html {
  scroll-behavior: smooth;
  scroll-padding-top: calc(var(--nav-height) + 8px);
}

body {
  margin: 0;
  font-family: "Inter", system-ui, -apple-system, sans-serif;
  background: var(--bg);
  color: var(--text);
  line-height: 1.6;
  -webkit-font-smoothing: antialiased;
}

h1, h2, h3 {
  font-family: "Space Grotesk", "Inter", sans-serif;
  line-height: 1.15;
  font-weight: 700;
  margin: 0 0 0.5em;
}

p { margin: 0 0 1em; }
a { color: inherit; text-decoration: none; }
ul { list-style: none; margin: 0; padding: 0; }

.container {
  width: min(1080px, 100% - 2rem);
  margin-inline: auto;
}

.text-gradient {
  background: var(--gradient);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
}

/* ===== Section ===== */
.section { padding: 4.5rem 0; }
.section-alt { background: var(--bg-elev); }

.section-eyebrow {
  margin: 0 0 0.25rem;
  font-size: 0.8rem;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: var(--cyan);
  font-weight: 600;
}

.section-title { font-size: clamp(1.7rem, 4vw, 2.4rem); }
.section-lead { color: var(--text-muted); max-width: 60ch; }

/* ===== Buttons ===== */
.btn {
  display: inline-block;
  padding: 0.7rem 1.4rem;
  border-radius: 999px;
  font-weight: 600;
  transition: transform 0.15s ease, box-shadow 0.15s ease, border-color 0.15s ease;
}
.btn:active { transform: translateY(1px); }

.btn-primary {
  background: var(--gradient);
  color: #0a0a0f;
  box-shadow: 0 8px 24px rgba(139, 92, 246, 0.35);
}
.btn-primary:hover { box-shadow: 0 12px 32px rgba(34, 211, 238, 0.35); }

.btn-ghost {
  border: 1px solid var(--border);
  color: var(--text);
}
.btn-ghost:hover { border-color: var(--violet); color: var(--violet); }

/* ===== Scroll reveal (aktif hanya jika JS jalan) ===== */
html.js .reveal {
  opacity: 0;
  transform: translateY(16px);
}
html.js .reveal.visible {
  opacity: 1;
  transform: translateY(0);
  transition: opacity 0.5s ease, transform 0.5s ease;
}
```

- [ ] **Step 2: Verify CSS file is non-empty and brace-balanced**

Run:
```bash
python3 - <<'EOF'
css = open("css/style.css", encoding="utf-8").read()
assert css.count("{") == css.count("}") and css.count("{") > 5
assert "--bg" in css and "--gradient" in css and ".container" in css
print("PASS: css braces balanced, tokens present")
EOF
```
Expected: `PASS: css braces balanced, tokens present`.

- [ ] **Step 3: Commit**

```bash
git add css/style.css && git commit -m "feat: add design tokens, base styles, buttons, reveal"
```

---

### Task 4: Navbar + hero styles

**Files:**
- Modify: `css/style.css` (append this block)

**Interfaces:**
- Consumes: classes `.navbar`, `.nav`, `.nav-logo`, `.nav-logo-dot`, `.nav-toggle`, `.nav-toggle-bar`, `.nav-menu`, `.nav-link`, `.nav-link-cta`, `.hero`, `.hero-inner`, `.hero-eyebrow`, `.hero-title`, `.hero-subtitle`, `.hero-actions` from Task 2.
- Produces: sticky header with gradient CTA nav-link, animated hamburger bars (`.nav-toggle.open`), hero with radial violet/cyan glow. The responsive menu behavior (`.nav-menu.open`) is added in Task 6.

- [ ] **Step 1: Append the navbar + hero CSS block**

```css

/* ===== Navbar ===== */
.navbar {
  position: sticky;
  top: 0;
  z-index: 50;
  background: rgba(10, 10, 15, 0.85);
  backdrop-filter: blur(10px);
  border-bottom: 1px solid var(--border);
}

.nav {
  height: var(--nav-height);
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.nav-logo {
  font-family: "Space Grotesk", sans-serif;
  font-weight: 700;
  font-size: 1.3rem;
  letter-spacing: 0.02em;
}
.nav-logo-dot { color: var(--cyan); }

.nav-menu {
  display: flex;
  align-items: center;
  gap: 1.4rem;
}

.nav-link {
  color: var(--text-muted);
  font-weight: 500;
  transition: color 0.15s ease;
}
.nav-link:hover { color: var(--text); }

.nav-link-cta {
  color: #0a0a0f;
  background: var(--gradient);
  padding: 0.45rem 1.1rem;
  border-radius: 999px;
  font-weight: 600;
}

.nav-toggle {
  display: none;
  flex-direction: column;
  gap: 5px;
  background: none;
  border: 0;
  padding: 6px;
  cursor: pointer;
}
.nav-toggle-bar {
  width: 22px;
  height: 2px;
  background: var(--text);
  border-radius: 2px;
  transition: transform 0.2s ease, opacity 0.2s ease;
}
.nav-toggle.open .nav-toggle-bar:nth-child(1) { transform: translateY(7px) rotate(45deg); }
.nav-toggle.open .nav-toggle-bar:nth-child(2) { opacity: 0; }
.nav-toggle.open .nav-toggle-bar:nth-child(3) { transform: translateY(-7px) rotate(-45deg); }

/* ===== Hero ===== */
.hero {
  position: relative;
  overflow: hidden;
  padding: 5.5rem 0 6rem;
  background:
    radial-gradient(60% 50% at 15% 10%, rgba(139, 92, 246, 0.22), transparent 60%),
    radial-gradient(55% 45% at 90% 85%, rgba(34, 211, 238, 0.16), transparent 60%);
}

.hero-inner { max-width: 720px; }

.hero-eyebrow {
  margin: 0 0 0.9rem;
  color: var(--cyan);
  font-weight: 600;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  font-size: 0.85rem;
}

.hero-title {
  font-size: clamp(2.2rem, 6vw, 3.6rem);
  margin-bottom: 0.75rem;
}

.hero-subtitle {
  color: var(--text-muted);
  font-size: 1.05rem;
  max-width: 52ch;
}

.hero-actions {
  display: flex;
  flex-wrap: wrap;
  gap: 0.9rem;
  margin-top: 1.6rem;
}
```

- [ ] **Step 2: Verify braces still balanced**

Run:
```bash
python3 - <<'EOF'
css = open("css/style.css", encoding="utf-8").read()
assert css.count("{") == css.count("}")
assert ".navbar" in css and ".hero-title" in css
print("PASS: navbar+hero appended")
EOF
```
Expected: `PASS: navbar+hero appended`.

- [ ] **Step 3: Commit**

```bash
git add css/style.css && git commit -m "feat: add navbar and hero styles"
```

---

### Task 5: Tentang cards + Galeri grid styles

**Files:**
- Modify: `css/style.css` (append this block)

**Interfaces:**
- Consumes: classes `.cards`, `.card`, `.card-icon`, `.card-title`, `.card-text`, `.gallery-grid`, `.gallery-item`, `.gallery-ph` (+ `.ph-1`..`.ph-6`), `.gallery-caption` from Task 2.
- Produces: 3-column responsive cards with inline SVG icon chips, and a gallery grid of gradient photo placeholders with caption overlays.

- [ ] **Step 1: Append the cards + gallery CSS block**

```css

/* ===== Tentang — kartu keunggulan ===== */
.cards {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: 1.2rem;
  margin-top: 2.4rem;
}

.card {
  background: var(--bg-elev);
  border: 1px solid var(--border);
  border-radius: var(--radius);
  padding: 1.5rem;
  transition: transform 0.2s ease, border-color 0.2s ease;
}
.card:hover { transform: translateY(-4px); border-color: var(--violet); }

.card-icon {
  width: 48px;
  height: 48px;
  color: var(--violet);
  background: var(--bg-elev-2);
  border-radius: 12px;
  display: grid;
  place-items: center;
  margin-bottom: 1rem;
}
.card-icon svg { width: 24px; height: 24px; }

.card-title { font-size: 1.15rem; margin-bottom: 0.35rem; }
.card-text { color: var(--text-muted); font-size: 0.95rem; margin: 0; }

/* ===== Galeri ===== */
.gallery-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 1.2rem;
  margin-top: 2.4rem;
}

.gallery-item {
  position: relative;
  border-radius: var(--radius);
  overflow: hidden;
  aspect-ratio: 4 / 3;
  margin: 0;
}

.gallery-ph {
  position: absolute;
  inset: 0;
  display: grid;
  place-items: center;
  color: rgba(255, 255, 255, 0.75);
  font-weight: 600;
  letter-spacing: 0.08em;
}

.gallery-ph.ph-1 { background: linear-gradient(135deg, #4c1d95, #0e7490); }
.gallery-ph.ph-2 { background: linear-gradient(135deg, #1e3a8a, #0f766e); }
.gallery-ph.ph-3 { background: linear-gradient(135deg, #7c3aed, #a21caf); }
.gallery-ph.ph-4 { background: linear-gradient(135deg, #155e75, #1e40af); }
.gallery-ph.ph-5 { background: linear-gradient(135deg, #6d28d9, #0e7490); }
.gallery-ph.ph-6 { background: linear-gradient(135deg, #4338ca, #0891b2); }

.gallery-caption {
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  margin: 0;
  padding: 0.8rem 1rem;
  font-size: 0.9rem;
  background: linear-gradient(transparent, rgba(0, 0, 0, 0.7));
}
```

- [ ] **Step 2: Verify braces balanced + key selectors present**

Run:
```bash
python3 - <<'EOF'
css = open("css/style.css", encoding="utf-8").read()
assert css.count("{") == css.count("}")
assert ".cards" in css and ".card-icon" in css and ".gallery-ph.ph-6" in css
print("PASS: cards+gallery appended")
EOF
```
Expected: `PASS: cards+gallery appended`.

- [ ] **Step 3: Commit**

```bash
git add css/style.css && git commit -m "feat: add about cards and gallery styles"
```

---

### Task 6: CTA (Gabung/Kontak) + footer + responsive styles

**Files:**
- Modify: `css/style.css` (append this final block)

**Interfaces:**
- Consumes: classes `.cta`, `.cta-title`, `.cta-text`, `.cta-actions`, `.contact-links`, `.contact-link`, `.footer` from Task 2, and the `.nav-toggle`/`.nav-menu` from Task 4.
- Produces: centered CTA panel + pill contact links + footer, plus the `@media (max-width: 768px)` rules that switch the nav to the hamburger dropdown (`.nav-menu.open { display: flex; }`).

- [ ] **Step 1: Append the CTA + footer + responsive CSS block**

```css

/* ===== Gabung / Kontak ===== */
.cta {
  position: relative;
  overflow: hidden;
  border: 1px solid var(--border);
  border-radius: calc(var(--radius) + 6px);
  padding: 2.8rem 2rem;
  text-align: center;
  background:
    radial-gradient(50% 60% at 50% 0%, rgba(139, 92, 246, 0.18), transparent 70%),
    var(--bg-elev);
}

.cta-title { font-size: clamp(1.5rem, 4vw, 2.1rem); }
.cta-text { color: var(--text-muted); max-width: 46ch; margin-inline: auto; }

.cta-actions {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 0.9rem;
  margin-top: 1.6rem;
}

.contact-links {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 0.9rem;
  margin-top: 1.2rem;
}

.contact-link {
  border: 1px solid var(--border);
  border-radius: 999px;
  padding: 0.5rem 1.1rem;
  color: var(--text-muted);
  font-weight: 500;
  font-size: 0.9rem;
  transition: color 0.15s ease, border-color 0.15s ease;
}
.contact-link:hover { color: var(--cyan); border-color: var(--cyan); }

/* ===== Footer ===== */
.footer {
  border-top: 1px solid var(--border);
  padding: 2rem 0;
  margin-top: 4.5rem;
  text-align: center;
  color: var(--text-muted);
  font-size: 0.9rem;
}

/* ===== Responsive ===== */
@media (max-width: 768px) {
  .nav-toggle { display: flex; }

  .nav-menu {
    position: absolute;
    top: var(--nav-height);
    left: 0;
    right: 0;
    flex-direction: column;
    align-items: stretch;
    gap: 0;
    background: var(--bg-elev);
    border-bottom: 1px solid var(--border);
    padding: 0 1rem;
    display: none;
  }
  .nav-menu.open { display: flex; }

  .nav-link { padding: 0.9rem 0; }
  .nav-link-cta { text-align: center; margin: 0.6rem 0; }
}
```

- [ ] **Step 2: Verify full CSS — braces balanced, media query present**

Run:
```bash
python3 - <<'EOF'
css = open("css/style.css", encoding="utf-8").read()
assert css.count("{") == css.count("}")
assert "@media (max-width: 768px)" in css
assert ".nav-menu.open" in css and ".contact-link" in css
print("PASS: cta/footer/responsive appended")
EOF
```
Expected: `PASS: cta/footer/responsive appended`.

- [ ] **Step 3: Commit**

```bash
git add css/style.css && git commit -m "feat: add cta, footer, and responsive styles"
```

---

### Task 7: `js/main.js` — hamburger toggle + scroll reveal

**Files:**
- Create: `js/main.js`

**Interfaces:**
- Consumes: `.nav-toggle`, `#nav-menu`, `.nav-link`, `.reveal` selectors from Task 2 markup.
- Produces: `document.documentElement.classList.add("js")` (activates hidden `.reveal` state from Task 3); hamburger menu toggle that syncs `aria-expanded`/`aria-label`; menu closes on link click and on desktop resize; scroll-reveal via IntersectionObserver (no JS support => everything shown).

- [ ] **Step 1: Write `js/main.js`**

```js
(function () {
  document.documentElement.classList.add("js");

  var toggle = document.querySelector(".nav-toggle");
  var menu = document.getElementById("nav-menu");

  function setMenu(open) {
    menu.classList.toggle("open", open);
    toggle.classList.toggle("open", open);
    toggle.setAttribute("aria-expanded", String(open));
    toggle.setAttribute("aria-label", open ? "Tutup menu" : "Buka menu");
  }

  toggle.addEventListener("click", function () {
    setMenu(!menu.classList.contains("open"));
  });

  document.querySelectorAll(".nav-link").forEach(function (link) {
    link.addEventListener("click", function () {
      setMenu(false);
    });
  });

  window.addEventListener("resize", function () {
    if (window.innerWidth > 768) setMenu(false);
  });

  var revealEls = document.querySelectorAll(".reveal");

  function revealAll() {
    revealEls.forEach(function (el) { el.classList.add("visible"); });
  }

  if ("IntersectionObserver" in window) {
    var io = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 }
    );
    revealEls.forEach(function (el) { io.observe(el); });
  } else {
    revealAll();
  }
})();
```

- [ ] **Step 2: Syntax-check with node**

Run:
```bash
node --check js/main.js && echo "JS_SYNTAX_OK"
```
Expected: `JS_SYNTAX_OK`.

- [ ] **Step 3: Manual smoke check in browser**

```bash
python3 -m http.server 8000 >/dev/null 2>&1 &
sleep 1
curl -s -o /dev/null -w "index:%{http_code} css:%{http_code} " http://localhost:8000/ http://localhost:8000/css/style.css
curl -s -o /dev/null -w "js:%{http_code}\n" http://localhost:8000/js/main.js
kill %1 2>/dev/null
```
Expected: `index:200 css:200 js:200`. Then open `http://localhost:8000` and confirm in the browser: at width <=768px the hamburger toggles the menu and turns into an X (bars rotate), and non-visible `.reveal` blocks fade up as you scroll.

- [ ] **Step 4: Commit**

```bash
git add js/main.js && git commit -m "feat: add hamburger menu and scroll reveal"
```

---

### Task 8: End-to-end verification + deploy to GitHub Pages

**Files:**
- Modify: none (verification only), then push.

**Interfaces:**
- Consumes: the finished `index.html`, `css/style.css`, `js/main.js`.
- Produces: a verified build and a live GitHub Pages site at `https://Aryasatya-star.github.io/UDC_Landing_Page/`.

- [ ] **Step 1: Full structural + HTTP verification on the built site**

Run:
```bash
python3 - <<'EOF'
import re
h = open("index.html", encoding="utf-8").read()
ids = set(re.findall(r'id="([^"]+)"', h))
hrefs = set(re.findall(r'href="#([^"]+)"', h))
assert not (hrefs - ids), f"broken anchors: {hrefs - ids}"
css = open("css/style.css", encoding="utf-8").read()
assert css.count("{") == css.count("}")
print("PASS: anchors + css braces")
EOF
```
Expected: `PASS: anchors + css braces`.

```bash
python3 -m http.server 8000 >/dev/null 2>&1 &
sleep 1
for f in "" "css/style.css" "js/main.js"; do
  echo -n "/$f -> "
  curl -s -o /dev/null -w "%{http_code}\n" "http://localhost:8000/$f"
done
curl -s http://localhost:8000/ | grep -o -E 'id="(home|tentang|galeri|gabung)"' | sort -u
kill %1 2>/dev/null
```
Expected: `/ -> 200`, `/css/style.css -> 200`, `/js/main.js -> 200`, and the four section ids printed.

- [ ] **Step 2: Manual browser QA checklist**

Open with a local server and confirm all of the following:
1. Desktop (>768px): nav shows 3 links, no hamburger.
2. Mobile (<=768px, e.g. 375px via DevTools): hamburger appears, clicking toggles an animated dropdown menu, clicking a link closes it, and the CTA "Gabung" button stays readable.
3. Smooth scrolling from nav links lands below the sticky header (not hidden behind it).
4. Scroll-reveal: blocks fade up once, hero visible immediately.
5. `prefers-reduced-motion` off; check page zoom to 200% still readable on mobile width.
6. No console errors in DevTools.

- [ ] **Step 3: Commit any polish, then push**

```bash
git add -A && git commit -m "chore: final verification pass" 2>/dev/null || echo "nothing to commit"
git push origin main
```
Expected: push succeeds, `main` matches `origin/main` (`git status` clean).

- [ ] **Step 4: Enable GitHub Pages (repo manager does this in the web UI)**

- Settings → Pages → Source: Deploy from a branch → Branch: `main` / `/ (root)` → Save.
- After a minute, verify `https://Aryasatya-star.github.io/UDC_Landing_Page/` returns 200 and the layout matches the local build.
- Confirm relative asset paths (`css/style.css`, `js/main.js`) load on the Pages URL (no 404s in DevTools Network tab). `.nojekyll` (Task 1) keeps Jekyll from interfering.

- [ ] **Step 5: Record the work — commit the plan + spec**

```bash
git add docs/ && git commit -m "docs: add implementation plan"
git push origin main
```
Expected: clean `git status`; both `docs/superpowers/specs/2026-09-21-landing-page-design.md` and `docs/superpowers/plans/2026-09-21-landing-page.md` are on `main`.