import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { 
  Sliders, Play, RefreshCcw, 
  TrendingUp, TrendingDown, 
  AlertTriangle, DollarSign, Calendar
} from 'lucide-react';
import { 
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer 
} from 'recharts';
import { cn } from '@/src/lib/utils';

const initialData = [
  { day: 'W1', baseline: 40, simulated: 40 },
  { day: 'W2', baseline: 45, simulated: 45 },
  { day: 'W3', baseline: 42, simulated: 42 },
  { day: 'W4', baseline: 50, simulated: 50 },
  { day: 'W5', baseline: 55, simulated: 55 },
  { day: 'W6', baseline: 60, simulated: 60 },
  { day: 'W7', baseline: 58, simulated: 58 },
  { day: 'W8', baseline: 65, simulated: 65 },
];

export default function ScenarioSimulator() {
  const [delay, setDelay] = useState(0);
  const [demand, setDemand] = useState(0);
  const [inventory, setInventory] = useState(0);
  const [simData, setSimData] = useState(initialData);

  useEffect(() => {
    // Simple simulation logic
    const newData = initialData.map(d => ({
      ...d,
      simulated: d.baseline + (delay * 2) + (demand * 1.5) - (inventory * 0.5)
    }));
    setSimData(newData);
  }, [delay, demand, inventory]);

  const kpis = [
    { label: 'Projected Risk', value: `${Math.round(65 + (delay * 1.2) + (demand * 0.8))}%`, trend: delay + demand > 0 ? 1 : -1, color: 'text-apex-red', bg: 'bg-apex-red/10' },
    { label: 'Exposure Impact', value: `$${(14.2 + (demand * 0.4)).toFixed(1)}M`, trend: demand > 0 ? 1 : -1, color: 'text-apex-forest', bg: 'bg-apex-mint/30' },
    { label: 'Stockout Date', value: `May ${Math.max(1, 24 - delay)}`, trend: delay > 0 ? 1 : -1, color: 'text-apex-forest', bg: 'bg-apex-mint-light' },
  ];

  return (
    <div className="pt-24 pb-12">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Control Panel */}
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="lg:col-span-4 space-y-6"
        >
          <div className="bg-apex-card p-10 rounded-[40px] card-shadow space-y-10">
            <div className="flex justify-between items-center">
              <h3 className="font-display font-bold text-2xl flex items-center gap-3 text-apex-forest">
                <Sliders className="w-6 h-6" /> Simulation Inputs
              </h3>
              <button 
                onClick={() => { setDelay(0); setDemand(0); setInventory(0); }}
                className="p-2.5 hover:bg-apex-bg rounded-full transition-all text-apex-text-muted hover:text-apex-forest"
              >
                <RefreshCcw className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-12">
              {/* Supplier Delay */}
              <div className="space-y-5">
                <div className="flex justify-between items-center">
                  <label className="text-sm font-bold text-apex-text-muted uppercase tracking-widest">Supplier Delay</label>
                  <span className="font-display font-bold text-xl text-apex-forest">+{delay} Days</span>
                </div>
                <input 
                  type="range" min="0" max="30" value={delay}
                  onChange={(e) => setDelay(parseInt(e.target.value))}
                  className="w-full h-2 bg-apex-bg rounded-lg appearance-none cursor-pointer accent-apex-forest"
                />
                <div className="flex justify-between text-[10px] text-apex-text-muted font-bold uppercase tracking-widest">
                  <span>On-Time</span>
                  <span>Critical Delay</span>
                </div>
              </div>

              {/* Demand Increase */}
              <div className="space-y-5">
                <div className="flex justify-between items-center">
                  <label className="text-sm font-bold text-apex-text-muted uppercase tracking-widest">Demand Increase</label>
                  <span className="font-display font-bold text-xl text-apex-forest">+{demand}%</span>
                </div>
                <input 
                  type="range" min="0" max="50" value={demand}
                  onChange={(e) => setDemand(parseInt(e.target.value))}
                  className="w-full h-2 bg-apex-bg rounded-lg appearance-none cursor-pointer accent-apex-mint"
                />
                <div className="flex justify-between text-[10px] text-apex-text-muted font-bold uppercase tracking-widest">
                  <span>Baseline</span>
                  <span>Surge</span>
                </div>
              </div>

              {/* Inventory Transfer */}
              <div className="space-y-5">
                <div className="flex justify-between items-center">
                  <label className="text-sm font-bold text-apex-text-muted uppercase tracking-widest">Inventory Transfer</label>
                  <span className="font-display font-bold text-xl text-apex-forest">{inventory} Units</span>
                </div>
                <input 
                  type="range" min="0" max="1000" step="50" value={inventory}
                  onChange={(e) => setInventory(parseInt(e.target.value))}
                  className="w-full h-2 bg-apex-bg rounded-lg appearance-none cursor-pointer accent-apex-green"
                />
                <div className="flex justify-between text-[10px] text-apex-text-muted font-bold uppercase tracking-widest">
                  <span>None</span>
                  <span>Max Capacity</span>
                </div>
              </div>
            </div>

            <div className="pt-6">
              <button className="w-full py-5 rounded-2xl bg-apex-forest text-white font-bold flex items-center justify-center gap-3 hover:opacity-90 transition-all shadow-xl shadow-apex-forest/20 text-lg">
                <Play className="w-5 h-5 fill-current" /> Run Advanced Simulation
              </button>
            </div>
          </div>

          {/* Impact Summary Card */}
          <div className="bg-apex-mint-light p-10 rounded-[40px] border border-apex-mint/30 card-shadow">
            <h4 className="font-display font-bold text-apex-forest mb-4 flex items-center gap-3 text-lg">
              <AlertTriangle className="w-5 h-5" /> Impact Summary
            </h4>
            <p className="text-base text-apex-text leading-relaxed font-medium">
              Based on current inputs, the Lafayette plant will face a <span className="text-apex-red font-bold">critical stockout</span> by May 18th. Recommended action is to transfer 400 units from the Peoria hub to mitigate 60% of the risk.
            </p>
          </div>
        </motion.div>

        {/* Right Results Panel */}
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="lg:col-span-8 space-y-8"
        >
          {/* Simulation KPIs */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {kpis.map((kpi, i) => (
              <motion.div
                key={kpi.label}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="bg-apex-card p-8 rounded-[32px] card-shadow"
              >
                <div className="text-[10px] uppercase tracking-widest text-apex-text-muted font-bold mb-3">{kpi.label}</div>
                <div className={cn("text-4xl font-display font-bold flex items-center gap-4", kpi.color)}>
                  {kpi.value}
                  {kpi.trend > 0 ? <TrendingUp className="w-6 h-6" /> : <TrendingDown className="w-6 h-6" />}
                </div>
              </motion.div>
            ))}
          </div>

          {/* Simulation Graph */}
          <div className="bg-apex-card p-10 rounded-[40px] card-shadow">
            <div className="flex justify-between items-center mb-10">
              <h3 className="font-display font-bold text-2xl text-apex-forest">Risk Projection Comparison</h3>
              <div className="flex gap-6">
                <div className="flex items-center gap-3">
                  <div className="w-4 h-4 rounded-full bg-black/10" />
                  <span className="text-sm font-bold text-apex-text-muted">Baseline</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-4 h-4 rounded-full bg-apex-forest" />
                  <span className="text-sm font-bold text-apex-text-muted">Simulated</span>
                </div>
              </div>
            </div>
            <div className="h-[450px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={simData}>
                  <defs>
                    <linearGradient id="colorSim" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#1B4332" stopOpacity={0.1}/>
                      <stop offset="95%" stopColor="#1B4332" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(27, 67, 50, 0.05)" vertical={false} />
                  <XAxis 
                    dataKey="day" 
                    axisLine={false} 
                    tickLine={false} 
                    tick={{ fill: '#52796F', fontSize: 12, fontWeight: 600 }}
                  />
                  <YAxis 
                    axisLine={false} 
                    tickLine={false} 
                    tick={{ fill: '#52796F', fontSize: 12, fontWeight: 600 }}
                  />
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#fff', border: 'none', borderRadius: '16px', boxShadow: '0 10px 30px rgba(0,0,0,0.1)' }}
                    itemStyle={{ color: '#1B4332' }}
                  />
                  <Area 
                    type="monotone" 
                    dataKey="baseline" 
                    stroke="rgba(27, 67, 50, 0.2)" 
                    strokeWidth={2}
                    strokeDasharray="5 5"
                    fill="transparent" 
                  />
                  <Area 
                    type="monotone" 
                    dataKey="simulated" 
                    stroke="#1B4332" 
                    strokeWidth={4}
                    fillOpacity={1} 
                    fill="url(#colorSim)" 
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
