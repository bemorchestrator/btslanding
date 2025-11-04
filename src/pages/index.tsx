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
    // Dark mode is now handled globally by StyleManager

    const workData: WorkItem[] = [
        {
            icon: 'mdi mdi-account-search-outline',
            title: 'Create an Account',
            desc: 'You do not need to spend a single peso, just register an account and you are good to go.'
        },
        {
            icon: 'mdi mdi-wallet-outline',
            title: 'Use Our Tools',
            desc: 'From SF forms, Class Room Management and AI Generators, our tools are designed to make your job easier.'
        },
        {
            icon: 'mdi mdi-home-plus-outline',
            title: 'Save More Time',
            desc: 'Stop wasting hours on lesson plans and paperwork. Our tools are design to save you time and effort.'
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
            <section className="relative table w-full lg:py-40 md:py-36 pt-36 pb-24 overflow-hidden bg-slate-50 dark:bg-slate-900">
                <div className="container relative z-1">
                    <div className="relative grid lg:grid-cols-12 grid-cols-1 items-center mt-10 gap-[30px]">
                        <div className="lg:col-span-7">
                            <div className="lg:me-6 text-center lg:text-start">
                                <h1 className="font-bold lg:leading-normal leading-normal text-4xl lg:text-6xl mb-5 text-slate-900 dark:text-white">Teach More <br /> Stress Less.</h1>
                                <p className="text-lg max-w-xl lg:max-w-none text-slate-700 dark:text-slate-400">Stop wasting hours on lesson plans and paperwork. Our tools help you plan faster, grade smarter, and focus more on real teaching</p>

                                <div className="mt-6 mb-3">
                                    <div className="inline-flex items-center gap-2 px-4 py-2 bg-amber-400/10 border border-amber-400/30 rounded-full mb-4">
                                        <FiGift className="text-amber-600 dark:text-amber-400 h-5 w-5" />
                                        <span className="text-amber-700 dark:text-amber-400 font-semibold text-sm">First-Time Offer: 7-Day Premium Trial for ₱99</span>
                                    </div>
                                    <div className="flex flex-col sm:flex-row gap-3">
                                        <a
                                            href="https://campaign.betterteachingsolutions.com/"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="py-3 px-6 inline-flex items-center justify-center font-semibold tracking-wide border align-middle duration-500 text-base text-center bg-amber-400 hover:bg-amber-500 border-amber-400 hover:border-amber-500 text-white rounded-md shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all"
                                        >
                                            Get Started for ₱99
                                        </a>
                                        <a
                                            href="https://campaign.betterteachingsolutions.com/#pricing"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="py-3 px-6 inline-flex items-center justify-center gap-2 font-semibold tracking-wide border align-middle duration-500 text-base text-center bg-slate-200 hover:bg-slate-300 border-slate-300 hover:border-slate-400 text-slate-900 dark:bg-white/10 dark:hover:bg-white/20 dark:border-white/20 dark:hover:border-white/30 dark:text-white rounded-md backdrop-blur-sm"
                                        >
                                            View Pricing
                                            <FiArrowRight className="h-4 w-4" />
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="lg:col-span-5">
                            <div className="relative after:content-[''] after:absolute lg:after:-top-0 after:-top-10 after:-end-32 after:w-[36rem] after:h-[36rem] after:border-2 after:border-dashed after:border-slate-700/10 dark:after:border-slate-200/10 after:rounded-full after:animate-[spin_120s_linear_infinite] after:-z-1 before:content-[''] before:absolute lg:before:-top-24 before:-top-36 before:-end-56 before:w-[48rem] before:h-[48rem] before:border-2 before:before-dashed before:border-slate-700/10 dark:before:border-slate-200/10 before:rounded-full before:animate-[spin_240s_linear_infinite] before:-z-1">
                                <div className="relative after:content-[''] after:absolute lg:after:-top-24 after:-top-10 after:-end-0 after:w-[42rem] after:h-[42rem] after:bg-gradient-to-tl after:to-amber-400/30  after:from-fuchsia-600/30 dark:after:to-amber-400/50 dark:after:from-fuchsia-600/50 after:blur-[200px] after:rounded-full after:-z-1">
                                    <img src="/class_record.png" className="lg:max-w-none lg:ms-14 w-full lg:min-w-[600px] xl:min-w-[700px] lg:h-[700px] xl:h-[800px] rounded-xl object-cover object-left" alt="Class Record Form" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <section className="relative pt-6 md:pb-24 pb-16 overflow-hidden dark:bg-black">
                <span className="absolute blur-[200px] w-[500px] h-[500px] rounded-full top-[25%] -start-[20%] bg-gradient-to-tl to-amber-400  from-fuchsia-600 -z-1"></span>
                <span className="absolute blur-[200px] w-[500px] h-[500px] rounded-full bottom-[25%] -end-[20%] bg-gradient-to-tl to-amber-400  from-fuchsia-600 -z-1"></span>

                <div className="container relative md:mt-24 mt-16">
                    <div className="grid grid-cols-1 pb-6 text-center">
                        <h3 className="mb-4 md:text-3xl md:leading-normal text-2xl leading-normal font-semibold">So, how does it works?</h3>

                        <p className="text-slate-400 max-w-xl mx-auto">Our AI helps you instantly create lesson plans, quizzes, and reports — no more starting from scratch.

                            Just type what you need, and let the AI do the heavy lifting — so you can focus on teaching, not paperwork.</p>
                    </div>

                    <div className="grid md:grid-cols-3 grid-cols-1 mt-6 gap-6">
                        {workData.map((item, index) => {
                            return (
                                <div className="relative p-6" key={index}>
                                    <i className={`${item.icon} bg-gradient-to-tl to-amber-400 from-fuchsia-600 text-transparent bg-clip-text text-[45px]`}></i>

                                    <h5 className="text-xl font-semibold my-5">{item.title}</h5>

                                    <p className="text-slate-400">{item.desc}</p>
                                </div>
                            )
                        })}
                    </div>
                </div>

                <AboutThree />
                <AiFeatures />
                <AboutTwo />
                <AboutOne />

                <div className="container relative md:mt-24 mt-16">
                    <div className="grid grid-cols-1 pb-6 text-center">
                        <h3 className="mb-4 md:text-3xl md:leading-normal text-2xl leading-normal font-semibold">You don't have to choose between cost, time and quality</h3>

                        <p className="text-slate-400 max-w-xl mx-auto">Artificial intelligence helps teachers save hours on planning, grading, and paperwork. Create personalized lessons, assessments, and reports in minutes, not hours!</p>
                    </div>
                    <Pricing />
                </div>

                <div className="container relative md:mt-24 mt-16">
                    <div className="grid grid-cols-1 pb-6 text-center">
                        <h3 className="mb-4 md:text-3xl md:leading-normal text-2xl leading-normal font-semibold">Frequently Asked Questions</h3>
                        <p className="text-slate-400 max-w-xl mx-auto">Got questions? We've got answers to help you get started</p>
                    </div>

                    <div className="grid md:grid-cols-2 grid-cols-1 mt-6 gap-6">
                        <div className="relative p-6 border border-gray-100 dark:border-gray-700 rounded-md">
                            <h5 className="text-xl font-semibold mb-2">Can I change plans later?</h5>
                            <p className="text-slate-400">Yes, you can upgrade or downgrade your plan at any time from your account settings. Changes take effect immediately.</p>
                        </div>

                        <div className="relative p-6 border border-gray-100 dark:border-gray-700 rounded-md">
                            <h5 className="text-xl font-semibold mb-2">Is there a free trial?</h5>
                            <p className="text-slate-400">Yes, our Free plan gives you full access to basic features with no time limit. It's perfect for getting started!</p>
                        </div>

                        <div className="relative p-6 border border-gray-100 dark:border-gray-700 rounded-md">
                            <h5 className="text-xl font-semibold mb-2">What payment methods do you accept?</h5>
                            <p className="text-slate-400">We accept all major credit cards and PayPal for secure payment processing. All transactions are encrypted and secure.</p>
                        </div>

                        <div className="relative p-6 border border-gray-100 dark:border-gray-700 rounded-md">
                            <h5 className="text-xl font-semibold mb-2">Can I cancel anytime?</h5>
                            <p className="text-slate-400">Yes, you can cancel your subscription at any time with no cancellation fees. You'll continue to have access until the end of your billing period.</p>
                        </div>

                        <div className="relative p-6 border border-gray-100 dark:border-gray-700 rounded-md">
                            <h5 className="text-xl font-semibold mb-2">How does the AI generation limit work?</h5>
                            <p className="text-slate-400">Each plan includes daily AI generation limits that reset every 24 hours. Unused generations don't roll over to the next day.</p>
                        </div>

                        <div className="relative p-6 border border-gray-100 dark:border-gray-700 rounded-md">
                            <h5 className="text-xl font-semibold mb-2">Is my data secure?</h5>
                            <p className="text-slate-400">Absolutely! We use enterprise-grade security with encryption, regular backups, and strict privacy policies to keep your data safe.</p>
                        </div>
                    </div>
                </div>
            </section>
            <Footer />
            <Switcher />
        </>
    )
}
