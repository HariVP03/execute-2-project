import {
    Box,
    Center,
    useColorModeValue,
    Heading,
    Text,
    Stack,
    Image,
    Flex,
    HStack,
} from "@chakra-ui/react";

const IMAGE =
    "https://images.unsplash.com/photo-1518051870910-a46e30d9db16?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=1350&q=80";

export function TeamCard({
    name,
    price,
    brand,
    pic,
}: {
    name: string;
    price: number | string;
    brand: string;
    pic: string;
}) {
    pic = IMAGE;
    return (
        <Center p={12} overflow="visible">
            <Box
                overflow="visible"
                role={"group"}
                p={6}
                maxW={"330px"}
                w={"full"}
                bg={useColorModeValue("white", "gray.800")}
                boxShadow={"2xl"}
                rounded={"lg"}
                pos={"relative"}
                zIndex={1}
            >
                <Box
                    overflow="visible"
                    rounded={"lg"}
                    mt={-12}
                    pos={"relative"}
                    height={"230px"}
                    _after={{
                        transition: "all .3s ease",
                        content: '""',
                        w: "full",
                        h: "full",
                        pos: "absolute",
                        top: 5,
                        left: 0,
                        backgroundImage: `url(${pic})`,
                        filter: "blur(15px)",
                        zIndex: -1,
                    }}
                    _groupHover={{
                        _after: {
                            filter: "blur(20px)",
                        },
                    }}
                >
                    <Image
                        overflow="visible"
                        rounded={"lg"}
                        height={230}
                        width={282}
                        objectFit={"cover"}
                        src={pic}
                    />
                </Box>
                <Stack pt={10} align={"center"}>
                    <Text
                        color={"gray.500"}
                        fontSize={"sm"}
                        textTransform={"uppercase"}
                        mb="0"
                    >
                        {brand}
                    </Text>
                    <Heading
                        mt="0"
                        fontSize={"2xl"}
                        fontFamily={"body"}
                        fontWeight={500}
                    >
                        {name}
                    </Heading>
                    <Stack direction={"row"} align={"center"}>
                        <Text fontWeight={800} fontSize={"xl"}>
                            ${price}
                        </Text>
                    </Stack>
                </Stack>
            </Box>
        </Center>
    );
}
const teamDetail = [
    { name: "Sidharth Sahni", price: 400, pic: "/icons/logo.png" },
    { name: "Hari Vishnu Parashar", price: 4, pic: "icons/logo.png" },
];
export function TeamPage() {
    return (
        <Flex id="#team" direction={"column"} align="center">
            <Heading>Our Team</Heading>
            <HStack spacing={4}>
                {teamDetail.map((us) => {
                    return <TeamCard {...us} brand="Mugiwara No Ethereum" />;
                })}
            </HStack>
        </Flex>
    );
}
