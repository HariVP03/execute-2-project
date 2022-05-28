import {
    createUserWithEmailAndPassword,
    getAuth,
    signInWithEmailAndPassword,
    User,
} from "firebase/auth";

type AuthFuncType = {
    (email: string, password: string): Promise<User>;
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
