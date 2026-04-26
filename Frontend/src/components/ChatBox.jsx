// ============================
// ChatBox.jsx
// ============================
import { useEffect, useRef } from "react";

function ChatBox({ messages }) {
  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [messages]);

  return (
    <div
      className="card border-0 shadow rounded-4 p-3 mb-3 flex-grow-1 overflow-auto"
      style={{ backgroundColor: "#f8f9fa" }}
    >
      {messages.map((msg, index) => (
        <div
          key={index}
          className={`d-flex mb-3 ${
            msg.role === "user"
              ? "justify-content-end"
              : "justify-content-start"
          }`}
        >
          <div
            className={`p-3 rounded-4 shadow-sm ${
              msg.role === "user"
                ? "bg-primary text-white"
                : "bg-white"
            }`}
            style={{
              maxWidth: "75%",
            }}
          >
            {msg.text}
          </div>
        </div>
      ))}

      <div ref={bottomRef}></div>
    </div>
  );
}

export default ChatBox;