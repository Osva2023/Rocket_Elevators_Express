const dotenv = require("dotenv");
const express = require("express");
const fs = require("fs");

dotenv.config();

const app = express();
app.use(express.json());
const port = 3000;
const environment = process.env.environment || "development";

app.listen(port, () => {
  console.log(`Server listening on port ${port} in ${environment} environment`);
});

app.get("/hello", (req, res) => {
  res.send("Hello World");
});

app.get("/status", (req, res) => {
  res.send(`Server is running on port ${port} in ${environment} environment`);
});

app.get("/email-list", async (req, res) => {
  try {
    const dataBuffer = await fs.promises.readFile("rocket-agents/agents.json");
    const dataJSON = JSON.parse(dataBuffer);
    
    const emailList = dataJSON.map((agent) => agent.email).join(",");
    res.send(emailList);
  } catch (error) {
    console.error("Error reading file", error);
    res.status(500).send("Internal Server Error");
  }
});
app.get("/error", (req, res) => {
  res.status(500).send("Internal Server Error");
});
app.use((req, res) => {
  res.status(404).send("Not Found");
});
