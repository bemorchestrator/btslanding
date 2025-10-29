import { useState, useEffect } from "react";
import { Helmet } from "react-helmet";

import Navbar from "../components/navbar";
import AboutThree from "../components/aboutThree";
import AiFeatures from "../components/aiFeatures";
import AboutOne from "../components/aboutOne";
import AboutTwo from "../components/aboutTwo";
import Pricing from "../components/pricing";
import Footer from "../components/footer";
import Switcher from "../components/switcher";
import { FiGift, FiArrowRight } from "../assets/icons/vander";

interface WorkItem {
    icon: string;
    title: string;
    desc: string;
}

export default function Index(): JSX.Element {
    const [isProcessing, setIsProcessing] = useState(false);
    const [paymentResult, setPaymentResult] = useState<'success' | 'failed' | null>(null);
    const [selectedPlan, setSelectedPlan] = useState<'free' | 'teacher' | 'admin' | null>(null);

    // Dark mode is now handled globally by StyleManager

    // Listen for messages from payment popup
    useEffect(() => {
        const handleMessage = (event: MessageEvent) => {
            if (event.data.type === 'PAYMENT_SUCCESS') {
                setIsProcessing(false);
                setPaymentResult('success');
            } else if (event.data.type === 'PAYMENT_FAILED') {
                setIsProcessing(false);
                setPaymentResult('failed');
            }
        };

        window.addEventListener('message', handleMessage);
        return () => window.removeEventListener('message', handleMessage);
    }, []);

    const handleSelectPlan = (plan: 'free' | 'teacher' | 'admin') => {
        setSelectedPlan(plan);
        setIsProcessing(true);

        // Open simulation tab (will be replaced with Stripe URL later)
        const simulationWindow = window.open('', '_blank', 'width=600,height=400');
        if (simulationWindow) {
            simulationWindow.document.write(`
                <!DOCTYPE html>
                <html>
                <head>
                    <title>Payment Simulation</title>
                    <style>
                        body {
                            margin: 0;
                            padding: 0;
                            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
                            display: flex;
                            flex-direction: column;
                            align-items: center;
                            justify-content: center;
                            min-height: 100vh;
                            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                        }
                        .container {
                            text-align: center;
                            background: white;
                            padding: 3rem;
                            border-radius: 1rem;
                            box-shadow: 0 20px 60px rgba(0,0,0,0.3);
                        }
                        h1 {
                            color: #333;
                            margin-bottom: 1.5rem;
                        }
                        button {
                            margin: 0.5rem;
                            padding: 1rem 2rem;
                            font-size: 1rem;
                            font-weight: 600;
                            border: none;
                            border-radius: 0.5rem;
                            cursor: pointer;
                            transition: all 0.2s;
                        }
                        .success {
                            background: #10b981;
                            color: white;
                        }
                        .success:hover {
                            background: #059669;
                        }
                        .fail {
                            background: #ef4444;
                            color: white;
                        }
                        .fail:hover {
                            background: #dc2626;
                        }
                    </style>
                </head>
                <body>
                    <div class="container">
                        <h1>Payment Simulation</h1>
                        <p>This will be replaced with Stripe payment link</p>
                        <div>
                            <button class="success" onclick="window.opener.postMessage({type: 'PAYMENT_SUCCESS'}, '*'); window.close();">
                                ✓ Simulate Success
                            </button>
                            <button class="fail" onclick="window.opener.postMessage({type: 'PAYMENT_FAILED'}, '*'); window.close();">
                                ✗ Simulate Failed
                            </button>
                        </div>
                    </div>
                </body>
                </html>
            `);
        }
    };

    const workData: WorkItem[] = [
        {
            icon: 'mdi mdi-credit-card-outline',
            title: 'Start Your ₱99 Trial Today',
            desc: 'Pay ₱99 and unlock all premium features for 7 days. Full access, no restrictions, cancel anytime.'
        },
        {
            icon: 'mdi mdi-file-document-outline',
            title: 'Generate Your Documents Instantly',
            desc: 'Input your subject and grade level. Our AI generates weekly schedules, daily lesson logs (DLLs), and all SF1-SF10 forms in seconds.'
        },
        {
            icon: 'mdi mdi-clock-fast',
            title: 'Save Days Every Week',
            desc: 'What used to take 10+ hours now takes minutes. Focus on teaching, not paperwork—spend your weekends actually resting.'
        },
    ];

    return (
        <>
            <Helmet>
                {/* Primary Meta Tags */}
                <title>Better Teaching Solutions - Teach More, Stress Less</title>
                <meta name="title" content="Better Teaching Solutions - Teach More, Stress Less" />
                <meta name="description" content="Stop wasting hours on lesson plans and paperwork. Our AI-powered tools help Filipino teachers plan faster, grade smarter, and focus more on real teaching." />
                <link rel="canonical" href="https://betterteachingsolutions.com/" />

                {/* Open Graph / Facebook */}
                <meta property="og:type" content="website" />
                <meta property="og:url" content="https://betterteachingsolutions.com/" />
                <meta property="og:title" content="Better Teaching Solutions - Teach More, Stress Less" />
                <meta property="og:description" content="Stop wasting hours on lesson plans and paperwork. Our AI-powered tools help Filipino teachers plan faster, grade smarter, and focus more on real teaching." />
                <meta property="og:image" content="https://betterteachingsolutions.com/btsolutions.png" />
                <meta property="og:site_name" content="Better Teaching Solutions" />

                {/* Twitter */}
                <meta property="twitter:card" content="summary_large_image" />
                <meta property="twitter:url" content="https://betterteachingsolutions.com/" />
                <meta property="twitter:title" content="Better Teaching Solutions - Teach More, Stress Less" />
                <meta property="twitter:description" content="Stop wasting hours on lesson plans and paperwork. Our AI-powered tools help Filipino teachers plan faster, grade smarter, and focus more on real teaching." />
                <meta property="twitter:image" content="https://betterteachingsolutions.com/btsolutions.png" />

                {/* Robots */}
                <meta name="robots" content="index, follow" />

                {/* Organization Schema */}
                <script type="application/ld+json">
                    {JSON.stringify({
                        "@context": "https://schema.org",
                        "@type": "Organization",
                        "name": "Better Teaching Solutions",
                        "url": "https://betterteachingsolutions.com",
                        "logo": "https://betterteachingsolutions.com/btsolutions.png",
                        "description": "Stop wasting hours on lesson plans and paperwork. Our AI-powered tools help Filipino teachers plan faster, grade smarter, and focus more on real teaching. From SF forms to classroom management and AI generators, our tools are designed to make your job easier.",
                        "email": "support@betterteachingsolutions.com",
                        "contactPoint": {
                            "@type": "ContactPoint",
                            "contactType": "customer support",
                            "email": "support@betterteachingsolutions.com"
                        },
                        "sameAs": [
                            "https://www.facebook.com/betterteachingsolutions/"
                        ]
                    })}
                </script>
            </Helmet>

            <Navbar />
            <section
                className="relative w-full lg:py-20 md:py-16 py-12 min-h-screen"
                style={{
                    backgroundImage: 'url(/little-children-raising-hands-up-and-having-fun-in-2025-01-27-23-58-17-utc-edited.jpg)',
                    backgroundPosition: '40% center',
                    backgroundSize: 'cover',
                    backgroundRepeat: 'no-repeat'
                }}
            >
                {/* Dark overlay for text readability */}
                <div className="absolute inset-0 bg-black/50"></div>

                {/* Centered Content */}
                <div className="relative z-10 flex items-center justify-center min-h-[70vh]">
                    <div className="text-center max-w-3xl mx-auto px-6 md:px-4">
                        <h1 className="font-bold lg:leading-normal leading-normal text-2xl md:text-4xl lg:text-6xl mb-4 md:mb-5 text-white">DepEd-Compliant Lesson Plans in Seconds — Start Your 7-Day Trial for ₱99</h1>
                        <p className="text-body max-w-xl mx-auto text-white/90">Plan your week, generate daily lesson logs, and automate DepEd forms—all compliant, all instant</p>

                        <div className="mt-6 mb-3">
                            <div className="inline-flex items-center gap-2 px-4 py-2 bg-amber-400/20 border border-amber-400/40 rounded-full mb-4 backdrop-blur-sm">
                                <FiGift className="text-amber-400 h-5 w-5" />
                                <span className="text-amber-300 font-semibold text-xs md:text-small">First-Time Offer: 7-Day Premium Trial for ₱99</span>
                            </div>
                            <div className="flex flex-col md:flex-row gap-3 justify-center w-full md:w-auto px-4 md:px-0">
                                <a
                                    href="/introductory-offer"
                                    className="py-3 px-6 inline-flex items-center justify-center gap-2 font-semibold tracking-wide border align-middle duration-500 text-sm md:text-base text-center bg-amber-400 hover:bg-amber-500 border-amber-400 hover:border-amber-500 text-white rounded-md shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all w-full md:w-auto"
                                >
                                    Get Started for ₱99
                                </a>
                                <a
                                    href="#pricing"
                                    className="py-3 px-6 inline-flex items-center justify-center gap-2 font-semibold tracking-wide border align-middle duration-500 text-sm md:text-base text-center bg-white/10 hover:bg-white/20 border-white/20 hover:border-white/30 text-white rounded-md backdrop-blur-sm w-full md:w-auto"
                                >
                                    View Pricing
                                    <FiArrowRight className="h-4 w-4" />
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <section className="relative pt-6 md:pb-24 pb-16 overflow-hidden dark:bg-slate-900">
                <span className="absolute blur-[200px] w-[500px] h-[500px] rounded-full top-[25%] -start-[20%] bg-gradient-to-tl to-amber-400  from-fuchsia-600 -z-1"></span>
                <span className="absolute blur-[200px] w-[500px] h-[500px] rounded-full bottom-[25%] -end-[20%] bg-gradient-to-tl to-amber-400  from-fuchsia-600 -z-1"></span>

                <div className="container relative md:mt-24 mt-16 px-6 md:px-4">
                    <div className="grid grid-cols-1 pb-6 text-center">
                        <h3 className="mb-4 text-xl md:text-section-title leading-tight md:leading-normal font-semibold text-text-primary dark:text-white">So, how does it work?</h3>

                        <p className="text-small md:text-body text-text-secondary dark:text-slate-300 max-w-xl mx-auto px-4">Start your ₱99 trial today and get instant access to DepEd-compliant tools that save you days of work every week. No complicated setup—just sign up and start generating.</p>
                    </div>

                    <div className="grid md:grid-cols-3 grid-cols-1 mt-12 gap-6">
                        {workData.map((item, index) => {
                            return (
                                <div className="relative p-6 bg-white dark:bg-slate-900 rounded-lg border border-gray-200 dark:border-gray-800 hover:border-amber-400 dark:hover:border-amber-400 transition-colors duration-300 flex flex-col" key={index}>
                                    <div className="w-14 h-14 rounded-full bg-gradient-to-br from-amber-400 to-fuchsia-600 flex items-center justify-center mb-4">
                                        <i className={`${item.icon} text-white text-2xl`}></i>
                                    </div>

                                    <h5 className="text-body font-semibold mb-3 text-text-primary dark:text-white">{item.title}</h5>

                                    <p className="text-text-secondary dark:text-slate-300 text-small leading-relaxed">{item.desc}</p>
                                </div>
                            )
                        })}
                    </div>
                </div>

                <AboutThree />
                <AiFeatures />
                <AboutTwo />
                <AboutOne />

                <div id="pricing" className="container relative md:mt-24 mt-16 px-6 md:px-4">
                    <div className="grid grid-cols-1 pb-6 text-center px-4 md:px-0">
                        <h3 className="mb-4 text-xl md:text-section-title leading-tight md:leading-normal font-semibold text-text-primary dark:text-white">You don't have to choose between cost, time and quality</h3>

                        <p className="text-small md:text-body text-text-secondary dark:text-slate-300 max-w-xl mx-auto">Artificial intelligence helps teachers save hours on planning, grading, and paperwork. Create personalized lessons, assessments, and reports in minutes, not hours!</p>
                    </div>
                    <Pricing onSelectPlan={handleSelectPlan} />
                </div>

                <div className="container relative md:mt-24 mt-16 px-6 md:px-4">
                    <div className="grid grid-cols-1 pb-6 text-center px-4 md:px-0">
                        <h3 className="mb-4 text-xl md:text-section-title leading-tight md:leading-normal font-semibold text-text-primary dark:text-white">Frequently Asked Questions</h3>
                        <p className="text-small md:text-body text-text-secondary dark:text-slate-300 max-w-xl mx-auto">Got questions? We've got answers to help you get started</p>
                    </div>

                    <div className="grid md:grid-cols-2 grid-cols-1 mt-6 gap-6">
                        <div className="relative p-6 border border-gray-100 dark:border-gray-700 rounded-md">
                            <h5 className="text-lg md:text-xl font-semibold mb-2 text-text-primary dark:text-white">What's included in the ₱99 trial?</h5>
                            <p className="text-small md:text-body text-slate-400">You get full access to all premium features for 7 days, including unlimited DLL generation, SF1-SF10 forms, class records, and all AI tools.</p>
                        </div>

                        <div className="relative p-6 border border-gray-100 dark:border-gray-700 rounded-md">
                            <h5 className="text-lg md:text-xl font-semibold mb-2 text-text-primary dark:text-white">What happens after the 7-day trial?</h5>
                            <p className="text-small md:text-body text-slate-400">After 7 days, your subscription automatically continues at ₱399/month. You can cancel anytime before the trial ends with no charges.</p>
                        </div>

                        <div className="relative p-6 border border-gray-100 dark:border-gray-700 rounded-md">
                            <h5 className="text-lg md:text-xl font-semibold mb-2 text-text-primary dark:text-white">What payment methods do you accept?</h5>
                            <p className="text-small md:text-body text-slate-400">We accept all major credit cards, GCash, and PayMaya for secure payment processing. All transactions are encrypted and secure.</p>
                        </div>

                        <div className="relative p-6 border border-gray-100 dark:border-gray-700 rounded-md">
                            <h5 className="text-lg md:text-xl font-semibold mb-2 text-text-primary dark:text-white">Can I cancel anytime?</h5>
                            <p className="text-small md:text-body text-slate-400">Yes, you can cancel your subscription at any time with no cancellation fees. You'll continue to have access until the end of your billing period.</p>
                        </div>

                        <div className="relative p-6 border border-gray-100 dark:border-gray-700 rounded-md">
                            <h5 className="text-lg md:text-xl font-semibold mb-2 text-text-primary dark:text-white">How does the AI generation limit work?</h5>
                            <p className="text-small md:text-body text-slate-400">You get 20 DLL AI generations per day that reset every 24 hours. This is more than enough for daily lesson planning and form generation.</p>
                        </div>

                        <div className="relative p-6 border border-gray-100 dark:border-gray-700 rounded-md">
                            <h5 className="text-lg md:text-xl font-semibold mb-2 text-text-primary dark:text-white">Is my data secure?</h5>
                            <p className="text-small md:text-body text-slate-400">Absolutely! We use enterprise-grade security with encryption, regular backups, and strict privacy policies to keep your student data safe.</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Loading Overlay */}
            {isProcessing && (
                <div className="fixed inset-0 bg-slate-900/95 backdrop-blur-sm z-50 flex items-center justify-center p-4">
                    <div className="relative w-full max-w-md">
                        <span className="absolute blur-[150px] w-[400px] h-[400px] rounded-full bg-gradient-to-tl to-amber-400 from-fuchsia-600 opacity-30 -z-1"></span>
                        <div className="relative bg-slate-800/50 backdrop-blur-md border border-slate-700/50 p-6 md:p-12 rounded-2xl shadow-2xl text-center">
                            <div className="relative w-20 h-20 md:w-24 md:h-24 mx-auto mb-4 md:mb-6">
                                <div className="absolute inset-0 border-4 border-transparent border-t-amber-400 border-r-fuchsia-600 rounded-full animate-spin"></div>
                                <div className="absolute inset-2 border-4 border-transparent border-b-amber-400 border-l-fuchsia-600 rounded-full animate-spin" style={{ animationDirection: 'reverse', animationDuration: '1s' }}></div>
                            </div>
                            <h3 className="text-2xl md:text-3xl font-bold text-white mb-3 bg-gradient-to-r from-amber-400 to-fuchsia-600 bg-clip-text text-transparent">
                                Processing Your Order
                            </h3>
                            <p className="text-slate-300 text-base md:text-lg">Please wait while we prepare your payment...</p>
                            <div className="flex justify-center gap-2 mt-4 md:mt-6">
                                <div className="w-2 h-2 bg-amber-400 rounded-full animate-bounce" style={{ animationDelay: '0s' }}></div>
                                <div className="w-2 h-2 bg-amber-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                                <div className="w-2 h-2 bg-fuchsia-600 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Payment Success Modal */}
            {paymentResult === 'success' && (
                <div className="fixed inset-0 bg-slate-900/95 backdrop-blur-sm z-50 flex items-center justify-center p-4">
                    <div className="relative w-full max-w-md">
                        <span className="absolute blur-[150px] w-[400px] h-[400px] rounded-full bg-gradient-to-tl to-green-400 from-emerald-600 opacity-30 -z-1"></span>
                        <div className="relative bg-slate-800/50 backdrop-blur-md border border-green-500/30 p-6 md:p-12 rounded-2xl shadow-2xl text-center">
                            <div className="relative w-20 h-20 md:w-24 md:h-24 mx-auto mb-4 md:mb-6">
                                <div className="absolute inset-0 bg-gradient-to-br from-green-400 to-emerald-600 rounded-full flex items-center justify-center animate-bounce">
                                    <svg className="w-10 h-10 md:w-12 md:h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                                    </svg>
                                </div>
                            </div>
                            <h3 className="text-2xl md:text-3xl font-bold text-white mb-2 md:mb-3">Payment Successful!</h3>
                            <p className="text-slate-300 text-base md:text-lg mb-4 md:mb-6">
                                Your payment was successful. Welcome to Better Teaching Solutions!
                            </p>
                            <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-3 md:p-4 mb-4 md:mb-6">
                                <p className="text-green-400 text-xs md:text-sm font-semibold">✓ Premium Features Unlocked</p>
                                <p className="text-green-400 text-xs md:text-sm">✓ Access to All Tools</p>
                            </div>
                            <button
                                onClick={() => {
                                    setPaymentResult(null);
                                    window.location.href = 'https://app.betterteachingsolutions.com/register';
                                }}
                                className="w-full py-2.5 md:py-3 px-5 md:px-6 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white font-bold rounded-lg transition-all transform hover:scale-105 text-sm md:text-base"
                            >
                                Create Your Account
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Payment Failed Modal */}
            {paymentResult === 'failed' && (
                <div className="fixed inset-0 bg-slate-900/95 backdrop-blur-sm z-50 flex items-center justify-center p-4">
                    <div className="relative w-full max-w-md">
                        <span className="absolute blur-[150px] w-[400px] h-[400px] rounded-full bg-gradient-to-tl to-red-400 from-rose-600 opacity-30 -z-1"></span>
                        <div className="relative bg-slate-800/50 backdrop-blur-md border border-red-500/30 p-6 md:p-12 rounded-2xl shadow-2xl text-center">
                            <div className="relative w-20 h-20 md:w-24 md:h-24 mx-auto mb-4 md:mb-6">
                                <div className="absolute inset-0 bg-gradient-to-br from-red-400 to-rose-600 rounded-full flex items-center justify-center animate-pulse">
                                    <svg className="w-10 h-10 md:w-12 md:h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                </div>
                            </div>
                            <h3 className="text-2xl md:text-3xl font-bold text-white mb-2 md:mb-3">Payment Failed</h3>
                            <p className="text-slate-300 text-base md:text-lg mb-4 md:mb-6">
                                We couldn't process your payment. Please try again or contact support.
                            </p>
                            <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-3 md:p-4 mb-4 md:mb-6">
                                <p className="text-red-400 text-xs md:text-sm">Common reasons:</p>
                                <p className="text-red-300 text-xs md:text-sm">• Insufficient funds</p>
                                <p className="text-red-300 text-xs md:text-sm">• Card declined by bank</p>
                                <p className="text-red-300 text-xs md:text-sm">• Incorrect card details</p>
                            </div>
                            <div className="flex flex-col sm:flex-row gap-2 md:gap-3">
                                <button
                                    onClick={() => {
                                        setPaymentResult(null);
                                        if (selectedPlan) handleSelectPlan(selectedPlan);
                                    }}
                                    className="flex-1 py-2.5 md:py-3 px-5 md:px-6 bg-amber-400 hover:bg-amber-500 text-white font-bold rounded-lg transition-colors text-sm md:text-base"
                                >
                                    Try Again
                                </button>
                                <button
                                    onClick={() => setPaymentResult(null)}
                                    className="flex-1 py-2.5 md:py-3 px-5 md:px-6 bg-slate-700 hover:bg-slate-600 text-white font-bold rounded-lg transition-colors text-sm md:text-base"
                                >
                                    Cancel
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            <Footer />
            <Switcher />
        </>
    )
}
