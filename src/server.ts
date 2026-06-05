import express from "express";
import { taraAgent } from "./mastra/agents/tara-agent";

const app = express();

app.use(express.json());

app.post("/ask", async (req, res) => {
  const start = Date.now();

  try {
    const { question } = req.body;

    console.log("\n========================");
    console.log("Question:", question);

    if (!question) {
      return res.status(400).json({
        error: "Question is required",
      });
    }

    const response = await taraAgent.generate(question);

    const latency = Date.now() - start;

    console.log("Status: Success");
    console.log("Latency:", latency, "ms");
    console.log("Answer:", response.text);
    console.log("========================\n");

    return res.json({
      answer: response.text,
    });
  } catch (error) {
    const latency = Date.now() - start;

    console.log("Status: Failed");
    console.log("Latency:", latency, "ms");
    console.error(error);
    console.log("========================\n");

    return res.status(500).json({
      error: "Internal server error",
    });
  }
});

app.get("/", (_, res) => {
  res.send("Tara Finance Agent Running");
});

const PORT = Number(process.env.PORT) || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});