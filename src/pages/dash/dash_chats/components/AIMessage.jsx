// AI Message Component (Left Side)

import {
  Bot,
  Brain,
  Copy,
  Download,
  Sparkles,
  ThumbsDown,
  ThumbsUp,
  Volume2,
  Zap,
} from 'lucide-react';

const AIMessage = ({ message, onCopy, onFeedback }) => {
  return (
    <div className="group flex gap-4 p-6 transition-colors hover:bg-gray-50/50">
      <div className="flex-1">
        <div className="mb-2 flex items-center gap-2">
          <span className="font-semibold text-gray-800">{message.model}</span>
          <span className="text-xs text-gray-500">•</span>
          <span className="text-sm text-gray-500">{message.timestamp}</span>
          {message.thinking && (
            <span className="rounded-full bg-blue-100 px-2 py-0.5 text-xs text-blue-600">
              Thinking...
            </span>
          )}
        </div>

        <div className="prose prose-gray max-w-none">
          {message.content.split('\n\n').map((paragraph, idx) => {
            if (paragraph.startsWith('```')) {
              const language = paragraph.match(/```(\w+)/)?.[1] || '';
              const code = paragraph.replace(/```\w+\n/, '').replace(/```/, '');
              return (
                <div key={idx} className="my-4">
                  <div className="flex items-center justify-between rounded-t-lg bg-gray-800 px-4 py-2 text-gray-300">
                    <span className="font-mono text-sm">{language}</span>
                    <button onClick={() => onCopy(code)} className="text-gray-400 hover:text-white">
                      <Copy className="h-4 w-4" />
                    </button>
                  </div>
                  <pre className="overflow-x-auto rounded-b-lg bg-gray-900 p-4 text-sm text-gray-100">
                    {code}
                  </pre>
                </div>
              );
            } else if (paragraph.startsWith('**')) {
              return (
                <h3 key={idx} className="mt-4 mb-2 text-lg font-semibold text-gray-800">
                  {paragraph.replace(/\*\*/g, '')}
                </h3>
              );
            }
            return (
              <p key={idx} className="mb-3 leading-relaxed text-gray-700">
                {paragraph}
              </p>
            );
          })}
        </div>

        <div className="mt-4 flex items-center gap-3 opacity-0 transition-opacity group-hover:opacity-100">
          <button
            onClick={() => onCopy(message.content)}
            className="flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-sm text-gray-600 transition-colors hover:bg-gray-100 hover:text-gray-800"
          >
            <Copy className="h-4 w-4" />
            Copy
          </button>
          <button className="flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-sm text-gray-600 transition-colors hover:bg-gray-100 hover:text-gray-800">
            <Volume2 className="h-4 w-4" />
            Read aloud
          </button>
          <button className="flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-sm text-gray-600 transition-colors hover:bg-gray-100 hover:text-gray-800">
            <Download className="h-4 w-4" />
            Export
          </button>
          <div className="ml-auto flex items-center gap-1">
            <button
              onClick={() => onFeedback(message.id, 'like')}
              className="rounded-lg p-1.5 text-gray-500 hover:bg-green-50 hover:text-green-600"
            >
              <ThumbsUp className="h-4 w-4" />
            </button>
            <button
              onClick={() => onFeedback(message.id, 'dislike')}
              className="rounded-lg p-1.5 text-gray-500 hover:bg-red-50 hover:text-red-600"
            >
              <ThumbsDown className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AIMessage;
