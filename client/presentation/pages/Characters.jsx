import { useEffect, useMemo, useState } from "react";
import NavBar from "../components/NavBar.jsx";
import BossSearchBar from "../components/BossSearchBar.jsx";
import BossCarousel from "../components/BossCarousel.jsx";
import styles from "./Characters.module.css";

const normalize = (s) =>
    (s ?? "")
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .trim();

const Characters = () => {
  const [query, setQuery] = useState("");
  const [bosses, setBosses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchBosses = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/api/bosses`);

        if (!response.ok) {
          throw new Error("No se pudieron obtener los bosses");
        }

        const data = await response.json();
        setBosses(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchBosses();
  }, []);

  const normalizedQuery = normalize(query);

  const filteredBosses = useMemo(() => {
    if (!normalizedQuery) return bosses;
    return bosses.filter((b) => normalize(b.name).includes(normalizedQuery));
  }, [bosses, normalizedQuery]);

  if (loading) {
    return (
        <div className={styles["main-container"]}>
          <NavBar />
          <p>Loading bosses...</p>
        </div>
    );
  }

  if (error) {
    return (
        <div className={styles["main-container"]}>
          <NavBar />
          <p>{error}</p>
        </div>
    );
  }

  return (
      <div className={styles["main-container"]}>
        <NavBar />

        <BossSearchBar
            value={query}
            onChange={setQuery}
            placeholder="Search a boss..."
        />

        <BossCarousel bosses={filteredBosses} />
      </div>
  );
};

export default Characters;