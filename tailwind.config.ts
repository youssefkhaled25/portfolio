import type { Config } from 'tailwindcss'
import forms from '@tailwindcss/forms'

const config: Config = {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        'bg-primary': '#0a0a0f',
        'bg-surface': '#0d1117',
        'bg-elevated': '#161b22',
        'accent': '#00d4ff',
        'accent-dim': 'rgba(0, 212, 255, 0.2)',
        'text-primary': '#e6edf3',
        'text-muted': '#8b949e',
        'border-subtle': '#21262d',
      },
      fontFamily: {
        'grotesk': ['"Space Grotesk"', 'sans-serif'],
        'inter': ['Inter', 'sans-serif'],
        'mono': ['"JetBrains Mono"', 'monospace'],
      },
      boxShadow: {
        'glow-sm': '0 0 10px 1px rgba(0, 212, 255, 0.3)',
        'glow': '0 0 20px 2px rgba(0, 212, 255, 0.25)',
        'glow-lg': '0 0 35px 4px rgba(0, 212, 255, 0.2)',
      },
      animation: {
        'fade-up': 'fadeUp 0.6s ease-out forwards',
        'blink': 'blink 1s step-start infinite',
      },
      keyframes: {
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(30px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        blink: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0' },
        },
      },
    },
  },
  plugins: [forms],
}

export default config
