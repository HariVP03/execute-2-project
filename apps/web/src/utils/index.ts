import axios from "axios";
import { ethers } from "ethers";
import { alchemyConfig } from "./config";

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
export const updatepayment: any = (
    token: string,
    id: string,
    payment: {
        from: string;
        transactionHash: string;
        crypto: string;
        chain: string;
        cryptoAmount: string;
        status: "FAILED" | "SUCCESS";
    },
) => {
    return axios.patch("/payments/onGoing/" + id, payment, {
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

export const getProvider = (val = "maticmum") => {
    return new ethers.providers.AlchemyProvider(
        val,
        alchemyConfig.maticmum.key,
    );
};

export const getConversionRate = () => {
    const api_key =
        "3fed856fbc243deaecf43325415a399a69b3e9671995c250c5c6862627840ce1";
    const url =
        "https://min-api.cryptocompare.com/data/price?fsym=MATIC&tsyms=INR";

    return axios
        .get(url, {
            headers: {
                authorization: `Apikey ${api_key}`,
            },
        })
        .then(({ data }) => data);
};

export const getGasPrice = (to?: string, from?: string, value?: number) => {
    const { url } = alchemyConfig.maticmum;
    return axios.post(url, {
        jsonrpc: "2.0",
        method: "eth_estimateGas",
        id: 1,
        params: [
            {
                to,
                from,
                value,
            },
        ],
    });
};
