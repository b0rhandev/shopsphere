"use client";

import { createContext, useCallback, useContext, useMemo, useState, type ReactNode } from "react";

interface ChatContextValue {
  isOpen: boolean;
  openChat: () => void;
  closeChat: () => void;
  toggleChat: () => void;
}

const ChatContext = createContext<ChatContextValue | null>(null);

export function ChatProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const openChat = useCallback(() => setIsOpen(true), []);
  const closeChat = useCallback(() => setIsOpen(false), []);
  const toggleChat = useCallback(() => setIsOpen((open) => !open), []);
  const value = useMemo(() => ({ isOpen, openChat, closeChat, toggleChat }), [isOpen, openChat, closeChat, toggleChat]);

  return <ChatContext.Provider value={value}>{children}</ChatContext.Provider>;
}

export function useChatContext() {
  const context = useContext(ChatContext);
  if (!context) throw new Error("ChatContext consumers must be rendered inside ChatProvider.");
  return context;
}
