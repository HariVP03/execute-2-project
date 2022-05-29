import React from "react";
import { AppProps } from "next/app";
import { ChakraProvider } from "@chakra-ui/react";
import theme from "@definitions/chakra/theme";
import "@styles/global.scss";
import { QueryClient, QueryClientProvider } from "react-query";
import { Hydrate } from "react-query/hydration";
import { RecoilRoot } from "recoil";
import "@firebase/init";
import axios from "axios";
import { Mainnet, DAppProvider, Config } from "@usedapp/core";
import { getDefaultProvider } from "ethers";
import { alchemyConfig } from "src/utils/config";
import Head from "next/head";
import SEO from "@components/SEO";

function MyApp({ Component, pageProps }: AppProps): JSX.Element {
    const queryClient = new QueryClient();
    axios.defaults.baseURL = "http://localhost:8888";

    const config: Config = {
        readOnlyChainId: 80001,
        readOnlyUrls: {
            137: getDefaultProvider(),
            80001: alchemyConfig.maticmum.url,
        },
    };

    return (
        <ChakraProvider theme={theme}>
            <QueryClientProvider client={queryClient}>
                <Hydrate state={pageProps.dehydratedState}>
                    <RecoilRoot>
                        <DAppProvider config={config}>
                            <SEO
                                title="Yonko Pay"
                                description="crypto payments made easy"
                                image="http://localhost:3000/icons/logo.png"
                                 
                            />
                            <Component {...pageProps} />
                        </DAppProvider>
                    </RecoilRoot>
                </Hydrate>
            </QueryClientProvider>
        </ChakraProvider>
    );
}

export default MyApp;
