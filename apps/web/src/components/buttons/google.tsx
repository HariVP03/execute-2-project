import { Button, Center, Text } from "@chakra-ui/react";
import { signInWithGoogle } from "@firebase/utils";
import { useRouter } from "next/router";
import { FcGoogle } from "react-icons/fc";

const GoogleButton = () => {
    const router = useRouter();

    const onClick = () => {
        signInWithGoogle().then(({ user }) => {
            if (user) router.push("/dashboard");
        });
    };

    return (
        <Button
            w={"full"}
            maxW={"md"}
            variant={"outline"}
            leftIcon={<FcGoogle />}
            alignItems="center"
            justifyContent="center"
            onClick={onClick}
        >
            <Text m={0}>Sign in with Google</Text>
        </Button>
    );
};

export default GoogleButton;
