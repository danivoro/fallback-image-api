import express from "express";
const { createCanvas, loadImage, registerFont } = require("canvas");
import path from "path";

const app = express();
const PORT = 3000;

const fontPath = "./data/LeagueGothic-Regular.otf";
registerFont(fontPath, { family: "CustomFont" });

app.get("/", async (req, res) => {
  const canvas = createCanvas(800, 600);
  const ctx = canvas.getContext("2d");

  ctx.fillStyle = "black";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  ctx.fillStyle = "#f0f0f0";
  ctx.font = "80px CustomFont";
  const text = "Resource image not found for:";

  const textWidth = ctx.measureText(text).width;
  const x = (canvas.width - textWidth) / 2;
  const y = canvas.height / 2;

  const userText = req.query.text || "";

  ctx.fillText(text, x, y - 50);
  ctx.fillText(userText, x + 170, y + 50);

  try {
    res.set("Content-Type", "image/jpeg");

    canvas.createJPEGStream().pipe(res);
  } catch (error) {
    console.error("Error loading or drawing the logo:", error);
    res.status(500).send("An error occurred while generating the image.");
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
