import axios from "axios";

export const getUser = (token: string) => {
    return axios.get("/user", {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
};

export const updateUser = (token: string, userData: any) => {
    return axios.post("/user", userData, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
};
