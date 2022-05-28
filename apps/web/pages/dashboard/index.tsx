import { getAuth, onAuthStateChanged } from "firebase/auth";
import { getUser } from "src/utils";

const Dashboard = () => {
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
        if (user) {
            user.getIdToken()
                .then((token) => getUser(token))
                .then((e) => {
                    console.log(e);
                });
        }
    });

    return <>123</>;
};

export default Dashboard;
