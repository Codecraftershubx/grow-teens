import { defineRecipe } from "@chakra-ui/react";

export const buttonRecipe = defineRecipe({
  base: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: "6px",
    cursor: "pointer",
    transition: "all 0.2s",
    px: "12px",
    py: "6px",
  },
  variants: {
    visual: {
      solid: {
        backgroundColor: "#db0000",
        color: "white",
        _hover: { backgroundColor: "#af0000" },
      },
      outline: {
        borderWidth: "1px",
        borderColor: "black",
        color: "black",
        _hover: { backgroundColor: "#E5F4FB", border: "none" },
      },
    },
    size: {
      sm: { fontSize: "12px" },
      md: { fontSize: "16px" },
      lg: { fontSize: "24px" },
    },
  },
  defaultVariants: {
    visual: "solid",
    size: "md",
  },
});
