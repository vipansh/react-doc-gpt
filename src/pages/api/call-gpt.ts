import type { NextApiRequest, NextApiResponse } from "next";
import { Configuration, OpenAIApi } from "openai";
import { supabaseClient } from "../../utils/supabase";

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

async function generateEmbeddings(text: string) {
  try {
    const response = await openai.createEmbedding({
      model: "text-embedding-ada-002",
      input: text,
    });

    if (
      response.data.data[0].embedding &&
      response.data.data[0].embedding.length > 0
    ) {
      return response.data.data[0].embedding;
    } else {
      return [];
    }
  } catch (error) {
    console.error(`Failed to save data:`, error);
    return [];
  }
}

export const config = {
  runtime: "edge",
};

async function performSimilaritySearch(
  word: string,
  url: string
): Promise<any[]> {
  const embedding = await generateEmbeddings(word);
  const { data: documents, error } = await supabaseClient.rpc(
    "react_match_documents",
    {
      query_embedding: embedding,
      similarity_threshold: 0.78, // Choose an appropriate threshold for your data
      match_count: 4, // Choose the number of matches
    }
  );
  if (error) {
    console.error(error);
    return [];
  }
  return documents;
}

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (!process.env.OPENAI_API_KEY) {
    return res.status(500).json({ error: "Api key missing" });
  }
  const { query } = req.body;

  const searchResults = await performSimilaritySearch(
    query,
    req.headers.origin || ""
  );

  const contextText = searchResults
    .map((searchResult) => {
      return `${searchResult.content}`;
    })
    .join(" ");

  try {
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
    const result = response?.data?.choices?.[0]?.message?.content?.trim();
    console.log({ response: response?.data?.usage });
    new Response(result);
  } catch (error) {
    console.error(`Failed to save data:`, error);
    new Error("error");
  }
};

export default handler;
