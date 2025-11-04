import { Link } from "react-router-dom";

import { FiCheckCircle } from '../assets/icons/vander';

export default function Pricing(): JSX.Element {
    const features = [
        '150 Students, 3 Classrooms',
        '20 DLL AI Generations per day',
        'Automated SF1 to SF10',
        'Bulk Upload (40 students)',
        'Advanced Analytics',
        'Worksheet Generator',
        'PowerPoint Maker',
        'Anecdotal Analysis',
        'Teacher Community Access',
        'Priority Support'
    ];

    return (
        <>
            <div className="max-w-4xl mx-auto mt-6">
                {/* Single Pricing Card */}
                <div className="relative overflow-hidden rounded-2xl border-2 border-slate-200 dark:border-gray-700 shadow-lg dark:shadow-gray-800 bg-white dark:bg-slate-800 p-8 md:p-10 transition-all duration-300 hover:shadow-xl">
                    <div className="grid md:grid-cols-2 gap-8">
                        {/* Left: Price */}
                        <div className="text-center md:text-left">
                            <h3 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">Teacher Plan</h3>
                            <p className="text-lg text-slate-700 dark:text-slate-400 mb-4">Everything you need to teach better</p>
                            <div className="mb-6">
                                <div className="flex items-baseline justify-center md:justify-start">
                                    <span className="text-6xl font-bold text-amber-500">₱399</span>
                                    <span className="text-lg text-slate-600 dark:text-slate-400 ml-2">per month</span>
                                </div>
                            </div>
                            <Link
                                to="https://app.betterteachingsolutions.com/pricing"
                                className="inline-flex items-center justify-center gap-2 w-full px-8 py-3 bg-amber-400 hover:bg-amber-500 text-white text-lg font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all duration-300"
                            >
                                Get Started Now
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                                </svg>
                            </Link>
                            <p className="text-sm text-slate-500 dark:text-slate-400 mt-3">Cancel anytime. No long-term contracts.</p>
                        </div>

                        {/* Right: Features */}
                        <div className="text-left">
                            <h4 className="text-lg font-bold text-slate-900 dark:text-white mb-4">What's Included:</h4>
                            <ul className="space-y-2">
                                {features.map((feature, index) => (
                                    <li
                                        key={index}
                                        className="flex items-center gap-2 text-sm md:text-base text-slate-700 dark:text-slate-300"
                                    >
                                        <FiCheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                                        <span>{feature}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
