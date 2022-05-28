import React from "react";
import { Flex } from "@chakra-ui/react";
import { CallToActionWithIllustration } from "@components/CTA";
import { Navbar } from "@components/navbar";
import { TeamPage } from "@components/team";

const Home: React.FC = () => {
    return (
        <Flex direction="column" minH="100vh">
            <Navbar />
            <CallToActionWithIllustration />
            <TeamPage />
        </Flex>
    );
};

export default Home;
