import {
    Button,
    Flex,
    FormControl,
    FormHelperText,
    FormLabel,
    Input,
    Modal,
    ModalBody,
    ModalContent,
    ModalOverlay,
    VStack,
} from "@chakra-ui/react";
import { useSendTransaction } from "@usedapp/core";
import axios from "axios";
import { BigNumber } from "ethers";
import { FC, useEffect, useState } from "react";
import { getConversionRate, getGasPrice } from "src/utils";
import PaymentPageWithId from "../payments/[id]";

interface DemoPageProps {}

export type UserType = {
    email: string;
    id: string;
    logo: string;
    name: string;
    publicKey: string;
};
export type PaymentType = {
    id: string;
    to: string;
    amount: string;
    chain: null | string;
    crypto: null | string;
    cryptoAmount: null | string;
    from: null | string;
    status: "INITIATED" | "FAILED" | "SUCCESS";
    transactionHash: null | string;
    user: UserType;
};

const DemoPage: FC<DemoPageProps> = () => {
    const [token, setToken] = useState("b98f36cf-08fc-4044-b4c3-a600e8fa8eea");
    const [amount, setAmount] = useState("");
    const [showPay, setShowPay] = useState<null | PaymentType>();
    async function submit() {
        const payment = await axios.post(
            "payments/onGoing",
            { amount: amount },
            { headers: { Authorization: `Bearer ${token}` } },
        );
        setShowPay(payment.data as any);
    }

    return (
        <Flex h="100vh" align="center" justify="center">
            <VStack spacing={6}>
                <FormControl>
                    <FormLabel htmlFor="email">Token</FormLabel>
                    <Input
                        value={token}
                        onChange={(e) => {
                            setToken(e.target.value);
                        }}
                    />
                </FormControl>
                <FormControl>
                    <FormLabel htmlFor="email">Amount</FormLabel>
                    <Input
                        value={amount}
                        onChange={(e) => {
                            setAmount(e.target.value);
                        }}
                    />
                </FormControl>
                <Button onClick={submit}>Submit</Button>
            </VStack>
            {showPay ? <PaymentPage payment={showPay} /> : <></>}
        </Flex>
    );
};

const PaymentPage: FC<{ payment: PaymentType }> = ({ payment }) => {
    const [gasPrice, setGasPrice] = useState<string>("0");
    const [conversionRate, setConversionRate] = useState<number>(0);

    // console.log(getConversionRate());
    useEffect(() => {
        getGasPrice(
            payment.to || "0xb91CC1FBCA90301807DF4B98f5A04f7Ce62a3806",
        ).then(({ data }) => {
            // console.log(data);
            const { result } = data;
            const gas = (parseInt(result, 16) / 1e18).toFixed(18);
            setGasPrice(gas);
        });

        getConversionRate().then(({ INR }) => {
            // console.log(e.INR);
            setConversionRate(INR);
        });
    }, []);

    return (
        <Modal isOpen={true} onClose={() => {}}>
            <ModalOverlay />
            <ModalContent top={"0"}>
                <ModalBody p="0">
                    <Flex h="85vh">
                        <PaymentPageWithId
                            payment={payment}
                            gasPrice={gasPrice}
                            amountInEth={
                                parseFloat(payment.amount) / conversionRate
                            }
                        />
                    </Flex>
                </ModalBody>
            </ModalContent>
        </Modal>
    );
};
export default DemoPage;
