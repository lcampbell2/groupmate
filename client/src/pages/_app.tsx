import { Box, ChakraProvider, ColorModeProvider } from "@chakra-ui/react";
import React from "react";
import { Provider } from "urql";
import { client } from "../client";
import { Footer } from "../components/Footer";
import { Header } from "../components/Header";
import { Navbar } from "../components/Navbar";
import { Wrapper } from "../components/Wrapper";
import { FOOTER_HEIGHT } from "../constants";
import theme from "../theme";
import "../public/DateTimePicker.css";
import "../public/Calendar.css";

function MyApp({ Component, pageProps }) {
  return (
    <Provider value={client}>
      <ChakraProvider resetCSS theme={theme}>
        <ColorModeProvider
          options={{
            useSystemColorMode: true,
          }}
        >
          <Box position='relative' minH='100vh' bg='shirtBlue'>
            <Box pb={FOOTER_HEIGHT}>
              <Header />
              <Navbar />
              <Wrapper>
                <Component {...pageProps} />
              </Wrapper>
            </Box>
            <Footer />
          </Box>
        </ColorModeProvider>
      </ChakraProvider>
    </Provider>
  );
}

export default MyApp;
