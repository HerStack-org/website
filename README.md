# HerStack 🚀

**Building India's AI generation — one girl at a time.**

HerStack is an open source community platform helping school girls and young women across India learn AI/ML, find women mentors, and build the future — completely free.

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](CONTRIBUTING.md)

[//]: # ([![GirlScript]&#40;https://img.shields.io/badge/GirlScript-Summer%20of%20Code-orange&#41;]&#40;https://gssoc.girlscript.tech/&#41;)

---

## What is HerStack?

HerStack is three things working together:

- **Curated Resources** — The best free AI/ML courses, lectures, and certifications, handpicked into clear learning paths. Not random links. The actual good stuff.
- **AI Concepts Visualized** — Machine learning, neural networks, LLMs — explained through illustrated storyboards that anyone can understand.
- **Women Mentors** — Real women working in AI across India's top companies and startups, with their LinkedIn profiles so girls can see what the path looks like.

[//]: # (And coming in 2026: **HerStack Summer of AI** — an open source program where girls contribute to real AI projects, get paired with women mentors, and earn a certificate.)

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

[//]: # ()
[//]: # (## GirlScript Summer of Code)

[//]: # ()
[//]: # (This project is registered with **GirlScript Summer of Code &#40;GSSoC&#41;**. If you're a GSSoC participant, check our issues for tasks labeled `gssoc`.)

[//]: # ()
[//]: # (---)

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

/**
## ✨ README Improvement Notes

### 📌 Formatting Enhancements Needed
- Improve heading hierarchy for better readability
- Ensure consistent spacing between sections
- Use proper Markdown formatting for code blocks and lists
- Align all installation and usage steps properly

### 🚀 Suggested Structure Upgrade
- Introduction
- Features
- Tech Stack
- Installation
- Usage
- Project Structure
- Contribution Guidelines
- License

### 🛠️ Documentation Improvements
- Add badges (optional): build, license, contributors
- Add screenshots for better UI understanding
- Standardize code blocks for commands

### 🎯 Goal
Improve onboarding experience for new contributors and users by making README more structured, readable, and professional.
*/
