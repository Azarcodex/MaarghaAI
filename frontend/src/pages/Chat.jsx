import { Send, Plus, Menu, Bot, User, Sparkles } from "lucide-react";
import ThemeToggle from "../components/ui/themeToggle.jsx";
import { sendMessage } from "../services/chatService.js";
import ReactMarkdown from "react-markdown";
import { useEffect, useState, useRef } from "react";
import { useChatStore } from "../store/chatStore";
import { useThemeStore } from "../store/themeStore.js";

export default function Chat({ openSidebar }) {
  const theme = useThemeStore((state) => state.theme);
  const [question, setQuestion] = useState("");
  const { chats, activeChatId, addMessage, createNewChat } = useChatStore();
  const messagesEndRef = useRef(null);

  const activeChat = chats.find((c) => c.id === activeChatId);
  const messages = activeChat?.messages || [];
  const [loading, setLoading] = useState(false);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, loading]);

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
    <div className="flex flex-col h-full bg-background transition-colors duration-500 overflow-hidden">
      {/* Header */}
      <header className="h-16 border-b border-border/40 flex items-center justify-between px-4 lg:px-8 glass sticky top-0 z-20">
        <div className="flex items-center gap-4">
          <button
            onClick={openSidebar}
            className="lg:hidden p-2.5 rounded-xl hover:bg-muted transition-all active:scale-90 border border-border/50"
          >
            <Menu size={20} />
          </button>

          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary group transition-all hover:bg-primary hover:text-primary-foreground">
              <Bot size={22} className="group-hover:scale-110 transition-transform" />
            </div>
            <div className="flex flex-col">
              <span className="font-bold text-sm tracking-tight">Maargha Intelligence</span>
              <div className="flex items-center gap-1.5 self-start">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                </span>
                <span className="text-[10px] font-bold text-green-500 uppercase tracking-tighter">System Active</span>
              </div>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <ThemeToggle />
        </div>
      </header>

      {/* Main Content Area */}
      <div className="flex-1 overflow-y-auto relative scroll-smooth custom-scrollbar">
        {!activeChatId ? (
          <div className="flex h-full items-center justify-center p-6">
            <div className="text-center space-y-8 max-w-lg animate-float">
              <div className="bg-primary/5 w-24 h-24 rounded-[2.5rem] flex items-center justify-center mx-auto border border-primary/10 shadow-inner">
                <Sparkles size={48} className="text-primary" />
              </div>
              <div className="space-y-3">
                <h2 className="text-3xl font-black tracking-tighter sm:text-4xl">
                  Ready to assist you
                </h2>
                <p className="text-muted-foreground leading-relaxed text-sm sm:text-base">
                  Unlock the full potential of AI. Start a new conversation to explore ideas, get answers, or solve complex problems.
                </p>
              </div>

              <button
                onClick={createNewChat}
                className="inline-flex items-center gap-3 px-8 py-4 rounded-2xl bg-primary text-primary-foreground font-bold hover:brightness-110 hover:shadow-[0_0_30px_rgba(37,99,235,0.3)] active:scale-95 transition-all group"
              >
                <Plus size={20} className="group-hover:rotate-90 transition-transform duration-300" />
                Initialize New Session
              </button>
            </div>
          </div>
        ) : messages.length === 0 ? (
          <div className="flex h-full flex-col items-center justify-center p-6 space-y-12">
            <div className="text-center space-y-6 max-w-2xl">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 text-primary text-[10px] font-bold uppercase tracking-widest border border-primary/20">
                <Sparkles size={12} />
                Next Generation AI
              </div>
              <h1 className="text-4xl sm:text-5xl font-black tracking-tighter bg-linear-to-b from-foreground to-foreground/50 bg-clip-text text-transparent">
                How can I help you today?
              </h1>
              <p className="text-muted-foreground max-w-md mx-auto leading-relaxed">
                I'm your versatile AI companion, ready to assist with coding, creative writing, analysis, or just a friendly chat.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full max-w-2xl">
              {[
                { title: "Explain Code", desc: "Break down complex algorithms", cmd: "Explain this React component..." },
                { title: "Content Ideas", desc: "Brainstorm creative topics", cmd: "Give me 5 blog post ideas about AI..." },
              ].map((item, i) => (
                <button
                  key={i}
                  onClick={() => setQuestion(item.cmd)}
                  className="p-5 rounded-2xl bg-card border border-border/40 text-left hover:border-primary/40 hover:bg-primary/5 transition-all group"
                >
                  <div className="font-bold text-sm group-hover:text-primary transition-colors">{item.title}</div>
                  <div className="text-xs text-muted-foreground mt-1">{item.desc}</div>
                </button>
              ))}
            </div>
          </div>
        ) : (
          <div className="max-w-4xl mx-auto w-full p-4 lg:p-8 space-y-8">
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`flex gap-4 group animate-in slide-in-from-bottom-2 duration-500 fade-in ${msg.role === "user" ? "flex-row-reverse" : "flex-row"
                  }`}
              >
                <div className={`h-10 w-10 shrink-0 rounded-xl flex items-center justify-center shadow-sm ${msg.role === "user"
                  ? "bg-primary text-primary-foreground order-last"
                  : "bg-secondary border border-border text-foreground"
                  }`}>
                  {msg.role === "user" ? <User size={18} /> : <Bot size={18} />}
                </div>

                <div className={`flex flex-col max-w-[85%] ${msg.role === "user" ? "items-end" : "items-start"}`}>
                  <div className={`px-5 py-4 rounded-2xl text-[15px] leading-relaxed shadow-sm ${msg.role === "user"
                    ? "bg-primary text-primary-foreground rounded-tr-none"
                    : "white-glass text-foreground border border-border/40 rounded-tl-none bg-card/50"
                    }`}>
                    <ReactMarkdown
                      className="prose dark:prose-invert max-w-none prose-p:leading-relaxed prose-pre:bg-muted/50 prose-pre:border prose-pre:border-border/40 prose-pre:p-4 prose-pre:rounded-xl"
                    >
                      {msg.text}
                    </ReactMarkdown>
                  </div>
                  <span className="text-[10px] mt-2 font-bold uppercase tracking-widest text-muted-foreground/50 opacity-0 group-hover:opacity-100 transition-opacity">
                    {msg.role === "user" ? "You" : "MaarghaAI"}
                  </span>
                </div>
              </div>
            ))}

            {loading && (
              <div className="flex gap-4 animate-pulse">
                <div className="h-10 w-10 rounded-xl bg-secondary flex items-center justify-center text-muted-foreground">
                  <Bot size={18} />
                </div>
                <div className="bg-card/30 border border-border/40 px-6 py-4 rounded-2xl rounded-tl-none">
                  <div className="flex gap-1.5 items-center">
                    <div className="h-1.5 w-1.5 rounded-full bg-primary/40 animate-bounce" style={{ animationDelay: '0s' }}></div>
                    <div className="h-1.5 w-1.5 rounded-full bg-primary/40 animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                    <div className="h-1.5 w-1.5 rounded-full bg-primary/40 animate-bounce" style={{ animationDelay: '0.4s' }}></div>
                    <span className="ml-2 text-xs font-medium text-muted-foreground tracking-tight">AI is crafting a response...</span>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} className="h-4" />
          </div>
        )}
      </div>

      <footer className="p-4 lg:p-8 bg-linear-to-t from-background via-background to-transparent relative z-20">
        <div className="max-w-4xl mx-auto relative group">
          <div className="absolute -inset-1 bg-linear-to-r from-primary/20 via-blue-500/10 to-indigo-500/20 rounded-4xl blur-xl opacity-0 group-focus-within:opacity-100 transition-opacity duration-500 lg:block hidden" />

          <div className="relative glass border border-border/60 rounded-[1.75rem] shadow-2xl overflow-hidden transition-all duration-300 group-focus-within:border-primary/40 group-focus-within:shadow-primary/5">
            <div className="flex items-end gap-2 p-2">
              <textarea
                rows="1"
                placeholder={activeChatId ? "Type your message..." : "Initialize a session to start"}
                value={question}
                onChange={(e) => {
                  setQuestion(e.target.value);
                  e.target.style.height = 'inherit';
                  e.target.style.height = `${e.target.scrollHeight}px`;
                }}
                disabled={!activeChatId}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault();
                    handleSend();
                  }
                }}
                className="flex-1 bg-transparent border-none outline-none resize-none py-4 px-5 text-[15px] leading-relaxed placeholder:text-muted-foreground/60 max-h-48 custom-scrollbar"
              />

              <div className="flex items-center gap-2 pr-2 pb-2">
                <button
                  onClick={handleSend}
                  disabled={loading || !activeChatId || !question.trim()}
                  className={`h-11 w-11 rounded-2xl flex items-center justify-center transition-all duration-300 font-bold
                    ${activeChatId && question.trim() && !loading
                      ? "bg-primary text-primary-foreground shadow-lg shadow-primary/25 hover:scale-105 active:scale-95"
                      : "bg-muted text-muted-foreground cursor-not-allowed opacity-50"
                    }
                  `}
                >
                  <Send size={20} strokeWidth={2.5} className={`${loading ? 'animate-pulse' : ''}`} />
                </button>
              </div>
            </div>
          </div>

          <p className="text-[10px] text-center mt-3 text-muted-foreground font-medium uppercase tracking-[0.2em] opacity-60">
            Powered by MaarghaAI Engine • Intelligence Redefined
          </p>
        </div>
      </footer>
    </div>
  );
}

