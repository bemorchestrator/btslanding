import { useState, useEffect } from "react";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import bgImage from "../assets/images/bg/btshome1.jpg";

import Navbar from "../components/navbar";
import Footer from "../components/footer";
import Switcher from "../components/switcher";
import { FiUsers, FiZap, FiFileText, FiUpload, FiBarChart2, FiFile, FiMonitor, FiMessageSquare, FiHeadphones, FiLoader } from "../assets/icons/vander";

export default function IntroductoryOffer(): JSX.Element {
    const [isProcessing, setIsProcessing] = useState(false);
    const [paymentResult, setPaymentResult] = useState<'success' | 'failed' | null>(null);

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

    const handleClaimOffer = () => {
        // Show loading immediately
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

    return (
        <>
            <Helmet>
                {/* Primary Meta Tags */}
                <title>Introductory Offer - Better Teaching Solutions</title>
                <meta name="title" content="Introductory Offer - Better Teaching Solutions" />
                <meta name="description" content="Get premium access to Better Teaching Solutions for only ₱99 for 7 days. Limited time offer for new teachers." />
                <link rel="canonical" href="https://betterteachingsolutions.com/introductory-offer" />

                {/* Open Graph / Facebook */}
                <meta property="og:type" content="website" />
                <meta property="og:url" content="https://betterteachingsolutions.com/introductory-offer" />
                <meta property="og:title" content="Introductory Offer - Better Teaching Solutions" />
                <meta property="og:description" content="Get premium access to Better Teaching Solutions for only ₱99 for 7 days. Limited time offer for new teachers." />
                <meta property="og:image" content="https://betterteachingsolutions.com/btsolutions.png" />

                {/* Twitter */}
                <meta property="twitter:card" content="summary_large_image" />
                <meta property="twitter:url" content="https://betterteachingsolutions.com/introductory-offer" />
                <meta property="twitter:title" content="Introductory Offer - Better Teaching Solutions" />
                <meta property="twitter:description" content="Get premium access to Better Teaching Solutions for only ₱99 for 7 days. Limited time offer for new teachers." />
                <meta property="twitter:image" content="https://betterteachingsolutions.com/btsolutions.png" />

                {/* Robots */}
                <meta name="robots" content="index, follow" />
            </Helmet>

            <Navbar />

            {/* Hero Section */}
            <section className="relative md:py-44 py-32 bg-no-repeat bg-bottom bg-cover" style={{ backgroundImage: `url(${bgImage})` }}>
                <div className="absolute inset-0" style={{ background: 'linear-gradient(to bottom, rgba(0,0,0,0.7), rgba(0,0,0,1))' }}></div>
                <div className="container relative px-6 md:px-4">
                    <div className="grid grid-cols-1 text-center mt-6">
                        <div>
                            <h5 className="text-2xl md:text-4xl leading-tight md:leading-normal tracking-wider font-semibold text-white mb-4">Introductory Offer</h5>
                            <p className="text-base md:text-lg text-white/80 max-w-2xl mx-auto">Get Premium Access for Only ₱99</p>
                        </div>

                        <ul className="tracking-[0.5px] mb-0 inline-block mt-5">
                            <li className="inline-block capitalize text-[15px] font-medium duration-500 ease-in-out text-white/50 hover:text-white"><Link to="/">Better Teaching Solutions</Link></li>
                            <li className="inline-block text-base text-white/50 mx-0.5 ltr:rotate-0 rtl:rotate-180"><i className="mdi mdi-chevron-right"></i></li>
                            <li className="inline-block capitalize text-[15px] font-medium duration-500 ease-in-out text-white" aria-current="page">Introductory Offer</li>
                        </ul>
                    </div>
                </div>
            </section>
            <div className="relative">
                <div className="shape absolute sm:-bottom-px -bottom-[2px] start-0 end-0 overflow-hidden z-1 text-white dark:text-slate-900">
                    <svg className="w-full h-auto scale-[2.0] origin-top" viewBox="0 0 2880 48" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ color: 'var(--tw-text-opacity, 1)', fill: 'currentColor' }}>
                        <path d="M0 48H1437.5H2880V0H2160C1442.5 52 720 0 720 0H0V48Z" fill="currentColor"></path>
                    </svg>
                </div>
            </div>

            {/* Price Comparison Section - Option A */}
            <section className="relative py-16 bg-slate-50 dark:bg-slate-800">
                <div className="container px-6 md:px-4">
                    <div className="grid grid-cols-1 text-center mb-12">
                        <h2 className="text-xl md:text-section-title leading-tight md:leading-normal font-bold mb-4 text-text-primary dark:text-white">See What You're Saving</h2>
                        <p className="text-small md:text-body text-text-secondary dark:text-slate-300">Get the same premium features at a fraction of the cost</p>
                    </div>

                    <div className="grid md:grid-cols-2 grid-cols-1 gap-8 max-w-4xl mx-auto">
                        {/* Regular Price */}
                        <div className="relative p-8 bg-slate-200 dark:bg-slate-900 rounded-lg border-2 border-slate-200 dark:border-slate-700">
                            <div className="text-center">
                                <p className="text-sm uppercase text-slate-400 mb-2">Regular Price</p>
                                <div className="flex items-center justify-center gap-2 mb-4">
                                    <span className="text-5xl font-bold line-through text-slate-400">₱399</span>
                                </div>
                                <p className="text-slate-400">per month</p>
                                <p className="text-sm text-slate-500 mt-2">(≈₱100 per week)</p>
                            </div>
                        </div>

                        {/* Your Price */}
                        <div className="relative p-8 bg-gradient-to-br from-amber-400/10 to-fuchsia-600/10 rounded-lg border-2 border-amber-400 shadow-lg shadow-amber-400/20">
                            <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                                <span className="bg-amber-400 text-white px-4 py-1 rounded-full text-sm font-semibold">LIMITED OFFER</span>
                            </div>
                            <div className="text-center">
                                <p className="text-sm uppercase text-amber-400 mb-2 font-semibold">Your Price</p>
                                <div className="flex items-center justify-center gap-2 mb-4">
                                    <span className="text-5xl font-bold text-amber-400">₱99</span>
                                </div>
                                <p className="text-slate-400 dark:text-slate-300">for first 7 days</p>
                                <p className="text-sm text-amber-400 font-semibold mt-2">Save ₱300 on your first month!</p>
                            </div>
                        </div>
                    </div>

                    <p className="text-center text-sm text-slate-400 mt-8 mb-8">After 1 week, continues at ₱399/month. Cancel anytime before renewal.</p>

                    {/* CTA Button */}
                    <div className="flex justify-center">
                        <button
                            onClick={handleClaimOffer}
                            disabled={isProcessing}
                            className="py-3 md:py-4 px-8 md:px-12 inline-flex items-center justify-center gap-3 font-bold tracking-wide border align-middle duration-500 text-base md:text-xl text-center bg-amber-400 hover:bg-amber-500 border-amber-400 hover:border-amber-500 text-white rounded-lg shadow-2xl hover:shadow-amber-400/50 transform hover:scale-105 transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                        >
                            {isProcessing ? (
                                <>
                                    <FiLoader className="w-5 md:w-6 h-5 md:h-6 animate-spin" />
                                    <span>Processing...</span>
                                </>
                            ) : (
                                <>
                                    <span>Claim Your ₱99 Offer Now</span>
                                    <span className="text-xl md:text-2xl">→</span>
                                </>
                            )}
                        </button>
                    </div>
                </div>
            </section>

            {/* Loading Overlay */}
            {isProcessing && (
                <div className="fixed inset-0 bg-slate-900/95 backdrop-blur-sm z-50 flex items-center justify-center p-4">
                    <div className="relative w-full max-w-md">
                        {/* Gradient Background Blur */}
                        <span className="absolute blur-[150px] w-[400px] h-[400px] rounded-full bg-gradient-to-tl to-amber-400 from-fuchsia-600 opacity-30 -z-1"></span>

                        {/* Content Card */}
                        <div className="relative bg-slate-800/50 backdrop-blur-md border border-slate-700/50 p-6 md:p-12 rounded-2xl shadow-2xl text-center">
                            <div className="relative w-20 h-20 md:w-24 md:h-24 mx-auto mb-4 md:mb-6">
                                {/* Spinning Ring */}
                                <div className="absolute inset-0 border-4 border-transparent border-t-amber-400 border-r-fuchsia-600 rounded-full animate-spin"></div>
                                <div className="absolute inset-2 border-4 border-transparent border-b-amber-400 border-l-fuchsia-600 rounded-full animate-spin" style={{ animationDirection: 'reverse', animationDuration: '1s' }}></div>
                            </div>

                            <h3 className="text-2xl md:text-3xl font-bold text-white mb-3 bg-gradient-to-r from-amber-400 to-fuchsia-600 bg-clip-text text-transparent">
                                Processing Your Order
                            </h3>
                            <p className="text-slate-300 text-base md:text-lg">Please wait while we prepare your introductory ₱99 offer...</p>

                            {/* Progress Dots */}
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
                        {/* Gradient Background Blur */}
                        <span className="absolute blur-[150px] w-[400px] h-[400px] rounded-full bg-gradient-to-tl to-green-400 from-emerald-600 opacity-30 -z-1"></span>

                        {/* Content Card */}
                        <div className="relative bg-slate-800/50 backdrop-blur-md border border-green-500/30 p-6 md:p-12 rounded-2xl shadow-2xl text-center">
                            {/* Success Animation Circle */}
                            <div className="relative w-20 h-20 md:w-24 md:h-24 mx-auto mb-4 md:mb-6">
                                <div className="absolute inset-0 bg-gradient-to-br from-green-400 to-emerald-600 rounded-full flex items-center justify-center animate-bounce">
                                    <svg className="w-10 h-10 md:w-12 md:h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                                    </svg>
                                </div>
                            </div>

                            <h3 className="text-2xl md:text-3xl font-bold text-white mb-2 md:mb-3">Payment Successful!</h3>
                            <p className="text-slate-300 text-base md:text-lg mb-4 md:mb-6">
                                Your ₱99 premium access is now active. Welcome to Better Teaching Solutions!
                            </p>

                            <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-3 md:p-4 mb-4 md:mb-6">
                                <p className="text-green-400 text-xs md:text-sm font-semibold">✓ Premium Features Unlocked</p>
                                <p className="text-green-400 text-xs md:text-sm">✓ 7-Day Trial Started</p>
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
                        {/* Gradient Background Blur */}
                        <span className="absolute blur-[150px] w-[400px] h-[400px] rounded-full bg-gradient-to-tl to-red-400 from-rose-600 opacity-30 -z-1"></span>

                        {/* Content Card */}
                        <div className="relative bg-slate-800/50 backdrop-blur-md border border-red-500/30 p-6 md:p-12 rounded-2xl shadow-2xl text-center">
                            {/* Failed Animation Circle */}
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
                                        handleClaimOffer();
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

            {/* Features Section - Option B */}
            <section className="relative py-16 bg-slate-200 dark:bg-slate-900">
                <div className="container">
                    <div className="grid grid-cols-1 text-center mb-12">
                        <h2 className="text-section-title font-bold mb-4 text-text-primary dark:text-white">Everything You Need to Teach Better</h2>
                        <p className="text-body text-text-secondary dark:text-slate-300 max-w-2xl mx-auto">Get full access to all Teacher Plan premium features designed specifically for Filipino educators</p>
                    </div>

                    <div className="grid md:grid-cols-3 grid-cols-1 gap-6">
                        {/* Feature 1 */}
                        <div className="p-6 bg-slate-50 dark:bg-slate-800 rounded-lg">
                            <FiUsers className="w-12 h-12 text-amber-400 mb-4" />
                            <h3 className="text-body font-semibold mb-2 text-text-primary dark:text-white">150 Students, 3 Classrooms</h3>
                            <p className="text-small text-text-secondary dark:text-slate-300">Manage multiple classes effortlessly. Perfect for teachers handling several sections or grade levels.</p>
                        </div>

                        {/* Feature 2 */}
                        <div className="p-6 bg-slate-50 dark:bg-slate-800 rounded-lg">
                            <FiZap className="w-12 h-12 text-amber-400 mb-4" />
                            <h3 className="text-body font-semibold mb-2 text-text-primary dark:text-white">20 AI Generations/Day</h3>
                            <p className="text-small text-text-secondary dark:text-slate-300">Create lesson plans, quizzes, and activities in minutes using our AI-powered DLL generator.</p>
                        </div>

                        {/* Feature 3 */}
                        <div className="p-6 bg-slate-50 dark:bg-slate-800 rounded-lg">
                            <FiFileText className="w-12 h-12 text-amber-400 mb-4" />
                            <h3 className="text-body font-semibold mb-2 text-text-primary dark:text-white">Automated SF1 to SF10</h3>
                            <p className="text-small text-text-secondary dark:text-slate-300">Say goodbye to manual paperwork. Generate all DepEd forms automatically with accurate data.</p>
                        </div>

                        {/* Feature 4 */}
                        <div className="p-6 bg-slate-50 dark:bg-slate-800 rounded-lg">
                            <FiUpload className="w-12 h-12 text-amber-400 mb-4" />
                            <h3 className="text-body font-semibold mb-2 text-text-primary dark:text-white">Bulk Upload (40 students)</h3>
                            <p className="text-small text-text-secondary dark:text-slate-300">Import your entire class roster from Excel/CSV in seconds. No more typing student names one by one.</p>
                        </div>

                        {/* Feature 5 */}
                        <div className="p-6 bg-slate-50 dark:bg-slate-800 rounded-lg">
                            <FiBarChart2 className="w-12 h-12 text-amber-400 mb-4" />
                            <h3 className="text-body font-semibold mb-2 text-text-primary dark:text-white">Advanced Analytics</h3>
                            <p className="text-small text-text-secondary dark:text-slate-300">Track student performance with detailed insights. Identify struggling students and top performers instantly.</p>
                        </div>

                        {/* Feature 6 */}
                        <div className="p-6 bg-slate-50 dark:bg-slate-800 rounded-lg">
                            <FiFile className="w-12 h-12 text-amber-400 mb-4" />
                            <h3 className="text-body font-semibold mb-2 text-text-primary dark:text-white">Worksheet Generator</h3>
                            <p className="text-small text-text-secondary dark:text-slate-300">Create custom worksheets aligned with your lessons. Choose difficulty levels and question types.</p>
                        </div>

                        {/* Feature 7 */}
                        <div className="p-6 bg-slate-50 dark:bg-slate-800 rounded-lg">
                            <FiMonitor className="w-12 h-12 text-amber-400 mb-4" />
                            <h3 className="text-body font-semibold mb-2 text-text-primary dark:text-white">PowerPoint Maker</h3>
                            <p className="text-small text-text-secondary dark:text-slate-300">Generate professional slide presentations for your lessons. Save hours on visual prep work.</p>
                        </div>

                        {/* Feature 8 */}
                        <div className="p-6 bg-slate-50 dark:bg-slate-800 rounded-lg">
                            <FiMessageSquare className="w-12 h-12 text-amber-400 mb-4" />
                            <h3 className="text-body font-semibold mb-2 text-text-primary dark:text-white">Anecdotal Analysis</h3>
                            <p className="text-small text-text-secondary dark:text-slate-300">AI-powered behavioral insights help you understand student patterns and classroom dynamics.</p>
                        </div>

                        {/* Feature 9 */}
                        <div className="p-6 bg-slate-50 dark:bg-slate-800 rounded-lg">
                            <FiHeadphones className="w-12 h-12 text-amber-400 mb-4" />
                            <h3 className="text-body font-semibold mb-2 text-text-primary dark:text-white">Priority Support</h3>
                            <p className="text-small text-text-secondary dark:text-slate-300">Get help when you need it. Fast response times and dedicated assistance from our team.</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* What Happens Next Section */}
            <section className="relative py-16 bg-slate-50 dark:bg-slate-800">
                <div className="container">
                    <div className="grid grid-cols-1 text-center mb-12">
                        <h2 className="text-section-title font-bold mb-4 text-text-primary dark:text-white">How It Works</h2>
                        <p className="text-body text-text-secondary dark:text-slate-300">Simple, transparent, and risk-free</p>
                    </div>

                    <div className="grid md:grid-cols-3 grid-cols-1 gap-8 max-w-4xl mx-auto">
                        <div className="text-center">
                            <div className="w-16 h-16 bg-amber-400 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">1</div>
                            <h3 className="text-body font-semibold mb-2 text-text-primary dark:text-white">Start Today</h3>
                            <p className="text-small text-text-secondary dark:text-slate-300">Pay just ₱99 and get instant access to all premium features</p>
                        </div>

                        <div className="text-center">
                            <div className="w-16 h-16 bg-amber-400 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">2</div>
                            <h3 className="text-body font-semibold mb-2 text-text-primary dark:text-white">Try for 1 Week</h3>
                            <p className="text-small text-text-secondary dark:text-slate-300">Use all features risk-free. Cancel anytime during your first week</p>
                        </div>

                        <div className="text-center">
                            <div className="w-16 h-16 bg-amber-400 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">3</div>
                            <h3 className="text-body font-semibold mb-2 text-text-primary dark:text-white">Continue or Cancel</h3>
                            <p className="text-small text-text-secondary dark:text-slate-300">Love it? Continue at ₱399/month. Not for you? Cancel with no questions asked</p>
                        </div>
                    </div>
                </div>
            </section>

            <Footer />
            <Switcher />
        </>
    );
}
