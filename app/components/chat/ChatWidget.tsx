"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import { usePathname } from "next/navigation";
import { useChatContext } from "../../context/ChatContext";
import { useShopContext } from "../../context/ShopContext";
import { generateBotReply } from "../../lib/chatEngine";
import ChatMessageList, { type ChatMessage } from "./ChatMessageList";

const welcomeMessage: ChatMessage = {
  id: 0,
  role: "assistant",
  reply: {
    text: "سلام، من دستیار هوشمند ShopSphere هستم. برای پیدا کردن محصول یا پیگیری سفارش، از گزینه‌های زیر شروع کنید.",
    quickReplies: ["محصولات زیر ۵ میلیون", "پیگیری سفارش من", "بیشترین تخفیف‌ها", "شرایط ارسال رایگان"],
  },
};

function ChatIcon({ close = false }: { close?: boolean }) {
  return close ? (
    <svg aria-hidden="true" className="size-5" fill="none" stroke="currentColor" strokeLinecap="round" strokeWidth="2" viewBox="0 0 24 24"><path d="m18 6-12 12M6 6l12 12" /></svg>
  ) : (
    <svg aria-hidden="true" className="size-6" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" viewBox="0 0 24 24"><path d="M21 11.5a8.4 8.4 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.4 8.4 0 0 1-3.8-.9L3 21l1.9-5.7a8.4 8.4 0 0 1-.9-3.8A8.5 8.5 0 0 1 8.7 4a8.4 8.4 0 0 1 3.8-.9h.5a8.5 8.5 0 0 1 8 8v.4Z" /><path d="M8 12h.01M12 12h.01M16 12h.01" /></svg>
  );
}

export default function ChatWidget() {
  const pathname = usePathname();
  const { isOpen, toggleChat, closeChat } = useChatContext();
  const { products, orders, cartCount } = useShopContext();
  const [messages, setMessages] = useState<ChatMessage[]>([welcomeMessage]);
  const [isTyping, setIsTyping] = useState(false);
  const [draft, setDraft] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const nextId = useRef(1);
  const normalizedPathname = pathname?.replace(/\.html\/?$/, "");
  const hidden = normalizedPathname === "/admin" || normalizedPathname?.startsWith("/admin/") === true;

  useEffect(() => {
    if (isOpen) inputRef.current?.focus();
  }, [isOpen]);

  async function sendMessage(value: string) {
    const text = value.trim();
    if (!text || isTyping) return;
    const userMessage: ChatMessage = { id: nextId.current++, role: "user", reply: { text } };
    setMessages((current) => [...current, userMessage]);
    setDraft("");
    setIsTyping(true);
    window.setTimeout(async () => {
      const reply = await generateBotReply(text, { products, orders, cartCount });
      setMessages((current) => [...current, { id: nextId.current++, role: "assistant", reply }]);
      setIsTyping(false);
    }, 400);
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    void sendMessage(draft);
  }

  if (hidden) return null;

  return (
    <div className="fixed bottom-5 left-5 z-[70]" dir="rtl">
      <section
        aria-label="دستیار هوشمند خرید ShopSphere"
        aria-modal="false"
        className={`absolute bottom-[4.5rem] left-0 flex h-[min(620px,calc(100dvh-120px))] w-[min(380px,calc(100vw-2.5rem))] origin-bottom-left flex-col overflow-hidden rounded-2xl border border-white/70 bg-white/90 shadow-[0_20px_70px_rgba(54,34,91,0.22)] backdrop-blur-xl transition duration-300 ${
          isOpen ? "translate-y-0 scale-100 opacity-100" : "pointer-events-none translate-y-4 scale-95 opacity-0"
        }`}
        inert={!isOpen}
        role="dialog"
      >
        <header className="flex items-center justify-between bg-gradient-to-l from-purple-700 to-violet-600 px-4 py-3.5 text-white">
          <div className="flex items-center gap-3">
            <span className="grid size-10 place-items-center rounded-xl border border-white/20 bg-white/15"><ChatIcon /></span>
            <div>
              <h2 className="text-sm font-black">دستیار خرید ShopSphere</h2>
              <p className="mt-1 flex items-center gap-1.5 text-[10px] text-purple-100"><span className="size-1.5 rounded-full bg-emerald-300" /> آماده راهنمایی شما</p>
            </div>
          </div>
          <button aria-label="بستن دستیار" className="grid size-9 place-items-center rounded-full text-white/80 transition hover:bg-white/15 hover:text-white" onClick={closeChat} type="button"><ChatIcon close /></button>
        </header>
        <ChatMessageList isTyping={isTyping} messages={messages} onQuickReply={(reply) => void sendMessage(reply)} />
        <form className="flex items-center gap-2 border-t border-gray-100 bg-white/90 p-3" onSubmit={handleSubmit}>
          <input
            aria-label="پیام خود را بنویسید"
            className="h-11 min-w-0 flex-1 rounded-xl border border-gray-200 bg-gray-50 px-3 text-xs text-gray-800 outline-none transition placeholder:text-gray-400 focus:border-purple-300 focus:bg-white focus:ring-2 focus:ring-purple-100"
            onChange={(event) => setDraft(event.target.value)}
            placeholder="مثلاً یک هدفون ارزان پیشنهاد بده..."
            ref={inputRef}
            value={draft}
          />
          <button aria-label="ارسال پیام" className="grid size-11 shrink-0 place-items-center rounded-xl bg-purple-600 text-white shadow-sm transition hover:bg-purple-700 disabled:cursor-not-allowed disabled:opacity-50" disabled={!draft.trim() || isTyping} type="submit">
            <svg aria-hidden="true" className="size-5 -rotate-90" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" viewBox="0 0 24 24"><path d="m22 2-7 20-4-9-9-4Z" /><path d="M22 2 11 13" /></svg>
          </button>
        </form>
      </section>
      <button
        aria-expanded={isOpen}
        aria-label={isOpen ? "بستن دستیار خرید" : "گفتگو با دستیار خرید"}
        className="relative grid size-14 place-items-center rounded-full bg-gradient-to-br from-purple-600 to-violet-700 text-white shadow-[0_10px_28px_rgba(109,40,217,0.35)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_14px_32px_rgba(109,40,217,0.42)] focus:outline-none focus:ring-4 focus:ring-purple-200"
        onClick={toggleChat}
        type="button"
      >
        <ChatIcon close={isOpen} />
        {!isOpen && <span aria-label="دستیار آنلاین" className="absolute right-0.5 top-0.5 size-3 rounded-full border-2 border-white bg-emerald-400" />}
      </button>
    </div>
  );
}
