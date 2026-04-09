import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Search, Filter, ChevronRight, X, 
  TrendingUp, TrendingDown, Info, 
  AlertCircle, CheckCircle2, Clock 
} from 'lucide-react';
import { cn } from '@/src/lib/utils';
import { Part, RiskBand } from '@/src/types';

const mockParts: Part[] = [
  { id: 'CAT-9X-2201', plant: 'Peoria', riskScore: 92, riskBand: 'Red', daysOfCover: 4, leadTime: 45, criticality: 'High', recommendedAction: 'Expedite shipment from alternative supplier' },
  { id: 'CAT-4T-8832', plant: 'Decatur', riskScore: 78, riskBand: 'Amber', daysOfCover: 12, leadTime: 30, criticality: 'High', recommendedAction: 'Review safety stock levels' },
  { id: 'CAT-1A-0045', plant: 'Lafayette', riskScore: 95, riskBand: 'Red', daysOfCover: 2, leadTime: 60, criticality: 'High', recommendedAction: 'Immediate production line reallocation' },
  { id: 'CAT-7G-1190', plant: 'Aurora', riskScore: 45, riskBand: 'Green', daysOfCover: 28, leadTime: 15, criticality: 'Medium', recommendedAction: 'No action required' },
  { id: 'CAT-2B-5567', plant: 'Seguin', riskScore: 62, riskBand: 'Amber', daysOfCover: 18, leadTime: 40, criticality: 'Medium', recommendedAction: 'Monitor supplier performance' },
  { id: 'CAT-8H-9901', plant: 'Wuxi', riskScore: 32, riskBand: 'Green', daysOfCover: 35, leadTime: 20, criticality: 'Low', recommendedAction: 'No action required' },
  { id: 'CAT-3K-4412', plant: 'Piracicaba', riskScore: 88, riskBand: 'Red', daysOfCover: 6, leadTime: 55, criticality: 'High', recommendedAction: 'Contact logistics partner for status update' },
];

export default function RiskExplorer() {
  const [selectedPart, setSelectedPart] = useState<Part | null>(null);
  const [filter, setFilter] = useState<RiskBand | 'All'>('All');

  const filteredParts = filter === 'All' 
    ? mockParts 
    : mockParts.filter(p => p.riskBand === filter);

  return (
    <div className="pt-24 pb-12 relative min-h-screen">
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Filters Panel */}
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="w-full lg:w-64 space-y-6"
        >
          <div className="bg-apex-card p-8 rounded-[32px] card-shadow space-y-8">
            <h3 className="font-display font-bold text-xl flex items-center gap-2 text-apex-forest">
              <Filter className="w-5 h-5" /> Filters
            </h3>
            
            <div className="space-y-6">
              <div>
                <label className="text-[10px] uppercase tracking-widest text-apex-text-muted font-bold mb-3 block">Risk Band</label>
                <div className="space-y-2">
                  {['All', 'Red', 'Amber', 'Green'].map((b) => (
                    <button
                      key={b}
                      onClick={() => setFilter(b as any)}
                      className={cn(
                        "w-full text-left px-4 py-2.5 rounded-xl text-sm font-semibold transition-all flex items-center justify-between",
                        filter === b ? "bg-apex-forest text-white shadow-lg shadow-apex-forest/20" : "hover:bg-apex-mint/10 text-apex-text-muted"
                      )}
                    >
                      {b}
                      {filter === b && <div className="w-1.5 h-1.5 rounded-full bg-white" />}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="text-[10px] uppercase tracking-widest text-apex-text-muted font-bold mb-3 block">Plant Location</label>
                <select className="w-full bg-apex-bg border border-black/5 rounded-xl px-4 py-2.5 text-sm font-semibold focus:outline-none focus:border-apex-forest/30 text-apex-text">
                  <option>All Locations</option>
                  <option>Peoria</option>
                  <option>Decatur</option>
                  <option>Lafayette</option>
                </select>
              </div>

              <div>
                <label className="text-[10px] uppercase tracking-widest text-apex-text-muted font-bold mb-3 block">Criticality</label>
                <div className="flex gap-2">
                  {['High', 'Med', 'Low'].map(c => (
                    <button key={c} className="flex-1 py-2.5 rounded-xl bg-apex-bg border border-black/5 text-[10px] font-bold uppercase hover:bg-apex-mint/20 transition-all text-apex-text-muted">
                      {c}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Table Area */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex-1 overflow-hidden"
        >
          <div className="bg-apex-card rounded-[40px] overflow-hidden card-shadow border border-black/5">
            <div className="overflow-x-auto no-scrollbar">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-apex-forest/5">
                    <th className="px-8 py-5 text-[10px] uppercase tracking-widest text-apex-text-muted font-bold">Part ID</th>
                    <th className="px-8 py-5 text-[10px] uppercase tracking-widest text-apex-text-muted font-bold">Plant</th>
                    <th className="px-8 py-5 text-[10px] uppercase tracking-widest text-apex-text-muted font-bold">Risk Score</th>
                    <th className="px-8 py-5 text-[10px] uppercase tracking-widest text-apex-text-muted font-bold">Days of Cover</th>
                    <th className="px-8 py-5 text-[10px] uppercase tracking-widest text-apex-text-muted font-bold">Lead Time</th>
                    <th className="px-8 py-5 text-[10px] uppercase tracking-widest text-apex-text-muted font-bold">Criticality</th>
                    <th className="px-8 py-5 text-[10px] uppercase tracking-widest text-apex-text-muted font-bold"></th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-black/5">
                  {filteredParts.map((part) => (
                    <tr 
                      key={part.id}
                      onClick={() => setSelectedPart(part)}
                      className={cn(
                        "group hover:bg-apex-mint/5 transition-all cursor-pointer",
                        selectedPart?.id === part.id && "bg-apex-mint/10"
                      )}
                    >
                      <td className="px-8 py-6 font-display font-bold text-sm text-apex-forest">{part.id}</td>
                      <td className="px-8 py-6 text-sm font-medium text-apex-text-muted">{part.plant}</td>
                      <td className="px-8 py-6">
                        <div className="flex items-center gap-4">
                          <div className="w-16 h-2 bg-black/5 rounded-full overflow-hidden">
                            <motion.div 
                              initial={{ width: 0 }}
                              animate={{ width: `${part.riskScore}%` }}
                              className={cn(
                                "h-full rounded-full",
                                part.riskBand === 'Red' ? "bg-apex-red" : part.riskBand === 'Amber' ? "bg-apex-amber" : "bg-apex-forest"
                              )}
                            />
                          </div>
                          <span className={cn(
                            "font-display font-bold text-xs",
                            part.riskBand === 'Red' ? "text-apex-red" : part.riskBand === 'Amber' ? "text-apex-amber" : "text-apex-forest"
                          )}>
                            {part.riskScore}
                          </span>
                        </div>
                      </td>
                      <td className="px-8 py-6 font-display font-bold text-sm text-apex-text">{part.daysOfCover}d</td>
                      <td className="px-8 py-6 font-display font-bold text-sm text-apex-text">{part.leadTime}d</td>
                      <td className="px-8 py-6">
                        <span className={cn(
                          "px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider",
                          part.criticality === 'High' ? "bg-apex-red/10 text-apex-red" : "bg-apex-mint/20 text-apex-forest"
                        )}>
                          {part.criticality}
                        </span>
                      </td>
                      <td className="px-8 py-6 text-right">
                        <div className="w-8 h-8 rounded-full border border-black/5 flex items-center justify-center group-hover:bg-apex-forest group-hover:text-white transition-all">
                          <ChevronRight className="w-4 h-4" />
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Side Panel */}
      <AnimatePresence>
        {selectedPart && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedPart(null)}
              className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[60]"
            />
            <motion.div 
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed right-0 top-0 h-full w-full max-w-md glass z-[70] p-8 overflow-y-auto no-scrollbar"
            >
              <div className="flex justify-between items-center mb-8">
                <h2 className="text-2xl font-display font-bold">Part Details</h2>
                <button 
                  onClick={() => setSelectedPart(null)}
                  className="p-2 hover:bg-white/10 rounded-full transition-all"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              <div className="space-y-8">
                {/* Header Info */}
                <div className="flex items-center gap-6 p-8 rounded-[32px] bg-apex-bg border border-black/5">
                  <div className={cn(
                    "w-20 h-20 rounded-[24px] flex items-center justify-center shadow-lg",
                    selectedPart.riskBand === 'Red' ? "bg-apex-red text-white shadow-apex-red/20" : "bg-apex-amber text-white shadow-apex-amber/20"
                  )}>
                    <AlertCircle className="w-10 h-10" />
                  </div>
                  <div>
                    <div className="font-display text-2xl font-bold text-apex-forest">{selectedPart.id}</div>
                    <div className="text-apex-text-muted text-sm font-semibold">{selectedPart.plant} Plant • {selectedPart.criticality} Criticality</div>
                  </div>
                </div>

                {/* Metrics Grid */}
                <div className="grid grid-cols-2 gap-6">
                  <div className="bg-apex-card p-6 rounded-[24px] card-shadow border border-black/5">
                    <div className="text-[10px] uppercase tracking-widest text-apex-text-muted font-bold mb-2">Days of Cover</div>
                    <div className="text-3xl font-display font-bold flex items-center gap-3 text-apex-forest">
                      {selectedPart.daysOfCover}
                      <TrendingDown className="w-5 h-5 text-apex-red" />
                    </div>
                  </div>
                  <div className="bg-apex-card p-6 rounded-[24px] card-shadow border border-black/5">
                    <div className="text-[10px] uppercase tracking-widest text-apex-text-muted font-bold mb-2">Lead Time</div>
                    <div className="text-3xl font-display font-bold flex items-center gap-3 text-apex-forest">
                      {selectedPart.leadTime}
                      <Clock className="w-5 h-5 text-apex-text-muted" />
                    </div>
                  </div>
                </div>

                {/* AI Explanation */}
                <div className="space-y-4">
                  <h3 className="font-display font-bold text-xl flex items-center gap-2 text-apex-forest">
                    <Zap className="w-5 h-5 text-apex-forest" /> AI Analysis
                  </h3>
                  <div className="bg-apex-mint-light p-8 rounded-[32px] border border-apex-mint/30 relative overflow-hidden card-shadow">
                    <div className="absolute top-0 right-0 p-6 opacity-5 text-apex-forest">
                      <Zap className="w-16 h-16" />
                    </div>
                    <p className="text-base leading-relaxed text-apex-text mb-6 font-medium">
                      The risk score for <span className="text-apex-forest font-bold">{selectedPart.id}</span> has increased by 15% due to a logistics bottleneck at the Shanghai port. Current inventory will be depleted in 4 days.
                    </p>
                    <div className="space-y-3">
                      <div className="flex items-start gap-3 text-sm font-semibold text-apex-text-muted">
                        <div className="w-2 h-2 rounded-full bg-apex-forest mt-1.5" />
                        <span>Alternative supplier in Vietnam has 500 units available.</span>
                      </div>
                      <div className="flex items-start gap-3 text-sm font-semibold text-apex-text-muted">
                        <div className="w-2 h-2 rounded-full bg-apex-forest mt-1.5" />
                        <span>Air freight cost impact: +$12,400.</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Recommended Action */}
                <div className="space-y-4">
                  <h3 className="font-display font-bold text-xl text-apex-forest">Recommended Action</h3>
                  <div className="p-8 rounded-[32px] bg-apex-red/5 border border-apex-red/20 card-shadow">
                    <p className="text-base font-bold text-apex-red mb-6">{selectedPart.recommendedAction}</p>
                    <button className="w-full py-4 rounded-2xl bg-apex-red text-white font-bold text-base hover:bg-apex-red/90 transition-all shadow-xl shadow-apex-red/20">
                      Execute Action
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}

import { Zap } from 'lucide-react';
