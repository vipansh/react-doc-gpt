import { PGChunk, PGMainData } from "../../../types";
import { supabaseClient } from "../../utils/supabase";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> {
  try {
    const essay: PGChunk = req.body;
    console.log({ essay });
    const { error } = await supabaseClient.from("reactdoc").insert({
      content: essay.content,
      content_length: essay.content_length,
      content_tokens: essay.content_tokens,
      docs_title: essay.docs_title,
      docs_url: essay.docs_url,
      embedding: essay.embedding,
    });
    console.log(error);
    res.status(200).end();
  } catch (error) {
    console.log(error);
    res.status(500).end();
  }
}
