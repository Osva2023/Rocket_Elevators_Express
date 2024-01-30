const dotenv = require("dotenv");
const express = require("express");
const fs = require("fs");
const calculations = require("./calculations"); // Import the module, just testing now

dotenv.config();

const app = express();
app.use(express.json());
const port = 3000;
const environment = process.env.environment || "development";

app.listen(port, () => {
  console.log(`Server listening on port ${port} in ${environment} environment`);
});

app.get("/hello", (req, res) => {
  res.status(200).send("Hello World");
});

app.get("/status", (req, res) => {
  res.status(200).send(`Server is running on port ${port} in ${environment} environment`);
});

app.get("/email-list", async (req, res) => {
  try {
    const dataBuffer = await fs.promises.readFile("agents.json");
    const dataJSON = JSON.parse(dataBuffer);
    
    const emailList = dataJSON.map((agent) => agent.email).join(",");
    res.status(200).send(emailList);
  } catch (error) {
    console.error("Error reading file", error);
    res.status(500).send("Internal Server Error");
  }
});

// app.get("/region-avg/:region", async (req, res) => {
//   const region = req.params.region;
  
//   try {
//     const dataBuffer = await fs.promises.readFile("agents.json");
//     const dataJSON = JSON.parse(dataBuffer);
    
//     const regionAgents = dataJSON.filter((agent) => agent.region.trim().toLowerCase() === region);
    
//     if (regionAgents.length === 0) {
//       res.status(404).send("Not agents were found in the Region provided.");
//       return;
//     }
//     const regionAvgRating = regionAgents.reduce((acc, agent) => acc + Number(agent.rating), 0) / regionAgents.length;
//     const regionAvgFee = regionAgents.reduce((acc, agent) => acc + Number(agent.fee), 0) / regionAgents.length;
    
//     const result = {
//       region: region,
//       average_rating: regionAvgRating.toFixed(2),
//       average_fee: regionAvgFee.toFixed(2)
//     };
//     res.status(200).send(result);

//   } catch (error) {
//     console.error("Error reading file", error);
//     res.status(500).send("Internal Server Error");
//   }
// });

app.get("/region-avg/:region", async (req, res) => {
  const region = req.params.region;
  
  try {
    const dataBuffer = await fs.promises.readFile("agents.json");
    const dataJSON = JSON.parse(dataBuffer);
    
    const regionAgents = dataJSON.filter((agent) => agent.region.trim().toLowerCase() === region);
    
    if (regionAgents.length === 0) {
      res.status(404).send("Not agents were found in the Region provided.");
      return;
    }
    
    const { average_rating, average_fee } = calculations.calculateRegionAverages(regionAgents);

    const result = {
      region: region,
      average_rating,
      average_fee
    };
    
    res.status(200).json(result);

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
