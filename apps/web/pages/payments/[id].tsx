import {
    Avatar,
    Flex,
    Text,
    Image,
    Icon,
    Button,
    Progress,
    chakra,
    Spinner,
} from "@chakra-ui/react";
import { ChevronDownIcon } from "@chakra-ui/icons";
import { useEthers, useSendTransaction } from "@usedapp/core";
import { useTimer } from "@hooks/timer";
import { FC, useEffect, useMemo } from "react";
import { PaymentType } from "pages/demo";
import { ethers } from "@usedapp/core/node_modules/ethers";
import { getProvider, updatepayment } from "src/utils";
import { FiCheck, FiSend, FiX } from "react-icons/fi";
import { useRouter } from "next/router";

const PaymentModal: FC<{
    payment: PaymentType;
    gasPrice: string;
    amountInEth: number;
    token: string;
}> = ({ payment, gasPrice, amountInEth, token }) => {
    const { sendTransaction, state } = useSendTransaction();
    console.log(state);
    const { account: userPublicKey, activateBrowserWallet } = useEthers();
    const router = useRouter();
    const shortAmountInEth = amountInEth.toFixed(3);

    const onClickSend = async () => {
        const provider = getProvider();
        const nonce = await provider.getTransactionCount(
            userPublicKey || "",
            "latest",
        );
        sendTransaction({
            to: payment.to,
            value: ethers.utils.parseEther(shortAmountInEth),
            nonce,
        });
    };
    useEffect(() => {
        if (state.status === "Success" || state.status === "Fail") {
            console.log({ token });
            const obj = {
                from: userPublicKey || "",
                transactionHash: state.transaction?.hash || "",
                crypto: "MATIC",
                chain: "Polygon Mumbai" || "",
                cryptoAmount: state.transaction?.value.toString() || "",
                status: state.status === "Success" ? "SUCCESS" : "FAILED",
            };
            console.log(obj);
            updatepayment(token, payment.id, obj).then(() => {
                router.push("auth/login");
            });
        }
    }, [state]);
    const stateCheck = useMemo(() => {
        return state.status === "Success"
            ? 1
            : state.status === "Fail"
            ? 2
            : state.status === "None"
            ? 3
            : 0;
    }, [state]);
    const dataObj = useMemo(() => {
        return {
            icon: stateCheck === 1 ? FiCheck : stateCheck === 2 ? FiX : FiSend,
            color:
                stateCheck === 1
                    ? "green.500"
                    : stateCheck === 2
                    ? "red.500"
                    : "black",
            text:
                stateCheck === 0
                    ? "loading"
                    : stateCheck === 1
                    ? "Success"
                    : stateCheck === 2
                    ? "Failed"
                    : "Request not sent",
        };
    }, [stateCheck]);
    return (
        <Flex fontFamily="Poppins" align="center" w="100vw" direction="column">
            <Flex justify="center" w="full" bg="#feebc8" py={2} align="center">
                <Avatar size="sm" src={payment.user.logo} />
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
                {stateCheck != 0 ? (
                    <Icon
                        as={dataObj.icon}
                        color={dataObj.color}
                        height="100px"
                        width={"100px"}
                    />
                ) : (
                    <Spinner h={"100px"} w="100px" />
                )}
                <Text
                    fontWeight="normal"
                    w="full"
                    fontSize="xl"
                    color="gray.700"
                    textAlign="center"
                >
                    {dataObj.text}
                </Text>
            </Flex>
            <Flex mt={3}>
                <Text fontSize="4xl" fontWeight="500">
                    {shortAmountInEth} MATIC
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
                Polygon
                <Icon ml={1} as={ChevronDownIcon} />
            </Flex>
            <Flex mt={5}>
                <Text fontSize="sm" color="gray.600">
                    Current gas price: {gasPrice} ETH
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
                    onClick={() => {
                        onClickSend();
                    }}
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
                <Text
                    fontSize="sm"
                    color="gray.500"
                    onClick={() => onClickSend()}
                >
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
