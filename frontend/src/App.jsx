import React, { useEffect } from "react";
import MainLayout from "./components/layout/Mainlayout";
import Chat from "./pages/Chat";
import { useChatStore } from "./store/chatStore";
import { useThemeStore } from "./store/themeStore";
const App = () => {
  const initializeChat = useChatStore((s) => s.initializeChat);
  const hasHydrated = useChatStore((s) => s.hasHydrated);

  useEffect(() => {
    if (hasHydrated) {
      initializeChat();
    }
  }, [hasHydrated, initializeChat]);

  const theme = useThemeStore((state) => state.theme);
  useEffect(() => {
    const root = document.documentElement;

    if (theme === "dark") {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
  }, [theme]);
  return (
    <MainLayout>
      {({ openSidebar }) => <Chat openSidebar={openSidebar} />}
    </MainLayout>
  );
};

export default App;
