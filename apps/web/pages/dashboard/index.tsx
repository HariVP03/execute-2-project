import {
    Avatar,
    Button,
    Flex,
    FormControl,
    FormLabel,
    Input,
    InputGroup,
    InputLeftAddon,
    InputLeftElement,
    InputRightElement,
    Table,
    Td,
    Text,
    Th,
    Tr,
    useClipboard,
    useToast,
    VisuallyHidden,
} from "@chakra-ui/react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { ref } from "firebase/storage";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import axios from "axios";
import { getToken, getUser, updateUser } from "src/utils";

const Dashboard = () => {
    const auth = getAuth();
    const [uid, setUid] = useState<any>();
    const [token, setToken] = useState<string | undefined>();

    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            if (user) {
                user.getIdToken().then((r) => {
                    setUid(r);
                    getToken(r).then(({ data }) => {
                        setToken(data.token);
                    });

                    getUser(r).then(({ data }) => {
                        console.log(data);
                        setLogo(data.logo);
                        setName(data.name);
                        setPublicKey(data.publicKey);
                    });
                });
            }
        });
    }, []);

    const [name, setName] = useState<string | undefined>();
    const [publicKey, setPublicKey] = useState<string | undefined>();
    const [logo, setLogo] = useState<string | undefined>();

    const [revealToken, setRevealToken] = useState<boolean>(false);

    const onSubmit = () => {
        updateUser(uid, { name, logo, publicKey }).then(({ data }) => {
            console.log(data);
        });
    };

    const { hasCopied, onCopy } = useClipboard(token || "");

    const tokenCopied = useToast({
        title: "Token copied to clipboard",
        status: "success",
    });

    return (
        <Flex fontFamily="Poppins" minH="100vh" w="100vw" justify="center">
            <Flex p={12} align="start" direction="column" w="100%">
                <Text fontSize="2xl" mb={12}>
                    Update your Profile
                </Text>
                <Flex gap={5} align="center" w="400px">
                    <Flex direction="column" maxW="100px">
                        <Avatar
                            cursor="pointer"
                            rounded="none"
                            h="100px"
                            src={logo || ""}
                            bg={logo ? "white" : "Background"}
                            w="100px"
                        />
                        <Input
                            value={logo}
                            onChange={(e) => setLogo(e.target.value)}
                            placeholder="Link to the logo"
                            type="text"
                        />
                    </Flex>
                    <InputField
                        state={name}
                        setState={setName}
                        placeholder="Update your name"
                        title="Name"
                        w="100%"
                    />
                </Flex>
                <Flex gap={5} mt={9} align="center" w="400px">
                    <InputField
                        state={publicKey}
                        setState={setPublicKey}
                        placeholder="Update your public address"
                        title="Public Address"
                        w="100%"
                    />
                </Flex>
                <Button
                    disabled={!name || !logo || !publicKey}
                    mt={12}
                    bg="blue.300"
                    onClick={onSubmit}
                    _hover={{ bg: "blue.400" }}
                >
                    Update
                </Button>
                <Text fontSize="2xl" mb={3} mt={12}>
                    Update your Profile
                </Text>
                <InputGroup>
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
                <Text mb={0} fontSize="2xl" mt={12}>
                    Transaction History
                </Text>
                <Table variant="striped">
                    <Tr>
                        <Th>From</Th>
                        <Th>To</Th>
                        <Th>Crypto Amount</Th>
                        <Th>FIAT Amount</Th>
                        <Th>Transaction Hash</Th>
                    </Tr>
                    <Tr>
                        <Td>sex</Td>
                        <Td>sex</Td>
                        <Td>sex</Td>
                        <Td>sex</Td>
                        <Td>sex</Td>
                    </Tr>
                    <Tr>
                        <Td>sex</Td>
                        <Td>sex</Td>
                        <Td>sex</Td>
                        <Td>sex</Td>
                        <Td>sex</Td>
                    </Tr>
                </Table>
            </Flex>
        </Flex>
    );
};

const InputField: React.FC<{
    title: string;
    placeholder: string;
    setState?: Dispatch<SetStateAction<any>>;
    state?: any;
    w?: any;
}> = ({ title, placeholder, state, setState, w }) => {
    return (
        <FormControl>
            <FormLabel fontSize="sm" fontWeight="md" color={"gray.700"}>
                {title}
            </FormLabel>
            <InputGroup size="sm">
                <Input
                    placeholder={placeholder}
                    focusBorderColor="brand.400"
                    rounded="md"
                    value={state}
                    onChange={
                        setState ? (e) => setState(e.target.value) : undefined
                    }
                    w={w || "300px"}
                />
            </InputGroup>
        </FormControl>
    );
};

export default Dashboard;
