import type { Config } from 'tailwindcss';

export default {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
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
      },
      colors: {
        background: 'var(--background)',
        foreground: 'var(--foreground)',
      },
    },
  },
  plugins: [],
} satisfies Config;
