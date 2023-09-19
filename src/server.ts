const express = require("express");
const { createCanvas } = require("canvas");

const app = express();
const PORT = 3000;

app.get(
  "/",
  async (
    req: { query: { text: string } },
    res: {
      set: (arg0: string, arg1: string) => void;
      status: (arg0: number) => {
        (): any;
        new (): any;
        send: { (arg0: string): void; new (): any };
      };
    }
  ) => {
    const canvas = createCanvas(800, 600);
    const ctx = canvas.getContext("2d");

    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = "#f0f0f0";
    ctx.font = "80px Arial";

    const text = "Image not found for:";
    const userText = req.query.text || "";

    const textWidth = ctx.measureText(text).width;
    const x = (canvas.width - textWidth) / 2;
    const y = canvas.height / 2;

    ctx.fillText(text, x, y - 50);
    ctx.fillText(userText, x + 170, y + 50);

    try {
      res.set("Content-Type", "image/jpeg");
      canvas.createJPEGStream().pipe(res);
    } catch (error) {
      console.error("Error loading or drawing the image:", error);
      res.status(500).send("An error occurred while generating the image.");
    }
  }
);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
