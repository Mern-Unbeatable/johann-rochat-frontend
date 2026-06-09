import { Copy, Edit, FileText, Share2 } from 'lucide-react';

// User Message Component (Right Side)
const UserMessage = ({ message }) => {
  return (
    <div className="group flex justify-end gap-4 transition-colors">
      <div className="flex max-w-[80%] flex-col items-end">
        <div className="mb-3 rounded-2xl bg-gradient-to-r from-blue-500 to-blue-400 px-4 py-3 leading-relaxed text-white">
          {message.content}
        </div>

        {message.files && message.files.length > 0 && (
          <div className="mt-2 flex flex-wrap gap-2">
            {message.files.map((file, idx) => (
              <div key={idx} className="flex items-center gap-2 rounded-lg bg-blue-100 px-3 py-2">
                <FileText className="h-4 w-4 text-blue-600" />
                <span className="text-sm text-blue-700">{file.name}</span>
                <span className="text-xs text-blue-500">{file.size}</span>
              </div>
            ))}
          </div>
        )}

        <div className="opacity-0 transition-opacity group-hover:opacity-100">
          <button className="flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-sm text-gray-600 transition-colors hover:bg-gray-200 hover:text-gray-800">
            <Copy className="h-4 w-4" />
            Copy
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserMessage;
