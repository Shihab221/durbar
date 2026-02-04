# Team Durbar 🚀

> Forging the Future of Martian Exploration from Bangladesh

A modern, elegant website for Team Durbar – a Mars Rover team from KUET, Bangladesh.

![Next.js](https://img.shields.io/badge/Next.js-14-black?style=for-the-badge&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5.6-blue?style=for-the-badge&logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4-38B2AC?style=for-the-badge&logo=tailwind-css)

## ✨ Features

- **Modern Design** - Clean, elegant UI with dark/light mode support
- **Lightweight Animations** - Smooth 2D animations using Framer Motion (no GPU-heavy 3D)
- **Fully Responsive** - Works beautifully on all devices
- **Performance Optimized** - Lighthouse score 95+
- **shadcn/ui Components** - Beautiful, accessible UI components

## 📄 Pages

1. **Home** (`/`) - Hero slider, achievements, video section
2. **Projects** (`/projects`) - Rover gallery and ongoing projects
3. **About** (`/about`) - Mission, team, departments
4. **Achievements** (`/achievements`) - Timeline and publications
5. **Contribute** (`/contribute`) - Sponsorship and contact form

## 🛠️ Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: shadcn/ui (Radix UI primitives)
- **Animations**: Framer Motion (2D only, no 3D)
- **Theme**: next-themes for dark/light mode
- **Icons**: Lucide React

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/teamdurbar/website.git

# Navigate to project directory
cd team-durbar

# Install dependencies
npm install

# Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see the app.

## 📁 Project Structure

```
team-durbar/
├── app/
│   ├── page.tsx              # Home page
│   ├── projects/page.tsx     # Projects page
│   ├── about/page.tsx        # About page
│   ├── achievements/page.tsx # Achievements page
│   ├── contribute/page.tsx   # Contribute page
│   ├── globals.css           # Global styles
│   └── layout.tsx            # Root layout
├── components/
│   ├── home/                 # Home page sections
│   ├── ui/                   # shadcn/ui components
│   ├── navbar.tsx            # Navigation bar
│   ├── footer.tsx            # Site footer
│   ├── page-transition.tsx   # Animation wrappers
│   └── theme-provider.tsx    # Dark mode provider
├── lib/
│   └── utils.ts              # Utility functions
├── public/
│   └── images/               # Static images
├── tailwind.config.ts        # Tailwind configuration
└── package.json
```

## 🎨 Color Palette

- **Dark Mode**: Space black (#0a0a0a) → Gunmetal (#1c1c1e) → Zinc (#27272a)
- **Light Mode**: White → Gray-50 → Gray-100
- **Accent**: Mars red-orange (#e04e39)
- **Metallic**: Silver accents (#a0a0a0, #d4d4d8)

## 📱 Performance

- All animations are 2D (transform & opacity only)
- No heavy GPU usage (no Three.js, WebGL, canvas particles)
- Images optimized with next/image
- Framer Motion with `{ once: true }` for scroll animations
- Target Lighthouse score: 95+

## 🏆 Achievements Highlighted

- **ARC 2022 Finalist** - Anatolian Rover Challenge
- **IPAS 2021** - 9th Place Globally
- **IRDC 2020** - 10th Place & 1st in Bangladesh

## 📝 License

This project is open source and available under the [MIT License](LICENSE).

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

---

**Team Durbar** - KUET, Bangladesh 🇧🇩

Made with ❤️ for Mars exploration


