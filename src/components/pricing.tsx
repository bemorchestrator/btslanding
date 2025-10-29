import { FiCheckCircle } from '../assets/icons/vander';

interface PricingProps {
    onSelectPlan?: (plan: 'free' | 'teacher' | 'admin') => void;
}

export default function Pricing({ onSelectPlan }: PricingProps): JSX.Element {
    const featuresColumn1 = [
        '150 Students, 3 Classrooms',
        '20 DLL AI Generations per day',
        'Automated SF1 to SF10',
        'Bulk Upload (40 students)',
        'Advanced Analytics',
    ];

    const featuresColumn2 = [
        'Worksheet Generator',
        'PowerPoint Maker',
        'Anecdotal Analysis',
        'Teacher Community Access',
        'Priority Support',
    ];

    return (
        <>
            <div className="max-w-5xl mx-auto mt-6 px-6 md:px-4">
                {/* Split Layout Card */}
                <div className="relative overflow-hidden rounded-2xl shadow-2xl bg-white dark:bg-slate-800 border-2 border-slate-200 dark:border-slate-700">
                    <div className="grid md:grid-cols-2 gap-6 md:gap-8 p-8 md:p-12">
                        {/* Left Side: Price & CTA */}
                        <div className="flex flex-col justify-center items-center text-center pb-6 md:pb-0 md:pr-8">
                            <h3 className="text-2xl md:text-4xl font-bold text-text-primary dark:text-white mb-2">
                                Teacher Plan
                            </h3>
                            <p className="text-body text-text-secondary dark:text-slate-300 mb-6">
                                Everything you need to teach better
                            </p>

                            {/* Price */}
                            <div className="mb-6">
                                <div className="flex items-baseline justify-center gap-2">
                                    <span className="text-5xl md:text-7xl font-bold text-amber-400">
                                        ₱399
                                    </span>
                                </div>
                                <p className="text-text-secondary dark:text-slate-400 text-small mt-2">
                                    per month
                                </p>
                            </div>

                            {/* CTA Button */}
                            <button
                                onClick={() => onSelectPlan?.('teacher')}
                                className="w-full py-3 md:py-4 px-6 md:px-8 inline-flex items-center justify-center gap-2 font-bold tracking-wide border align-middle duration-500 text-base md:text-lg text-center bg-amber-400 hover:bg-amber-500 border-amber-400 hover:border-amber-500 text-white rounded-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all"
                            >
                                Get Started Now
                                <svg className="w-4 md:w-5 h-4 md:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                                </svg>
                            </button>

                            <p className="text-xs md:text-small text-text-muted dark:text-slate-500 mt-4">
                                Cancel anytime. No long-term contracts.
                            </p>
                        </div>

                        {/* Right Side: Features in 2 Columns */}
                        <div className="flex flex-col justify-center">
                            <h4 className="text-xl font-semibold text-text-primary dark:text-white mb-6 text-center md:text-left">
                                What's Included:
                            </h4>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-3">
                                {/* Column 1 */}
                                <div className="space-y-3">
                                    {featuresColumn1.map((feature, index) => (
                                        <div key={index} className="flex items-start gap-2">
                                            <FiCheckCircle className="text-green-600 dark:text-green-400 h-5 w-5 mt-0.5 flex-shrink-0" />
                                            <span className="text-small text-text-secondary dark:text-slate-300">
                                                {feature}
                                            </span>
                                        </div>
                                    ))}
                                </div>

                                {/* Column 2 */}
                                <div className="space-y-3">
                                    {featuresColumn2.map((feature, index) => (
                                        <div key={index} className="flex items-start gap-2">
                                            <FiCheckCircle className="text-green-600 dark:text-green-400 h-5 w-5 mt-0.5 flex-shrink-0" />
                                            <span className="text-small text-text-secondary dark:text-slate-300">
                                                {feature}
                                            </span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
