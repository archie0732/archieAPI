import express from "express";
import { artistAPI } from "./nhentai/artist";

const app: express.Application = express();

app.get("/api/nhentai", async (req: any, res: any) => {
  const artist = req.query["artist"];

  if (typeof artist !== "string") {
    return res.status(404).json({ error: "wtf" });
  }

  const data = await artistAPI(artist);

  return res.json(data);
});

app.get("/api", (_, res: any) => {
  return res.json({
    title: "welcome to archie api",
    text: "use /api/nhentai?artist= to get artist api",
  });
});

app.listen(3000, () => {
  console.log("Server is running on http://localhost:3000/api");
});
