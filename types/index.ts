export enum OpenAIModel {
    DAVINCI_TURBO = "gpt-3.5-turbo"
  }
  
  export type PGMainData = {
    title: string;
    url: string;
    content: string;
    length: number;
    tokens: number;
    chunks: PGChunk[];
  };
  
  export type PGChunk = {
    docs_title: string;
    docs_url: string;
    content: string;
    content_length: number;
    content_tokens: number;
    embedding: number[];
  };
  
  export type PGJSON = {
    url: string;
    length: number;
    content: string;
    tokens: number;
    essays: PGMainData[];
  };