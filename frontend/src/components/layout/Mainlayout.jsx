import { useState } from "react";
import Sidebar from "./Sidebar";

export default function MainLayout({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="h-screen flex bg-bg text-text overflow-hidden">
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      <main className="flex-1 flex flex-col">
        {children({
          openSidebar: () => setSidebarOpen(true),
        })}
      </main>
    </div>
  );
}
