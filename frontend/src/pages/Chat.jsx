import { Send, Plus, Command } from "lucide-react"; // Using Lucide for icons
import ThemeToggle from "../components/ui/themeToggle.jsx";
import { sendMessage } from "../services/chatService.js";
import ReactMarkdown from "react-markdown";
import { useEffect, useState } from "react";
import { useChatStore } from "../store/chatStore";
import { useThemeStore } from "../store/themeStore.js";

export default function Chat({ openSidebar }) {
  const theme = useThemeStore((state) => state.theme);
  const [question, setQuestion] = useState("");
  const { chats, activeChatId, addMessage, createNewChat, hasHydrated } =
    useChatStore();

  const activeChat = chats.find((c) => c.id === activeChatId);
  const messages = activeChat?.messages || [];

  const [loading, setLoading] = useState(false);

  const handleSend = async () => {
    if (!question.trim() || loading || !activeChatId) return;

    const userMessage = {
      role: "user",
      text: question,
    };

    addMessage(activeChatId, userMessage);
    setQuestion("");
    setLoading(true);

    try {
      const reply = await sendMessage(userMessage.text);

      const botMessage = {
        role: "bot",
        text: reply,
      };

      addMessage(activeChatId, botMessage);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-full bg-background transition-colors duration-300">
      {/* Header */}
      <header className="h-14 border-b border-border/60 flex items-center justify-between px-4 lg:px-6 backdrop-blur-md sticky top-0 z-10">
        <div className="flex items-center gap-3">
          <button
            onClick={openSidebar}
            className="lg:hidden p-2 rounded-lg hover:bg-accent transition-colors border border-border"
          >
            ☰
          </button>
          <div className="flex flex-col">
            <span className="font-semibold text-sm">Your AI Assistant </span>
            <span className="flex items-center gap-1.5 text-[10px] text-green-500">
              <span className="h-1.5 w-1.5 rounded-full bg-current" /> Online
            </span>
          </div>
        </div>

        <ThemeToggle />
      </header>

      {/* Messages area */}
      {/* Messages area */}
      {/* Messages area */}
      <div className="flex-1 overflow-y-auto p-6">
        {!activeChatId ? (
          // No chat exists
          <div className="flex h-full items-center justify-center">
            <div className="text-center space-y-6">
              <h2 className="text-2xl font-semibold text-foreground">
                Start a New Conversation
              </h2>

              <button
                onClick={createNewChat}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-primary text-primary-foreground font-medium hover:scale-105 active:scale-95 transition-all shadow-md"
              >
                <Plus size={18} />
                New Chat
              </button>
            </div>
          </div>
        ) : messages.length === 0 ? (
          // Chat exists but no messages yet
          <div className="flex h-full items-center justify-center">
            <div className="text-center space-y-3 max-w-md">
              <h2 className="text-2xl font-semibold text-foreground">
                Your AI Assistant
              </h2>
              <p className="text-muted-foreground text-sm">
                Ask me anything — code, ideas, explanations, or just say hello.
              </p>
            </div>
          </div>
        ) : (
          // Normal chat messages
          <>
            <div className="space-y-4">
              {messages.map((msg, index) => (
                <div
                  key={index}
                  className={`max-w-2xl p-4 rounded-xl ${
                    msg.role === "user"
                      ? "ml-auto bg-primary text-primary-foreground"
                      : "bg-surface border border-border"
                  }`}
                >
                  <ReactMarkdown>{msg.text}</ReactMarkdown>
                </div>
              ))}

              {loading && (
                <div className="max-w-2xl p-4 rounded-xl bg-surface border border-border text-muted-foreground">
                  MaarghaAI is thinking...
                </div>
              )}
            </div>
          </>
        )}
      </div>

      {/* Input area */}
      <div className="p-3 lg:p-6 max-w-4xl w-full mx-auto">
        <div
          className={`flex items-end gap-2 bg-surface rounded-[24px] p-2 transition-all duration-200 border-2 ${theme === "dark" ? "border-2 border-white" : "border-2 border-black"}`}
        >
          <textarea
            rows="1"
            placeholder={
              activeChatId ? "Ask anything..." : "Click 'New Chat' to start"
            }
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                handleSend();
              }
            }}
            className="flex-1 bg-transparent border-none outline-none resize-none py-3 px-4 text-[15px] leading-relaxed placeholder:text-text-muted"
          />

          <button
            onClick={handleSend}
            disabled={loading || !activeChatId}
            className={`flex items-center justify-center h-10 w-10 rounded-full transition-all
    ${
      activeChatId
        ? "bg-primary text-primary-foreground active:scale-95"
        : "bg-border text-text-muted blur-[1px] cursor-not-allowed"
    }
    disabled:opacity-50
  `}
            aria-label="Send message"
          >
            <Send size={18} strokeWidth={2.5} />
          </button>
        </div>

        <p className="text-[10px] text-center mt-3 text-muted-foreground">
          AI can make mistakes. Check important info.
        </p>
      </div>
    </div>
  );
}
