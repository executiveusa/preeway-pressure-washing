import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./src/**/*.{astro,ts,tsx,js,jsx}'],
  theme: {
    extend: {
      colors: {
        gold: '#c4963c',
        'gold-light': '#d4a94c',
        'accent-green': '#5a7a52',
        dark: '#0a1108',
        surface: '#1a2a1a',
        'surface-2': '#243a24',
        text: '#f5f0e8',
        muted: '#8a9e7e',
        'muted-dark': '#6a8a5e',
      },
      fontFamily: {
        display: ['"Playfair Display"', 'Georgia', 'serif'],
        mono: ['"DM Mono"', 'monospace'],
        body: ['Lato', 'sans-serif'],
      },
      backgroundImage: {
        'hero-texture': `
          radial-gradient(ellipse at 20% 80%, rgba(90,122,82,0.15) 0%, transparent 60%),
          radial-gradient(ellipse at 80% 20%, rgba(196,150,60,0.08) 0%, transparent 60%),
          linear-gradient(180deg, #0a1108 0%, #1a2a1a 100%)
        `,
      },
    },
  },
  plugins: [],
};

export default config;
