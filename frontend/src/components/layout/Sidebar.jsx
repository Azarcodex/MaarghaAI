import { Plus, MessageSquare, History, X, Sparkles } from "lucide-react";
import { useChatStore } from "../../store/chatStore";

export default function Sidebar({ isOpen, onClose }) {
  const { chats, createNewChat, setActiveChat, activeChatId } = useChatStore();

  return (
    <>
      {/* Overlay: Using a softer blur instead of just a dark tint */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-background/60 backdrop-blur-sm z-40 lg:hidden transition-opacity"
          onClick={onClose}
        />
      )}

      <aside
        className={`
          fixed z-50 inset-y-0 left-0 w-72
          bg-card border-r border-border/50 p-6
          transform transition-all duration-300 ease-in-out
          ${isOpen ? "translate-x-0 shadow-2xl" : "-translate-x-full"}
          lg:translate-x-0 lg:static lg:shadow-none
          flex flex-col
        `}
      >
        {/* Logo & Mobile Close */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-2 group cursor-pointer">
            <div className="bg-primary p-1.5 rounded-lg rotate-3 group-hover:rotate-0 transition-transform">
              <Sparkles size={18} className="text-primary-foreground" />
            </div>
            <span className="text-xl font-bold tracking-tight">MaarghaAI</span>
          </div>

          <button
            onClick={onClose}
            className="lg:hidden p-1 hover:bg-secondary rounded-md"
          >
            <X size={20} />
          </button>
        </div>

        {/* New Chat Action: The "Hero" Button */}
        <button
          onClick={() => {
            createNewChat();
            onClose?.(); // safely close sidebar
          }}
          className="flex items-center justify-center gap-2 w-full bg-foreground text-background font-medium rounded-xl py-3 px-4 hover:opacity-90 active:scale-[0.98] transition-all mb-8 shadow-sm"
        >
          <Plus size={18} strokeWidth={2.5} />
          New Chat
        </button>

        {/* Navigation / History Label */}
        <div className="flex items-center gap-2 text-[11px] font-bold text-muted-foreground uppercase tracking-widest mb-4 px-1">
          <History size={12} />
          Recent Conversations
        </div>

        {/* Chat List Area */}
        <div className="flex-1 overflow-y-auto space-y-1 -mx-2 px-2">
          {chats.length === 0 ? (
            <div className="py-10 text-center space-y-2">
              <div className="bg-secondary/30 w-10 h-10 rounded-full flex items-center justify-center mx-auto opacity-50">
                <MessageSquare size={16} />
              </div>
              <p className="text-xs text-muted-foreground italic px-4">
                Your chat history will appear here.
              </p>
            </div>
          ) : (
            chats.map((chat) => (
              <button
                key={chat.id}
                onClick={() => {
                  setActiveChat(chat.id);
                  onClose?.();
                }}
                className={`w-full text-left p-3 rounded-lg text-sm truncate transition-colors ${
                  activeChatId === chat.id
                    ? "bg-secondary"
                    : "hover:bg-secondary/50"
                }`}
              >
                {chat.title}
              </button>
            ))
          )}
        </div>

        {/* Footer Sidebar Area (Settings, Profile, etc.) */}
        <div className="pt-4 border-t border-border/50">
          <div className="flex items-center gap-3 p-2 rounded-xl hover:bg-secondary/50 cursor-pointer transition-colors">
            <div className="h-8 w-8 rounded-full bg-gradient-to-tr from-primary to-blue-400" />
            <div className="flex flex-col min-w-0">
              <span className="text-sm font-medium truncate">Guest User</span>
              <span className="text-[10px] text-muted-foreground uppercase tracking-tighter">
                Free Plan
              </span>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}
