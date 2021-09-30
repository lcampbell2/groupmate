import { ChakraProvider, ColorModeProvider } from "@chakra-ui/react";
import { Provider } from "urql";
import { client } from "../client";
import { Footer } from "../components/Footer";
import { Header } from "../components/Header";
import { Navbar } from "../components/Navbar";
import { Wrapper } from "../components/Wrapper";
import theme from "../theme";

function MyApp({ Component, pageProps }) {
  return (
    <Provider value={client}>
      <ChakraProvider resetCSS theme={theme}>
        <ColorModeProvider
          options={{
            useSystemColorMode: true,
          }}
        >
          <Header />
          <Navbar />
          <Wrapper>
            <Component {...pageProps} />
          </Wrapper>
          <Footer />
        </ColorModeProvider>
      </ChakraProvider>
    </Provider>
  );
}

export default MyApp;
