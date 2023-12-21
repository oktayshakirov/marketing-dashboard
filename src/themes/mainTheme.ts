import { extendTheme } from "@chakra-ui/react";
import "@chatscope/chat-ui-kit-styles/dist/default/styles.min.css";
import "@fontsource-variable/onest";

const mainTheme = extendTheme({
    initialColorMode: "light",
    useSystemColorMode: false,
    fonts: {
        heading: `'Onest', sans-serif`,
        body: `'Onest', sans-serif`,
    },
    colors: {
        brand: {
            gray: {
                50: "#FFFFFF",
                100: "#F2F2F2",
                200: "#E8E8E8",
                250: "#ABABAB",
                300: "#878787",
                400: "#636363",
                500: "#393939",
                800: "#191919",
                900: "#909090",
            },
        },
    },
    components: {
        Button: {
            variants: {},
        },
    },
    styles: {
        global: {
            body: {
                bg: "#FFFFFF",
            },
        },
    },
});

export default mainTheme;
