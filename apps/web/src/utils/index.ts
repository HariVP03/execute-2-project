import axios from "axios";

export const getUser = (token: string) => {
    return axios.get("/user", {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
};
