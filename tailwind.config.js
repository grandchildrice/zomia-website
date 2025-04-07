/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#1a1a2e', // 暗い青/紫 - 暗号結社の秘密性
          light: '#16213e',
          dark: '#0f3460',
        },
        secondary: {
          DEFAULT: '#7209b7', // 魔法的な紫
          light: '#9d4edd',
          dark: '#560bad',
        },
        accent: {
          DEFAULT: '#4cc9f0', // 宇宙的な青
          light: '#72efdd',
          dark: '#3a86ff',
        },
        magic: {
          DEFAULT: '#f72585', // 魔術的なピンク
          light: '#ff758f',
          dark: '#b5179e',
        },
        retro: {
          DEFAULT: '#f8961e', // レトロなオレンジ
          light: '#f9c74f',
          dark: '#f3722c',
        },
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'sans-serif'],
        mono: ['var(--font-roboto-mono)', 'monospace'],
        display: ['var(--font-orbitron)', 'sans-serif'],
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
        'space-pattern': "url('/images/space-bg.png')",
      },
      animation: {
        'glow': 'glow 2s ease-in-out infinite alternate',
        'float': 'float 6s ease-in-out infinite',
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      keyframes: {
        glow: {
          '0%': { textShadow: '0 0 5px #fff, 0 0 10px #fff, 0 0 15px #4cc9f0, 0 0 20px #4cc9f0' },
          '100%': { textShadow: '0 0 10px #fff, 0 0 20px #fff, 0 0 30px #4cc9f0, 0 0 40px #4cc9f0' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
      },
    },
  },
  plugins: [],
}
