require("dotenv").config();
const express = require("express");
const cors = require("cors");
const { MongoClient } = require("mongodb");

const app = express();
app.use(express.json());

const allowedOrigins = [
  "https://ezplugg.netlify.app", // Din produktions-URL
  "http://localhost:5173", // Din lokala utvecklings-URL
];

app.use(
  cors({
    origin: (origin, callback) => {
      // Tillåt förfrågningar från de angivna ursprungen
      // Eller tillåt förfrågningar utan "origin" (t.ex. från Postman eller cURL)
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
  })
);

const uri = process.env.MONGODB_URI;
const client = new MongoClient(uri);

async function main() {
  try {
    await client.connect();
    const db = client.db("ezpluggCluster");

    app.get("/kursKoder", async (req, res) => {
      const collections = await db.listCollections().toArray();
      const collectionNames = collections.map((c) => c.name);
      res.json(collectionNames);
    });
    app.post("/addQuestion", async (req, res) => {
      const { course, questions } = req.body;

      const collection = db.collection(course);
      await collection.insertMany(questions);

      res.json({ course, questions });
    });
    app.post("/:kurskod", async (req, res) => {
      const kurskod = req.params.kurskod;
      const fragor = await db.collection(kurskod).find().toArray();

      res.json(fragor);
    });

    app.listen(3001, () => console.log("Server kör på port 3001"));
  } catch (err) {
    console.error("Fel vid anslutning till MongoDB:", err);
  }
}

main();
