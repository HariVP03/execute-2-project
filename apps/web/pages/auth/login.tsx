import {
    Flex,
    Box,
    FormControl,
    FormLabel,
    Input,
    Checkbox,
    Stack,
    Link,
    Button,
    Heading,
    useColorModeValue,
} from "@chakra-ui/react";
import { GoogleButton } from "@components/buttons";
import { signInWithEmail, useSubscribeToUser } from "@firebase/utils";
import NextLink from "next/link";
import { useState } from "react";
export default function SimpleCard() {
    useSubscribeToUser("/dashboard");

    const [email, setEmail] = useState<string | undefined>();
    const [password, setPassword] = useState<string | undefined>();

    return (
        <Flex
            minH={"100vh"}
            align={"center"}
            justify={"center"}
            bg={useColorModeValue("gray.50", "gray.800")}
        >
            <Stack spacing={8} mx={"auto"} w={"md"} py={12} px={6}>
                <Stack align={"center"}>
                    <Heading fontSize={"4xl"}>Sign in to your account</Heading>
                </Stack>
                <Box
                    rounded={"lg"}
                    bg={useColorModeValue("white", "gray.700")}
                    boxShadow={"lg"}
                    p={8}
                >
                    <Stack spacing={4}>
                        <FormControl id="email">
                            <FormLabel>Email address</FormLabel>
                            <Input
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                type="email"
                            />
                        </FormControl>
                        <FormControl id="password">
                            <FormLabel>Password</FormLabel>
                            <Input
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                type="password"
                            />
                        </FormControl>
                        <Stack spacing={10}>
                            <Stack
                                direction={{ base: "column", sm: "row" }}
                                align={"start"}
                                justify={"space-between"}
                            >
                                <Checkbox>Remember me</Checkbox>
                                <Link color={"blue.400"}>Forgot password?</Link>
                            </Stack>
                            <Flex direction="column" gap={4}>
                                <Button
                                    bg={"blue.400"}
                                    onClick={() => {
                                        if (email && password)
                                            signInWithEmail(email, password);
                                    }}
                                    color={"white"}
                                    size="lg"
                                    disabled={!email && !password}
                                    _hover={{
                                        bg: "blue.500",
                                    }}
                                >
                                    Sign in
                                </Button>
                                <GoogleButton />
                            </Flex>
                            <Stack
                                direction={{ base: "column", sm: "row" }}
                                align={"start"}
                                justify={"center"}
                            >
                                <span color={"blue.400"}>
                                    Don't have an account?{" "}
                                    <NextLink
                                        href={"/auth/signup"}
                                        passHref={true}
                                    >
                                        <Link
                                            color={"blue.500"}
                                            href="/auth/signup"
                                        >
                                            Signup
                                        </Link>
                                    </NextLink>
                                </span>
                            </Stack>
                        </Stack>
                    </Stack>
                </Box>
            </Stack>
        </Flex>
    );
}
