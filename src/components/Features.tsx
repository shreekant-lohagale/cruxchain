'use client';

import { useRef, useEffect, useState } from 'react';
import {
  Check,
  ArrowDownUp,
  Square,
  CheckCircle,
  Code,
  Globe,
  Wrench,
} from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const features = [
  {
    icon: <Check className="w-8 h-8" />,
    title: 'Intent-Based Transactions',
    description:
      'Tell the network what you want, we handle the rest. No gas setup or chain selection required.',
  },
  {
    icon: <ArrowDownUp className="w-8 h-8" />,
    title: 'One-Click Swaps',
    description:
      'Fast, slippage-free transactions that work seamlessly across protocols without complexity.',
  },
  {
    icon: <Square className="w-8 h-8" />,
    title: 'Built on Substrate',
    description:
      'Modular, upgradable core infrastructure designed for the future of blockchain technology.',
  },
  {
    icon: <CheckCircle className="w-8 h-8" />,
    title: 'Fast PoS Consensus',
    description:
      "Secure & performant Proof-of-Stake consensus that's both lightning-fast and enterprise-grade.",
  },
  {
    icon: <Code className="w-8 h-8" />,
    title: 'Dev Friendly',
    description:
      'EVM & Rust-ready VMs coming soon. Build with the tools and languages you already know.',
  },
  {
    icon: <Wrench className="w-8 h-8" />,
    title: 'Tools Included',
    description:
      'Complete ecosystem with built-in Explorer, Wallet, SDKs, and developer resources.',
  },
  {
    icon: <Globe className="w-8 h-8" />,
    title: 'Scalable Design',
    description:
      'Privacy layers, governance systems, and AI integration phases planned for the roadmap ahead.',
  },
];

const Features = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const stickyRef = useRef<HTMLDivElement>(null);
  const svgRef = useRef<SVGSVGElement | null>(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (!stickyRef.current || !containerRef.current || window.innerWidth < 768)
      return;

    const scrollHeight = containerRef.current.scrollHeight;
    const viewportHeight = window.innerHeight;

    const trigger = ScrollTrigger.create({
      trigger: stickyRef.current,
      start: 'top top',
      end: `+=${scrollHeight - viewportHeight}`,
      scrub: 1.5,
      onUpdate: (self) => {
        setProgress(self.progress);
      },
    });

    return () => {
      trigger.kill();
    };
  }, []);

  useEffect(() => {
    if (!svgRef.current || window.innerWidth < 768) return;

    const lines = svgRef.current.querySelectorAll('.scaling-line');
    lines.forEach((line) => {
      const length = (line as SVGPathElement).getTotalLength?.() || 3000;
      const offset = length * (1 - progress);

      gsap.to(line, {
        strokeDasharray: length,
        strokeDashoffset: offset,
        duration: 0.3,
        ease: 'power2.out',
      });
    });
  }, [progress]);

  const totalSlides = features.length;
  const slideWidth = 100; // vw
  const maxScroll = (totalSlides - 1) * slideWidth;
  const translateX = Math.min(progress * maxScroll, maxScroll);

  return (
    <section
      id="features"
      ref={containerRef}
      className="relative w-full pt-10 sm:pt-6 md:h-[700vh]"
    >
      {/* Background layers */}
      <div className="protocol-bg absolute inset-0 z-0"></div>
      <div className="network-nodes absolute inset-0 z-0"></div>
      <div className="floating-elements absolute inset-0 z-0"></div>
      <div className="mesh-gradient absolute inset-0 z-0"></div>



      {/* Desktop Sticky SVG + Cards */}
      <div
        ref={stickyRef}
        className="hidden md:block sticky top-0 h-screen w-full overflow-hidden z-10"
      >
        {/* Section Title */}
        <div className="sticky top-32 z-20 text-center">
          <h2
            className="text-4xl md:text-6xl font-display font-bold inline-block px-4 py-2 text-black drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)]"
            style={{
                  WebkitTextStroke: '1px black',
                  WebkitTextFillColor: 'white',
            }}
          >
            Features
          </h2>
        </div>

        <div className="relative h-full w-full">
          {/* SVG Path Animation */}
          <svg
            ref={svgRef}
            className="absolute left-0 top-1/2 -translate-y-1/2 w-[300vw] h-auto z-0 pointer-events-none"
            viewBox="0 0 5291 1193"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            preserveAspectRatio="xMinYMid meet"
          >
            <path
              d="M425.836 542.641C650.167 733.903 887.603 566.853 935.526 529.195C944.11 522.45 952.985 516.099 962.152 510.141C1171.68 373.54 1299.07 395.402 1385.34 420.141C1521.34 459.141 1554.34 528.141 1706.34 661.141C1775.55 721.702 1833.34 752.141 1875.34 777.141C1875.34 777.141 2244.07 1014.13 2469.45 633.384C2495.48 589.412 2522.64 540.304 2548.84 490.641C2625.84 344.641 2676.02 271.737 2739.34 196.033C2830.84 86.6406 2998.94 11.1406 3167.34 11.1406C3490.7 11.1406 3752.84 273.278 3752.84 596.641C3752.84 596.641 3768.84 1033.64 3333.84 1156.64C2894.35 1280.91 2585.84 933.641 2584.84 597.641C2583.84 261.641 2823.84 86.6406 3009.84 33.6406C3212.3 -24.0508 3614.84 25.6406 3731.84 434.641C3762.57 542.083 3762.66 731.291 3801.75 878.966C3831.42 991.081 3927.02 1081.81 4080.84 1073.64C4306.84 1061.64 4408.34 767.141 4408.34 767.141C4408.34 767.141 4490.64 544.033 4610.34 534.141C4731.34 524.141 4805.34 658.141 4843.34 703.141C4922.58 796.983 5005.34 942.141 5270.34 946.141"
              stroke="url(#paint0_linear)"
              strokeWidth="20"
              strokeLinecap="round"
              strokeMiterlimit="10"
              className="scaling-line"
            />
            <path
              d="M433.836 494.641C672.836 657.641 857.001 500.014 964.53 420.435C1058.84 350.641 1152.75 318.462 1279.34 318.141C1476.84 317.641 1612.34 441.696 1705.34 539.141C1741.75 577.297 1799.34 637.141 1891.34 700.141C1947.96 738.914 2047.84 782.641 2197.84 781.641C2569.86 779.161 2762.7 465.407 2875.57 342.846C2956.34 255.141 3050.33 205.141 3167.34 205.141C3258.34 205.003 3346.52 236.699 3416.61 294.739C3503.2 366.321 3559.84 471.641 3557.97 589.61C3557.97 589.61 3579.84 885.641 3279.84 971.641C2955.52 1064.61 2818.15 788.545 2791.84 704.641C2754.84 586.641 2790.84 296.641 3062.84 221.641C3361.42 139.312 3485.84 366.641 3553.84 482.641C3662.28 667.639 3819.66 924.503 4041.84 907.641C4265.84 890.641 4333.71 591.031 4475.84 428.641C4666.72 210.54 4847.05 131.786 5076.34 154.141"
              stroke="url(#paint1_linear)"
              strokeWidth="20"
              strokeLinecap="round"
              strokeMiterlimit="10"
              className="scaling-line"
            />
            <path
              d="M146.836 704.64C8.83614 624.64 -12.1639 524.64 29.8361 471.64C69.3713 421.75 143.424 377.071 402.836 587.64C641.836 781.64 826.879 699.701 941.091 627.014C1071.32 544.135 1268.68 463.579 1455.34 500.14C1566.66 521.945 1673.76 596.275 1765.34 661.14C1861.34 729.14 1919.54 769.271 2024.34 800.14C2096.98 821.537 2250.84 840.64 2381.84 824.64C2592.8 798.873 2769.84 676.64 2883.84 546.64C2997.84 416.64 3077.42 387.057 3077.42 387.057C3105.83 374.866 3136.42 368.599 3167.34 368.64C3293.26 368.64 3395.34 470.719 3395.34 596.64C3395.34 648.691 3375.62 695.031 3348.53 735.047C3348.53 735.047 3260.84 867.64 3087.84 809.64C2914.84 751.64 2941.84 564.64 2948.84 540.64C2955.84 516.64 2976.51 397.268 3134.84 372.64C3269.84 351.64 3333.48 443.389 3379.84 494.64C3466.04 589.947 3601.01 754.061 3845.84 711.64C4047.84 676.64 4132.74 476.39 4189.34 369.14C4321.72 118.281 4565.34 79.1397 4789.34 204.14C5013.34 329.14 5075.34 424.14 5280.34 414.14"
              stroke="url(#paint2_linear)"
              strokeWidth="20"
              strokeLinecap="round"
              strokeMiterlimit="10"
              className="scaling-line"
            />
            <defs>
              <linearGradient
                id="paint0_linear"
                x1="415"
                y1="596"
                x2="5280"
                y2="596"
                gradientUnits="userSpaceOnUse"
              >
                <stop stopColor="#6366F1" stopOpacity="0" />
                <stop offset="1" stopColor="#8B5CF6" />
              </linearGradient>
              <linearGradient
                id="paint1_linear"
                x1="423"
                y1="570"
                x2="5086"
                y2="570"
                gradientUnits="userSpaceOnUse"
              >
                <stop stopColor="#F472B6" stopOpacity="0" />
                <stop offset="1" stopColor="#EC4899" />
              </linearGradient>
              <linearGradient
                id="paint2_linear"
                x1="0"
                y1="482"
                x2="5290"
                y2="482"
                gradientUnits="userSpaceOnUse"
              >
                <stop stopColor="#FB7185" stopOpacity="0" />
                <stop offset="1" stopColor="#E11D48" />
              </linearGradient>
            </defs>
          </svg>

          {/* Horizontal Cards */}
          <div
            className="flex h-full w-full relative z-10 duration-900"
            style={{
              width: `${totalSlides * 200}vw`,
              transform: `translateX(-${translateX}vw)`,
            }}
          >
            {features.map((feature, index) => (
              <div
                key={index}
                className="w-screen flex items-center justify-center p-4 flex-shrink-0"
              >
                <div className="bg-white/70 dark:bg-black/30 backdrop-blur-xl rounded-2xl p-8 max-w-md text-center shadow-xl border border-white/10">
                  <div className="mb-4 text-blue-500">{feature.icon}</div>
                  <h3 className="text-2xl font-bold mb-2 text-gray-900 dark:text-white">
                    {feature.title}
                  </h3>
                  <p className="text-gray-700 dark:text-gray-300 text-base">
                    {feature.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Mobile Vertical Stack */}
      <div className="md:hidden relative z-10 mt-8 px-4 space-y-6">
        {features.map((feature, index) => (
          <div
            key={index}
            className="bg-white/70 dark:bg-black/30 backdrop-blur-xl rounded-2xl p-6 text-center shadow-xl border border-white/10"
          >
            <div className="mb-4 text-blue-500 mx-auto w-fit">
              {feature.icon}
            </div>
            <h3 className="text-xl font-bold mb-2 text-gray-900 dark:text-white">
              {feature.title}
            </h3>
            <p className="text-gray-700 dark:text-gray-300 text-base">
              {feature.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Features;
