import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useChatStore = create(
  persist(
    (set, get) => ({
      chats: [],
      activeChatId: null,
      hasHydrated: false,

      setHasHydrated: (value) => set({ hasHydrated: value }),

      initializeChat: () => {
        const { chats } = get();
        if (chats.length === 0) {
          const newChat = {
            id: Date.now().toString(),
            title: "New Chat",
            messages: [],
          };

          set({
            chats: [newChat],
            activeChatId: newChat.id,
          });
        }
      },

      createNewChat: () =>
        set((state) => {
          const newChat = {
            id: Date.now().toString(),
            title: "New Chat",
            messages: [],
          };

          return {
            chats: [newChat, ...state.chats],
            activeChatId: newChat.id,
          };
        }),
      deleteChat: (chatId) =>
        set((state) => {
          const filteredChats = state.chats.filter(
            (chat) => chat.id !== chatId,
          );

          return {
            chats: filteredChats,
            activeChatId:
              state.activeChatId === chatId
                ? filteredChats[0]?.id || null
                : state.activeChatId,
          };
        }),

      clearAllChats: () =>
        set({
          chats: [],
          activeChatId: null,
        }),

      setActiveChat: (id) =>
        set({
          activeChatId: id,
        }),

      addMessage: (chatId, message) =>
        set((state) => ({
          chats: state.chats.map((chat) => {
            if (chat.id !== chatId) return chat;

            const updatedMessages = [...chat.messages, message];

            // Auto-set title from first user message
            let newTitle = chat.title;
            if (
              chat.title === "New Chat" &&
              message.role === "user" &&
              updatedMessages.length === 1
            ) {
              newTitle = message.text.slice(0, 30);
            }

            return {
              ...chat,
              title: newTitle,
              messages: updatedMessages,
            };
          }),
        })),
    }),

    {
      name: "maarghaai-storage",
      onRehydrateStorage: () => (state) => {
        state.setHasHydrated(true);
      },
    },
  ),
);
