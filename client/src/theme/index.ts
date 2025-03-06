import { createSystem, defaultBaseConfig, defineConfig } from "@chakra-ui/react";
import { buttonRecipe } from "./button.recipe";

const config = defineConfig({
  cssVarsPrefix: "growteens",
  theme: {
    tokens: {
      colors: {
        primary: {
          DEFAULT: { value: "#db0000" },
          100: { value: "#fbe5e5" },
          200: { value: "#f7cccc" },
          300: { value: "#e54c4c" },
          400: { value: "#db0000" },
          500: { value: "#af0000" },
          600: { value: "#570000" },
          700: { value: "#410000" },
        },
        secondary: {
          DEFAULT: { value: "#029ADC" },
          100: { value: "#E5F4FB" },
          200: { value: "#CCEAF8" },
          300: { value: "#4DB8E6" },
          400: { value: "#029ADC" },
          500: { value: "#017BB0" },
          600: { value: "#003D58" },
          700: { value: "#002E42" },
          800: { value: "#012534" },
        },

        tertiary: {
          DEFAULT: { value: "#D88E00" },
          100: { value: "#FBF3E5" },
          200: { value: "#F7E8CC" },
          300: { value: "#E3AF4C" },
          400: { value: "#D88E00" },
          500: { value: "#AC7100" },
          600: { value: "#563800" },
          700: { value: "#402A00" },
        },
      },

      fonts: {
        body: { value: "Istok Web, sans-serif" },
        heading: { value: "Roboto Flex, sans-serif" },
      },
    },

    recipes: {
      button: buttonRecipe,
    },
  },
});

export const system = createSystem(defaultBaseConfig, config)
