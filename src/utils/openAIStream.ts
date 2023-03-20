import {
  createParser,
  ParsedEvent,
  ReconnectInterval,
} from "eventsource-parser";
import { supabaseClient } from "./supabase";

const defaultValues = {
  model: "gpt-3.5-turbo",
  stream: true,
};

async function generateEmbeddings(text: string) {
  try {
    const res = await fetch("https://api.openai.com/v1/embeddings", {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.OPENAI_API_KEY ?? ""}`,
      },
      method: "POST",
      body: JSON.stringify({
        model: "text-embedding-ada-002",
        input: text,
      }),
    });
    const response = await res.json();
    return response;
  } catch (error) {
    console.error(`Failed to generateEmbeddings:`, { error }, text);
    return [];
  }
}

async function performSimilaritySearch(word: string): Promise<any[]> {
  const embedding = await generateEmbeddings(word);
  console.log("got embiddings--------");
  const { data: documents, error } = await supabaseClient.rpc(
    "react_match_documents",
    {
      query_embedding: embedding.data[0].embedding,
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

export async function OpenAIStream(payload: string) {
  const encoder = new TextEncoder();
  const decoder = new TextDecoder();

  let counter = 0;

  const searchResults = await performSimilaritySearch(payload);
  console.log("got Similarity Search--------");
  const contextText = searchResults
    .map((searchResult) => {
      return `${searchResult.content}`;
    })
    .join(" ");

  const prompt = `
    As a knowledgeable React developer who enjoys assisting others, please prioritize answering the following question using the information provided in the given React documentation sections. Make sure your response is in markdown format and includes relevant code snippets when possible. You may also incorporate your own knowledge on the topic, but prioritize the contextText as it contains the latest information. If the question is unrelated to programming or the answer cannot be found in the documentation, simply respond with "Sorry, I don't know how to help with that."
  
    Context sections (latest information):
    ${contextText}
    
    Question: """
    ${payload}
    """
    
    Answer in markdown format (including related code snippets if available):
  `;
  const res = await fetch("https://api.openai.com/v1/chat/completions", {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.OPENAI_API_KEY ?? ""}`,
    },
    method: "POST",
    body: JSON.stringify({
      ...defaultValues,
      messages: [{ role: "user", content: prompt }],
    }),
  });
  const stream = new ReadableStream({
    async start(controller) {
      // callback
      function onParse(event: ParsedEvent | ReconnectInterval) {
        if (event.type === "event") {
          const data = event.data;
          // https://beta.openai.com/docs/api-reference/completions/create#completions/create-stream
          if (data === "[DONE]") {
            controller.close();
            return;
          }
          try {
            const json = JSON.parse(data);
            const text = json.choices[0].delta.content;
            if (counter < 2 && text && (text.match(/\n/) || []).length) {
              // this is a prefix character (i.e., "\n\n"), do nothing
              return;
            }
            const queue = encoder.encode(text);
            controller.enqueue(queue);
            counter++;
          } catch (e) {
            // maybe parse error
            controller.error(e);
            console.log({ e });
          }
        }
      }

      // stream response (SSE) from OpenAI may be fragmented into multiple chunks
      // this ensures we properly read chunks and invoke an event for each SSE event stream
      const parser = createParser(onParse);
      // https://web.dev/streams/#asynchronous-iteration
      for await (const chunk of res.body as any) {
        parser.feed(decoder.decode(chunk));
      }
    },
  });
  return stream;
}
