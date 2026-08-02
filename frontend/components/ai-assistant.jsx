"use client";

import React, { useState, useRef, useEffect } from "react";
import { X, Send, Sparkles, Bot, Trash2, AlertCircle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "react-hot-toast";

export function AIAssistant() {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const initialMessage = {
    sender: "ai",
    text: "Hello! I'm DentalFlow's Enterprise AI Agent. How can I assist your smile today? Ask about your appointments, live branch locations, direct insurance billing, 3D implants, or general questions!",
    timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
  };

  const [messages, setMessages] = useState([initialMessage]);

  const quickActions = [
    { label: "📅 Book Appointment", text: "How do I book an appointment at a DentalFlow clinic?" },
    { label: "📍 Nearest Clinic", text: "Where are your branch locations in Canada?" },
    { label: "💳 Insurance Questions", text: "Which insurance providers do you bill directly?" },
    { label: "🚨 Emergency Advice", text: "What should I do for severe toothache or dental emergencies?" },
    { label: "⏰ Clinic Hours", text: "What are your operating hours across Canadian branches?" },
    { label: "🦷 Treatment Info", text: "What digital treatments and sedation options do you offer?" },
    { label: "💰 Pricing Information", text: "Do you follow provincial dental association fee guides?" },
  ];

  // Auto-scroll to latest message
  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, isLoading, isOpen]);

  const handleSendQuery = async (queryText) => {
    if (!queryText || !queryText.trim()) {
      toast.error("Please enter a question or select a quick action.", {
        id: "empty-ai-input",
        style: {
          borderRadius: "12px",
          background: "#1E293B",
          color: "#FFF",
          fontSize: "12px",
          fontFamily: "var(--font-poppins)",
        },
      });
      return;
    }

    if (isLoading) return;

    const userText = queryText.trim();
    const userMsg = {
      sender: "user",
      text: userText,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };

    const newMessages = [...messages, userMsg];
    setMessages(newMessages);
    setInput("");
    setIsLoading(true);

    const historyPayload = newMessages.map((m) => ({
      role: m.sender === "user" ? "user" : "model",
      parts: [{ text: m.text }],
    }));

    try {
      const response = await fetch("/api/v1/ai/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ message: userText, history: historyPayload }),
      });

      let aiReplyText = "";
      if (response.ok) {
        const data = await response.json();
        if (data.success && data.reply) {
          aiReplyText = data.reply;
        }
      }

      if (!aiReplyText) {
        const fallbackRes = await fetch("http://localhost:5000/api/v1/ai/chat", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify({ message: userText, history: historyPayload }),
        });
        if (fallbackRes.ok) {
          const fallbackData = await fallbackRes.json();
          if (fallbackData.success && fallbackData.reply) {
            aiReplyText = fallbackData.reply;
          }
        }
      }

      if (!aiReplyText) {
        toast("Server notice: Agent is operating in instant offline clinical mode.", {
          icon: "ℹ️",
          id: "ai-fallback-notice",
          style: {
            borderRadius: "12px",
            background: "#1E293B",
            color: "#FFF",
            fontSize: "12px",
            fontFamily: "var(--font-poppins)",
          },
        });

        const lower = userText.toLowerCase();
        if (lower.includes("book") || lower.includes("appointment")) {
          aiReplyText = "You can book an appointment online in under 60 seconds! Click 'Patient Login' or the 'Book Online Appointment' button on our homepage to select your branch and specialist.";
        } else if (lower.includes("insurance") || lower.includes("billing")) {
          aiReplyText = "We offer 100% direct electronic insurance billing to Sun Life, Manulife, Canada Life, Desjardins, and Blue Cross. Claims are processed on the spot before you leave!";
        } else {
          aiReplyText = "SmileCare Dental Practice Network operates 5 centralized clinics (Toronto, Vancouver, Calgary, Ottawa, and Mississauga). All treatments strictly adhere to provincial fee guides!";
        }
      }

      const aiMsg = {
        sender: "ai",
        text: aiReplyText,
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      };

      setMessages((prev) => [...prev, aiMsg]);
    } catch (err) {
      console.error("AI Agent Request Error:", err);
      toast.error("Network connection notice: Using instant offline guidance.", {
        id: "ai-network-error",
        style: {
          borderRadius: "12px",
          background: "#1E293B",
          color: "#FFF",
          fontSize: "12px",
          fontFamily: "var(--font-poppins)",
        },
      });

      setMessages((prev) => [
        ...prev,
        {
          sender: "ai",
          text: "SmileCare clinics offer direct electronic billing to Sun Life, Manulife, Canada Life, and Blue Cross. You can also call 1-800-336-8252 for instant assistance!",
          timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleSendQuery(input);
  };

  const handleClearChat = () => {
    setMessages([initialMessage]);
    toast.success("Conversation cleared.", {
      id: "ai-chat-cleared",
      style: {
        borderRadius: "12px",
        background: "#1E293B",
        color: "#FFF",
        fontSize: "12px",
        fontFamily: "var(--font-poppins)",
      },
    });
  };

  return (
    <>
      {/* Floating Trigger Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-5 right-5 sm:bottom-6 sm:right-6 z-50 bg-[#1B5C63] hover:bg-[#15494F] text-white p-3.5 sm:p-4 rounded-full shadow-2xl flex items-center space-x-2.5 hover:scale-105 transition-all cursor-pointer border-2 border-white/40 group"
        aria-label="Open AI Dental Assistant"
      >
        <Sparkles className="h-5 w-5 text-teal-200 group-hover:rotate-12 transition-transform" />
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
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50 w-[calc(100vw-2rem)] sm:w-[420px] bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col h-[560px] max-h-[85vh] font-poppins"
          >
            {/* Header */}
            <div className="bg-[#1B5C63] text-white p-4 flex items-center justify-between shadow-xs">
              <div className="flex items-center space-x-3">
                <div className="h-9 w-9 rounded-full bg-white/10 flex items-center justify-center border border-white/30 shrink-0">
                  <Bot className="h-5 w-5 text-teal-200" />
                </div>
                <div>
                  <h3 className="font-serif font-bold text-sm text-white leading-tight">DentalFlow AI Agent</h3>
                  <div className="flex items-center space-x-1.5 mt-0.5">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                    <span className="font-mono text-[10px] text-teal-200 uppercase tracking-wider">
                      ONLINE • 5 BRANCH CLINICS
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex items-center space-x-1">
                <button
                  onClick={handleClearChat}
                  title="Clear Conversation"
                  className="text-teal-200 hover:text-white p-1.5 rounded-xl hover:bg-white/10 transition-colors cursor-pointer"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
                <button
                  onClick={() => setIsOpen(false)}
                  title="Close Assistant"
                  className="text-teal-200 hover:text-white p-1.5 rounded-xl hover:bg-white/10 transition-colors cursor-pointer"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
            </div>

            {/* Healthcare Medical Disclaimer Banner */}
            <div className="bg-amber-50 border-b border-amber-200 px-3.5 py-2 flex items-start space-x-2 text-[11px] text-amber-900 leading-tight">
              <AlertCircle className="h-4 w-4 text-amber-600 shrink-0 mt-0.5" />
              <span>
                AI responses are for informational purposes only and do not replace professional dental advice from a licensed dentist.
              </span>
            </div>

            {/* Messages Container */}
            <div className="flex-1 p-4 overflow-y-auto space-y-3.5 bg-slate-50">
              {messages.length <= 1 && (
                <div className="space-y-2 mb-4">
                  <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest text-center">
                    SUGGESTED QUICK ACTIONS
                  </p>
                  <div className="flex flex-wrap gap-1.5 justify-center">
                    {quickActions.map((action, idx) => (
                      <button
                        key={idx}
                        onClick={() => handleSendQuery(action.text)}
                        className="bg-white hover:bg-teal-50 border border-slate-200/80 hover:border-teal-300 text-slate-700 hover:text-[#1B5C63] text-[11px] font-semibold px-2.5 py-1.5 rounded-full shadow-2xs transition-all cursor-pointer"
                      >
                        {action.label}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {messages.map((msg, idx) => (
                <div
                  key={idx}
                  className={`flex items-start space-x-2 ${
                    msg.sender === "user" ? "justify-end" : "justify-start"
                  }`}
                >
                  {msg.sender === "ai" && (
                    <div className="h-7 w-7 rounded-full bg-teal-100 flex items-center justify-center text-[#1B5C63] shrink-0 mt-1 shadow-2xs">
                      <Bot className="h-4 w-4" />
                    </div>
                  )}

                  <div className="space-y-1 max-w-[82%]">
                    <div
                      className={`rounded-2xl p-3.5 text-xs font-poppins leading-relaxed shadow-2xs ${
                        msg.sender === "user"
                          ? "bg-[#1B5C63] text-white rounded-tr-none"
                          : "bg-white text-slate-800 border border-slate-200/90 rounded-tl-none whitespace-pre-line"
                      }`}
                    >
                      {msg.text}
                    </div>
                    <span className="text-[9px] text-slate-400 font-mono block px-1">
                      {msg.timestamp}
                    </span>
                  </div>
                </div>
              ))}

              {isLoading && (
                <div className="flex items-start space-x-2 justify-start">
                  <div className="h-7 w-7 rounded-full bg-teal-100 flex items-center justify-center text-[#1B5C63] shrink-0 mt-1">
                    <Bot className="h-4 w-4" />
                  </div>
                  <div className="bg-white border border-slate-200 rounded-2xl rounded-tl-none p-3.5 shadow-2xs flex items-center space-x-2">
                    <span className="text-xs font-poppins text-slate-500 font-medium italic">
                      DentalFlow AI is typing...
                    </span>
                    <div className="flex space-x-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#1B5C63] animate-bounce" style={{ animationDelay: "0ms" }} />
                      <span className="w-1.5 h-1.5 rounded-full bg-[#1B5C63] animate-bounce" style={{ animationDelay: "150ms" }} />
                      <span className="w-1.5 h-1.5 rounded-full bg-[#1B5C63] animate-bounce" style={{ animationDelay: "300ms" }} />
                    </div>
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Input Form */}
            <form onSubmit={handleSubmit} className="p-3 bg-white border-t border-slate-200 flex items-center space-x-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask about treatments, insurance, coding, or general questions..."
                className="flex-1 bg-slate-50 border border-slate-200 rounded-full px-4 py-2.5 text-xs font-poppins text-slate-900 focus:border-[#1B5C63] focus:outline-none"
              />
              <button
                type="submit"
                disabled={isLoading}
                className="bg-[#1B5C63] hover:bg-[#15494F] disabled:opacity-50 text-white p-2.5 rounded-full transition-all flex items-center justify-center cursor-pointer shadow-sm"
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
