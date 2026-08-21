import express from "express";
import cors from "cors";
import aiRoutes from "./routes/ai.js";
import oceanaiRoutes from "./routes/oceanai.js";

const app = express();
const port = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());

app.use("/api/ai", aiRoutes);
app.use("/api/oceanai", oceanaiRoutes);

app.listen(port, () => {
  console.log(`OceanAI API running on port ${port}`);
});
