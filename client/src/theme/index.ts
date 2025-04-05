import { extendTheme } from "@chakra-ui/react";
import buttonTheme from "./components/Button";
import { colors } from "./constants";

const theme = extendTheme({
    colors,
    fonts: {
        heading: `"Manrope", sans-serif`,
        body: `"Manrope", sans-serif`,
    },
    components: {
        Button: buttonTheme,
    },
    config: {
        useSystemColorMode: false,
        initialColorMode: 'light',
        cssVarPrefix: 'growteens'
    }
});

export default theme;