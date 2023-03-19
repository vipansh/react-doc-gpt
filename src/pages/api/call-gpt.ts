import type { NextApiRequest, NextApiResponse } from "next";
import { Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

export const openai = new OpenAIApi(configuration);

// Create an in-memory cache using a Map

export default async function callGpt(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (!process.env.OPENAI_API_KEY) {
    throw Error("Api key missing");
  }

  try {
    const { contextText, query } = req.body;

    const prompt = `
    As a knowledgeable React developer who enjoys assisting others, please prioritize answering the following question using the information provided in the given React documentation sections. Make sure your response is in markdown format and includes relevant code snippets when possible. You may also incorporate your own knowledge on the topic, but prioritize the contextText as it contains the latest information. If the question is unrelated to programming or the answer cannot be found in the documentation, simply respond with "Sorry, I don't know how to help with that."

    Context sections (latest information):
    ${contextText}
    
    Question: """
    ${query}
    """
    
    Answer in markdown format (including related code snippets if available):
`;

    const response = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: prompt }],
    });

    // Extract the required data from the response
    const result = response?.data?.choices?.[0]?.message?.content?.trim();

    // Cache the response for future use

    // Return the extracted data as a JSON object
    return res.json({ result });
  } catch (error) {
    console.error(`Failed to save data:`, error);
    res.status(500).json({ error });
  }
}
