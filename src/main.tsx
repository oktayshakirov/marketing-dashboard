import { ChakraProvider } from "@chakra-ui/react";
import ReactDOM from "react-dom/client";
import App from "./pages/App.tsx";
import mainTheme from "./themes/mainTheme.ts";

ReactDOM.createRoot(document.getElementById("root")!).render(
    <ChakraProvider theme={mainTheme}>
        <App />
    </ChakraProvider>,
);
