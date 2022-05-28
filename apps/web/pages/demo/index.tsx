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
import axios from "axios";
import { FC, useState } from "react";
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
    return (
        <Modal isOpen={true} onClose={() => {}}>
            <ModalOverlay />
            <ModalContent>
                <ModalBody p="0">
                    <Flex h="700px">
                        <PaymentPageWithId payment={payment} />
                    </Flex>
                </ModalBody>
            </ModalContent>
        </Modal>
    );
};
export default DemoPage;
