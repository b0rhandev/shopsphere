"use client";

import type { ReactNode } from "react";
import { useChatContext } from "../../context/ChatContext";

export default function ChatContactCard({ children, className }: { children: ReactNode; className: string }) {
  const { openChat } = useChatContext();
  return <button className={`${className} w-full cursor-pointer text-right`} onClick={openChat} type="button">{children}</button>;
}
