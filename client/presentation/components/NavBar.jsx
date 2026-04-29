import style from "./NavBar.module.css";
import logo from "../../assets/homeImages/darksoulsLogo.png";
import { Link } from "react-router-dom";

const NavBar = () => {
    return (
        <div className={style["main-container"]}>
            <Link to="/home">
                <img src={logo} alt="Logo" className={style.logo} />
            </Link>

        </div>
    );
};

export default NavBar;