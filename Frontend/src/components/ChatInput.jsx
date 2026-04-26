// ============================
// ChatInput.jsx
// ============================
import { useState } from "react";

function ChatInput({ onSend }) {
  const [input, setInput] = useState("");

  const handleSend = () => {
    if (!input.trim()) return;

    onSend(input);
    setInput("");
  };

  return (
    <div className="card border-0 shadow rounded-4 p-3">
      <div className="input-group">
        <input
          type="text"
          className="form-control rounded-start-pill"
          placeholder="Ask something from your notes..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") handleSend();
          }}
        />

        <button
          className="btn btn-dark rounded-end-pill px-4"
          onClick={handleSend}
        >
          Send
        </button>
      </div>
    </div>
  );
}

export default ChatInput;