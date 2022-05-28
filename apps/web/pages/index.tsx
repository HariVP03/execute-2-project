import React from "react";
import { Flex, Button } from "@chakra-ui/react";
import { useRouter } from "next/router";

const Home: React.FC = () => {
    const router = useRouter();
    return (
        <Flex direction="column" minH="100vh" align={"center"} justify="center">
            <Button
                mb="2rem"
                onClick={() => {
                    router.push("demo");
                }}
            >
                Demo
            </Button>
            <Button
                onClick={() => {
                    router.push("wallet/login");
                }}
            >
                Wallet
            </Button>
        </Flex>
    );
};

export default Home;
