import {
    createUserWithEmailAndPassword,
    getAuth,
    onAuthStateChanged,
    signInWithEmailAndPassword,
    User,
} from "firebase/auth";
import { useRouter } from "next/router";

type AuthFuncType = {
    (email: string, password: string): Promise<User>;
};

type WaitForUser = {
    (route?: any, func?: () => void): void;
};

export const createUser: AuthFuncType = (email, password) => {
    const auth = getAuth();
    const user = createUserWithEmailAndPassword(auth, email, password).then(
        ({ user }) => user,
    );

    return user;
};

export const signInWithEmail: AuthFuncType = (email, password) => {
    const auth = getAuth();
    const user = signInWithEmailAndPassword(auth, email, password).then(
        ({ user }) => user,
    );

    return user;
};

export const useSubscribeToUser: WaitForUser = (route, func) => {
    const router = useRouter();
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
        if (user)
            if (func) {
                func();
            } else {
                router.push(route);
            }
    });
};
