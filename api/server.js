const express = require("express");
const fs = require("fs");
const path = require("path");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
app.use(bodyParser.json());
app.use(cors({ origin: "http://localhost:5173" }));
const filePath = path.join(process.cwd(), "../ui/src/assets/kurser.json");

app.post("/api/add-question", (req, res) => {
  const { course, questions } = req.body;

  if (!course || !questions) {
    return res.status(400).json({ error: "Kurskod och frågor krävs" });
  }

  const courseKey = course;

  let data = {};
  if (fs.existsSync(filePath)) {
    data = JSON.parse(fs.readFileSync(filePath, "utf-8"));
  }

  if (!data[courseKey]) {
    data[courseKey] = [];
  }

  questions.forEach((q) => {
    if (q.question && q.answer) {
      data[courseKey].push({ [q.question]: q.answer });
    }
  });

  fs.writeFileSync(filePath, JSON.stringify(data, null, 2), "utf-8");

  res.json({ message: "Frågor sparade", course: courseKey });
});

app.listen(3000, () => console.log("Server körs på http://localhost:3000"));
