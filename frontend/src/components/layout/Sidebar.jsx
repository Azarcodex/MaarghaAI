import {
  Plus,
  MessageSquare,
  History,
  X,
  Sparkles,
  Trash2,
  MoreVertical,
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
      {/* Overlay: Softer backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-background/80 backdrop-blur-md z-40 lg:hidden transition-all duration-300"
          onClick={onClose}
        />
      )}

      <aside
        className={`
          fixed z-50 inset-y-0 left-0 w-72
          bg-card border-r border-border/40 p-5
          transform transition-all duration-500 cubic-bezier(0.4, 0, 0.2, 1)
          ${isOpen ? "translate-x-0 shadow-2xl" : "-translate-x-full"}
          lg:translate-x-0 lg:static lg:shadow-none
          flex flex-col
        `}
      >
        {/* Header: Brand Identity */}
        <div className="flex items-center justify-between mb-8 px-2">
          <div className="flex items-center gap-2.5 group cursor-pointer">
            <div className="bg-primary shadow-lg shadow-primary/20 p-2 rounded-xl transition-transform group-hover:scale-110">
              <Sparkles size={18} className="text-primary-foreground" />
            </div>
            <span className="text-lg font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-br from-foreground to-foreground/70">
              MaarghaAI
            </span>
          </div>

          <button
            onClick={onClose}
            className="lg:hidden p-2 hover:bg-secondary rounded-full transition-colors"
          >
            <X size={18} />
          </button>
        </div>

        {/* Primary Action */}
        <button
          onClick={() => {
            createNewChat();
            onClose?.();
          }}
          className="group flex items-center justify-center gap-2 w-full bg-foreground text-background font-semibold rounded-2xl py-3.5 px-4 hover:opacity-90 active:scale-95 transition-all mb-8 shadow-md shadow-foreground/5"
        >
          <Plus
            size={18}
            strokeWidth={3}
            className="group-hover:rotate-90 transition-transform duration-300"
          />
          New Chat
        </button>

        {/* Section Header */}
        <div className="flex items-center justify-between mb-4 px-2">
          <div className="flex items-center gap-2 text-[10px] font-bold text-muted-foreground/60 uppercase tracking-[0.15em]">
            <History size={12} />
            History
          </div>
          {chats.length > 0 && (
            <button
              onClick={clearAllChats}
              className="text-[10px] text-muted-foreground hover:text-destructive transition-colors px-2 py-1 rounded-md hover:bg-destructive/5"
            >
              Clear All
            </button>
          )}
        </div>

        {/* Chat List: Smooth scrolling and glass items */}
        <div className="flex-1 overflow-y-auto space-y-1.5 -mx-2 px-2 scrollbar-hide">
          {chats.length === 0 ? (
            <div className="py-12 text-center">
              <div className="inline-flex p-3 rounded-full bg-secondary/20 mb-3">
                <MessageSquare size={20} className="text-muted-foreground/30" />
              </div>
              <p className="text-xs text-muted-foreground/50 px-6 font-medium leading-relaxed">
                Your creative journey starts here.
              </p>
            </div>
          ) : (
            chats.map((chat) => (
              <div
                key={chat.id}
                className={`group relative flex items-center w-full rounded-xl text-sm transition-all duration-200 border border-transparent ${
                  activeChatId === chat.id
                    ? "bg-secondary border-border/50 shadow-sm"
                    : "hover:bg-secondary/40 hover:border-border/20"
                }`}
              >
                <button
                  onClick={() => {
                    setActiveChat(chat.id);
                    onClose?.();
                  }}
                  className={`flex-1 text-left py-3 px-4 truncate font-medium ${
                    activeChatId === chat.id
                      ? "text-foreground"
                      : "text-muted-foreground"
                  }`}
                >
                  {chat.title}
                </button>

                <div className="flex items-center pr-2">
                  <button
                    onClick={() => deleteChat(chat.id)}
                    className={`p-1.5 hover:bg-destructive/10 hover:text-destructive rounded-lg transition-all duration-200 ${
                      activeChatId === chat.id
                        ? "opacity-100"
                        : "opacity-0 group-hover:opacity-100"
                    }`}
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer: Profile and Plan */}
        <div className="mt-auto pt-6 border-t border-border/40">
          <div className="flex items-center gap-3 p-3 rounded-2xl hover:bg-secondary/60 cursor-pointer transition-all border border-transparent hover:border-border/30 group">
            <div className="relative">
              <div className="h-9 w-9 rounded-full bg-gradient-to-tr from-primary/80 to-blue-400 p-[2px]">
                <div className="h-full w-full rounded-full bg-card flex items-center justify-center overflow-hidden">
                  <div className="bg-primary/10 w-full h-full flex items-center justify-center font-bold text-primary">
                    GU
                  </div>
                </div>
              </div>
              <div className="absolute bottom-0 right-0 h-2.5 w-2.5 bg-green-500 border-2 border-card rounded-full" />
            </div>

            <div className="flex flex-col min-w-0 flex-1">
              <span className="text-sm font-semibold truncate group-hover:text-primary transition-colors">
                Guest User
              </span>
              <span className="text-[10px] text-muted-foreground font-bold uppercase tracking-wider">
                Free Plan
              </span>
            </div>
            <MoreVertical
              size={14}
              className="text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity"
            />
          </div>
        </div>
      </aside>
    </>
  );
}
