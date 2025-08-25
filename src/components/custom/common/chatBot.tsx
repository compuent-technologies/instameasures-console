// src/components/chat/ChatBot.tsx
import { useState } from "react";
import { MessageCircle, X, Send } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Message {
    sender: "user" | "bot";
    text: string;
}

export default function ChatBot() {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState<Message[]>([
        { sender: "bot", text: "Hi 👋 How can I help you today?" },
    ]);
    const [input, setInput] = useState("");

    const toggleChat = () => setIsOpen(!isOpen);

    const handleSend = () => {
        if (!input.trim()) return;

        // Add user message
        const newMessage: Message = { sender: "user", text: input };
        setMessages((prev) => [...prev, newMessage]);

        // Fake bot response
        setTimeout(() => {
            setMessages((prev) => [
                ...prev,
                { sender: "bot", text: `You said: "${input}" 🤖` },
            ]);
        }, 600);

        setInput("");
    };

    return (
        <div>
            {/* Floating Button */}
            <Button
                onClick={toggleChat}
                size='icon'
                className="fixed bottom-6 right-6 bg-blue-600 hover:bg-blue-700 text-white p-4 rounded-full shadow-lg"
            >
                {isOpen ? <X size={24} /> : <MessageCircle size={24} />}
            </Button>

            {/* Chat Window */}
            {isOpen && (
                <div className="fixed bottom-20 right-6 w-80 h-96 bg-white shadow-2xl rounded-xl flex flex-col border border-gray-200">
                    {/* Header */}
                    <div className="p-3 bg-blue-600 text-white flex justify-between items-center rounded-t-xl">
                        <h3 className="font-semibold">Support Chat</h3>
                        <button onClick={toggleChat}>
                            <X size={18} />
                        </button>
                    </div>

                    {/* Messages */}
                    <div className="flex-1 overflow-y-auto p-3 space-y-2 text-sm">
                        {messages.map((msg, i) => (
                            <div
                                key={i}
                                className={`p-2 rounded-lg max-w-[75%] ${msg.sender === "user"
                                    ? "bg-blue-100 self-end ml-auto"
                                    : "bg-gray-100"
                                    }`}
                            >
                                {msg.text}
                            </div>
                        ))}
                    </div>

                    {/* Input */}
                    <div className="p-2 border-t flex items-center gap-2">
                        <input
                            type="text"
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            placeholder="Type a message..."
                            className="flex-1 px-3 py-2 border rounded-lg text-sm"
                            onKeyDown={(e) => e.key === "Enter" && handleSend()}
                        />
                        <button
                            onClick={handleSend}
                            className="bg-blue-600 text-white p-2 rounded-lg"
                        >
                            <Send size={16} />
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}
