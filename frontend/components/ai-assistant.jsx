"use client";

import React, { useState } from "react";
import { MessageSquare, X, Send, Sparkles, Bot, User } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export function AIAssistant() {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([
    {
      sender: "ai",
      text: "Hello! I am DentalFlow AI Assistant. How can I help you today? Ask about direct insurance billing, 3D implant procedures, or clinic availability!",
    },
  ]);

  const handleSend = (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMsg = input.trim();
    setMessages((prev) => [...prev, { sender: "user", text: userMsg }]);
    setInput("");

    // Simulate AI response logic
    setTimeout(() => {
      let aiReply = "Our clinics offer 100% direct electronic insurance billing and same-day emergency appointments. You can book an appointment online in 60 seconds!";
      const lower = userMsg.toLowerCase();

      if (lower.includes("insurance") || lower.includes("billing")) {
        aiReply = "We bill directly to Sun Life, Manulife, Canada Life, Desjardins, Blue Cross, and CDCP. Claims are processed electronically on the spot before you leave!";
      } else if (lower.includes("implant") || lower.includes("3d")) {
        aiReply = "Our 3D CBCT guided implant surgery uses low-radiation scans for precise, permanent tooth restoration. Book a specialist consultation today!";
      } else if (lower.includes("sedation") || lower.includes("pain") || lower.includes("anxious")) {
        aiReply = "We offer gentle nitrous oxide (laughing gas) and oral conscious sedation so your treatment is 100% comfortable and painless!";
      } else if (lower.includes("location") || lower.includes("branch")) {
        aiReply = "We have 5 metro branches: Toronto Central, Vancouver West, Calgary Downtown, Ottawa Parliament, and Mississauga Medical!";
      }

      setMessages((prev) => [...prev, { sender: "ai", text: aiReply }]);
    }, 600);
  };

  return (
    <>
      {/* Floating Trigger Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 z-50 bg-[#0F766E] hover:bg-[#0D9488] text-white p-4 rounded-full shadow-2xl flex items-center space-x-2.5 hover:scale-105 transition-all cursor-pointer border-2 border-white/40"
        aria-label="Open AI Dental Assistant"
      >
        <Sparkles className="h-5 w-5 text-teal-200" />
        <span className="font-poppins text-xs font-bold uppercase tracking-wider hidden sm:inline">
          AI Dental Assistant
        </span>
      </button>

      {/* Floating Chat Drawer Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="fixed bottom-24 right-6 z-50 w-full max-w-sm sm:max-w-md bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col h-[480px]"
          >
            {/* Header */}
            <div className="bg-[#0F766E] text-white p-4 flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="h-9 w-9 rounded-full bg-teal-800 flex items-center justify-center border border-teal-400/40">
                  <Bot className="h-5 w-5 text-teal-200" />
                </div>
                <div>
                  <h3 className="font-serif font-bold text-sm text-white">DentalFlow AI Assistant</h3>
                  <p className="font-mono text-[10px] text-teal-200">ONLINE • INSTANT EMR GUIDANCE</p>
                </div>
              </div>

              <button
                onClick={() => setIsOpen(false)}
                className="text-teal-200 hover:text-white p-1 rounded-full hover:bg-teal-800 transition-colors"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Messages Container */}
            <div className="flex-1 p-4 overflow-y-auto space-y-3 bg-slate-50">
              {messages.map((msg, idx) => (
                <div
                  key={idx}
                  className={`flex items-start space-x-2 ${
                    msg.sender === "user" ? "justify-end" : "justify-start"
                  }`}
                >
                  {msg.sender === "ai" && (
                    <div className="h-7 w-7 rounded-full bg-teal-100 flex items-center justify-center text-[#0F766E] flex-shrink-0 mt-1">
                      <Bot className="h-4 w-4" />
                    </div>
                  )}

                  <div
                    className={`max-w-[80%] rounded-2xl p-3.5 text-xs font-poppins leading-relaxed shadow-2xs ${
                      msg.sender === "user"
                        ? "bg-[#0F766E] text-white rounded-tr-none"
                        : "bg-white text-slate-800 border border-slate-200 rounded-tl-none"
                    }`}
                  >
                    {msg.text}
                  </div>
                </div>
              ))}
            </div>

            {/* Input Form */}
            <form onSubmit={handleSend} className="p-3 bg-white border-t border-slate-200 flex items-center space-x-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask about treatments, insurance, or booking..."
                className="flex-1 bg-slate-50 border border-slate-200 rounded-full px-4 py-2.5 text-xs font-poppins text-slate-900 focus:border-[#0F766E]"
              />
              <button
                type="submit"
                className="bg-[#0F766E] hover:bg-[#0D9488] text-white p-2.5 rounded-full transition-all flex items-center justify-center cursor-pointer"
              >
                <Send className="h-4 w-4" />
              </button>
            </form>

          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
