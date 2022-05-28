import {
    Avatar,
    Flex,
    Text,
    Image,
    Icon,
    Button,
    Tooltip,
} from "@chakra-ui/react";
import { ChevronDownIcon } from "@chakra-ui/icons";
import { useEthers } from "@usedapp/core";

const PaymentModal = () => {
    const { account: userPublicKey, activateBrowserWallet } = useEthers();

    return (
        <Flex
            fontFamily="Poppins"
            align="center"
            w="100vw"
            h="100vh"
            direction="column"
        >
            <Flex justify="center" w="full" bg="#feebc8" py={2} align="center">
                <Avatar size="sm" rounded="none" />
                <Text ml={2} fontWeight="normal" my={0} fontSize="lg">
                    Company Name
                </Text>
            </Flex>
            <Flex w="full">
                <Flex w="40%" h="4px" bg="green.400" />
                <Flex w="60%" h="4px" bg="gray.300" />
            </Flex>
            <Flex
                rounded="full"
                border="1px solid"
                py={1}
                px={3}
                mt={3}
                borderColor="gray.400"
            >
                12:11
            </Flex>
            <Flex
                justify="center"
                align="center"
                mt={8}
                w="200px"
                h="200px"
                direction="column"
                // bg="gray.200"
                rounded="lg"
            >
                <Image
                    h="100px"
                    p={5}
                    w="100px"
                    src="https://www.svgrepo.com/show/294649/send.svg"
                />
                <Text
                    fontWeight="normal"
                    w="full"
                    fontSize="xl"
                    color="gray.700"
                    textAlign="center"
                >
                    Request not sent
                </Text>
            </Flex>
            <Flex mt={3}>
                <Text fontSize="4xl" fontWeight="500">
                    0.0136 ETH
                </Text>
            </Flex>
            <Flex
                rounded="full"
                border="1px solid"
                py={1}
                justify="center"
                px={2}
                w="120px"
                fontSize="md"
                align="center"
                fontWeight="normal"
                cursor="pointer"
                borderColor="gray.400"
            >
                Ethereum
                <Icon ml={1} as={ChevronDownIcon} />
            </Flex>
            <Flex mt={5}>
                <Text fontSize="sm" color="gray.600">
                    Current gas price: 0.00001 ETH
                </Text>
            </Flex>
            <Flex mt={0}>
                <Text my={0} fontSize="md" color="gray.600">
                    Total amount: Rs 23,455
                </Text>
            </Flex>
            {userPublicKey ? (
                <Button
                    fontWeight="600"
                    mt={12}
                    _hover={{ bg: "blue.600" }}
                    bg="blue.500"
                    color="white"
                >
                    Send Transaction Request
                </Button>
            ) : (
                <Button
                    onClick={activateBrowserWallet}
                    fontWeight="600"
                    mt={12}
                    _hover={{ bg: "blue.600" }}
                    bg="blue.500"
                    color="white"
                >
                    Connect Metamask Wallet
                </Button>
            )}

            <Flex my="auto">
                <Text fontSize="sm" color="gray.500">
                    Payments secured by YonkoPay
                </Text>
            </Flex>
        </Flex>
    );
};

export default PaymentModal;
