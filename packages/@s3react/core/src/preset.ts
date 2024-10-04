const config = {
  theme: {
    extend: {
      keyframes: {
        buzz: {
          '0%, 100%': { transform: 'translateX(0)' },
          '33%': { transform: 'translateX(-5px)' },
          '66%': { transform: 'translateX(5px)' },
        }
      },
      animation: {
        buzz: 'buzz 200ms ease-in-out',
      }
    },
  },
  plugins: [],
}

export default config;
