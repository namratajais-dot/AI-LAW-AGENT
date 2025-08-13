import React, { useState, useRef, useEffect } from "react";
import { RiRobot2Fill } from "react-icons/ri";
import { FaUser } from "react-icons/fa6";
import { BsSendFill } from "react-icons/bs";
import { FaSpinner } from "react-icons/fa";
import ReactMarkdown from "react-markdown";

const Chat = () => {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(scrollToBottom, [messages]);

  const handleSendMessage = async () => {
    if (input.trim() === "") return;

    const userMessage = { role: "user", content: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    try {
      const legalAdvisorPrompt = `
        You are JusticeBot, an AI assistant trained to provide general legal information based on Indian laws. You are not a lawyer and do not provide legal representation.

🧠 OBJECTIVE:
- Understand the user's legal question or situation.
- Provide helpful, concise, and context-aware guidance under Indian law.
- Use the user's language and maintain a respectful, non-biased tone.

🧾 WHEN ANSWERING:
- Start by identifying the legal issue (e.g. harassment, land dispute, cybercrime).
- If an incident is reported, ask for the **location (state/district/city)** to give region-specific steps.
- Provide **required documents** or **procedural steps** when relevant.
- Only draft templates (e.g. complaint letters, affidavits) if the user explicitly asks.
- Share where to file or report issues (e.g. police station, helpline) only when asked.
- Keep answers **clear and beginner-friendly**.
- End each reply with 1-2 **suggested follow-up questions** to guide the user.

📌 STYLE:
- Always remain neutral, avoid assumptions (gender, status, guilt).
- Respond in the **same language** as the user.
- Prefer short bullet points or paragraphs for clarity.
responses concise but useful. Avoid overwhelming the user. At the end of each response, suggest follow-up questions the user might ask to move forward.
      `;

      const chatHistory = [
        { role: "model", parts: [{ text: legalAdvisorPrompt }] },
        ...messages.map((msg) => ({
          role: msg.role === "user" ? "user" : "model",
          parts: [{ text: msg.content }],
        })),
        { role: "user", parts: [{ text: input }] },
      ];

      const payload = { contents: chatHistory };

      const apiKey = import.meta.env.VITE_API_KEY;
      const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-05-20:generateContent?key=${apiKey}`;

      const res = await fetch(apiUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const result = await res.json();
      const answer =
        result?.candidates?.[0]?.content?.parts?.[0]?.text ||
        "Sorry, I couldn't respond right now. Try again later.";

      setMessages((prev) => [...prev, { role: "assistant", content: answer }]);
    } catch (err) {
      console.error(err);
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content:
            "An error occurred. Please check your connection and try again.",
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="flex flex-col h-screen bg-black text-gray-800">
      {/* Header */}
      <div className="p-4 bg-blue-950 text-white font-bold text-5xl text-center shadow">
        AI LAW AGENT
      </div>

      {/* Messages Area */}
      <div
        className="flex-1 overflow-y-auto px-4 py-6 space-y-4 bg-gray-400"
      >
        {messages.length === 0 && !isLoading && (
          <div className="flex flex-col items-center justify-center text-center h-screen  text-white">
            <RiRobot2Fill size={64}  />
            <p>Ask your legal questions below.</p>
          </div>
        )}

        {messages.map((msg, i) => (
          <div
            key={i}
            className={`flex ${
              msg.role === "user" ? "justify-end" : "justify-start"
            }`}
          >
            {msg.role === "assistant" && (
              <div className="mr-2 mt-1 text-blue-900">
                <RiRobot2Fill />
              </div>
            )}
            <div
              className={`rounded-lg px-4 py-2 max-w-sm md:max-w-md lg:max-w-lg text-sm whitespace-pre-line ${
                msg.role === "user" ? "bg-blue-100 text-right" : "bg-gray-100"
              }`}
            >
              <ReactMarkdown>{msg.content}</ReactMarkdown>
            </div>
            {msg.role === "user" && (
              <div className="ml-2 mt-1 text-gray-700">
                <FaUser />
              </div>
            )}
          </div>
        ))}

        {isLoading && (
          <div className="flex items-center text-gray-500 space-x-2">
            <RiRobot2Fill />
            <FaSpinner className="animate-spin" />
            <span>Typing...</span>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="p-4 font-bold border-t flex items-center bg-neutral-500 text-black">
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="ASK YOUR LEGAL QUESTIONS HERE..."
          rows={1}
          className="flex-1 border bg-white border-gray-300 rounded-md px-4 py-2 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          onClick={handleSendMessage}
          disabled={isLoading}
          className="ml-2 p-3 text-black font-bold hover:text-blue-900 transition"
        >
          <BsSendFill size={20} />
        </button>
      </div>
    </div>
  );
};

export default Chat;