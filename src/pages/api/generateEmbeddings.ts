import type { NextApiRequest, NextApiResponse } from "next";
import { Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

export const openai = new OpenAIApi(configuration);

export default async function generateEmbeddings(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const { text } = req.body;

    const response = await openai.createEmbedding({
      model: "text-embedding-ada-002",
      input: text,
    });

    if (
      response.data.data[0].embedding &&
      response.data.data[0].embedding.length > 0
    ) {
      res.json({ result: response.data.data[0].embedding });
    } else {
      throw new Error("No embedding data received from OpenAI API.");
    }
  } catch (error) {
    console.error(`Failed to save data:`, error);
    res.status(500).json({ error });
  }
}
