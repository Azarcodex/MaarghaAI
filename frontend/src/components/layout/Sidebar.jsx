import {
  Plus,
  MessageSquare,
  History,
  X,
  Sparkles,
  Trash2,
  Settings,
  User,
} from "lucide-react";
import { useChatStore } from "../../store/chatStore";

export default function Sidebar({ isOpen, onClose }) {
  const {
    chats,
    createNewChat,
    setActiveChat,
    activeChatId,
    deleteChat,
    clearAllChats,
  } = useChatStore();

  return (
    <>
      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-background/80 backdrop-blur-md z-40 lg:hidden transition-all duration-300"
          onClick={onClose}
        />
      )}

      <aside
        className={`
          fixed z-50 inset-y-0 left-0 w-80
          bg-card border-r border-border/40 p-6
          transform transition-all duration-500 ease-in-out
          ${isOpen ? "translate-x-0 shadow-2xl" : "-translate-x-full"}
          lg:translate-x-0 lg:static lg:shadow-none
          flex flex-col h-full
        `}
      >
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3 group cursor-pointer">
            <div className="bg-primary/10 p-2 rounded-xl group-hover:bg-primary group-hover:scale-110 transition-all duration-300">
              <Sparkles size={20} className="text-primary group-hover:text-primary-foreground" />
            </div>
            <span className="text-xl font-bold tracking-tight bg-clip-text text-transparent bg-linear-to-r from-foreground to-foreground/70">
              MaarghaAI
            </span>
          </div>

          <button
            onClick={onClose}
            className="lg:hidden p-2 hover:bg-muted rounded-full transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        {/* New Chat Button */}
        <button
          onClick={() => {
            createNewChat();
            onClose?.();
          }}
          className="flex items-center justify-center gap-2 w-full bg-primary text-primary-foreground font-semibold rounded-2xl py-3.5 px-4 hover:brightness-110 hover:shadow-lg hover:shadow-primary/20 active:scale-[0.98] transition-all mb-8"
        >
          <Plus size={20} strokeWidth={2.5} />
          New Chat
        </button>

        {/* History Header */}
        <div className="flex items-center justify-between mb-4 px-2">
          <div className="flex items-center gap-2 text-xs font-bold text-muted-foreground uppercase tracking-widest">
            <History size={14} />
            Chat History
          </div>

          {chats.length > 0 && (
            <button
              onClick={clearAllChats}
              className="p-1.5 text-muted-foreground hover:text-destructive hover:bg-destructive/10 rounded-lg transition-all"
              title="Clear all chats"
            >
              <Trash2 size={14} />
            </button>
          )}
        </div>

        {/* Chat List */}
        <div className="flex-1 overflow-y-auto space-y-2 -mx-2 px-2 pb-4 h-[calc(100%-300px)]">
          {chats.length === 0 ? (
            <div className="py-12 text-center space-y-4 opacity-50">
              <div className="bg-muted w-14 h-14 rounded-3xl flex items-center justify-center mx-auto transition-transform hover:rotate-12">
                <MessageSquare size={24} className="text-muted-foreground" />
              </div>
              <p className="text-xs text-muted-foreground italic px-6 leading-relaxed">
                Your conversations will be saved here for quick access.
              </p>
            </div>
          ) : (
            chats.map((chat) => (
              <div
                key={chat.id}
                className={`group flex items-center gap-2 w-full p-3 rounded-xl text-sm transition-all duration-200 border border-transparent ${activeChatId === chat.id
                  ? "bg-secondary border-border/50 shadow-sm"
                  : "hover:bg-muted/50 hover:translate-x-1"
                  }`}
              >
                <button
                  onClick={() => {
                    setActiveChat(chat.id);
                    onClose?.();
                  }}
                  className={`flex-1 text-left truncate font-medium ${activeChatId === chat.id ? "text-foreground" : "text-muted-foreground group-hover:text-foreground"
                    }`}
                >
                  {chat.title}
                </button>

                <button
                  onClick={() => deleteChat(chat.id)}
                  className={`opacity-0 group-hover:opacity-100 p-1.5 hover:bg-destructive/20 hover:text-destructive rounded-lg transition-all duration-200 ${activeChatId === chat.id ? "opacity-100" : ""
                    }`}
                >
                  <Trash2 size={14} />
                </button>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        <div className="pt-6 border-t border-border/40 space-y-2">
          {/* <button className="flex items-center gap-3 w-full p-2.5 rounded-xl hover:bg-muted transition-all duration-200 group text-sm font-medium">
            <Settings size={18} className="text-muted-foreground group-hover:rotate-45 group-hover:text-foreground transition-all duration-500" />
            Settings
          </button> */}

          <div className="flex items-center gap-3 p-3 rounded-2xl bg-secondary/30 border border-border/20 backdrop-blur-sm transition-all hover:bg-secondary/50">
            <div className="h-10 w-10 rounded-xl bg-linear-to-br from-primary via-blue-500 to-indigo-600 flex items-center justify-center text-white shadow-lg">
              <User size={20} />
            </div>
            <div className="flex flex-col min-w-0">
              <span className="text-sm font-bold truncate">Premium User</span>
              <span className="text-[10px] text-primary font-bold uppercase tracking-wider">
                Pro Plan
              </span>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}

