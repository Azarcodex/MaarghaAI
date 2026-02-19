import {
  Plus,
  MessageSquare,
  Search,
  X,
  Sparkles,
  Trash2,
  Settings,
  Calendar,
} from "lucide-react";
import { useChatStore } from "../../store/chatStore";
import { useState } from "react";

export default function Sidebar({ isOpen, onClose }) {
  const { chats, createNewChat, setActiveChat, activeChatId, deleteChat } =
    useChatStore();
  const [searchOpen, setSearchOpen] = useState(false);

  return (
    <>
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
        {/* Logo Section */}
        <div className="flex items-center justify-between mb-8 px-2">
          <div className="flex items-center gap-2.5 group cursor-pointer">
            <div className="bg-primary/10 p-2 rounded-xl group-hover:bg-primary/20 transition-colors">
              <Sparkles size={20} className="text-primary" />
            </div>
            <span className="text-lg font-bold tracking-tight">MaarghaAI</span>
          </div>
          <button
            onClick={onClose}
            className="lg:hidden p-2 hover:bg-secondary rounded-full transition-colors"
          >
            <X size={18} />
          </button>
        </div>

        {/* Action Button */}
        <button
          onClick={() => {
            createNewChat();
            onClose?.();
          }}
          className="group flex items-center justify-center gap-2 w-full bg-foreground text-background font-semibold rounded-2xl py-3 px-4 hover:opacity-90 active:scale-95 transition-all mb-6 shadow-md"
        >
          <Plus
            size={18}
            strokeWidth={3}
            className="group-hover:rotate-90 transition-transform duration-300"
          />
          New Chat
        </button>

        {/* Header with Search Toggle */}
        <div className="flex items-center justify-between mb-4 px-2">
          {searchOpen ? (
            <div className="flex items-center w-full bg-secondary/50 rounded-lg px-2 py-1 transition-all">
              <Search size={14} className="text-muted-foreground ml-1" />
              <input
                autoFocus
                placeholder="Find chat..."
                className="bg-transparent border-none focus:ring-0 text-xs w-full py-1 px-2"
                onBlur={() => setSearchOpen(false)}
              />
            </div>
          ) : (
            <>
              <div className="flex items-center gap-2 text-[10px] font-bold text-muted-foreground/60 uppercase tracking-[0.15em]">
                <Calendar size={12} />
                Recent
              </div>
              <button
                onClick={() => setSearchOpen(true)}
                className="p-1.5 hover:bg-secondary rounded-lg text-muted-foreground transition-colors"
              >
                <Search size={14} />
              </button>
            </>
          )}
        </div>

        {/* Chat List */}
        <div className="flex-1 overflow-y-auto space-y-1 -mx-2 px-2 scrollbar-hide">
          {chats.length === 0 ? (
            <div className="py-12 text-center opacity-40">
              <MessageSquare size={24} className="mx-auto mb-2" />
              <p className="text-xs italic">No threads yet</p>
            </div>
          ) : (
            chats.map((chat) => (
              <div
                key={chat.id}
                className={`group flex items-center gap-3 w-full rounded-xl text-sm transition-all duration-200 px-3 py-2.5 ${
                  activeChatId === chat.id
                    ? "bg-secondary text-foreground"
                    : "text-muted-foreground hover:bg-secondary/40 hover:text-foreground"
                }`}
              >
                <MessageSquare
                  size={16}
                  className={
                    activeChatId === chat.id ? "text-primary" : "opacity-50"
                  }
                />
                <button
                  onClick={() => {
                    setActiveChat(chat.id);
                    onClose?.();
                  }}
                  className="flex-1 text-left truncate font-medium"
                >
                  {chat.title}
                </button>
                <button
                  onClick={() => deleteChat(chat.id)}
                  className={`p-1 hover:text-destructive transition-opacity ${
                    activeChatId === chat.id
                      ? "opacity-100"
                      : "opacity-0 group-hover:opacity-100"
                  }`}
                >
                  <Trash2 size={14} />
                </button>
              </div>
            ))
          )}
        </div>

        {/* User & Settings Footer */}
        <div className="mt-auto pt-4 flex items-center gap-2">
          <div className="flex-1 flex items-center gap-3 p-2 rounded-xl bg-secondary/30 border border-border/20">
            <div className="h-8 w-8 rounded-lg bg-primary/20 flex items-center justify-center font-bold text-primary text-xs">
              GU
            </div>
            <div className="flex flex-col min-w-0">
              <span className="text-xs font-semibold truncate">
                Guest Account
              </span>
              {/* <span className="text-[9px] text-muted-foreground uppercase">
                Pro Version →
              </span> */}
            </div>
          </div>
          <button className="p-3 hover:bg-secondary rounded-xl transition-colors text-muted-foreground hover:text-foreground border border-transparent hover:border-border/50">
            <Settings size={18} />
          </button>
        </div>
      </aside>
    </>
  );
}
