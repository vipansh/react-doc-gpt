import React, { useState } from "react";
import ReactMarkdown from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { dracula } from "react-syntax-highlighter/dist/cjs/styles/prism";
interface OutputDisplayProps {
  output: string;
}

type CodeProps = {
  node?: any;
  inline?: boolean;
  className?: string;
  children: React.ReactNode;
} & React.HTMLAttributes<HTMLElement>;

const OutputDisplay: React.FC<OutputDisplayProps> = ({ output }) => {
  const [isCopied, setIsCopied] = useState(false);

  const components = {
    h2: ({ children }: { children: React.ReactNode }) => (
      <h2 className="text-2xl font-semibold">{children}</h2>
    ),
    p: ({ children }: { children: React.ReactNode }) => (
      <p className="mb-4">{children}</p>
    ),
    code({ node, inline, className, children, ...props }: CodeProps) {
      const match = /language-(\w+)/.exec(className || "");
      const language = match && match[1] ? match[1] : "";

      const handleCopy = async (text: string) => {
        try {
          await window.navigator.clipboard.writeText(text);
          setIsCopied(true);
          setTimeout(() => {
            setIsCopied(false);
          }, 2000);
        } catch (err) {
          console.error("Failed to copy text: ", err);
        }
      };

      if (inline) {
        return (
          <code className="text-sm" {...props}>
            {children}
          </code>
        );
      }

      return (
        <div className="relative bg-gray-800 p-1 rounded-md text-sm md:text-base">
          <div className="bg-gray-300 flex justify-end items-center p-1 rounded-t-md">
            <button
              className="text-xs py-1 px-3"
              onClick={() => handleCopy(children as string)}
            >
              {isCopied ? "Copied!" : "Copy"}
            </button>
          </div>
          <SyntaxHighlighter
            language={language}
            style={dracula as any}
            {...props}
          >
            {String(children)}
          </SyntaxHighlighter>
        </div>
      );
    },
  };

  return (
    <div className="p-4 my-4 bg-white shadow-md border border-gray-200 rounded-lg whitespace-pre-wrap">
      <ReactMarkdown components={components} className="text-base md:text-lg">
        {output}
      </ReactMarkdown>
    </div>
  );
};

export default OutputDisplay;
