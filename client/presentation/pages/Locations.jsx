import { useEffect, useState } from "react";
import NavBar from "../components/NavBar.jsx";
import styles from "./Locations.module.css";

const Locations = () => {
    const [locations, setLocations] = useState([]);
    const [form, setForm] = useState({
        name: "",
        areaType: "",
        description: "",
        thoughts: "",
    });

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const fetchLocations = async () => {
        try {
            const response = await fetch(`${import.meta.env.VITE_API_URL}/api/locations`);

            if (!response.ok) {
                throw new Error("No se pudieron obtener las locations");
            }

            const data = await response.json();
            setLocations(data);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchLocations();
    }, []);

    const handleChange = (event) => {
        const { name, value } = event.target;

        setForm((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const response = await fetch(`${import.meta.env.VITE_API_URL}/api/locations`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(form),
            });

            if (!response.ok) {
                throw new Error("No se pudo crear la location");
            }

            const createdLocation = await response.json();

            setLocations((prev) => [createdLocation, ...prev]);

            setForm({
                name: "",
                areaType: "",
                description: "",
                thoughts: "",
            });
        } catch (err) {
            setError(err.message);
        }
    };

    return (
        <div className={styles["main-container"]}>
            <NavBar />

            <section className={styles.content}>

                <p className={styles.subtitle}>
                    Create your own notes, memories and lore thoughts about each place.
                </p>

                <form className={styles.form} onSubmit={handleSubmit}>
                    <input
                        name="name"
                        value={form.name}
                        onChange={handleChange}
                        placeholder="Location name"
                        required
                    />

                    <input
                        name="areaType"
                        value={form.areaType}
                        onChange={handleChange}
                        placeholder="Area type"
                    />

                    <textarea
                        name="description"
                        value={form.description}
                        onChange={handleChange}
                        placeholder="Short description of the location"
                        required
                    />

                    <textarea
                        name="thoughts"
                        value={form.thoughts}
                        onChange={handleChange}
                        placeholder="Your thoughts about this location"
                        required
                    />

                    <button type="submit">Create Location Entry</button>
                </form>

                {loading && <p>Loading locations...</p>}
                {error && <p className={styles.error}>{error}</p>}

                <div className={styles.locationsGrid}>
                    {locations.map((location) => (
                        <article key={location._id} className={styles.card}>
                            <p className={styles.badge}>{location.areaType}</p>
                            <h2>{location.name}</h2>
                            <p>{location.description}</p>
                            <blockquote>{location.thoughts}</blockquote>
                        </article>
                    ))}
                </div>
            </section>
        </div>
    );
};

export default Locations;