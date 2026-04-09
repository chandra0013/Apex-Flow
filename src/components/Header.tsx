import React, { useState } from 'react';
import { Search, Bell, User } from 'lucide-react';
import { motion } from 'motion/react';
import { cn } from '@/src/lib/utils';

interface HeaderProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  onLogoClick: () => void;
}

const tabs = [
  'Overview',
  'Risk Explorer',
  'Part Deep Dive',
  'Scenario Simulator',
  'Insights (AI)',
  'About',
];

export default function Header({ activeTab, setActiveTab, onLogoClick }: HeaderProps) {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const query = searchQuery.toLowerCase().trim();
    
    if (query.includes('risk explorer')) {
      setActiveTab('Risk Explorer');
    } else if (query.includes('risk band') || query.includes('distribution') || query.includes('metrics')) {
      setActiveTab('Overview');
    } else if (query.includes('scenario') || query.includes('simulator')) {
      setActiveTab('Scenario Simulator');
    } else if (query.includes('insight') || query.includes('ai')) {
      setActiveTab('Insights (AI)');
    } else if (query.includes('about')) {
      setActiveTab('About');
    } else if (query.includes('part') || query.includes('deep dive')) {
      setActiveTab('Part Deep Dive');
    }
    
    setSearchQuery('');
  };

  return (
    <motion.header
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="fixed top-6 left-1/2 -translate-x-1/2 z-50 w-[95%] max-w-7xl"
    >
      <div className="bg-white/90 backdrop-blur-xl border border-black/5 rounded-full px-6 py-3 flex items-center justify-between gap-4 shadow-xl">
        {/* Logo */}
        <button 
          onClick={onLogoClick}
          className="flex items-center gap-2 min-w-fit hover:opacity-80 transition-opacity group"
        >
          <div className="w-8 h-8 bg-apex-forest rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform shadow-lg shadow-apex-forest/10">
            <div className="w-4 h-4 border-2 border-white rounded-sm rotate-45" />
          </div>
          <span className="font-display font-bold text-lg tracking-tight hidden md:block text-apex-forest">
            Apex Flow
          </span>
        </button>

        {/* Navigation */}
        <nav className="hidden lg:flex items-center gap-1">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={cn(
                "px-4 py-2 rounded-full text-sm font-semibold transition-all relative group",
                activeTab === tab ? "text-apex-forest" : "text-apex-text-muted hover:text-apex-forest"
              )}
            >
              {tab}
              {activeTab === tab && (
                <motion.div
                  layoutId="activeTab"
                  className="absolute inset-0 bg-apex-mint/30 rounded-full -z-10"
                  transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                />
              )}
            </button>
          ))}
        </nav>

        {/* Right Side */}
        <div className="flex items-center gap-4">
          <form onSubmit={handleSearch} className="relative hidden sm:block">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-apex-text-muted" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search..."
              className="bg-black/5 border border-black/5 rounded-full py-1.5 pl-10 pr-4 text-sm focus:outline-none focus:border-apex-forest/30 w-40 transition-all focus:w-60 text-apex-text"
            />
          </form>
          <button className="relative p-2 hover:bg-black/5 rounded-full transition-colors">
            <Bell className="w-5 h-5 text-apex-text-muted" />
            <span className="absolute top-2 right-2 w-2 h-2 bg-apex-red rounded-full border-2 border-white" />
          </button>
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-apex-forest to-apex-mint p-0.5">
            <div className="w-full h-full rounded-full bg-white flex items-center justify-center overflow-hidden">
              <User className="w-5 h-5 text-apex-forest" />
            </div>
          </div>
        </div>
      </div>
    </motion.header>
  );
}
