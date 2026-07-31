# RTN CAFE — Website

**ಆರ್ಟಿಎನ್ ಕೆಫೆ** | Fresh Taste. Cozy Moments. Every Visit Special.

A premium, fully-responsive static website for RTN CAFE, Hebbal, Bengaluru.  
Built with pure HTML5 · CSS3 · Vanilla JavaScript — no build tools required.

---

## Folder Structure

```
RTN-CAFE/
├── index.html          ← Main single-page website
├── css/
│   ├── style.css       ← Theme, layout, components
│   ├── animations.css  ← Keyframes and reveal utilities
│   └── responsive.css  ← Media queries (mobile-first)
├── js/
│   ├── script.js       ← Nav, loader, hours, form, ripple
│   ├── animations.js   ← Scroll-reveal, counters, parallax
│   └── menu.js         ← Menu category filtering
├── images/
│   ├── logo.png        ← ⚠ Add your own logo here
│   ├── hero.jpg        ← ⚠ Optional: replace hero image
│   ├── gallery/        ← ⚠ Add your own gallery photos
│   ├── menu/           ← ⚠ Add your own menu item photos
│   └── icons/
│       ├── icon-192.png    ← PWA icon (192×192)
│       ├── icon-512.png    ← PWA icon (512×512)
│       └── apple-touch-icon.png  ← iOS home-screen icon
├── assets/
│   └── favicon.ico     ← ⚠ Add your favicon here
├── manifest.json       ← Web App Manifest (PWA)
├── robots.txt          ← Search engine crawl rules
├── sitemap.xml         ← SEO sitemap
└── README.md           ← This file
```

---

## Deploying to GitHub Pages

### Step 1 — Create a GitHub repository

1. Log in to [github.com](https://github.com)
2. Click **New repository**
3. Name it exactly: `rtn-cafe` (or any name you like)
4. Set it to **Public**
5. Click **Create repository**

### Step 2 — Push the files

**Option A — GitHub Desktop (easiest)**
1. Download [GitHub Desktop](https://desktop.github.com/)
2. Clone your new repo
3. Copy all files from this `RTN-CAFE/` folder into the cloned repo folder
4. Commit with the message: `Initial website launch`
5. Push to GitHub

**Option B — Command Line**
```bash
cd RTN-CAFE
git init
git add .
git commit -m "Initial website launch"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/rtn-cafe.git
git push -u origin main
```

### Step 3 — Enable GitHub Pages

1. Go to your repo on GitHub
2. Click **Settings** → **Pages** (left sidebar)
3. Under **Source**, select **Deploy from a branch**
4. Choose branch: **main**, folder: **/ (root)**
5. Click **Save**
6. Your site will be live at:  
   `https://YOUR_USERNAME.github.io/rtn-cafe/`  
   (ready in ~1–2 minutes)

---

## Customising the Site

### Update contact form to actually send emails

The contact form shows a success message locally but does **not** send emails without a backend.  
For a free solution on GitHub Pages, use [Formspree](https://formspree.io/):

1. Sign up at formspree.io
2. Create a new form and copy your form endpoint URL
3. In `index.html`, find `<form class="contact-form" id="contactForm"` and add:
   ```html
   action="https://formspree.io/f/YOUR_FORM_ID"
   method="POST"
   ```
4. In `js/script.js`, replace the `setTimeout` simulation block with a real `fetch` call.

### Replace placeholder images

All images currently load from Unsplash CDN URLs. To use your own photos:

1. Add your images to the `images/` folder
2. In `index.html`, replace each `src="https://images.unsplash.com/..."` with a relative path like `images/hero.jpg`

### Update the sitemap URL

Replace all occurrences of `https://rtn-cafe.github.io/` in `sitemap.xml` with your actual GitHub Pages URL.

### Add a custom domain

1. Buy a domain (e.g., `rtncafe.in`) from any registrar
2. In your repo's **Settings → Pages**, enter your custom domain
3. Create a `CNAME` file in the repo root containing just: `rtncafe.in`
4. Update DNS records at your registrar as instructed by GitHub

---

## Features

| Feature | Status |
|---|---|
| Fully responsive (mobile, tablet, desktop) | ✅ |
| Dark luxe café theme | ✅ |
| Sticky glassmorphism navigation | ✅ |
| Mobile hamburger menu | ✅ |
| Loading animation | ✅ |
| Hero with animated text | ✅ |
| Scroll-reveal animations | ✅ |
| Animated stat counters | ✅ |
| Filterable menu section | ✅ |
| Masonry gallery with hover effects | ✅ |
| Customer reviews section | ✅ |
| Dynamic opening hours (today highlighted) | ✅ |
| Google Maps embed | ✅ |
| Contact form with validation | ✅ |
| Back-to-top button | ✅ |
| Floating WhatsApp button | ✅ |
| Click-to-call button | ✅ |
| Ripple button effects | ✅ |
| SEO meta tags + Open Graph | ✅ |
| Schema.org Restaurant JSON-LD | ✅ |
| Web App Manifest (PWA-ready) | ✅ |
| robots.txt + sitemap.xml | ✅ |
| Accessible labels, alt text, focus states | ✅ |
| Prefers-reduced-motion support | ✅ |
| Print stylesheet | ✅ |

---

## Browser Support

Chrome 90+, Firefox 88+, Safari 14+, Edge 90+, Samsung Internet 14+

---

## Contact

**RTN CAFE**  
Near Vidyanjali School, Coconut Garden, Cholanyakanhalli  
Hebbal, Bengaluru, Karnataka – 560024  
📞 [+91 99009 28901](tel:+919900928901)

---

*Website crafted with care in Bengaluru.*
