import { useState, useEffect, useRef } from 'react';
import { Check, CheckCircle, Rocket, Shield, Bot, Globe } from 'lucide-react';
import Button from '@/components/ui/button';

const roadmapPhases = [
	{
		phase: 'Phase 0',
		title: 'Foundation',
		description: 'Branding, Community, Website',
		icon: <Globe className="w-8 h-8" />,
		status: 'completed',
		details:
			'Established brand identity, built community presence, and created comprehensive documentation.',
	},
	{
		phase: 'Phase 1',
		title: 'Intent Blockchain MVP',
		description: 'Token Swaps, PoS Consensus',
		icon: <CheckCircle className="w-8 h-8" />,
		status: 'in-progress',
		details:
			'Core intent-based transaction engine, basic token swapping, and Proof-of-Stake consensus.',
	},
	{
		phase: 'Phase 2',
		title: 'PoU + Multi-VM Support',
		description: 'Proof-of-Utility + EVM/WASM',
		icon: <Rocket className="w-8 h-8" />,
		status: 'upcoming',
		details:
			'Proof-of-Utility consensus upgrade, EVM compatibility, and WASM virtual machine support.',
	},
	{
		phase: 'Phase 3',
		title: 'ZK Privacy Layer',
		description: 'Zero-Knowledge Privacy Implementation',
		icon: <Shield className="w-8 h-8" />,
		status: 'upcoming',
		details:
			'Advanced privacy features using zero-knowledge proofs for confidential transactions.',
	},
	{
		phase: 'Phase 4',
		title: 'Machine Economy',
		description: 'AI Integration + Governance',
		icon: <Bot className="w-8 h-8" />,
		status: 'future',
		details:
			'AI-powered intent optimization, autonomous agents, and decentralized governance system.',
	},
];

const Roadmap = () => {
	const [visibleItems, setVisibleItems] = useState<number[]>([]);
	const sectionRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		const observer = new IntersectionObserver(
			(entries) => {
				entries.forEach((entry) => {
					if (entry.isIntersecting) {
						roadmapPhases.forEach((_, index) => {
							setTimeout(() => {
								setVisibleItems((prev) => [...prev, index]);
							}, index * 200);
						});
					}
				});
			},
			{ threshold: 0.1 }
		);

		if (sectionRef.current) {
			observer.observe(sectionRef.current);
		}

		return () => observer.disconnect();
	}, []);

	const getStatusColor = (status: string) => {
		switch (status) {
			case 'completed':
				return 'from-green-500 to-emerald-400';
			case 'in-progress':
				return 'from-blue-500 to-cyan-400';
			case 'upcoming':
				return 'from-purple-500 to-violet-400';
			case 'future':
				return 'from-gray-500 to-slate-400';
			default:
				return 'from-gray-500 to-slate-400';
		}
	};

	const getStatusBadge = (status: string) => {
		const colors = {
			completed:
				'bg-green-100 dark:bg-green-500/20 text-green-700 dark:text-green-400 border-green-200 dark:border-green-500/30',
			'in-progress':
				'bg-blue-100 dark:bg-blue-500/20 text-blue-700 dark:text-blue-400 border-blue-200 dark:border-blue-500/30',
			upcoming:
				'bg-purple-100 dark:bg-purple-500/20 text-purple-700 dark:text-purple-400 border-purple-200 dark:border-purple-500/30',
			future:
				'bg-gray-100 dark:bg-gray-500/20 text-gray-700 dark:text-gray-400 border-gray-200 dark:border-gray-500/30',
		};

		const labels = {
			completed: 'Completed',
			'in-progress': 'In Progress',
			upcoming: 'Upcoming',
			future: 'Future',
		};

		return (
			<span
				className={`px-3 py-1 rounded-full text-xs font-semibold border ${colors[status as keyof typeof colors]}`}
			>
				{labels[status as keyof typeof labels]}
			</span>
		);
	};

	return (
		<section id="roadmap" ref={sectionRef} className="py-32 relative">
			{/* Background Effects */}
			<div className="protocol-bg"></div>

			<div className="container mx-auto px-4">
				<div className="text-center mb-20">
					<div className="inline-block glass-effect-light dark:glass-effect p-3 rounded-xl mb-6">
						<span className="text-purple-600 dark:text-purple-400 font-semibold text-sm uppercase tracking-wider">
							Development Roadmap
						</span>
					</div>
					<div className=" text-center">

						<h2
							className="text-4xl md:text-6xl sm:text-3xl font-display mb-6 font-bold inline-block px-4 py-2 text-black drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)]"
							style={{
								WebkitTextStroke: '1px black',
								WebkitTextFillColor: 'white',
							}}
						>
							Our Journey
						</h2>
					</div>
						<p className="text-xl sm:text-base text-gray-700 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
							The path to revolutionizing blockchain interaction through
							intent-centric design
						</p>
					</div>

					<div className="max-w-6xl mx-auto">
						<div className="relative">
							{/* Main Timeline Line */}
							<div className="absolute left-8 md:left-1/2 transform md:-translate-x-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-blue-500 via-purple-500 to-green-500 opacity-30"></div>

							{roadmapPhases.map((phase, index) => (
								<div
									key={index}
									className={`timeline-item relative flex items-center mb-16 ${visibleItems.includes(index) ? 'animate' : ''
										} ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}
								>
									{/* Timeline Node */}
									<div
										className={`absolute left-8 md:left-1/2 transform md:-translate-x-1/2 w-6 h-6 rounded-full bg-gradient-to-r ${getStatusColor(
											phase.status
										)} z-10 flex items-center justify-center shadow-lg`}
									>
										{phase.status === 'completed' && (
											<Check className="w-3 h-3 text-white" />
										)}
									</div>

									{/* Phase Content */}
									<div
										className={`glass-effect-light dark:glass-effect p-8 rounded-2xl ml-20 md:ml-0 md:w-5/12 relative ${index % 2 === 0 ? 'md:mr-auto' : 'md:ml-auto'
											}`}
									>
										{/* Content */}
										<div className="space-y-4">
											{/* Header */}
											<div className="flex items-center justify-between flex-wrap gap-3">
												<div className="flex items-center space-x-3">
													<div
														className={`p-3 bg-gradient-to-r ${getStatusColor(
															phase.status
														)} rounded-xl`}
													>
														{phase.icon}
													</div>
													<div>
														<span className="text-sm text-gray-600 dark:text-gray-400 font-medium">
															{phase.phase}
														</span>
														<h3 className="text-2xl font-bold text-gray-900 dark:text-white">
															{phase.title}
														</h3>
													</div>
												</div>
												{getStatusBadge(phase.status)}
											</div>

											{/* Description */}
											<p className="text-lg text-gray-700 dark:text-gray-300 font-medium">
												{phase.description}
											</p>

											{/* Details */}
											<p className="text-gray-600 dark:text-gray-400 leading-relaxed">
												{phase.details}
											</p>
										</div>

										{/* Decorative Elements */}
										<div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-transparent via-gray-100/50 dark:via-white/5 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300"></div>
									</div>
								</div>
							))}
						</div>
					</div>

					{/* Bottom CTA */}
					<div className="text-center mt-20">
						<div className="glass-effect-light dark:glass-effect p-8 rounded-2xl max-w-2xl mx-auto">
							<h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
								Be Part of the Journey
							</h3>
							<p className="text-gray-700 dark:text-gray-300 mb-6">
								Join our community and help shape the future of intent-centric
								blockchain technology.
							</p>
							<Button
								onClick={() => {
									const element = document.getElementById('waitlist');
									if (element)
										element.scrollIntoView({ behavior: 'smooth' });
								}}
								className="glow-button-light dark:glow-button px-8 py-3 rounded-xl text-white font-semibold transition-all duration-300 hover:scale-105"
							>
								Join Waitlist
							</Button>
						</div>
					</div>
				</div>
		</section>
	);
};

export default Roadmap;
