import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { oneDark } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { IoCopyOutline, IoCheckmarkOutline } from 'react-icons/io5';
import { useState } from 'react';

const CodeBlock = ({ language, children }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(children);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="relative group my-3">
      <div className="flex items-center justify-between bg-dark-400 px-4 py-2 rounded-t-lg">
        <span className="text-xs text-white/50 font-mono">{language || 'code'}</span>
        <button
          onClick={handleCopy}
          className="flex items-center gap-1 text-xs text-white/50 hover:text-white transition-colors"
        >
          {copied ? <IoCheckmarkOutline /> : <IoCopyOutline />}
          {copied ? 'Copied!' : 'Copy'}
        </button>
      </div>
      <SyntaxHighlighter
        style={oneDark}
        language={language}
        PreTag="div"
        customStyle={{
          margin: 0,
          borderRadius: '0 0 8px 8px',
          fontSize: '0.875rem',
        }}
      >
        {children}
      </SyntaxHighlighter>
    </div>
  );
};

const MarkdownRenderer = ({ content }) => {
  return (
    <ReactMarkdown
      remarkPlugins={[remarkGfm]}
      components={{
        code({ node, inline, className, children, ...props }) {
          const match = /language-(\w+)/.exec(className || '');
          return !inline && match ? (
            <CodeBlock language={match[1]}>
              {String(children).replace(/\n$/, '')}
            </CodeBlock>
          ) : (
            <code className="bg-dark-300 text-primary-300 px-1.5 py-0.5 rounded text-sm font-mono" {...props}>
              {children}
            </code>
          );
        },
        p: ({ children }) => <p className="mb-3 last:mb-0 leading-7">{children}</p>,
        h1: ({ children }) => <h1 className="text-2xl font-bold mb-3 text-white">{children}</h1>,
        h2: ({ children }) => <h2 className="text-xl font-bold mb-2 text-white">{children}</h2>,
        h3: ({ children }) => <h3 className="text-lg font-semibold mb-2 text-white">{children}</h3>,
        ul: ({ children }) => <ul className="list-disc pl-5 mb-3 space-y-1">{children}</ul>,
        ol: ({ children }) => <ol className="list-decimal pl-5 mb-3 space-y-1">{children}</ol>,
        li: ({ children }) => <li className="text-white/80">{children}</li>,
        blockquote: ({ children }) => (
          <blockquote className="border-l-4 border-primary-500 pl-4 my-3 text-white/60 italic">
            {children}
          </blockquote>
        ),
        a: ({ href, children }) => (
          <a href={href} target="_blank" rel="noopener noreferrer" className="text-primary-400 underline hover:text-primary-300">
            {children}
          </a>
        ),
        table: ({ children }) => (
          <div className="overflow-x-auto my-3">
            <table className="w-full border-collapse text-sm">{children}</table>
          </div>
        ),
        th: ({ children }) => (
          <th className="border border-white/10 bg-primary-900/30 px-4 py-2 text-left font-semibold">{children}</th>
        ),
        td: ({ children }) => (
          <td className="border border-white/10 px-4 py-2">{children}</td>
        ),
      }}
    >
      {content}
    </ReactMarkdown>
  );
};

export default MarkdownRenderer;