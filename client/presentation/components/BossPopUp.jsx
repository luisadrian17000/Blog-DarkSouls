import { useEffect } from "react";
import styles from "./BossPopUp.module.css";

const BossPopUp = ({ boss, onClose }) => {
    useEffect(() => {
        const handleEsc = (event) => {
            if (event.key === "Escape") {
                onClose();
            }
        };

        window.addEventListener("keydown", handleEsc);

        return () => {
            window.removeEventListener("keydown", handleEsc);
        };
    }, [onClose]);

    if (!boss) return null;

    return (
        <div className={styles.overlay} onClick={onClose}>
            <section className={styles.popup} onClick={(event) => event.stopPropagation()}>
                <button className={styles.closeButton} onClick={onClose}>
                    ×
                </button>

                <p className={styles.label}>Boss Lore</p>

                <h2 className={styles.title}>{boss.name}</h2>

                <p className={styles.area}>{boss.area}</p>

                <p className={styles.lore}>
                    {boss.lore || "No lore available for this boss."}
                </p>
            </section>
        </div>
    );
};

export default BossPopUp;