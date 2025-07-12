import { useState, useEffect } from 'react';
import Button from '@/components/ui/button';
import { Menu, X } from 'lucide-react';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [userData, setUserData] = useState<{hasJoined: boolean; points: number} | null>(null);

  useEffect(() => {
    const checkWaitlistStatus = () => {
      const joined = localStorage.getItem('joined');
      const points = localStorage.getItem('waitlistPoints');
      setUserData({
        hasJoined: !!joined,
        points: points ? parseInt(points) : 100 // Default 100 points
      });
    };

    checkWaitlistStatus();
    
    // Listen for storage changes
    window.addEventListener('storage', checkWaitlistStatus);
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    
    return () => {
      window.removeEventListener('storage', checkWaitlistStatus);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const scrollToSection = (sectionId: string) => {
    document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
    setIsMobileMenuOpen(false);
  };

  const navLinks = [
    { label: 'Home', id: 'hero' },
    { label: 'Features', id: 'features' },
    { label: 'Roadmap', id: 'roadmap' },
  ];

  return (
    <>
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'glass-navbar-light shadow-2xl' : 'bg-transparent'
      }`}>
        <div className="container mx-auto px-4 py-4 sm:px-2 sm:py-2">
          <div className="flex items-center justify-between">
            <div className="font-display font-bold text-3xl sm:text-2xl gradient-text cursor-pointer" 
                 onClick={() => scrollToSection('hero')}>
              Cruxchain
            </div>
            
            <div className="hidden md:flex items-center space-x-8">
              {navLinks.map((link) => (
                <button key={link.id} onClick={() => scrollToSection(link.id)}
                  className="text-gray-700 dark:text-gray-300 hover:text-black dark:hover:text-white transition-all duration-300 hover:scale-105 font-medium text-base sm:text-sm">
                  {link.label}
                </button>
              ))}
              
              {userData?.hasJoined ? (
                <div className="flex items-center space-x-2 glass-effect-light dark:glass-effect px-4 py-2 rounded-xl">
                  <span className="text-yellow-500 font-semibold">✦</span>
                  <span className="text-gray-900 dark:text-white">{userData.points} pts</span>
                </div>
              ) : (
                <Button onClick={() => scrollToSection('waitlist')}
                  className="glow-button-light text-white px-6 py-2 rounded-xl font-semibold transition-all duration-300 hover:scale-105 text-base sm:text-sm">
                  Join Waitlist
                </Button>
              )}
            </div>

            <div className="md:hidden">
              <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="glass-effect-light p-2 rounded-lg text-gray-700 dark:text-white hover:bg-gray-100 dark:hover:bg-white/10 transition-colors">
                {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>
      </nav>

      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-40 md:hidden">
          <div className="absolute inset-0 bg-black/20 dark:bg-black/60 backdrop-blur-sm" 
               onClick={() => setIsMobileMenuOpen(false)}></div>
          <div className="relative glass-effect-light dark:glass-effect m-4 mt-20 rounded-2xl p-6">
            <div className="space-y-4">
              {navLinks.map((link) => (
                <button key={link.id} onClick={() => scrollToSection(link.id)}
                  className="block w-full text-left py-3 px-4 text-gray-700 dark:text-white hover:bg-gray-100 dark:hover:bg-white/10 rounded-xl transition-colors font-medium">
                  {link.label}
                </button>
              ))}
              {!userData?.hasJoined && (
                <button onClick={() => scrollToSection('waitlist')}
                  className="block w-full text-left py-3 px-4 bg-blue-500 text-white rounded-xl transition-colors font-medium">
                  Join Waitlist
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;