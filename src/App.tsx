/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import Header from './components/Header';
import Landing from './components/Landing';
import Overview from './components/Overview';
import RiskExplorer from './components/RiskExplorer';
import ScenarioSimulator from './components/ScenarioSimulator';
import AIInsights from './components/AIInsights';
import About from './components/About';
import { cn } from '@/src/lib/utils';

export default function App() {
  const [hasEntered, setHasEntered] = useState(false);
  const [activeTab, setActiveTab] = useState('Overview');

  const renderContent = () => {
    switch (activeTab) {
      case 'Overview':
        return <Overview />;
      case 'Risk Explorer':
        return <RiskExplorer />;
      case 'Part Deep Dive':
        return <RiskExplorer />; // Reusing RiskExplorer as it has the deep dive side panel
      case 'Scenario Simulator':
        return <ScenarioSimulator />;
      case 'Insights (AI)':
        return <AIInsights />;
      case 'About':
        return <About />;
      default:
        return <Overview />;
    }
  };

  return (
    <div className={cn(
      "min-h-screen transition-colors duration-700 overflow-x-hidden",
      hasEntered ? "bg-apex-bg text-apex-text" : "bg-apex-dark text-white"
    )}>
      <AnimatePresence mode="wait">
        {!hasEntered ? (
          <motion.div
            key="landing"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.6 }}
          >
            <Landing onEnter={() => setHasEntered(true)} />
          </motion.div>
        ) : (
          <motion.div
            key="platform"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="relative"
          >
            <Header 
              activeTab={activeTab} 
              setActiveTab={setActiveTab} 
              onLogoClick={() => setHasEntered(false)}
            />
            
            <main className="max-w-7xl mx-auto px-6">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeTab}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
                >
                  {renderContent()}
                </motion.div>
              </AnimatePresence>
            </main>

            {/* Background Accents */}
            <div className="fixed top-[-10%] left-[-10%] w-[40%] h-[40%] bg-apex-mint/20 blur-[120px] rounded-full pointer-events-none -z-10" />
            <div className="fixed bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-apex-forest/5 blur-[120px] rounded-full pointer-events-none -z-10" />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
