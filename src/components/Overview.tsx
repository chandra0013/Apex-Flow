import { motion } from 'motion/react';
import { 
  PieChart, Pie, Cell, ResponsiveContainer, 
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip,
  AreaChart, Area 
} from 'recharts';
import { ArrowUpRight, ArrowDownRight, AlertTriangle, ShieldCheck, Zap } from 'lucide-react';

const riskData = [
  { name: 'Red', value: 12, color: '#EF4444' },
  { name: 'Amber', value: 25, color: '#F59E0B' },
  { name: 'Green', value: 63, color: '#10B981' },
];

const trendData = [
  { day: '01', risk: 45 },
  { day: '05', risk: 52 },
  { day: '10', risk: 48 },
  { day: '15', risk: 61 },
  { day: '20', risk: 55 },
  { day: '25', risk: 42 },
  { day: '30', risk: 38 },
];

const criticalParts = [
  { id: 'CAT-9X-2201', risk: 'Critical', exposure: '$1.2M', plant: 'Peoria' },
  { id: 'CAT-4T-8832', risk: 'High', exposure: '$850K', plant: 'Decatur' },
  { id: 'CAT-1A-0045', risk: 'Critical', exposure: '$2.4M', plant: 'Lafayette' },
  { id: 'CAT-7G-1190', risk: 'Medium', exposure: '$420K', plant: 'Aurora' },
];

export default function Overview() {
  return (
    <div className="space-y-8 pt-24 pb-12">
      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { label: 'Total Parts at Risk', value: '142', icon: AlertTriangle, color: 'text-apex-red', bg: 'bg-apex-red/10', trend: 12 },
          { label: 'Risk Band Distribution', value: '12 / 25 / 63', icon: ShieldCheck, color: 'text-apex-forest', bg: 'bg-apex-mint/30' },
          { label: 'Total Exposure', value: '$14.2M', icon: Zap, color: 'text-white', bg: 'bg-apex-forest', trend: -8 },
          { label: 'Avg Days of Cover', value: '18.4', icon: ShieldCheck, color: 'text-apex-forest', bg: 'bg-apex-mint-light' },
        ].map((kpi, i) => (
          <motion.div
            key={kpi.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className={cn(
              "p-8 rounded-[32px] card-shadow transition-all duration-300 hover:-translate-y-1",
              kpi.label === 'Total Exposure' ? "bg-apex-forest text-white" : "bg-apex-card text-apex-text"
            )}
          >
            <div className="flex justify-between items-start mb-6">
              <div className={cn("p-3 rounded-2xl", kpi.bg)}>
                <kpi.icon className={cn("w-6 h-6", kpi.label === 'Total Exposure' ? "text-white" : kpi.color)} />
              </div>
              {kpi.trend && (
                <div className={cn(
                  "flex items-center text-xs font-bold px-2 py-1 rounded-full",
                  kpi.trend > 0 ? "bg-apex-red/10 text-apex-red" : "bg-apex-green/10 text-apex-green"
                )}>
                  {kpi.trend > 0 ? <ArrowUpRight className="w-3 h-3 mr-1" /> : <ArrowDownRight className="w-3 h-3 mr-1" />}
                  {Math.abs(kpi.trend)}%
                </div>
              )}
            </div>
            <div className="space-y-1">
              <p className={cn("text-xs uppercase tracking-[0.2em] font-bold", kpi.label === 'Total Exposure' ? "text-white/60" : "text-apex-text-muted")}>
                {kpi.label}
              </p>
              <p className="text-4xl font-display font-bold">{kpi.value}</p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Risk Distribution */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4 }}
          className="bg-apex-card p-10 rounded-[40px] card-shadow lg:col-span-1"
        >
          <h3 className="text-2xl font-display font-bold mb-8 text-apex-forest">Risk Distribution</h3>
          <div className="h-[300px] w-full relative">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={riskData}
                  innerRadius={85}
                  outerRadius={110}
                  paddingAngle={0}
                  dataKey="value"
                  stroke="none"
                  cornerRadius={10}
                  startAngle={90}
                  endAngle={450}
                >
                  {riskData.map((entry, index) => (
                    <Cell 
                      key={`cell-${index}`} 
                      fill={entry.name === 'Red' ? 'url(#stripePattern)' : entry.color} 
                    />
                  ))}
                </Pie>
                <defs>
                  <pattern id="stripePattern" patternUnits="userSpaceOnUse" width="10" height="10" patternTransform="rotate(45)">
                    <line x1="0" y1="0" x2="0" y2="10" stroke="#EF4444" strokeWidth="5" opacity="0.2" />
                  </pattern>
                </defs>
                <Tooltip 
                  contentStyle={{ backgroundColor: '#fff', border: 'none', borderRadius: '16px', boxShadow: '0 10px 30px rgba(0,0,0,0.1)' }}
                  itemStyle={{ color: '#1B4332' }}
                />
              </PieChart>
            </ResponsiveContainer>
            <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
              <span className="text-apex-text-muted text-xs uppercase tracking-widest font-bold">Total Parts</span>
              <span className="text-5xl font-display font-bold text-apex-forest">1,420</span>
            </div>
          </div>
          <div className="grid grid-cols-3 gap-4 mt-10">
            {riskData.map(item => (
              <div key={item.name} className="text-center">
                <div className="text-xs text-apex-text-muted font-bold uppercase tracking-widest mb-2">{item.name}</div>
                <div className="flex items-center justify-center gap-2">
                  <div className={cn("w-3 h-3 rounded-full", item.name === 'Red' ? "bg-stripes border border-apex-red/20" : "")} style={{ backgroundColor: item.name === 'Red' ? 'transparent' : item.color }} />
                  <div className="font-display font-bold text-xl text-apex-forest">{item.value}%</div>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Top Critical Parts */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5 }}
          className="bg-apex-card p-10 rounded-[40px] card-shadow lg:col-span-2"
        >
          <div className="flex justify-between items-center mb-10">
            <h3 className="text-2xl font-display font-bold text-apex-forest">Top Critical Parts</h3>
            <button className="px-6 py-2 rounded-full border border-apex-forest/10 text-apex-forest text-sm font-bold hover:bg-apex-forest hover:text-white transition-all">
              View All
            </button>
          </div>
          <div className="space-y-4">
            {criticalParts.map((part, i) => (
              <div 
                key={part.id}
                className="flex items-center justify-between p-6 rounded-[24px] bg-apex-bg hover:bg-apex-mint/10 transition-all cursor-pointer group border border-transparent hover:border-apex-mint/20"
              >
                <div className="flex items-center gap-6">
                  <div className="w-12 h-12 rounded-2xl bg-white flex items-center justify-center font-display text-sm font-bold text-apex-forest shadow-sm">
                    {i + 1}
                  </div>
                  <div>
                    <div className="font-display font-bold text-lg text-apex-forest">{part.id}</div>
                    <div className="text-sm text-apex-text-muted font-medium">{part.plant} Plant</div>
                  </div>
                </div>
                <div className="flex items-center gap-12">
                  <div className="text-right">
                    <div className="text-[10px] text-apex-text-muted uppercase tracking-[0.2em] font-bold mb-1">Exposure</div>
                    <div className="font-display font-bold text-xl text-apex-forest">{part.exposure}</div>
                  </div>
                  <div className={cn(
                    "px-4 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-widest",
                    part.risk === 'Critical' ? "bg-apex-red/10 text-apex-red" : "bg-apex-amber/10 text-apex-amber"
                  )}>
                    {part.risk}
                  </div>
                  <div className="w-10 h-10 rounded-full border border-apex-forest/10 flex items-center justify-center group-hover:bg-apex-forest group-hover:text-white transition-all">
                    <ArrowUpRight className="w-5 h-5" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Bottom Trend Chart */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="bg-apex-card p-10 rounded-[40px] card-shadow"
      >
        <div className="flex justify-between items-center mb-10">
          <div>
            <h3 className="text-2xl font-display font-bold text-apex-forest">Risk Trend Analysis</h3>
            <p className="text-sm text-apex-text-muted font-medium">Aggregated supply chain risk score over the last 30 days</p>
          </div>
          <div className="flex gap-2 bg-apex-bg p-1 rounded-2xl">
            {['7D', '30D', '90D', 'YTD'].map(p => (
              <button 
                key={p}
                className={cn(
                  "px-6 py-2 rounded-xl text-xs font-bold transition-all",
                  p === '30D' ? "bg-white text-apex-forest shadow-sm" : "text-apex-text-muted hover:text-apex-forest"
                )}
              >
                {p}
              </button>
            ))}
          </div>
        </div>
        <div className="h-[350px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={trendData}>
              <defs>
                <linearGradient id="colorRisk" x1="0" y1="0" x2="0" y2="1">
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
                dataKey="risk" 
                stroke="#1B4332" 
                strokeWidth={4}
                fillOpacity={1} 
                fill="url(#colorRisk)" 
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </motion.div>
    </div>
  );
}

import { cn } from '@/src/lib/utils';
