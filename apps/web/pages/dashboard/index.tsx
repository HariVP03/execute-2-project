import axios from "axios";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { getUser, updateUser } from "src/utils";

const Dashboard = () => {
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
        if (user) {
            user.getIdToken()
                .then((token) => {
                    getUser(token, {
                        name: "sidharth",
                        pubicKey: "0x1Dd8D38e294D632Eab2d445beAc8340462db021d",
                    });
                })
                .then((e) => {
                    console.log(e);
                });
        }
    });

    return <>123</>;
};

export default Dashboard;
