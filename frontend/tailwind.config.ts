import type { Config } from 'tailwindcss'
import {content, plugin} from "flowbite-react/tailwind"

const config: Config = {
  content: [
    content(),
    "./src/**/*.{js,ts,jsx,tsx,mdx}",

  ],
  theme: {
    extend: {
      colors: {
        'bgcolor': '#13283F', // You can define a single color as well
        'fhcolor': '#1D3D61',
        'popcolor': '#B5C8DE'
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
    require('@tailwindcss/forms'),
    plugin(),
    function ({ addComponents }:any) {
      addComponents({
        '.no-scrollbar': {
          '::-webkit-scrollbar': {
            display: 'none',
          },
          '-ms-overflow-style': 'none', // For IE and Edge
          'scrollbar-width': 'none', // For Firefox
        },
      });
    },
  ],
}

export default config