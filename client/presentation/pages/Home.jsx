import NavBar from "../components/NavBar.jsx";
import styles from "./Home.module.css";
import armor from '../../assets/homeImages/armor.webp';
import characters from '../../assets/homeImages/characters.webp';
import items from '../../assets/homeImages/items.webp';
import locations from '../../assets/homeImages/locations.webp';
import magic from '../../assets/homeImages/magic.webp';
import online from '../../assets/homeImages/online.webp';
import stats from '../../assets/homeImages/stats.webp';
import weapons from '../../assets/homeImages/weapons.webp';
import Card from "../components/Card.jsx";
import homecards from "../../data/home-cards.json";
import Logout from "../components/Logout.jsx";

const imageMap = {
  armor,
  characters,
  items,
  locations,
  magic,
  online,
  stats,
  weapons   
};

const Home = () => {
  return (
    <div className={styles.globalContainer}>
      <div className={styles.mainContainer}>
        
        <NavBar />

       
        <div className={styles.cardsContainer}>
          {homecards.map((card) => (
            <Card
              key={card.id}
              name={card.name}
              image={imageMap[card.image]}
            />
          ))}
        </div>

    
        <div className={styles.logoutContainer}>
          <Logout />
        </div>

      </div>
    </div>
  );
};

export default Home;