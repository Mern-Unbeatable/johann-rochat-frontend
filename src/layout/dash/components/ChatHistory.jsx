import React from 'react';

const ChatHistory = ({ chat }) => {
  return (
    <div
      className={`flex cursor-pointer items-start rounded-lg p-2 transition-colors duration-150 ${
        chat.active ? 'border border-blue-100 bg-blue-50' : 'hover:bg-gray-100'
      }`}
    >
      <div className="min-w-0 flex-1">
        <div className="flex items-start justify-between">
          <div className="truncate text-sm font-medium text-gray-800">{chat.name}</div>
          <div className="ml-2 flex-shrink-0 text-xs text-gray-500">{chat.time}</div>
        </div>
        <div className="truncate text-xs text-gray-500">{chat.preview}</div>
      </div>
    </div>
  );
};

export default ChatHistory;
