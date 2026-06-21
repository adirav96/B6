export default function ChatBubble({ message }) {
  if (message.role === 'ai') {
    return (
      <div className="flex gap-3">
        <div className="bg-primary/10 p-2 rounded-full h-8 w-8 flex items-center justify-center flex-shrink-0">
          <i className="fas fa-robot text-primary text-sm"></i>
        </div>
        <div className="chat-bubble bg-gray-100 rounded-2xl rounded-tr-sm p-4">
          <p className="text-sm text-gray-700 whitespace-pre-wrap">{message.content}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex gap-3 justify-end">
      <div className="chat-bubble bg-primary text-white rounded-2xl rounded-tl-sm p-4">
        <p className="text-sm whitespace-pre-wrap">{message.content}</p>
      </div>
      <div className="bg-gray-200 p-2 rounded-full h-8 w-8 flex items-center justify-center flex-shrink-0">
        <i className="fas fa-user text-gray-600 text-sm"></i>
      </div>
    </div>
  );
}
//reusable UI