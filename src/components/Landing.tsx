import { motion, useScroll, useTransform, useInView } from 'motion/react';
import { ArrowRight, Shield, Zap, Globe, BarChart3, Cpu, Database, ChevronDown, BrainCircuit, Activity, Layers } from 'lucide-react';
import { useRef } from 'react';
import { cn } from '@/src/lib/utils';

interface LandingProps {
  onEnter: () => void;
}

export default function Landing({ onEnter }: LandingProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const opacity = useTransform(scrollYProgress, [0, 0.15], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.15], [1, 0.9]);
  const videoOpacity = useTransform(scrollYProgress, [0, 0.3], [1, 0.2]);
  const bgColor = useTransform(scrollYProgress, [0.1, 0.3], ["#0B0F14", "#F8F9FA"]);
  const textColor = useTransform(scrollYProgress, [0.1, 0.3], ["#FFFFFF", "#1B4332"]);

  return (
    <motion.div 
      ref={containerRef} 
      style={{ backgroundColor: bgColor }}
      className="relative w-full overflow-x-hidden selection:bg-apex-forest/10"
    >
      {/* Landing Header */}
      <motion.header
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="fixed top-6 left-1/2 -translate-x-1/2 z-50 w-[95%] max-w-7xl"
      >
        <div className="bg-white/90 backdrop-blur-xl border border-black/5 rounded-full px-6 py-3 flex items-center justify-between gap-4 shadow-xl">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-apex-forest rounded-lg flex items-center justify-center shadow-lg shadow-apex-forest/10">
              <div className="w-4 h-4 border-2 border-white rounded-sm rotate-45" />
            </div>
            <span className="font-display font-bold text-lg tracking-tight text-apex-forest">
              Apex Flow
            </span>
          </div>
          <div className="hidden md:flex items-center gap-8 text-[10px] uppercase tracking-[0.2em] font-bold text-apex-text-muted">
            <a href="#intelligence" className="hover:text-apex-forest transition-colors">Intelligence</a>
            <a href="#scale" className="hover:text-apex-forest transition-colors">Scale</a>
            <a href="#impact" className="hover:text-apex-forest transition-colors">Impact</a>
          </div>
          <button
            onClick={onEnter}
            className="px-6 py-2 bg-apex-forest text-white text-xs font-bold rounded-full hover:bg-apex-forest/80 transition-all shadow-lg shadow-apex-forest/20 uppercase tracking-widest"
          >
            Enter Platform
          </button>
        </div>
      </motion.header>

      {/* Hero Section */}
      <section className="relative h-screen w-full flex items-center justify-center overflow-hidden">
        <motion.div style={{ opacity: videoOpacity }} className="absolute inset-0">
          <video
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover"
          >
            <source src="https://ik.imagekit.io/ollvf7fhfm/Racing_Caterpillar_Meets_Car%20(1).mp4" type="video/mp4" />
          </video>
        </motion.div>
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-transparent" />

        <motion.div
          style={{ opacity, scale }}
          className="relative z-10 text-center space-y-6 px-6 max-w-5xl -mt-48"
        >
          <div className="space-y-2">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-[9px] uppercase tracking-[0.3em] font-bold text-apex-blue backdrop-blur-md"
            >
              <Activity className="w-3 h-3" /> Next-Gen Decision Intelligence
            </motion.div>
            <h1 className="text-6xl md:text-8xl font-display font-bold tracking-tighter text-white leading-[0.85] drop-shadow-2xl">
              Apex <span className="text-apex-blue">Flow</span>
            </h1>
            <p className="text-lg md:text-2xl text-white/60 font-medium tracking-tight max-w-none mx-auto italic">
              "Bridging the gap between heavy-duty reliability and race-day precision."
            </p>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="flex flex-col items-center gap-4"
          >
            <button
              onClick={onEnter}
              className="group relative px-6 py-3 bg-white text-black font-bold rounded-full overflow-hidden transition-all hover:scale-105 active:scale-95 shadow-[0_0_40px_rgba(59,130,246,0.2)]"
            >
              <span className="relative z-10 flex items-center gap-2 text-base uppercase tracking-widest">
                Enter Platform <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
              </span>
              <div className="absolute inset-0 bg-apex-forest translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out" />
            </button>
          </motion.div>
        </motion.div>

        <motion.div 
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/20"
        >
          <span className="text-[10px] uppercase tracking-widest font-bold">Scroll to Explore</span>
          <ChevronDown className="w-5 h-5" />
        </motion.div>
      </section>

      {/* Value Proposition 1: Intelligence */}
      <section id="intelligence" className="py-48 px-6 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-32 items-center">
          <motion.div
            initial={{ opacity: 0, x: -60 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            className="space-y-10"
            style={{ color: textColor }}
          >
            <div className="w-20 h-20 rounded-[32px] bg-apex-forest/5 flex items-center justify-center border border-apex-forest/10">
              <Cpu className="w-10 h-10 text-apex-forest" />
            </div>
            <h2 className="text-6xl md:text-8xl font-display font-bold leading-[0.9] tracking-tighter">
              Intelligence <br />
              <span className="text-apex-forest/20">Redefined.</span>
            </h2>
            <p className="text-2xl text-apex-text-muted leading-relaxed font-medium">
              Apex Flow isn't just a dashboard. It's a neural network for your supply chain, processing millions of data points to predict bottlenecks before they impact your bottom line.
            </p>
            <div className="grid grid-cols-2 gap-12 pt-10 border-t border-apex-forest/5">
              <div>
                <div className="text-5xl font-display font-bold text-apex-forest mb-2">99.9%</div>
                <div className="text-[10px] uppercase tracking-[0.3em] text-apex-text-muted font-bold">Data Fidelity</div>
              </div>
              <div>
                <div className="text-5xl font-display font-bold text-apex-green mb-2">&lt;2ms</div>
                <div className="text-[10px] uppercase tracking-[0.3em] text-apex-text-muted font-bold">Inference Speed</div>
              </div>
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, scale: 0.8, rotate: -5 }}
            whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="bg-white p-12 rounded-[64px] aspect-square flex items-center justify-center overflow-hidden border border-black/5 shadow-2xl">
              <div className="absolute inset-0 bg-gradient-to-br from-apex-forest/5 via-transparent to-apex-mint/20 opacity-30" />
              <div className="relative grid grid-cols-4 gap-4 w-full h-full">
                {Array.from({ length: 16 }).map((_, i) => (
                  <motion.div
                    key={i}
                    animate={{ 
                      opacity: [0.1, 0.3, 0.1],
                      scale: [1, 1.02, 1],
                      backgroundColor: i % 3 === 0 ? ['rgba(27,67,50,0)', 'rgba(27,67,50,0.05)', 'rgba(27,67,50,0)'] : 'transparent'
                    }}
                    transition={{ 
                      duration: 4, 
                      repeat: Infinity, 
                      delay: i * 0.1 
                    }}
                    className="bg-apex-bg rounded-2xl border border-black/5"
                  />
                ))}
              </div>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="relative">
                  <motion.div 
                    animate={{ scale: [1, 1.1, 1], opacity: [0.5, 0.8, 0.5] }}
                    transition={{ duration: 4, repeat: Infinity }}
                    className="absolute inset-0 bg-apex-mint/30 blur-3xl rounded-full"
                  />
                  <BrainCircuit className="w-40 h-40 text-apex-forest relative z-10" />
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Value Proposition 2: Scale */}
      <section id="scale" className="py-48 bg-apex-mint/10 border-y border-apex-forest/5 relative overflow-hidden">
        <div className="absolute inset-0 opacity-5 pointer-events-none">
          <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(#1B4332_1px,transparent_1px)] [background-size:40px_40px]" />
        </div>
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="text-center space-y-8 mb-32">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-apex-forest font-display text-sm font-bold uppercase tracking-[0.5em]"
            >
              Enterprise Scale
            </motion.div>
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-7xl md:text-9xl font-display font-bold tracking-tighter leading-[0.85] text-apex-forest"
            >
              Global Supply Chain <br />
              <span className="text-apex-forest/10">Synchronized.</span>
            </motion.h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {[
              { icon: Globe, title: 'Global Visibility', desc: 'Real-time tracking across 40+ international manufacturing hubs with sub-second updates.' },
              { icon: Shield, title: 'Risk Mitigation', desc: 'Predictive alerts for Tier 2 and Tier 3 supplier disruptions using proprietary ML models.' },
              { icon: BarChart3, title: 'Financial Impact', desc: 'Direct correlation between supply chain health and quarterly exposure for C-suite clarity.' },
            ].map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15 }}
                className="bg-white p-12 rounded-[48px] shadow-xl shadow-apex-forest/5 group border border-black/5 hover:-translate-y-2 transition-all duration-300"
              >
                <div className="w-16 h-16 rounded-3xl bg-apex-bg flex items-center justify-center mb-10 group-hover:bg-apex-forest group-hover:text-white transition-all border border-black/5">
                  <item.icon className="w-8 h-8 text-apex-forest/40 group-hover:text-white transition-all" />
                </div>
                <h4 className="text-3xl font-display font-bold mb-6 text-apex-forest group-hover:text-apex-forest transition-colors">{item.title}</h4>
                <p className="text-apex-text-muted leading-relaxed text-lg">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Value Proposition 3: How it works */}
      <section id="impact" className="py-48 px-6 max-w-7xl mx-auto">
        <div className="bg-white p-20 rounded-[80px] relative overflow-hidden border border-black/5 shadow-2xl">
          <div className="absolute top-0 right-0 w-1/2 h-full bg-apex-mint/10 blur-[150px] -z-10" />
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
            <div className="space-y-12">
              <div className="space-y-4">
                <h2 className="text-6xl font-display font-bold tracking-tighter text-apex-forest">The Apex Engine</h2>
                <p className="text-xl text-apex-text-muted font-medium">How we power the world's most resilient supply chains.</p>
              </div>
              <div className="space-y-10">
                {[
                  { step: '01', title: 'Data Ingestion', desc: 'Aggregating ERP, logistics, and market data in real-time.', icon: Database },
                  { step: '02', title: 'Predictive Modeling', desc: 'AI simulations run thousands of "what-if" scenarios every hour.', icon: Layers },
                  { step: '03', title: 'Actionable Insights', desc: 'Copilot provides verified recommendations for immediate execution.', icon: Zap },
                ].map((item) => (
                  <div key={item.step} className="flex gap-8 group">
                    <div className="flex-shrink-0 w-14 h-14 rounded-2xl bg-apex-bg border border-black/5 flex items-center justify-center font-display font-bold text-apex-forest group-hover:bg-apex-forest group-hover:text-white transition-all">
                      {item.step}
                    </div>
                    <div>
                      <h4 className="text-2xl font-bold mb-2 flex items-center gap-3 text-apex-forest">
                        {item.title}
                      </h4>
                      <p className="text-apex-text-muted text-lg leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
              <button
                onClick={onEnter}
                className="group px-10 py-5 bg-apex-forest text-white font-bold rounded-full hover:bg-apex-forest/90 transition-all flex items-center gap-3 shadow-xl shadow-apex-forest/20"
              >
                Launch Platform <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
            <div className="relative">
              <motion.div 
                animate={{ 
                  rotate: [0, 5, 0],
                  y: [0, -10, 0]
                }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                className="bg-apex-bg p-12 rounded-[60px] border border-black/5 relative z-10 shadow-xl"
              >
                <div className="space-y-8">
                  <div className="flex items-center justify-between">
                    <div className="flex gap-2">
                      <div className="w-3 h-3 rounded-full bg-apex-red" />
                      <div className="w-3 h-3 rounded-full bg-apex-amber" />
                      <div className="w-3 h-3 rounded-full bg-apex-green" />
                    </div>
                    <div className="text-[10px] font-display text-apex-text-muted uppercase tracking-widest font-bold">System Status: Optimal</div>
                  </div>
                  <div className="space-y-4">
                    <div className="h-2 w-full bg-black/5 rounded-full overflow-hidden">
                      <motion.div 
                        animate={{ width: ['20%', '80%', '40%', '90%'] }}
                        transition={{ duration: 10, repeat: Infinity }}
                        className="h-full bg-apex-forest" 
                      />
                    </div>
                    <div className="h-2 w-2/3 bg-black/5 rounded-full overflow-hidden">
                      <motion.div 
                        animate={{ width: ['60%', '30%', '70%', '50%'] }}
                        transition={{ duration: 8, repeat: Infinity }}
                        className="h-full bg-apex-mint" 
                      />
                    </div>
                  </div>
                  <div className="aspect-video w-full bg-white rounded-3xl border border-black/5 flex items-center justify-center relative group overflow-hidden shadow-inner">
                    <div className="absolute inset-0 bg-gradient-to-t from-apex-forest/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                    <Zap className="w-16 h-16 text-apex-forest animate-pulse relative z-10" />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="h-12 rounded-2xl bg-white border border-black/5" />
                    <div className="h-12 rounded-2xl bg-white border border-black/5" />
                  </div>
                </div>
              </motion.div>
              {/* Decorative background elements */}
              <div className="absolute -top-10 -right-10 w-40 h-40 bg-apex-forest/10 blur-[80px] rounded-full" />
              <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-apex-mint/20 blur-[80px] rounded-full" />
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-24 border-t border-apex-forest/5 text-center space-y-8 bg-white">
        <div className="flex items-center justify-center gap-2">
          <div className="w-6 h-6 bg-apex-forest rounded-md flex items-center justify-center">
            <div className="w-3 h-3 border border-white rounded-sm rotate-45" />
          </div>
          <span className="font-display font-bold text-xl tracking-tight text-apex-forest">Apex Flow</span>
        </div>
        <div className="text-[10px] uppercase tracking-[0.5em] text-apex-text-muted font-bold">
          Caterpillar Electric Power Division • Global Decision Intelligence Platform
        </div>
        <div className="flex justify-center gap-8 text-apex-text-muted text-[10px] font-bold uppercase tracking-widest">
          <span>Privacy Policy</span>
          <span>Terms of Service</span>
          <span>Security Architecture</span>
        </div>
      </footer>
    </motion.div>
  );
}
