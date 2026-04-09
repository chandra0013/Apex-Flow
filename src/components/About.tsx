import { motion } from 'motion/react';
import { Shield, Zap, Cpu, Database, Network, Globe, BrainCircuit, BarChart3, Settings, Server } from 'lucide-react';
import { cn } from '@/src/lib/utils';

export default function About() {
  return (
    <div className="pt-24 pb-24 max-w-6xl mx-auto px-6">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center space-y-8 mb-32"
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="inline-block px-6 py-2 rounded-full bg-apex-mint-light border border-apex-mint/30 text-[10px] uppercase tracking-[0.4em] font-bold text-apex-forest mb-6 shadow-sm"
        >
          Operational Excellence
        </motion.div>
        <h1 className="text-8xl md:text-[10rem] font-display font-bold tracking-tighter leading-none text-apex-forest">
          Apex <span className="text-apex-text-muted opacity-30">Flow</span>
        </h1>
        <p className="text-2xl md:text-4xl text-apex-text-muted font-medium max-w-4xl mx-auto leading-tight tracking-tight italic">
          "Bridging the gap between heavy-duty reliability and race-day precision for Caterpillar's Electric Power division."
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-32 items-center mb-56">
        <motion.div 
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="space-y-12"
        >
          <div className="space-y-6">
            <h2 className="text-6xl font-display font-bold tracking-tight text-apex-forest">The Mission</h2>
            <p className="text-xl text-apex-text-muted leading-relaxed font-medium">
              In the world of high-output power generation, a single missing component can halt a multi-billion dollar project. Apex Flow was engineered to provide the Electric Power division with the same level of data precision found in Formula 1 telemetry, applied to the scale of global heavy industry.
            </p>
          </div>
          <div className="space-y-8">
            {[
              { icon: Shield, title: 'Predictive Resilience', desc: 'Moving from reactive fire-fighting to proactive risk avoidance using Tier 3 supplier mapping.' },
              { icon: Zap, title: 'Decision Velocity', desc: 'Reducing the "Data-to-Decision" cycle from 72 hours to under 45 seconds.' },
              { icon: Globe, title: 'Global Synchronization', desc: 'Unified operational reality across 40+ manufacturing facilities and 1,200+ suppliers.' },
            ].map((item, i) => (
              <div key={item.title} className="flex gap-8 group">
                <div className="w-16 h-16 rounded-[20px] bg-white border border-black/5 flex items-center justify-center flex-shrink-0 group-hover:bg-apex-forest group-hover:text-white transition-all card-shadow">
                  <item.icon className="w-8 h-8 text-apex-forest transition-all" />
                </div>
                <div>
                  <h4 className="text-2xl font-bold text-apex-forest mb-2">{item.title}</h4>
                  <p className="text-apex-text-muted leading-relaxed font-medium">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
        
        <motion.div 
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="relative aspect-square"
        >
          <div className="absolute inset-0 bg-apex-mint/20 blur-[150px] rounded-full" />
          <div className="relative bg-white h-full w-full rounded-[80px] flex items-center justify-center p-20 overflow-hidden border border-black/5 card-shadow">
            <div className="grid grid-cols-2 gap-12 w-full">
              {[Database, Network, Cpu, BrainCircuit].map((Icon, i) => (
                <motion.div 
                  key={i} 
                  whileHover={{ scale: 1.05, y: -5 }}
                  className="aspect-square bg-apex-bg rounded-[40px] flex items-center justify-center group hover:bg-apex-forest transition-all border border-black/5"
                >
                  <Icon className="w-16 h-16 text-apex-forest group-hover:text-white transition-all" />
                </motion.div>
              ))}
            </div>
            {/* Animated SVG background */}
            <div className="absolute inset-0 pointer-events-none opacity-5">
              <svg className="w-full h-full" viewBox="0 0 100 100">
                <motion.path
                  d="M 25 25 L 75 75 M 75 25 L 25 75"
                  stroke="#1B4332"
                  strokeWidth="0.5"
                  fill="none"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                />
              </svg>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Architecture Section */}
      <section className="space-y-20 mb-56">
        <div className="text-center space-y-6">
          <h2 className="text-6xl font-display font-bold tracking-tight text-apex-forest">System Architecture</h2>
          <p className="text-2xl text-apex-text-muted max-w-2xl mx-auto font-medium">A multi-layered approach to supply chain intelligence.</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {[
            { icon: Server, title: 'Data Layer', desc: 'Real-time ingestion from SAP, Oracle, and external logistics APIs via high-throughput pipelines.' },
            { icon: Settings, title: 'Processing Engine', desc: 'Proprietary simulation models running on distributed clusters for sub-second scenario analysis.' },
            { icon: BarChart3, title: 'Intelligence Layer', desc: 'Gemini-powered reasoning engine that translates complex data into executive-ready insights.' },
          ].map((layer, i) => (
            <motion.div
              key={layer.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.2 }}
              className="bg-white p-16 rounded-[60px] border border-black/5 space-y-8 card-shadow"
            >
              <div className="w-20 h-20 rounded-[28px] bg-apex-mint-light flex items-center justify-center">
                <layer.icon className="w-10 h-10 text-apex-forest" />
              </div>
              <h3 className="text-3xl font-bold text-apex-forest">{layer.title}</h3>
              <p className="text-apex-text-muted leading-relaxed font-medium text-lg">{layer.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Tech Stack Section */}
      <motion.div 
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="bg-apex-forest p-20 rounded-[80px] text-center space-y-20 relative overflow-hidden shadow-2xl shadow-apex-forest/30"
      >
        <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent pointer-events-none" />
        <h2 className="text-5xl font-display font-bold relative z-10 text-white">The Apex Tech Stack</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-16 relative z-10">
          {[
            { label: 'Intelligence', value: 'Gemini 2.0 Flash' },
            { label: 'Framework', value: 'React 19 / Vite' },
            { label: 'Animation', value: 'Motion 12' },
            { label: 'Styling', value: 'Tailwind 4' },
          ].map(tech => (
            <div key={tech.label} className="space-y-4">
              <div className="text-[10px] uppercase tracking-[0.5em] text-white/40 font-bold">{tech.label}</div>
              <div className="text-3xl font-display font-bold text-white">{tech.value}</div>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
