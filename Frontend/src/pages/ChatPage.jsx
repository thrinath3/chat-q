// ============================
// ChatPage.jsx
// ============================
import { useState, useEffect } from "react";
import API from "../services/api";
import ChatBox from "../components/ChatBox";
import ChatInput from "../components/ChatInput";

function ChatPage() {
  const [messages, setMessages] = useState(() => {
    const saved = localStorage.getItem("chat_history");
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem("chat_history", JSON.stringify(messages));
  }, [messages]);

  const sendMessage = async (question) => {
    if (!question.trim()) return;

    const userMessage = { role: "user", text: question };
    setMessages((prev) => [...prev, userMessage]);

    try {
      const res = await API.post("/chat", { question });

      const botMessage = {
        role: "bot",
        text: res.data.answer,
      };

      setMessages((prev) => [...prev, botMessage]);
    } catch (err) {
      console.error(err);
    }
  };

  const resetChat = () => {
    setMessages([]);
    localStorage.removeItem("chat_history");
  };

  return (
    <div
      className="container-fluid vh-100 d-flex flex-column p-0"
      style={{
        background: "linear-gradient(135deg,#141e30,#243b55)",
      }}
    >
      <nav className="navbar navbar-dark bg-dark px-4 shadow">
        <span className="navbar-brand fw-bold">
          🤖 Notes AI Assistant
        </span>

        <button
          className="btn btn-danger btn-sm rounded-pill"
          onClick={resetChat}
        >
          Reset Chat
        </button>
      </nav>

      <div className="container flex-grow-1 d-flex flex-column py-3">
        <ChatBox messages={messages} />
        <ChatInput onSend={sendMessage} />
      </div>
    </div>
  );
}

export default ChatPage;