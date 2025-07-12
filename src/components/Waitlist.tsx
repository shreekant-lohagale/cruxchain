import { useState, useEffect } from 'react';
import Button from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { Mail, Users, Zap, User } from 'lucide-react';
import * as FingerprintJS from '@fingerprintjs/fingerprintjs';

const Waitlist = () => {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [fingerprint, setFingerprint] = useState('');
  const [ipAddress, setIpAddress] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoadingFingerprint, setIsLoadingFingerprint] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    const initFingerprint = async () => {
      try {
        const fp = await FingerprintJS.load();
        const result = await fp.get();
        setFingerprint(result.visitorId);

        try {
          const ipResponse = await fetch('https://api.ipify.org?format=json');
          const ipData = await ipResponse.json();
          setIpAddress(ipData.ip);
        } catch (ipError) {
          console.error('Error getting IP:', ipError);
          setIpAddress('unknown');
        }
      } catch (error) {
        console.error('Error getting fingerprint:', error);
        setFingerprint(`fallback-${Math.random().toString(36).substring(2)}-${Date.now()}`);
      } finally {
        setIsLoadingFingerprint(false);
      }
    };

    initFingerprint();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || isLoadingFingerprint) return;

    setIsSubmitting(true);

    try {
      const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/waitlist`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email,
          name: name || undefined,
          fingerprint,
          ipAddress: ipAddress || 'unknown'
        }),
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || 'Failed to join waitlist');
      }

      toast({
        title: 'Welcome to Cruxchain!',
        description: "You've been added to the waitlist! 🎉 You've earned 100 points!",
      });
      localStorage.setItem('joined', 'true');
      setEmail('');
      setName('');
    } catch (error: any) {
      toast({
        title: 'Error',
        description: error.message,
        variant: 'destructive',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="waitlist" className="py-32 sm:py-16 relative">
      {/* Background Effects */}
      <div className="protocol-bg"></div>
      <div className="network-nodes"></div>

      <div className="container mx-auto px-4 sm:px-2">
        <div className="max-w-4xl mx-auto text-center">
          <div className="gradient-border-light dark:gradient-border p-12 sm:p-4 rounded-3xl relative">
            <div className="space-y-8">
              {/* Header */}
              <div className="space-y-4">
                <div className="inline-block glass-effect-light dark:glass-effect p-3 rounded-xl mb-4">
                  <span className="text-green-600 dark:text-green-400 font-semibold text-sm uppercase tracking-wider">
                    Join the Movement
                  </span>
                </div>

                <h2 className="text-5xl md:text-6xl sm:text-3xl font-display font-bold gradient-text">
                  Join the Revolution
                </h2>

                <p className="text-xl md:text-2xl sm:text-base text-gray-700 dark:text-gray-300 max-w-2xl mx-auto leading-relaxed">
                  Be the first to test Cruxchain and experience the future of intent-centric blockchain interaction.
                </p>
              </div>

              {/* Email Form */}
              <form onSubmit={handleSubmit} className="max-w-md mx-auto space-y-4">
                <div className="relative">
                  <User className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-500 dark:text-gray-400" />
                  <Input
                    type="text"
                    placeholder="Your name (optional)"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="pl-12 h-14 text-lg glass-effect-light dark:glass-effect border-gray-200 dark:border-white/20 text-gray-900 dark:text-white placeholder:text-gray-500 dark:placeholder:text-gray-400 focus:border-blue-500 dark:focus:border-blue-400 focus:ring-2 focus:ring-blue-500/20 dark:focus:ring-blue-400/20 rounded-xl"
                    disabled={isLoadingFingerprint}
                  />
                </div>

                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-500 dark:text-gray-400" />
                  <Input
                    type="email"
                    placeholder="Enter your email address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="pl-12 h-14 text-lg glass-effect-light dark:glass-effect border-gray-200 dark:border-white/20 text-gray-900 dark:text-white placeholder:text-gray-500 dark:placeholder:text-gray-400 focus:border-blue-500 dark:focus:border-blue-400 focus:ring-2 focus:ring-blue-500/20 dark:focus:ring-blue-400/20 rounded-xl"
                    required
                    disabled={isLoadingFingerprint}
                  />
                </div>

                <Button
                  type="submit"
                  disabled={isSubmitting || isLoadingFingerprint || !email}
                  className="w-full h-14 glow-button-light dark:glow-button text-white text-lg font-semibold rounded-xl transition-all duration-300 hover:scale-105"
                >
                  {isLoadingFingerprint ? (
                    'Initializing...'
                  ) : isSubmitting ? (
                    <div className="flex items-center space-x-2">
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                      <span>Joining...</span>
                    </div>
                  ) : (
                    'Notify Me'
                  )}
                </Button>

                {isLoadingFingerprint && (
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Initializing security features...
                  </p>
                )}
              </form>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
                <div className="glass-effect-light dark:glass-effect p-6 rounded-xl">
                  <Users className="w-8 h-8 text-blue-600 dark:text-blue-400 mx-auto mb-3" />
                  <div className="text-2xl font-bold text-gray-900 dark:text-white">1000+</div>
                  <div className="text-gray-600 dark:text-gray-400">Developers</div>
                </div>

                <div className="glass-effect-light dark:glass-effect p-6 rounded-xl">
                  <Zap className="w-8 h-8 text-purple-600 dark:text-purple-400 mx-auto mb-3" />
                  <div className="text-2xl font-bold text-gray-900 dark:text-white">Early</div>
                  <div className="text-gray-600 dark:text-gray-400">Access</div>
                </div>

                <div className="glass-effect-light dark:glass-effect p-6 rounded-xl">
                  <Mail className="w-8 h-8 text-green-600 dark:text-green-400 mx-auto mb-3" />
                  <div className="text-2xl font-bold text-gray-900 dark:text-white">Updates</div>
                  <div className="text-gray-600 dark:text-gray-400">First</div>
                </div>
              </div>

              {/* Benefits */}
              <div className="text-center mt-8">
                <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">
                  Join 1000+ developers and Web3 enthusiasts already on the waitlist
                </p>

                <div className="flex flex-wrap justify-center gap-4 text-sm">
                  <span className="glass-effect-light dark:glass-effect px-4 py-2 rounded-full text-gray-700 dark:text-gray-300">
                    ✨ Testnet early access
                  </span>
                  <span className="glass-effect-light dark:glass-effect px-4 py-2 rounded-full text-gray-700 dark:text-gray-300">
                    📚 Developer resources
                  </span>
                  <span className="glass-effect-light dark:glass-effect px-4 py-2 rounded-full text-gray-700 dark:text-gray-300">
                    🎯 Intent examples
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Additional Info */}
          <div className="mt-16 text-center">
            <p className="text-gray-600 dark:text-gray-400 text-sm">
              Be the first to test the Cruxchain Testnet and experience the future of intent-centric blockchain interaction.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Waitlist;
