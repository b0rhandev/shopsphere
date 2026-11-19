"use client";

import { useEffect, useRef } from "react";
import type { BotReply } from "../../lib/chatEngine";
import ChatProductMiniCard from "./ChatProductMiniCard";

export interface ChatMessage {
  id: number;
  role: "user" | "assistant";
  reply: BotReply;
}

function LatestOrderCard({ order }: { order: NonNullable<BotReply["latestOrder"]> }) {
  return (
    <div className="rounded-xl border border-purple-100 bg-white p-3 shadow-sm">
      <div className="flex items-center justify-between gap-2">
        <span className="text-[10px] font-semibold text-gray-500">سفارش {order.id}</span>
        <span className="rounded-full bg-purple-50 px-2 py-1 text-[10px] font-bold text-purple-700">{order.status}</span>
      </div>
      <p className="mt-2 text-xs font-bold leading-6 text-gray-800">{order.items.map((item) => `${item.name} (${item.quantity.toLocaleString("fa-IR")})`).join("، ")}</p>
      <div className="mt-2 flex flex-wrap justify-between gap-2 text-[10px] text-gray-500">
        <span>{order.timeLabel}</span>
        <span className="font-bold text-purple-800">{order.total.toLocaleString("fa-IR")} تومان</span>
      </div>
    </div>
  );
}

export default function ChatMessageList({
  messages,
  isTyping,
  onQuickReply,
}: {
  messages: ChatMessage[];
  isTyping: boolean;
  onQuickReply: (reply: string) => void;
}) {
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
  }, [messages, isTyping]);

  return (
    <div aria-live="polite" className="flex-1 space-y-4 overflow-y-auto px-4 py-4">
      {messages.map((message) => (
        <div className={`flex ${message.role === "user" ? "justify-start" : "justify-end"}`} key={message.id}>
          <div className={`max-w-[92%] space-y-2 ${message.role === "user" ? "items-start" : "items-end"}`}>
            <p className={`whitespace-pre-line rounded-2xl px-3.5 py-3 text-xs leading-6 shadow-sm ${
              message.role === "user" ? "rounded-bl-md bg-purple-600 text-white" : "rounded-br-md border border-gray-100 bg-white text-gray-700"
            }`}>{message.reply.text}</p>
            {message.role === "assistant" && message.reply.latestOrder && <LatestOrderCard order={message.reply.latestOrder} />}
            {message.role === "assistant" && message.reply.products?.map((product) => <ChatProductMiniCard key={product.id} product={product} />)}
            {message.role === "assistant" && message.reply.quickReplies && (
              <div className="flex flex-wrap justify-end gap-2 pt-1">
                {message.reply.quickReplies.map((reply) => (
                  <button className="rounded-full border border-purple-200 bg-white px-3 py-1.5 text-[10px] font-semibold text-purple-700 transition hover:border-purple-400 hover:bg-purple-50" key={reply} onClick={() => onQuickReply(reply)} type="button">
                    {reply}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      ))}
      {isTyping && (
        <div aria-label="دستیار در حال نوشتن پاسخ است" className="flex justify-end">
          <div className="flex items-center gap-1 rounded-2xl rounded-br-md border border-gray-100 bg-white px-4 py-3 shadow-sm">
            <span className="size-1.5 animate-bounce rounded-full bg-purple-400 [animation-delay:-0.2s]" />
            <span className="size-1.5 animate-bounce rounded-full bg-purple-500 [animation-delay:-0.1s]" />
            <span className="size-1.5 animate-bounce rounded-full bg-purple-600" />
          </div>
        </div>
      )}
      <div ref={endRef} />
    </div>
  );
}
