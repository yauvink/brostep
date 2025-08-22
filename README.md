# Brostep

A modern React + TypeScript + Vite project with GitHub Pages deployment.

## 🚀 Tech Stack

- **React 19** - Latest React with modern features
- **TypeScript** - Type-safe JavaScript
- **Vite** - Fast build tool and dev server
- **GitHub Pages** - Static site hosting

## 📦 Installation

```bash
npm install
```

## 🛠️ Development

Start the development server:

```bash
npm run dev
```

The app will be available at `http://localhost:5173`

## 🏗️ Building

Build the project for production:

```bash
npm run build
```

Preview the production build:

```bash
npm run preview
```

## 🚀 Deployment

Deploy to GitHub Pages:

```bash
npm run deploy
```

This will:
1. Build the project (`npm run build`)
2. Deploy the `dist` folder to the `gh-pages` branch
3. Make your site available at `https://yau.vink.github.io/brostep`

## 📁 Project Structure

```
brostep/
├── src/
│   ├── App.tsx          # Main App component
│   ├── App.css          # App styles
│   ├── main.tsx         # App entry point
│   ├── index.css        # Global styles
│   └── vite-env.d.ts    # Vite type definitions
├── public/              # Static assets
├── dist/                # Build output (generated)
├── vite.config.ts       # Vite configuration
├── tsconfig.json        # TypeScript configuration
└── package.json         # Dependencies and scripts
```

## 🔧 Configuration

- **Base Path**: Configured for GitHub Pages at `/brostep/`
- **TypeScript**: Strict mode enabled
- **ESLint**: Code quality and consistency
- **GitHub Pages**: Automatic deployment setup

## 📝 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint
- `npm run deploy` - Deploy to GitHub Pages

## 🌐 Live Demo

Visit: [https://yau.vink.github.io/brostep](https://yau.vink.github.io/brostep)

## 📄 License

This project is open source and available under the [MIT License](LICENSE).
