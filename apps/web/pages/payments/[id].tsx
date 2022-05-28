import {
    Avatar,
    Flex,
    Text,
    Image,
    Icon,
    Button,
    Progress,
    chakra,
} from "@chakra-ui/react";
import { ChevronDownIcon } from "@chakra-ui/icons";
import { useEthers } from "@usedapp/core";
import { useTimer } from "@hooks/timer";
import { FC, useEffect } from "react";
import { PaymentType } from "pages/demo";

const PaymentModal: FC<{ payment: PaymentType }> = ({ payment }) => {
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
                <Avatar size="sm" rounded="none" src={payment.user.logo} />
                <Text ml={2} fontWeight="normal" my={0} fontSize="lg">
                    {payment.user.name}
                </Text>
            </Flex>
            <TimeBar />
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
                    Total amount: Rs {parseInt(payment.amount).toLocaleString()}
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
const TimeBar = ({ onFail }: { onFail?: () => void }) => {
    const totalTime = 300;
    const time = useTimer(totalTime);
    useEffect(() => {
        if (time === 0 && onFail) onFail();
    }, [time]);
    return (
        <>
            <Flex w="full">
                <Progress
                    value={(Math.abs(time - totalTime) / totalTime) * 100}
                    h="2"
                    w="100%"
                />
            </Flex>
            <Flex
                rounded="full"
                border="1px solid"
                py={1}
                px={3}
                mt={3}
                justify="center"
                borderColor="gray.400"
                w="75px"
            >
                <chakra.span>
                    {Math.floor(time / 60) || 0}:
                    {time % 60 < 10 ? "0" + (time % 60) : time % 60}
                </chakra.span>
            </Flex>
        </>
    );
};
export default PaymentModal;
