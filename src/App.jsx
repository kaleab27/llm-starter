import { useState, useEffect, useRef } from "react";
import openai, { getConversationHistory, streamOpenAI } from "./ai";
import { marked } from "marked";
import "./markdown.css";

// Configure marked to sanitize the output
marked.setOptions({
  sanitize: true,
});

function App() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const chatEndRef = useRef(null);

  useEffect(() => {
    setMessages(getConversationHistory());
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    try {
      setIsLoading(true);
      const userMessage = { type: "human", content: input };
      setMessages((prev) => [...prev, userMessage]);
      setInput("");

      const aiMessage = { type: "ai", content: "" };
      setMessages((prev) => [...prev, aiMessage]);

      for await (const chunk of streamOpenAI(input)) {
        setMessages((prev) => {
          const lastMessage = prev[prev.length - 1];
          if (lastMessage.type === "ai") {
            return [
              ...prev.slice(0, -1),
              { ...lastMessage, content: lastMessage.content + chunk },
            ];
          }
          return prev;
        });
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-screen bg-gray-900 text-gray-100 p-4">
      <div className="max-w-7xl w-full mx-auto flex flex-col h-full">
        <h1 className="text-5xl font-bold text-center mb-4 text-purple-400">
          Conversation
        </h1>
        <div className="flex-grow overflow-auto mb-4 bg-gray-800 rounded-lg p-4 shadow-lg">
          <div className="space-y-4">
            {messages.length === 0 ? (
              <div className="text-center my-8">
                <h2 className="text-3xl font-bold mb-4 bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 text-transparent bg-clip-text">
                  Welcome to the AI Chat!
                </h2>
                <p className="text-xl mb-4 bg-gradient-to-r from-green-400 to-blue-500 text-transparent bg-clip-text">
                  How can I assist you today?
                </p>
              </div>
            ) : (
              messages.map((msg, index) => (
                <div
                  key={index}
                  className={`flex ${
                    msg.type === "human" ? "justify-end" : "justify-start"
                  } fade-in`}
                >
                  <div
                    className={`flex items-end ${
                      msg.type === "human" ? "flex-row-reverse" : "flex-row"
                    } space-x-2`}
                  >
                    <div
                      className={`w-8 h-8 mx-2 rounded-full flex items-center justify-center text-xs ${
                        msg.type === "human" ? "bg-purple-500" : "bg-blue-500"
                      }`}
                    >
                      {msg.type === "human" ? "You" : "AI"}
                    </div>
                    <div
                      className={`max-w-[80%] bg-gray-700 p-3 rounded-lg shadow-md`}
                    >
                      {msg.type === "human" ? (
                        <p className="text-sm leading-relaxed break-words">
                          {msg.content}
                        </p>
                      ) : (
                        <div
                          className="text-sm leading-relaxed break-words markdown-content"
                          dangerouslySetInnerHTML={{
                            __html: marked.parse(msg.content),
                          }}
                        />
                      )}
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
          <div ref={chatEndRef} />
        </div>
        <form onSubmit={handleSubmit} className="flex gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="input input-bordered flex-grow bg-gray-700 text-gray-100 focus:ring-2 focus:ring-purple-400 focus:border-transparent"
            placeholder="Ask a question..."
            disabled={isLoading}
          />
          <button
            type="submit"
            className="btn bg-purple-600 hover:bg-purple-700 text-white"
            disabled={isLoading}
          >
            {isLoading ? "Thinking..." : "Ask"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default App;
