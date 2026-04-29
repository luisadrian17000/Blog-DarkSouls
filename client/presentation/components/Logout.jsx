import style from "./Logout.module.css";
import logo from "../../assets/icons/logout.svg";
import { useAuth0 } from "@auth0/auth0-react";

const Logout = () => {
    const { logout } = useAuth0();

    return (
        <div
            className={style["main-container"]}
            onClick={() =>
                logout({
                    logoutParams: {
                        returnTo: window.location.origin,
                    },
                })
            }
        >
            <img src={logo} alt="Logout" className={style.logo} />
        </div>
    );
};

export default Logout;