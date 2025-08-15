const express = require("express");
const cors = require("cors");
const { MongoClient } = require("mongodb");

const app = express();
app.use(cors({ origin: "http://localhost:5173" })); //https://ezplugg.netlify.app
app.use(express.json());

const uri =
  "mongodb+srv://mangedev:gRZj05mymadRaHyA@ezpluggcluster.5jqv9np.mongodb.net/?retryWrites=true&w=majority&appName=ezpluggCluster";
const client = new MongoClient(uri);

async function main() {
  try {
    await client.connect();
    const db = client.db("ezpluggCluster");

    app.get("/kursKoder", async (req, res) => {
      const collections = await db.listCollections().toArray();
      const collectionNames = collections.map((c) => c.name);
      console.log(collectionNames);
      res.json(collectionNames);
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
