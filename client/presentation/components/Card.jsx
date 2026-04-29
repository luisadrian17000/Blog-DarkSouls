import { Link } from "react-router-dom";
import styles from "./Card.module.css";

const Card = ({ name, image }) => {
  const path = `/${name.toLowerCase()}`;

  return (
    <Link to={path} className={styles.link}>
      <div className={styles.card}>
        <img className={styles.image} src={image} alt={name} />
      </div>
      <h2 className={styles.title}>{name}</h2>
    </Link>
  );
};

export default Card;