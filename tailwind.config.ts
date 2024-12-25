import type { Config } from 'tailwindcss';

export default {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      boxShadow: {
        base: 'rgba(0, 0, 0, 0.05) 0px 0px 2px, rgba(0, 0, 0, 0.1) 0px 2px 8px',
      },
      fontFamily: {
        sans: [
          '-apple-system',
          'BlinkMacSystemFont',
          'Apple SD Gothic Neo',
          'Helvetica',
          'Arial',
          'NanumGothic',
          '나눔고딕',
          'Malgun Gothic',
          '맑은 고딕',
          'Dotum',
          '굴림',
          'gulim',
          '새굴림',
          'noto sans',
          '돋움',
          'sans-serif',
        ],
        blackHanSans: ['var(--font-black-han-sans)'],
        gothic: ['"Gothic A1"', 'sans-serif'],
      },
      colors: {
        background: 'var(--background)',
        foreground: 'var(--foreground)',
      },
    },
  },
  plugins: [],
} satisfies Config;
