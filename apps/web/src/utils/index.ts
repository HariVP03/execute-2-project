import axios from "axios";

export const getUser = (token: string) => {
    return axios.get("/user", {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
};

export const getToken = (token: string) => {
    return axios.get("/token", {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
};
export const getPayments = (publicKey: string) => {
    return axios.get("/payments/" + publicKey);
};
export const updateUser = (token: string, userData: any) => {
    return axios.patch("/user", userData, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
};
