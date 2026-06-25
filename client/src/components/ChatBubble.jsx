function renderBold(text) {
  const parts = text.split(/\*\*(.*?)\*\*/g);
  return parts.map((part, i) =>
    i % 2 === 1 ? <strong key={i}>{part}</strong> : part
  );
}

export default function ChatBubble({ message }) {
  if (message.role === 'ai') {
    return (
      <div className="flex gap-3">
        <div className="bg-primary/10 p-2 rounded-full h-8 w-8 flex items-center justify-center flex-shrink-0">
          <i className="fas fa-robot text-primary text-sm"></i>
        </div>
        <div className="chat-bubble bg-purple-50 dark:bg-purple-950/40 rounded-2xl rounded-tr-sm p-4">
          <p className="text-sm text-gray-700 dark:text-gray-200 whitespace-pre-wrap">
            {renderBold(message.content)}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex gap-3 justify-end">
      <div className="chat-bubble bg-primary text-white rounded-2xl rounded-tl-sm p-4">
        <p className="text-sm whitespace-pre-wrap">{message.content}</p>
      </div>
      <div className="bg-purple-100 dark:bg-purple-900 p-2 rounded-full h-8 w-8 flex items-center justify-center flex-shrink-0">
        <i className="fas fa-user text-primary text-sm"></i>
      </div>
    </div>
  );
}
