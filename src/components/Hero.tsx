'use client';
import { useState, useEffect } from 'react';
import Button from '@/components/ui/button';
import { ChevronDown } from 'lucide-react';

const Hero = () => {
  const [displayText, setDisplayText] = useState('');
  const [hasJoined, setHasJoined] = useState(false);
  const [emailCount, setEmailCount] = useState<number | null>(null);
  const fullText = 'Cruxchain';

  useEffect(() => {
    const joined = localStorage.getItem('joined');
    if (joined) setHasJoined(true);

    const fetchCount = async () => {
      try {
        const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/waitlist/count`);
        const data = await res.json();
        setEmailCount(data.count);
      } catch (error) {
        console.error('Failed to fetch waitlist count:', error);
      }
    };

    fetchCount();
    
    // Typing effect
    let currentIndex = 0;
    const timer = setInterval(() => {
      if (currentIndex <= fullText.length) {
        setDisplayText(fullText.slice(0, currentIndex));
        currentIndex++;
      } else {
        clearInterval(timer);
      }
    }, 150);
    
    return () => clearInterval(timer);
  }, []);

  const scrollToWaitlist = () => {
    document.getElementById('waitlist')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="hero" className="min-h-screen flex items-center justify-center relative overflow-hidden pt-20 sm:pt-10">
      {/* Background layers */}
      <div className="protocol-bg absolute inset-0 z-0"></div>
      <div className="network-nodes absolute inset-0 z-0"></div>
      <div className="floating-elements absolute inset-0 z-0"></div>
      <div className="mesh-gradient absolute inset-0 z-0"></div>

      <div className="container mx-auto px-4 sm:px-2 text-center relative z-10">
        <div className="max-w-5xl mx-auto">
          <div className="mb-8">
            <h1 className="text-4xl sm:text-5xl md:text-7xl lg:text-9xl font-display font-bold mb-6 whitespace-nowrap">
              <span className="text-black drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)]" 
                    style={{ WebkitTextStroke: '6px black', WebkitTextFillColor: 'white' }}>
                {displayText}
              </span>
            </h1>

            <div className="glass-effect-light dark:glass-effect p-4 rounded-2xl inline-block">
              <p className="text-xl md:text-3xl sm:text-lg text-gray-800 dark:text-gray-200 font-medium">
                The Intent-Centric Blockchain
              </p>
              <p className="text-lg md:text-xl sm:text-base text-gray-600 dark:text-gray-400 mt-2">
                Interact on-chain with a single action.
              </p>
            </div>
          </div>

          <div className="space-y-6">
            <Button onClick={scrollToWaitlist} disabled={hasJoined}
              className={`glow-button-light dark:glow-button text-white px-12 py-6 rounded-2xl text-xl font-semibold transition-all duration-300 hover:scale-105 shadow-lg ${
                hasJoined ? 'opacity-50 cursor-not-allowed' : ''
              }`}>
              {hasJoined ? "You're on the List ✅" : "Join Waitlist"}
            </Button>

            <div className="mt-8 text-center">
              <div className="glass-effect-light dark:glass-effect p-4 rounded-xl inline-block">
                <p className="text-gray-600 dark:text-gray-400 text-sm max-w-md mx-auto">
                  Be the first to experience intent-driven blockchain interaction
                </p>
              </div>
            </div>
          </div>

          <div className="mt-16">
            <div className="glass-effect-light dark:glass-effect p-6 rounded-xl max-w-md mx-auto flex flex-col items-center">
              <p className="text-sm text-gray-700 dark:text-gray-300 mb-2">Example Intent:</p>
              <div className="font-mono text-blue-600 dark:text-blue-300 bg-blue-50 dark:bg-black/20 rounded-lg p-3 w-full text-center mb-4">
                "Swap 100 USDC → ETH"
              </div>
              <button type="button" aria-label="Scroll for more"
                className="mt-2 mb-2 flex items-center justify-center w-10 h-10 rounded-full bg-white/80 dark:bg-black/40 shadow border border-gray-200 dark:border-white/10 hover:bg-gray-100 dark:hover:bg-white/10 transition-colors"
                onClick={scrollToWaitlist}>
                <ChevronDown className="w-6 h-6 text-gray-700 dark:text-gray-300" />
              </button>
              <p className="text-xs text-gray-600 dark:text-gray-400 mt-2">
                No gas setup, no chain selection needed
              </p>
            </div>
          </div>

          {emailCount !== null && (
            <p className="mt-10 text-sm text-gray-500 dark:text-gray-400">
              👥 <strong>{emailCount}</strong> users already on the waitlist!
            </p>
          )}
        </div>
      </div>
    </section>
  );
};

export default Hero;