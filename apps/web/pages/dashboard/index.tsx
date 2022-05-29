import {
    Button,
    Flex,
    FormControl,
    FormLabel,
    HStack,
    Icon,
    IconButton,
    Image,
    Input,
    InputGroup,
    InputRightElement,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    Table,
    Td,
    Text,
    Th,
    Tr,
    useClipboard,
    useToast,
    VStack,
    useDisclosure,
} from "@chakra-ui/react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import {
    Dispatch,
    FC,
    SetStateAction,
    useEffect,
    useMemo,
    useState,
} from "react";
import { getPayments, getToken, getUser, updateUser } from "src/utils";
import { PaymentType } from "pages/demo";
import { shortenIfAddress } from "@usedapp/core";
import { FiEdit, FiEye } from "react-icons/fi";
type UserDet = {
    name: string;
    publicKey: string;
    logo: string;
};
const colors = ["blue", "purple", "red", "green", "purple"];
const Dashboard = () => {
    const auth = getAuth();
    const [token, setToken] = useState<string>();
    const [uid, setUid] = useState("");
    const [user, setUser] = useState<UserDet | null>(null);
    const [payments, setPayments] = useState<PaymentType[]>([]);
    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            if (user) {
                user.getIdToken().then((r) => {
                    setUid(r);
                    getToken(r).then(({ data }) => {
                        setToken(data.token);
                    });

                    getUser(r).then(({ data }) => {
                        setUser(data);
                        console.log(data);
                    });
                });
            }
        });
    }, []);
    useEffect(() => {
        if (user?.publicKey) {
            getPayments(user.publicKey).then((data) => {
                setPayments(data.data as any);
            });
        }
    }, [user]);

    const { onCopy: onCopyAddress } = useClipboard(token || "");
    const tokenCopied = useToast({
        title: "Token copied to clipboard",
        status: "success",
    });
    const { isOpen, onClose, onOpen } = useDisclosure();
    const {
        isOpen: isOpen2,
        onClose: onClose2,
        onOpen: onOpen2,
    } = useDisclosure();
    const bg = useMemo(
        () => colors[Math.floor(Math.random() * colors.length)],
        [],
    );
    return (
        <Flex fontFamily="Poppins" minH="100vh" w="100vw" justify="center">
            {user && (
                <EditModal
                    onClose={onClose}
                    isOpen={isOpen}
                    user={user}
                    uid={uid}
                    update={(user: UserDet) => setUser(user)}
                />
            )}
            <Flex align="start" direction="column" w="100%">
                <Flex h="150px" bg={bg + ".500"} w="100%"></Flex>
                <Flex
                    px="16"
                    overflow={"visible"}
                    direction={"column"}
                    w="100%"
                >
                    <Flex
                        gap={5}
                        overflow="visible"
                        align="end"
                        justify={"space-between"}
                    >
                        <Image
                            w="125px"
                            h="125px"
                            mt="-75"
                            cursor="pointer"
                            objectFit="cover"
                            borderRadius={"full"}
                            src={user?.logo || ""}
                            bg={user?.logo ? "white" : "Background"}
                        />
                        <HStack spacing={6} pr="6">
                            <IconButton
                                m="2"
                                aria-label="eye"
                                colorScheme="gray"
                                onClick={onOpen2}
                                icon={<Icon as={FiEye} h="6" w="6" />}
                            ></IconButton>
                            <IconButton
                                aria-label="edit"
                                onClick={onOpen}
                                icon={<Icon as={FiEdit} h="6" w="6" />}
                            ></IconButton>
                        </HStack>
                    </Flex>
                    <VStack spacing={4} w="100%" align={"center"}>
                        <Text
                            textTransform={"capitalize"}
                            fontWeight="bold"
                            fontSize={"3xl"}
                            m="0"
                        >
                            {user?.name}
                        </Text>
                        <Flex
                            bg="gray.200"
                            p="1"
                            px="4"
                            cursor={"pointer"}
                            borderRadius={"100"}
                            onClick={() => {
                                tokenCopied({
                                    title: "Address copied to clipboard",
                                });
                                onCopyAddress();
                            }}
                        >
                            <Text
                                m="0"
                                fontWeight={"semibold"}
                                color="gray.600"
                            >
                                {shortenIfAddress(user?.publicKey)}
                            </Text>
                        </Flex>
                    </VStack>
                    <SeeKey
                        onClose={onClose2}
                        isOpen={isOpen2}
                        token={token || ""}
                    />
                    <Text
                        mb={0}
                        fontSize="2xl"
                        fontWeight={"semibold"}
                        mb="6"
                        mt={12}
                    >
                        Transaction History
                    </Text>
                    <Table variant="striped">
                        <Tr>
                            <Th>From</Th>
                            <Th>To</Th>
                            <Th>Crypto Amount</Th>
                            <Th>FIAT Amount</Th>
                            <Th>Transaction Hash</Th>
                            <Th>Status</Th>
                        </Tr>
                        {payments.map((item) => {
                            const success = item.transactionHash;
                            return (
                                <Tr>
                                    <Td>
                                        {shortenIfAddress(item.from) || "NULL"}
                                    </Td>
                                    <Td>{shortenIfAddress(item.to)}</Td>
                                    <Td>{item.cryptoAmount || 0.0}</Td>
                                    <Td>{item.amount}</Td>
                                    <Td>
                                        {shortenIfAddress(
                                            item.transactionHash,
                                        ) || "NULL"}
                                    </Td>
                                    <Td>{success ? "SUCCESS" : "FAILED"}</Td>
                                </Tr>
                            );
                        })}
                    </Table>
                </Flex>
            </Flex>
        </Flex>
    );
};
const SeeKey: FC<{ isOpen: boolean; onClose: () => void; token: string }> = ({
    isOpen,
    onClose,
    token,
}) => {
    const [revealToken, setRevealToken] = useState<boolean>(false);
    const { onCopy } = useClipboard(token || "");
    const tokenCopied = useToast({
        title: "Token copied to clipboard",
        status: "success",
    });

    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>Modal Title</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    <InputGroup maxW="500px">
                        <Input
                            value={token}
                            type={revealToken ? "text" : "password"}
                            readOnly
                            mt={0}
                            cursor="pointer"
                            onClick={() => {
                                tokenCopied();
                                onCopy();
                            }}
                        />
                        <InputRightElement justifyContent="flex-end" w="100px">
                            <Button
                                onClick={() => setRevealToken((prev) => !prev)}
                                _focus={{ outline: "none" }}
                            >
                                Show
                            </Button>
                        </InputRightElement>
                    </InputGroup>
                </ModalBody>
                <ModalFooter>
                    <Button variant="ghost" onClick={onClose}>
                        Close
                    </Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    );
};
const EditModal: FC<{
    isOpen: boolean;
    onClose: () => void;
    user: UserDet;
    uid: string;
    update: (user: UserDet) => void;
}> = ({ isOpen, onClose, user, uid, update }) => {
    const [name, setName] = useState<string>(user.name);
    const [publicKey, setPublicKey] = useState<string>(user.publicKey);
    const [logo, setLogo] = useState<string>(user.logo);
    const [loading, setLoading] = useState(false);
    const onSubmit = () => {
        setLoading(true);
        updateUser(uid, { name, logo, publicKey })
            .then(({ data }) => {
                console.log(data);
                update({ logo, name, publicKey });
            })
            .finally(() => {
                setLoading(false);
                onClose();
            });
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>Modal Title</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    <VStack spacing={4}>
                        <InputField
                            title="name"
                            placeholder="name"
                            setState={setName}
                            state={name}
                            loading={loading}
                        ></InputField>
                        <InputField
                            title="Logo"
                            placeholder="Logo"
                            setState={setLogo}
                            state={logo}
                            loading={loading}
                        ></InputField>
                        <InputField
                            title="Public Key"
                            placeholder="Public Key"
                            setState={setPublicKey}
                            state={publicKey}
                            loading={loading}
                        ></InputField>
                    </VStack>
                </ModalBody>
                <ModalFooter>
                    <Button
                        colorScheme="blue"
                        mr={3}
                        onClick={() => {
                            onSubmit();
                        }}
                    >
                        Submit
                    </Button>
                    <Button variant="ghost" onClose={onClose}>
                        Close
                    </Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    );
};

const InputField: React.FC<{
    title: string;
    placeholder: string;
    setState?: Dispatch<SetStateAction<any>>;
    state?: any;
    loading?: boolean;
    w?: any;
}> = ({ title, placeholder, state, setState, w = "100%", loading }) => {
    return (
        <FormControl>
            <FormLabel fontWeight="md" color={"gray.700"}>
                {title}
            </FormLabel>
            <InputGroup>
                <Input
                    placeholder={placeholder}
                    focusBorderColor="brand.400"
                    rounded="md"
                    value={state}
                    onChange={
                        setState ? (e) => setState(e.target.value) : undefined
                    }
                    disabled={loading}
                    w={w || "300px"}
                />
            </InputGroup>
        </FormControl>
    );
};

export default Dashboard;
