import style from "./LoginAccessButton.module.css"
import { motion } from "framer-motion";
import { useAuth0 } from "@auth0/auth0-react";


const LoginAccessButton = () => {

    const { loginWithRedirect, isLoading } = useAuth0();

    if (isLoading) return <p>Cargando...</p>;

    return (
        <motion.div
            className={style.accessContainer}
            whileHover={{ scale: 1.3 }}
            transition={{ duration: 0.2 }}
        >
            <button onClick={() => loginWithRedirect()}>
                Acceder
            </button>
        </motion.div>
    )
}

export default LoginAccessButton;