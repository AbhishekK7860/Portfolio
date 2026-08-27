"use client";

import { FormEvent, useState, useRef, useEffect } from "react";
import { ChatCircleDots, PaperPlaneTilt, X, CircleNotch } from "@phosphor-icons/react";

type Message = { from: "assistant" | "visitor" | "error"; text: string };

const welcome: Message = {
  from: "assistant",
  text: "Hi — I’m Nemo, Abhishek’s portfolio assistant. Ask me about his AI focus, projects, skills, studies, or creative work.",
};

export function PersonalAssistant() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Message[]>([welcome]);
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isLoading]);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const question = input.trim();
    if (!question || isLoading) return;
    
    const newMessages = [...messages, { from: "visitor" as const, text: question }];
    setMessages(newMessages);
    setInput("");
    setIsLoading(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: newMessages.filter(m => m.from !== "error") }),
      });

      if (!response.ok) {
        throw new Error("API responded with an error");
      }

      const data = await response.json();
      if (data.error) {
        throw new Error(data.error);
      }

      setMessages((current) => [...current, { from: "assistant", text: data.reply }]);
    } catch (error) {
      setMessages((current) => [
        ...current, 
        { from: "error", text: "I'm having trouble connecting to my network right now. Please try again later." }
      ]);
    } finally {
      setIsLoading(false);
    }
  }

  if (!open) {
    return (
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="fixed bottom-5 right-5 z-50 inline-flex items-center gap-2 border border-cosmos/50 bg-[#0a0d1c] px-4 py-3 font-mono text-[10px] tracking-[0.18em] text-fg shadow-[0_0_30px_rgba(91,140,255,0.18)] transition-colors hover:border-accent hover:text-white"
        aria-label="Open Abhishek's portfolio assistant"
      >
        <ChatCircleDots size={18} weight="duotone" className="text-cosmos" />
        ASK NEMO
      </button>
    );
  }

  return (
    <section
      aria-label="Abhishek's portfolio assistant"
      className="fixed bottom-5 right-5 z-50 flex w-[min(23rem,calc(100vw-2.5rem))] flex-col border border-line-strong bg-[#080a15]/95 shadow-[0_0_42px_rgba(91,140,255,0.16)] backdrop-blur-sm"
    >
      <header className="flex items-center justify-between border-b border-line px-4 py-3">
        <div>
          <p className="font-mono text-[10px] tracking-[0.2em] text-cosmos">NEMO · PORTFOLIO ASSISTANT</p>
          <p className="mt-1 text-xs text-muted">Answers only about Abhishek</p>
        </div>
        <button type="button" onClick={() => setOpen(false)} className="p-1 text-muted transition-colors hover:text-fg" aria-label="Close assistant">
          <X size={18} />
        </button>
      </header>

      <div className="max-h-72 space-y-3 overflow-y-auto px-4 py-4" aria-live="polite">
        {messages.map((message, index) => (
          <p
            key={`${message.from}-${index}`}
            className={`max-w-[92%] text-sm leading-relaxed ${message.from === "visitor" ? "ml-auto border border-accent/30 bg-accent/10 px-3 py-2 text-fg" : message.from === "error" ? "text-red-400" : "text-muted"}`}
          >
            {message.text}
          </p>
        ))}
        {isLoading && (
          <div className="flex items-center gap-2 text-muted text-sm">
            <CircleNotch size={14} className="animate-spin" />
            Thinking...
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      <form onSubmit={submit} className="flex border-t border-line p-2">
        <label className="sr-only" htmlFor="assistant-question">Ask about Abhishek</label>
        <input
          id="assistant-question"
          value={input}
          onChange={(event) => setInput(event.target.value)}
          placeholder="Ask Nemo..."
          disabled={isLoading}
          className="min-w-0 flex-1 bg-transparent px-2 py-2 text-sm text-fg outline-none placeholder:text-faint disabled:opacity-50"
        />
        <button type="submit" disabled={isLoading} className="p-2 text-cosmos transition-colors hover:text-accent disabled:opacity-50" aria-label="Send question">
          <PaperPlaneTilt size={18} weight="fill" />
        </button>
      </form>
    </section>
  );
}
