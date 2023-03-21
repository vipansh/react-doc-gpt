import Head from "next/head";
import { Inter } from "next/font/google";
import axios, { AxiosResponse } from "axios";
import { useState } from "react";
import SearchIcon from "<components>/svg/SearchIcon";
import AlertIcon from "<components>/svg/AlertIcon";
import OutputDisplay from "<components>/components/OutputDisplay";
import ProductHunt from "<components>/components/ProductHunt";

const inter = Inter({ subsets: ["latin"] });

interface GptRequest {
  query: string;
}

const Home = () => {
  const [query, setQuery] = useState("");
  const [output, setOutput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    if (isLoading) {
      setError("One request at a time");
      return;
    }

    setOutput("");
    setIsLoading(true);
    const url = "/api/request-data-from-gpt";
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query: query,
      }),
    });
    console.log("Edge function returned.");

    if (!response.ok) {
      console.log(response);
      setError("Something went wrong. plese try again");
    }

    // This data is a ReadableStream
    const data = response.body;
    if (!data) {
      return;
    }

    const reader = data.getReader();
    const decoder = new TextDecoder();
    let done = false;

    while (!done) {
      const { value, done: doneReading } = await reader.read();
      done = doneReading;
      const chunkValue = decoder.decode(value);
      setOutput((prev) => prev + chunkValue);
    }

    setIsLoading(false);
  };

  return (
    <>
      <Head>
        <title>React Doc GPT</title>
        <meta name="description" content="React Doc GPT" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="bg-gray-900 py-8 min-h-screen flex flex-col ">
        <div className="container max-w-5xl mx-auto flex flex-col flex-grow">
          {output && <ProductHunt />}
          <div className="w-full h-48">
            <h1 className="px-4 text-transparent bg-gradient-to-l from-purple-700 via-pink-500 to-red-500 bg-clip-text font-extrabold text-2xl md:text-6xl">
              Welcome to React doc GPT
            </h1>
            <div className="mt-8 space-y-4">
              <form onSubmit={handleSubmit} className="px-4">
                <div className="relative">
                  <input
                    className={`w-full px-4 py-2 rounded-md text-white placeholder-gray-400 bg-gray-800 ${
                      error.trim() ? "border border-red-500" : ""
                    }`}
                    type="text"
                    placeholder="Enter your question"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                  />
                  <button
                    className="absolute right-2 top-1/2 transform -translate-y-1/2 h-8 w-12"
                    type="submit"
                    disabled={!query.trim()}
                  >
                    {isLoading ? (
                      <div className="animate-spin w-4 h-4 border-t-2 border-white rounded-full" />
                    ) : (
                      <SearchIcon />
                    )}
                  </button>
                </div>
              </form>
              {error && (
                <div className="flex items-center text-red-500">
                  <span className="w-5 h-5 mr-2">
                    <AlertIcon />
                  </span>
                  {error}
                </div>
              )}
            </div>
            {isLoading && (
              <>
                <div className="text-white text-center">
                  Searching react doc for the answer and sending react doc to
                  gpt to get well format result. This can take 10-15 sec.
                </div>
                <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                  <div className="flex items-center  flex-col justify-center space-y-6">
                    <div className="w-8 h-8 animate-spin border-t-2 border-white rounded-full" />
                  </div>
                </div>
              </>
            )}
            <OutputDisplay output={output} />
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
