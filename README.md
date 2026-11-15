# Gardi Motors — Elite Drive

A **GitHub-ready, modular demo frontend** for a premium Gardi Motors vehicle showroom, written in accessible HTML, CSS and modern JavaScript. It works on static hosting without Node.js, a build step or a paid service.

> **Important — source provenance:** This repository is **not an extraction of the original Emergent project**. The public preview at https://gardi-elite-drive.preview.emergentagent.com/ exposes a JavaScript application shell to the available inspection tools, not the original component source, API logic or design assets. This is an independently authored, editable replacement based on the Gardi Motors context. The original app may look or behave differently. To recover the *exact* original site, export its files from the Emergent workspace or connect that workspace to GitHub, then use its original frontend/backend source and assets.

## Quick start

```bash
# Run from inside the unzipped project directory
python3 -m http.server 8000
# Browse http://localhost:8000
```

Alternatively, use a local static server such as the VS Code Live Server extension. Opening `index.html` directly via `file://` is **not supported** because ES modules are used.

## Files and folders

```text
gardi-elite-drive/
├── index.html                 # Page skeleton, SEO metadata and sections
├── css/
│   ├── variables.css          # Colours, spacing and design tokens
│   ├── base.css               # Reset, typography, accessibility
│   ├── layout.css             # Page layout and sections
│   ├── components.css         # Cards, buttons, modal and feedback
│   └── responsive.css         # Tablet and mobile layouts
├── js/
│   ├── app.js                 # Application entry point
│   ├── config.js              # Public business contact configuration
│   ├── data/
│   │   └── vehicles.js        # Editable vehicle listings (demo content)
│   ├── utils/
│   │   └── dom.js             # Escape HTML, notifications, clipboard
│   └── components/
│       ├── header.js          # Navbar and mobile menu
│       ├── hero.js            # Hero area
│       ├── inventory.js       # Search, filters, saved cars, vehicle cards
│       ├── modal.js           # Vehicle details dialog
│       ├── contact.js         # Vehicle enquiry form
│       └── footer.js          # Footer links
├── assets/images/            # Local illustrative SVG assets
├── .gitignore
└── README.md
```

## What works

- Fully responsive showroom landing page with mobile navigation
- Vehicle search, fuel filters, sorting and saved-only view
- Save/unsave vehicles in browser local storage (if available)
- Vehicle details modal with keyboard support and enquiry action
- Contact form validation and WhatsApp / email integration after configuration
- Clipboard fallback when no contact endpoint has been configured
- FAQ, back-to-top, basic SEO tags and keyboard-accessible navigation

There is **no database, admin login, payment, booking engine or server-side lead storage** in this build.

## Customize before publishing

1. Edit **`js/config.js`** to add your *public* WhatsApp number (international format, digits only), public company email, optional phone and social links. Do not add API keys or private credentials.
2. Replace demo records in **`js/data/vehicles.js`** with your *verified* vehicle models, specifications and stock status. Current listings are examples only, not real-time inventory. Prices are shown as "On request" intentionally.
3. Replace placeholder **SVG illustrations** in `assets/images/` with your licensed, real car and showroom images; update each record's `image` path. The illustrations are not photographs of actual models.
4. Adjust colours, branding, copy and sections in the corresponding CSS and component modules. Replace the typographic placeholder logo with your official brand asset, if desired.
5. Test WhatsApp or email links on a real browser and device before inviting customers.

### Example: add a car

Open `js/data/vehicles.js`, add an object to `vehicles`:

```js
{
  id: 'my-new-car',
  year: 2026,
  make: 'Your Brand',
  model: 'Your Model',
  trim: 'Confirmed trim and description',
  body: 'SUV',
  fuel: 'Petrol',      // Petrol, Hybrid, Plug-in hybrid, Other
  transmission: 'Automatic',
  label: 'SHOWCASE',
  image: './assets/images/my-new-car.jpg',
  description: 'Your verified listing description.',
  features: ['SUV']
}
```

Place the image in `assets/images/` and confirm the relative path.

## Publish on GitHub Pages

1. Create an empty repository on GitHub (for example, `gardi-elite-drive`).
2. Unzip the archive. Upload the **contents of** `gardi-elite-drive/` to the root of that repository (or use `git add`, `git commit`, `git push`).
3. In your GitHub repository, select **Settings → Pages → Build and deployment → Deploy from a branch**.
4. Choose branch **main**, folder **/(root)**, then save.
5. Wait until GitHub provides a Pages URL. Relative links and assets will work under the repository path.

For a custom domain, see the latest GitHub Pages documentation and configure its DNS records correctly.

## Replace this reconstruction with the original Emergent app

If you still have the project in Emergent, open its workspace and use its code view, download/export feature or GitHub integration (depending on what the platform currently exposes). Export both frontend and backend, `.env.example` files and static assets. **Never commit `.env`, tokens, database passwords or private keys.** That is the way to preserve original page design, backend endpoints, authentication and inventory content; a public preview alone does not provide that source.

## Security and privacy

- Enquiry details are composed in the visitor's browser; this demo does **not** send or save them on a server.
- With WhatsApp or email configured, the browser opens the visitor's messaging app; **the visitor must press Send**.
- The local storage key stores only saved vehicle IDs, not personal details.
- This frontend has no protection for private administrative functions. Build a secure backend before adding accounts, payments or private inventory management.

## License and ownership

This demo source is supplied for your GitHub repository. Vehicle model names belong to their owners. Replace all example imagery with assets you are authorized to publish. No original Emergent implementation or proprietary source files are included.
