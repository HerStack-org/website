# HerStack 🚀

**Building India's AI generation — one girl at a time.**

HerStack is an open source community platform helping school girls and young women across India learn AI/ML, find women mentors, and build the future — completely free.

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](CONTRIBUTING.md)
[![GirlScript](https://img.shields.io/badge/GirlScript-Summer%20of%20Code-orange)](https://gssoc.girlscript.tech/)

---

## What is HerStack?

HerStack is three things working together:

- **Curated Resources** — The best free AI/ML courses, lectures, and certifications, handpicked into clear learning paths. Not random links. The actual good stuff.
- **AI Concepts Visualized** — Machine learning, neural networks, LLMs — explained through illustrated storyboards that anyone can understand.
- **Women Mentors** — Real women working in AI across India's top companies and startups, with their LinkedIn profiles so girls can see what the path looks like.

And coming in 2026: **HerStack Summer of AI** — an open source program where girls contribute to real AI projects, get paired with women mentors, and earn a certificate.

---

## Live Site

🌐 [herstack.org](https://herstack.org)

---

## Tech Stack

| Tool | Purpose |
|------|---------|
| [Vite](https://vitejs.dev/) | Build tool |
| [React 18](https://react.dev/) | UI framework |
| [Tailwind CSS](https://tailwindcss.com/) | Styling |
| [Vercel](https://vercel.com/) | Hosting |

---

## System Architecture

```mermaid
graph TD
    subgraph "Data Layer (src/data/)"
        A[mentors.js]
        B[resources.js]
        C[storyboards.js]
    end

    subgraph "Core App Shell"
        Root[App.jsx]
        Nav[Nav.jsx]
        Footer[Footer.jsx]
    end

    subgraph "Presentation Layer (src/components/)"
        D[Mentors.jsx]
        E[LearningPath.jsx]
        F[Storyboards.jsx]
        G[SummerOfAI.jsx]
    end

    Root --> Nav
    Root --> G
    Root --> Footer

    %% Data Ingestion Mapping
    A -->|Maps profiles| D
    B -->|Maps courses| E
    C -->|Maps concept UI| F

    Root --> D
    Root --> E
    Root --> F
```

---

## Getting Started (Local Development)

**New to this?** Check out **[SETUP.md](SETUP.md)** for a beginner-friendly step-by-step guide — from installing Node.js to making your first contribution.

### Quick start

```bash
# 1. Clone the repo
git clone https://github.com/HerStack-org/website
cd website

# 2. Install dependencies
npm install

# 3. Start dev server
npm run dev
```

Visit `http://localhost:5173` — you should see the site running locally.

### Build for production

```bash
npm run build
npm run preview   # preview the production build locally
```

---

## Project Structure

```
herstack/
├── public/                  # Static assets (favicon, images)
├── src/
│   ├── components/          # One file per section of the page
│   │   ├── Nav.jsx
│   │   ├── Hero.jsx
│   │   ├── Marquee.jsx
│   │   ├── Pillars.jsx
│   │   ├── LearningPath.jsx
│   │   ├── Storyboards.jsx
│   │   ├── Mentors.jsx
│   │   ├── SummerOfAI.jsx
│   │   ├── Contribute.jsx
│   │   └── Footer.jsx
│   ├── data/                # Content as JS objects — easy to edit without touching UI code
│   │   ├── mentors.js       ← add mentors here
│   │   ├── resources.js     ← add resources here
│   │   └── storyboards.js   ← add storyboard concepts here
│   ├── styles/
│   │   └── globals.css      # CSS variables, base styles, Tailwind imports
│   ├── App.jsx              # Root component
│   └── main.jsx             # Entry point
├── index.html
├── vite.config.js
├── tailwind.config.js
└── package.json
```

---

## How to Contribute

We welcome all kinds of contributions — you don't need to know how to code to help!

See **[CONTRIBUTING.md](CONTRIBUTING.md)** for the full guide. Quick summary:

| Contribution type | What to do |
|---|---|
| Add a mentor | Edit `src/data/mentors.js` and open a PR |
| Add a resource | Edit `src/data/resources.js` and open a PR |
| Propose a storyboard concept | Open a GitHub issue with the label `storyboard` |
| Fix a bug / build a feature | Check [open issues](../../issues) for `good first issue` labels |
| Improve copy or fix typos | Edit the relevant component and open a PR |

---

## GirlScript Summer of Code

This project is an official part of **GirlScript Summer of Code (GSSoC)**! 

If you are a participant looking to contribute:
1. Head over to our **[Issues](../../issues)** tab.
2. Filter by the `gssoc` or `good first issue` labels.
3. Comment on the issue you'd like to claim before starting work to avoid overlapping Pull Requests.

---

## Community

- 💬 Discussions: [GitHub Discussions](../../discussions)
- 🐛 Bugs & Features: [GitHub Issues](../../issues)
- 📧 Contact: hey@herstack.org

---

## License

MIT © [HerStack](https://herstack.org)

This project is free and open source. Use it, fork it, build on it.

---

<p align="center">Made with ♥ for India's next generation of AI builders</p>
