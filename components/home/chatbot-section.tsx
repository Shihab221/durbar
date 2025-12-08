"use client";

import { motion } from "framer-motion";
import { Bot, MessageCircle, Sparkles, Zap, Brain, HelpCircle } from "lucide-react";
import { ScrollAnimation } from "@/components/page-transition";

const features = [
  {
    icon: Brain,
    title: "AI-Powered",
    description: "Powered by Google Gemini for intelligent responses",
  },
  {
    icon: Zap,
    title: "Instant Answers",
    description: "Get quick information about Team Durbar",
  },
  {
    icon: HelpCircle,
    title: "24/7 Available",
    description: "Ask questions anytime, anywhere",
  },
];

export function ChatbotSection() {
  return (
    <section className="py-20 md:py-28 relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 grid-bg opacity-30" />
      <div className="absolute top-0 right-0 w-96 h-96 bg-orange-500/10 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-red-500/10 rounded-full blur-3xl" />
      
      <div className="section-container relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <ScrollAnimation>
            <div>
              <span className="inline-block px-4 py-1.5 rounded-full bg-gradient-to-r from-orange-500/20 to-red-500/20 text-orange-500 text-sm font-semibold font-display tracking-wider uppercase mb-4">
                <Sparkles className="w-4 h-4 inline mr-2" />
                AI Assistant
              </span>
              <h2 className="section-heading mb-4">
                Meet <span className="text-gradient-mars">DurbarBot</span>
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-400 mb-6 font-mono leading-relaxed">
                Have questions about Team Durbar? Our AI-powered chatbot is here to help! 
                DurbarBot knows everything about our team, achievements, departments, and 
                Mars rover technology.
              </p>
              <p className="text-gray-600 dark:text-gray-400 mb-8 font-mono">
                Click the <span className="text-orange-500 font-semibold">rover icon</span> in 
                the bottom-right corner to start chatting! 🚀
              </p>

              {/* Features */}
              <div className="grid sm:grid-cols-3 gap-4">
                {features.map((feature, index) => (
                  <motion.div
                    key={feature.title}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="text-center p-4 rounded-xl bg-gray-50 dark:bg-zinc-800/50 border border-gray-100 dark:border-zinc-700"
                  >
                    <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-orange-500 to-red-500 flex items-center justify-center mx-auto mb-3">
                      <feature.icon className="w-5 h-5 text-white" />
                    </div>
                    <h3 className="font-semibold text-gray-900 dark:text-white text-sm mb-1 font-display">
                      {feature.title}
                    </h3>
                    <p className="text-xs text-gray-500 dark:text-gray-400 font-mono">
                      {feature.description}
                    </p>
                  </motion.div>
                ))}
              </div>
            </div>
          </ScrollAnimation>

          {/* Right - Chat Preview */}
          <ScrollAnimation delay={0.2}>
            <motion.div
              whileHover={{ y: -5 }}
              className="relative"
            >
              {/* Glow effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-orange-500/20 to-red-500/20 rounded-3xl blur-2xl" />
              
              {/* Chat window mockup */}
              <div className="relative bg-white dark:bg-space-gunmetal rounded-2xl shadow-2xl border border-gray-200 dark:border-zinc-700 overflow-hidden">
                {/* Header */}
                <div className="bg-gradient-to-r from-orange-500 via-orange-600 to-red-500 p-4 flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-white/20 backdrop-blur-sm flex items-center justify-center">
                    <Bot className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-display font-bold text-white tracking-wide uppercase text-sm">
                      DurbarBot
                    </h3>
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                      <span className="text-white/80 text-xs font-mono">Online</span>
                    </div>
                  </div>
                </div>

                {/* Sample messages */}
                <div className="p-4 space-y-4 bg-gray-50 dark:bg-space-black/50 min-h-[250px]">
                  {/* Bot message */}
                  <div className="flex gap-3">
                    <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-orange-500 to-red-500 flex items-center justify-center flex-shrink-0">
                      <Bot className="w-4 h-4 text-white" />
                    </div>
                    <div className="bg-white dark:bg-zinc-800 rounded-2xl rounded-tl-sm px-4 py-3 shadow-sm max-w-[80%]">
                      <p className="text-sm font-mono text-gray-800 dark:text-gray-200">
                        Hey! 👋 I&apos;m DurbarBot. Ask me anything about Team Durbar!
                      </p>
                    </div>
                  </div>

                  {/* User message */}
                  <div className="flex gap-3 flex-row-reverse">
                    <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-zinc-600 to-zinc-800 flex items-center justify-center flex-shrink-0">
                      <MessageCircle className="w-4 h-4 text-white" />
                    </div>
                    <div className="bg-gradient-to-br from-orange-500 to-red-500 rounded-2xl rounded-tr-sm px-4 py-3 max-w-[80%]">
                      <p className="text-sm font-mono text-white">
                        What achievements does Team Durbar have?
                      </p>
                    </div>
                  </div>

                  {/* Bot response */}
                  <div className="flex gap-3">
                    <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-orange-500 to-red-500 flex items-center justify-center flex-shrink-0">
                      <Bot className="w-4 h-4 text-white" />
                    </div>
                    <div className="bg-white dark:bg-zinc-800 rounded-2xl rounded-tl-sm px-4 py-3 shadow-sm max-w-[80%]">
                      <p className="text-sm font-mono text-gray-800 dark:text-gray-200">
                        🏆 We just won 2nd place at the Autonomous Rovers Rally 2025 with $3,000 prize! We&apos;re also ARC 2022 finalists...
                      </p>
                    </div>
                  </div>
                </div>

                {/* Input mockup */}
                <div className="p-4 bg-white dark:bg-space-gunmetal border-t border-gray-200 dark:border-zinc-700">
                  <div className="flex items-center gap-2">
                    <div className="flex-1 bg-gray-100 dark:bg-zinc-800 rounded-xl px-4 py-3 text-sm text-gray-400 font-mono">
                      Ask about Team Durbar...
                    </div>
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-orange-500 to-red-500 flex items-center justify-center">
                      <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </ScrollAnimation>
        </div>
      </div>
    </section>
  );
}

