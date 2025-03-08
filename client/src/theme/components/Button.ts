const buttonTheme = {
  baseStyle: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: "md",
    cursor: "pointer",
    transitionProperty: "common",
    transitionDuration: "normal",
    px: 3, // 12px
    py: 1.5, // 6px
    _focusVisible: {
      boxShadow: "outline",
    },
    _disabled: {
      opacity: 0.4,
      cursor: "not-allowed",
      boxShadow: "none",
    },
  },
  sizes: {
    sm: {
      fontSize: "sm",
      px: 3,
      py: 1,
      h: 8,
      minW: 8,
    },
    md: {
      fontSize: "md",
      px: 4,
      py: 2,
      h: 10,
      minW: 10,
    },
    lg: {
      fontSize: "lg",
      px: 6,
      py: 3,
      h: 12,
      minW: 12,
    },
  },
  variants: {
    solid: {
      bg: "primary.400",
      color: "white",
      _hover: {
        bg: "primary.500",
        _disabled: {
          bg: "primary.300",
        },
      },
      _active: {
        bg: "primary.700",
      },
    },
    outline: {
      _hover: {
        bg: "primary.100",
      },
    }
  },
  defaultProps: {
    size: "md",
    variant: "solid",
    colorScheme: "primary",
  },
};

export default buttonTheme;
