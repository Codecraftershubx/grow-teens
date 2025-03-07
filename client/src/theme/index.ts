import { extendTheme } from "@chakra-ui/react";
import buttonTheme from "./components/Button";
import { colors } from "./constants";

const theme = extendTheme({
    colors,
    fonts: {
        heading: `"Roboto Flex"', 'sans - serif'`,
        body: `"Istok Web"', 'sans- serif'`,
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