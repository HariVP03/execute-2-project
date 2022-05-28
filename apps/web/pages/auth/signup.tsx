import {
    Flex,
    Box,
    FormControl,
    FormLabel,
    Input,
    InputGroup,
    HStack,
    InputRightElement,
    Stack,
    Button,
    Heading,
    Text,
    useColorModeValue,
    Link,
} from "@chakra-ui/react";
import { useState } from "react";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import NextLink from "next/link";
import { createUser, useSubscribeToUser } from "@firebase/utils";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useRouter } from "next/router";
import { GoogleButton } from "@components/buttons";
export default function SignupCard() {
    const [showPassword, setShowPassword] = useState<boolean>(false);
    const [email, setEmail] = useState<string | undefined>();
    const [showConfirmPass, setShowConfirmPass] = useState<boolean>(false);
    const [password, setPassword] = useState<string | undefined>();
    const [confirmPassword, setConfirmPassword] = useState<
        string | undefined
    >();
    const [loading, setLoading] = useState<boolean>(false);

    useSubscribeToUser("/dashboard");

    return (
        <Flex
            minH={"100vh"}
            align={"center"}
            justify={"center"}
            bg={useColorModeValue("gray.50", "gray.800")}
        >
            <Stack spacing={8} mx={"auto"} w={"md"} py={12} px={6}>
                <Stack align={"center"}>
                    <Heading fontSize={"4xl"} textAlign={"center"}>
                        Sign up
                    </Heading>
                </Stack>
                <Box
                    rounded={"lg"}
                    bg={useColorModeValue("white", "gray.700")}
                    boxShadow={"lg"}
                    p={8}
                >
                    <Stack spacing={4}>
                        <FormControl id="email" isRequired>
                            <FormLabel>Email address</FormLabel>
                            <Input
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                type="email"
                            />
                        </FormControl>
                        <FormControl id="password" isRequired>
                            <FormLabel>Password</FormLabel>
                            <InputGroup>
                                <Input
                                    type={showPassword ? "text" : "password"}
                                    value={password}
                                    isInvalid={
                                        password ? password.length < 8 : false
                                    }
                                    onChange={(e) =>
                                        setPassword(e.target.value)
                                    }
                                />
                                <InputRightElement h={"full"}>
                                    <Button
                                        variant={"unstyled"}
                                        onClick={() =>
                                            setShowPassword(
                                                (showPassword) => !showPassword,
                                            )
                                        }
                                    >
                                        {showPassword ? (
                                            <ViewIcon />
                                        ) : (
                                            <ViewOffIcon />
                                        )}
                                    </Button>
                                </InputRightElement>
                            </InputGroup>
                        </FormControl>
                        <FormControl id="confirmPassword" isRequired>
                            <FormLabel>Re-enter Password</FormLabel>
                            <InputGroup>
                                <Input
                                    type={showConfirmPass ? "text" : "password"}
                                    value={confirmPassword}
                                    isInvalid={
                                        confirmPassword
                                            ? confirmPassword !== password
                                            : false
                                    }
                                    onChange={(e) =>
                                        setConfirmPassword(e.target.value)
                                    }
                                />
                                <InputRightElement h={"full"}>
                                    <Button
                                        variant={"ghost"}
                                        onClick={() =>
                                            setShowConfirmPass(
                                                (showPassword) => !showPassword,
                                            )
                                        }
                                    >
                                        {showConfirmPass ? (
                                            <ViewIcon />
                                        ) : (
                                            <ViewOffIcon />
                                        )}
                                    </Button>
                                </InputRightElement>
                            </InputGroup>
                        </FormControl>
                        <Stack spacing={10} pt={2}>
                            <Button
                                loadingText="Submitting"
                                size="lg"
                                bg={"blue.400"}
                                color={"white"}
                                _hover={{
                                    bg: "blue.500",
                                }}
                                disabled={
                                    password !== confirmPassword ||
                                    (password?.length || 0) < 8
                                }
                                onClick={() => {
                                    setLoading(true);
                                    if (password && email)
                                        createUser(email, password);
                                    setLoading(false);
                                }}
                                isLoading={loading}
                            >
                                Sign up
                            </Button>
                        </Stack>
                        <GoogleButton />
                        <Stack pt={6}>
                            <Text align={"center"}>
                                Already a user?{" "}
                                <NextLink passHref={true} href="/auth/login">
                                    <Link color={"blue.400"}>Login</Link>
                                </NextLink>
                            </Text>
                        </Stack>
                    </Stack>
                </Box>
            </Stack>
        </Flex>
    );
}
