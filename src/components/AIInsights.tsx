import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Send, Sparkles, MessageSquare, Zap, Shield, BrainCircuit, User } from 'lucide-react';
import { cn } from '@/src/lib/utils';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  type?: 'explanation' | 'action' | 'summary';
}

export default function AIInsights() {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<Message[]>([
    { 
      id: '1', 
      role: 'assistant', 
      content: "Welcome to Apex Flow Intelligence. I've analyzed the latest supply chain data for the Electric Power division. How can I assist you with decision intelligence today?",
      type: 'summary'
    }
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMsg: Message = { id: Date.now().toString(), role: 'user', content: input };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsTyping(true);

    // Simulate AI response
    setTimeout(() => {
      const aiMsg: Message = { 
        id: (Date.now() + 1).toString(), 
        role: 'assistant', 
        content: "I've detected a high-probability stockout risk for the CAT-9X series at the Peoria plant. This is primarily due to a Tier 2 supplier delay in Southeast Asia. I recommend initiating a cross-plant inventory transfer from Decatur immediately.",
        type: 'action'
      };
      setMessages(prev => [...prev, aiMsg]);
      setIsTyping(false);
    }, 1500);
  };

  return (
    <div className="pt-24 pb-12 h-[calc(100vh-2rem)] flex flex-col">
      <div className="flex-1 overflow-hidden flex flex-col max-w-4xl mx-auto w-full bg-apex-card rounded-[40px] border border-black/5 card-shadow">
        {/* Chat Header */}
        <div className="p-8 border-b border-black/5 flex items-center justify-between bg-apex-forest/5">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-apex-forest flex items-center justify-center shadow-lg shadow-apex-forest/20">
              <BrainCircuit className="w-7 h-7 text-white" />
            </div>
            <div>
              <h3 className="font-display font-bold text-xl text-apex-forest">Apex Copilot</h3>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-apex-forest animate-pulse" />
                <span className="text-[10px] uppercase tracking-widest text-apex-text-muted font-bold">System Active</span>
              </div>
            </div>
          </div>
          <div className="flex gap-3">
            <button className="p-2.5 hover:bg-apex-bg rounded-xl transition-all text-apex-text-muted hover:text-apex-forest">
              <Shield className="w-6 h-6" />
            </button>
            <button className="p-2.5 hover:bg-apex-bg rounded-xl transition-all text-apex-text-muted hover:text-apex-forest">
              <Zap className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* Messages Area */}
        <div 
          ref={scrollRef}
          className="flex-1 overflow-y-auto p-10 space-y-10 no-scrollbar bg-apex-bg/30"
        >
          <AnimatePresence initial={false}>
            {messages.map((msg) => (
              <motion.div
                key={msg.id}
                initial={{ opacity: 0, y: 10, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                className={cn(
                  "flex gap-5 max-w-[85%]",
                  msg.role === 'user' ? "ml-auto flex-row-reverse" : ""
                )}
              >
                <div className={cn(
                  "w-12 h-12 rounded-2xl flex-shrink-0 flex items-center justify-center border border-black/5 shadow-sm",
                  msg.role === 'user' ? "bg-white" : "bg-apex-mint-light text-apex-forest"
                )}>
                  {msg.role === 'user' ? <User className="w-6 h-6 text-apex-forest" /> : <Sparkles className="w-6 h-6" />}
                </div>
                <div className={cn(
                  "p-8 rounded-[32px] text-base leading-relaxed font-medium",
                  msg.role === 'user' 
                    ? "bg-apex-forest text-white shadow-xl shadow-apex-forest/20 rounded-tr-none" 
                    : "bg-white rounded-tl-none border border-black/5 card-shadow text-apex-text"
                )}>
                  {msg.content}
                  
                  {msg.type === 'action' && (
                    <div className="mt-8 pt-8 border-t border-black/5 space-y-5">
                      <div className="flex items-center gap-2 text-apex-forest font-bold text-xs uppercase tracking-widest">
                        <Zap className="w-4 h-4" /> Suggested Action
                      </div>
                      <div className="p-6 rounded-2xl bg-apex-mint-light border border-apex-mint/20 flex items-center justify-between group cursor-pointer hover:bg-apex-mint/30 transition-all">
                        <span className="font-bold text-apex-forest">Execute Cross-Plant Transfer</span>
                        <div className="w-10 h-10 rounded-full bg-apex-forest text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all shadow-lg">
                          <Send className="w-5 h-5" />
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
          {isTyping && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex gap-5"
            >
              <div className="w-12 h-12 rounded-2xl bg-apex-mint-light text-apex-forest flex items-center justify-center border border-black/5 shadow-sm">
                <Sparkles className="w-6 h-6" />
              </div>
              <div className="bg-white px-8 py-5 rounded-[32px] rounded-tl-none flex gap-1.5 border border-black/5 card-shadow">
                <div className="w-2 h-2 rounded-full bg-apex-forest/20 animate-bounce" style={{ animationDelay: '0ms' }} />
                <div className="w-2 h-2 rounded-full bg-apex-forest/20 animate-bounce" style={{ animationDelay: '150ms' }} />
                <div className="w-2 h-2 rounded-full bg-apex-forest/20 animate-bounce" style={{ animationDelay: '300ms' }} />
              </div>
            </motion.div>
          )}
        </div>

        {/* Input Area */}
        <div className="p-10 bg-white border-t border-black/5">
          <div className="relative max-w-3xl mx-auto">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              placeholder="Ask about supply chain risk, inventory levels, or simulations..."
              className="w-full bg-apex-bg border border-black/10 rounded-[28px] py-6 pl-10 pr-20 text-base font-medium focus:outline-none focus:border-apex-forest/30 transition-all shadow-inner text-apex-text"
            />
            <button 
              onClick={handleSend}
              className="absolute right-3 top-1/2 -translate-y-1/2 w-14 h-14 rounded-[20px] bg-apex-forest text-white flex items-center justify-center hover:bg-apex-forest/90 transition-all shadow-xl shadow-apex-forest/20"
            >
              <Send className="w-6 h-6" />
            </button>
          </div>
          <div className="flex justify-center gap-8 mt-6">
            {['Risk Summary', 'Inventory Status', 'Supplier Health'].map(tag => (
              <button key={tag} className="text-[10px] uppercase tracking-widest text-apex-text-muted font-bold hover:text-apex-forest transition-colors">
                {tag}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
