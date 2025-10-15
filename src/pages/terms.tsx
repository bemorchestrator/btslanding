import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import NavLight from "../components/navbar";
import Footer from "../components/footer";
import Switcher from "../components/switcher";

import { MdKeyboardArrowDown } from "../assets/icons/vander"

interface AccordionItem {
    id: number;
    title: string;
    desc: string;
}

export default function Terms(): JSX.Element {
    useEffect(() => {
        document.documentElement.setAttribute("dir", "ltr");
        document.documentElement.classList.add('dark');
        document.documentElement.classList.remove('light');
    }, []);

    const [activeIndex, setActiveIndex] = useState<number>(1);

    const accordianData: AccordionItem[] = [
        {
            id: 1,
            title: 'What are the key features of Better Teaching Solutions?',
            desc: 'Better Teaching Solutions is an educational SaaS platform designed for DepEd teachers and schools in the Philippines. It enables lesson planning, gradebook management, attendance tracking, content generation, and reporting, among other features.'
        },
        {
            id: 2,
            title: 'What are the subscription options available?',
            desc: 'We offer both unpaid and paid services. The free tier comes with limited features, while paid services provide subscription-based access with advanced features and administrative tools.'
        },
        {
            id: 3,
            title: 'How can I cancel my subscription?',
            desc: 'You may cancel anytime via your account dashboard. Paid plans are non-refundable unless required by law. We may suspend or terminate your account if you violate these Terms or for inactivity of over 6 months for free accounts.'
        },
        {
            id: 4,
            title: 'What happens to my data?',
            desc: 'By using BTS, you consent to the collection and use of your data as outlined in our Privacy Policy. If you upload any student data or DepEd-sensitive content, you confirm that you are authorized to do so. You remain the data controller of such content, and we act as a data processor.'
        },
    ];

    return (
        <>
            <NavLight />
            <section className="relative md:pt-44 pt-32 pb-8 bg-gradient-to-b from-amber-400/20 dark:from-amber-400/40 to-transparent">
                <div className="container relative">
                    <div className="grid grid-cols-1 text-center mt-6">
                        <div>
                            <h5 className="md:text-4xl text-3xl md:leading-normal leading-normal tracking-wider font-semibold mb-0">Terms of Services</h5>
                            <p className="text-slate-400 mt-2">Last Updated: June 16, 2025</p>
                        </div>

                        <ul className="tracking-[0.5px] mb-0 inline-block mt-5">
                            <li className="inline-block capitalize text-[15px] font-medium duration-500 ease-in-out text-white/50 hover:text-white"><Link to="/">Better Teaching Solutions</Link></li>
                            <li className="inline-block text-base text-white/50 mx-0.5 ltr:rotate-0 rtl:rotate-180"><i className="mdi mdi-chevron-right"></i></li>
                            <li className="inline-block capitalize text-[15px] font-medium duration-500 ease-in-out text-white" aria-current="page">Terms of Services</li>
                        </ul>
                    </div>
                </div>
            </section>
            <section className="relative md:py-24 py-16">
                <div className="container relative">
                    <div className="md:flex justify-center">
                        <div className="md:w-3/4">
                            <div className="p-6 bg-white dark:bg-slate-900 shadow dark:shadow-gray-800 rounded-md">
                                <h5 className="text-xl font-semibold mb-4">1. Agreement Overview</h5>
                                <p className="text-slate-400">Welcome to Better Teaching Solutions ("BTS," "we," "us," or "our"). These Terms of Service ("Terms") govern your access and use of the Better Teaching Solutions platform and associated services, including our websites, mobile apps, APIs, and tools (collectively, the "Services"). By registering, accessing, or using any part of the Services, you agree to be bound by these Terms.</p>
                                <p className="text-slate-400 mt-3">This is a legally binding agreement between you ("User," "you," or "your") and Better Teaching Solutions. If you are accepting on behalf of a school or institution, you represent that you have the authority to bind such entity. If you do not agree to these Terms, you may not use our Services.</p>

                                <h5 className="text-xl font-semibold mb-4 mt-8">2. Services Description</h5>
                                <p className="text-slate-400">Better Teaching Solutions is an educational SaaS platform designed for DepEd teachers and schools in the Philippines. It enables lesson planning, gradebook management, attendance tracking, content generation, and reporting, among other features.</p>

                                <h5 className="text-xl font-semibold mb-4 mt-8">3. User Responsibilities</h5>
                                <p className="text-slate-400">You must:</p>
                                <ul className="list-none text-slate-400 mt-3">
                                    <li className="flex mt-2"><i className="mdi mdi-arrow-right text-amber-400 text-lg align-middle me-2"></i>Be at least 18 years old or an authorized representative of an educational institution</li>
                                    <li className="flex mt-2"><i className="mdi mdi-arrow-right text-amber-400 text-lg align-middle me-2"></i>Provide accurate and complete information during registration</li>
                                    <li className="flex mt-2"><i className="mdi mdi-arrow-right text-amber-400 text-lg align-middle me-2"></i>Keep your login credentials confidential</li>
                                    <li className="flex mt-2"><i className="mdi mdi-arrow-right text-amber-400 text-lg align-middle me-2"></i>Use the Services only in compliance with applicable laws and these Terms</li>
                                </ul>

                                <h5 className="text-xl font-semibold mb-4 mt-8">4. Account and Subscription Management</h5>
                                <p className="text-slate-400">You must create a user account to use most features. Paid users are billed in advance based on the selected plan. You may cancel anytime via your account dashboard. Paid plans are non-refundable unless required by law.</p>

                                <h5 className="text-xl font-semibold mb-4 mt-8">5. Payment and Billing</h5>
                                <p className="text-slate-400">All fees are listed in Philippine Pesos unless otherwise stated. You agree to pay all applicable charges per your chosen subscription and keep your payment information up to date. We may change pricing by providing advance notice before renewal. VAT and local taxes may apply.</p>

                                <h5 className="text-xl font-semibold mb-4 mt-8">6. Data & Privacy</h5>
                                <p className="text-slate-400">By using BTS, you consent to the collection and use of your data as outlined in our Privacy Policy. If you upload any student data or DepEd-sensitive content, you confirm that you are authorized to do so. You remain the data controller of such content, and we act as a data processor.</p>

                                <h5 className="text-xl font-semibold mb-4 mt-8">7. Intellectual Property</h5>
                                <p className="text-slate-400">All content and technology related to BTS, including logos, code, designs, and documentation, are owned by Better Teaching Solutions or its licensors. You may not copy or redistribute any part of the Services without permission.</p>

                                <h5 className="text-xl font-semibold mb-4 mt-8">8. Feedback</h5>
                                <p className="text-slate-400">You are welcome to share feedback, which we may use without obligation to compensate you.</p>

                                <h5 className="text-xl font-semibold mb-4 mt-8">9. Warranty Disclaimer</h5>
                                <p className="text-slate-400">We provide the Services "as is" without any warranties. We do not guarantee uptime, bug-free performance, or specific educational outcomes.</p>

                                <h5 className="text-xl font-semibold mb-4 mt-8">10. Limitation of Liability</h5>
                                <p className="text-slate-400">To the extent permitted by law, our total liability for any claim is limited to the amount you paid in the last 3 months or PHP 2,500, whichever is lower. We are not liable for indirect, incidental, or consequential damages.</p>

                                <h5 className="text-xl font-semibold mb-4 mt-8">11. Suspension and Termination</h5>
                                <p className="text-slate-400">We may suspend or terminate your account if you violate these Terms or applicable laws, engage in abuse, fraud, or security threats, or fail to pay fees (if applicable).</p>

                                <h5 className="text-xl font-semibold mb-4 mt-8">12. Indemnification</h5>
                                <p className="text-slate-400">You agree to indemnify and hold us harmless from any claim or liability arising from your use of the Services or violation of these Terms.</p>

                                <h5 className="text-xl font-semibold mb-4 mt-8">13. Governing Law</h5>
                                <p className="text-slate-400">These Terms are governed by the laws of the Republic of the Philippines. Any disputes must be brought in the courts of General Santos City.</p>

                                <h5 className="text-xl font-semibold mb-4 mt-8">14. Amendments</h5>
                                <p className="text-slate-400">We may update these Terms at any time. We'll notify you of material changes via email or app notice. Continued use after changes means you accept the new Terms.</p>

                                <h5 className="text-xl font-semibold mb-4 mt-8">15. Contact</h5>
                                <p className="text-slate-400">Better Teaching Solutions<br />
                                    #23 Ground Floor Jomabo Building<br />
                                    Kadulasan Street, Dadiangas East<br />
                                    General Santos City, 9500 Philippines<br />
                                    Email: support@betterteachingsolutions.com<br />
                                    Phone: 083-305-2423</p>

                                <p className="text-slate-400 mt-4">© 2025 Better Teaching Solutions. All rights reserved.</p>

                                <h5 className="text-xl font-semibold mt-8">Users Question & Answer :</h5>

                                <div className="mt-6">
                                    {accordianData.map((item, index) => {
                                        return (
                                            <div className="relative shadow dark:shadow-gray-800 rounded-md overflow-hidden mt-4" key={index}>
                                                <h2 className="text-base font-semibold" >
                                                    <button type="button" onClick={() => setActiveIndex(item.id)} className={`${activeIndex === item.id ? "bg-gray-50 dark:bg-slate-800 text-amber-400" : ""} flex justify-between items-center p-5 w-full font-medium text-start`}>
                                                        <span>{item.title}</span>
                                                        <MdKeyboardArrowDown className={`${activeIndex === item.id ? "rotate-180" : ""} w-4 h-4 shrink-0`} />
                                                    </button>
                                                </h2>
                                                <div className={activeIndex === item.id ? "" : "hidden"}>
                                                    <div className="p-5">
                                                        <p className="text-slate-400 dark:text-gray-400">{item.desc}</p>
                                                    </div>
                                                </div>
                                            </div>
                                        )
                                    })}
                                </div>

                                <div className="mt-6">
                                    <Link to="" className="py-2 px-5 inline-block font-semibold tracking-wide border align-middle duration-500 text-base text-center bg-amber-400 hover:bg-amber-500 border-amber-400 hover:border-amber-500 text-white rounded-md">Accept</Link>
                                    <Link to="" className="py-2 px-5 inline-block font-semibold tracking-wide border align-middle duration-500 text-base text-center bg-transparent hover:bg-amber-400 border-amber-400 text-amber-400 hover:text-white rounded-md ms-2">Decline</Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <Footer />
            <Switcher />
        </>
    )
}
