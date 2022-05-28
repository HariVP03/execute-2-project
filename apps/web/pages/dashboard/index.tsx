import {
    Avatar,
    Button,
    Flex,
    FormControl,
    FormLabel,
    Input,
    InputGroup,
    InputLeftAddon,
    Table,
    Td,
    Text,
    Th,
    Tr,
} from "@chakra-ui/react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { Dispatch, SetStateAction, useState } from "react";
import { getUser } from "src/utils";

const Dashboard = () => {
    // const auth = getAuth();
    // onAuthStateChanged(auth, (user) => {
    //     if (user) {
    //         user.getIdToken()
    //             .then((token) => getUser(token))
    //             .then((e) => {
    //                 console.log(e);
    //             });
    //     }
    // });

    const [name, setName] = useState<string | undefined>();
    const [publicAddress, setPublicAddress] = useState<string | undefined>();

    return (
        <Flex fontFamily="Poppins" minH="100vh" w="100vw" justify="center">
            <Flex p={12} align="start" direction="column" w="100%">
                <Text fontSize="2xl" mb={12}>
                    Update your Profile
                </Text>
                <Flex gap={5} align="center" w="400px">
                    <Avatar rounded="none" size="xl" />
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
                        state={publicAddress}
                        setState={setPublicAddress}
                        placeholder="Update your public address"
                        title="Public Address"
                        w="100%"
                    />
                </Flex>
                <Button mt={12} bg="blue.300" _hover={{ bg: "blue.400" }}>
                    Update
                </Button>
                <Text fontSize="2xl" mt={12}>
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
                    onChange={(e) => setState?.(e.target.value)}
                    w={w || "300px"}
                />
            </InputGroup>
        </FormControl>
    );
};

export default Dashboard;
