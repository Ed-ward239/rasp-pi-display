const express = require("express");
const axios = require("axios");
const app = express();
const port = 4000;

app.get("/image/:id", async (req, res) => {
  try {
    const fileId = req.params.id;
    const response = await axios.get(`https://drive.google.com/uc?export=view&id=${fileId}`, {
      responseType: "arraybuffer",
    });
    const contentType = response.headers["content-type"];
    res.set("Content-Type", contentType);
    res.send(response.data);
  } catch (error) {
    res.status(500).send("Error fetching image");
  }
});

app.get("/video/:id", async (req, res) => {
  try {
    const fileId = req.params.id;
    const response = await axios.get(`https://drive.google.com/uc?export=view&id=${fileId}`, {
      responseType: "arraybuffer",
    });
    const contentType = response.headers["content-type"];
    res.set("Content-Type", contentType);
    res.send(response.data);
  } catch (error) {
    res.status(500).send("Error fetching video");
  }
});

app.listen(port, () => {
  console.log(`Proxy server running on http://localhost:${port}`);
});
