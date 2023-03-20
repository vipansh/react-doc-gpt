import { supabaseClient } from "<components>/utils/supabase";
import { OpenAIApi, Configuration } from "openai";
import { OpenAIStream } from "../../utils/openAIStream";

if (!process.env.OPENAI_API_KEY) {
  throw new Error("Missing env var from OpenAI");
}

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

export const config = {
  runtime: "edge",
};

const handler = async (req: Request): Promise<Response> => {
  const { query } = (await req.json()) as {
    query?: string;
  };

  if (!query) {
    return new Response("No prompt in the request", { status: 400 });
  }

  const apiKey = process.env.OPENAI_API_KEY; // Your OpenAI API key

  if (!apiKey) {
    return new Response("Missing apiKey", { status: 500 });
  }

  const stream = await OpenAIStream(query);

  return new Response(stream);
};

export default handler;
