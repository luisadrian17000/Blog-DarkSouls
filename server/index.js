import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { MongoClient, ServerApiVersion } from "mongodb";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());


const PORT = process.env.PORT || 3001;
const MONGO_URI = process.env.MONGO_URI;
const DB_NAME = process.env.DB_NAME;

if (!MONGO_URI) {
    throw new Error("Falta MONGO_URI en el .env");
}

const client = new MongoClient(MONGO_URI, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    },
});

let db;

async function startServer() {
    try {
        await client.connect();
        console.log("Conectado a MongoDB Atlas");

        db = client.db(DB_NAME);

        app.get("/", (req, res) => {
            res.send("API funcionando");
        });

        app.get("/api/bosses", async (req, res) => {
            try {
                const bosses = await db.collection("bosses_ds").find({}).toArray();
                res.json(bosses);
            } catch (error) {
                console.error("Error al obtener bosses:", error);
                res.status(500).json({ error: "Error al obtener bosses" });
            }
        });

        app.get("/api/home-cards", async (req, res) => {
            try {
                const cards = await db.collection("home_cards").find({}).toArray();
                res.json(cards);
            } catch (error) {
                console.error("Error al obtener home cards:", error);
                res.status(500).json({ error: "Error al obtener home cards" });
            }
        });

        app.get("/api/locations", async (req, res) => {
            try {
                const locations = await db
                    .collection("locations_ds")
                    .find({})
                    .sort({ createdAt: -1 })
                    .toArray();

                res.json(locations);
            } catch (error) {
                console.error("Error al obtener locations:", error);
                res.status(500).json({ error: "Error al obtener locations" });
            }
        });

        app.post("/api/locations", async (req, res) => {
            try {
                const { name, areaType, description, thoughts } = req.body;

                if (!name || !description || !thoughts) {
                    return res.status(400).json({
                        error: "Name, description and thoughts are required",
                    });
                }

                const newLocation = {
                    name,
                    areaType: areaType || "Unknown",
                    description,
                    thoughts,
                    createdAt: new Date(),
                };

                const result = await db.collection("locations_ds").insertOne(newLocation);

                res.status(201).json({
                    _id: result.insertedId,
                    ...newLocation,
                });
            } catch (error) {
                console.error("Error al crear location:", error);
                res.status(500).json({ error: "Error al crear location" });
            }
        });

        app.listen(PORT, () => {
            console.log(`Servidor corriendo en http://localhost:${PORT}`);
        });
    } catch (error) {
        console.error("Error conectando a MongoDB Atlas:", error);
    }
}

startServer();