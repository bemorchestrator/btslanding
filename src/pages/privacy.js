import React,{useEffect} from "react";
import { Link } from "react-router-dom";

import NavLight from "../components/navbar";
import Footer from "../components/footer";
import Switcher from "../components/switcher";

export default function Privacy(){
    useEffect(() => {
        document.documentElement.setAttribute("dir", "ltr");
        document.documentElement.classList.add('dark');
        document.documentElement.classList.remove('light');
      }, []);
    return(
        <>
        <NavLight/>
        <section className="relative md:pt-44 pt-32 pb-8 bg-gradient-to-b from-amber-400/20 dark:from-amber-400/40 to-transparent">
            <div className="container relative">
                <div className="grid grid-cols-1 text-center mt-6">
                    <div>
                        <h5 className="md:text-4xl text-3xl md:leading-normal leading-normal tracking-wider font-semibold mb-0">Better Teaching Solutions Privacy Policy</h5>
                    </div>

                    <ul className="tracking-[0.5px] mb-0 inline-block mt-5">
                        <li className="inline-block capitalize text-[15px] font-medium duration-500 ease-in-out text-white/50 hover:text-white"><Link to="/">Better Teaching Solutions</Link></li>
                        <li className="inline-block text-base text-white/50 mx-0.5 ltr:rotate-0 rtl:rotate-180"><i className="mdi mdi-chevron-right"></i></li>
                        <li className="inline-block capitalize text-[15px] font-medium duration-500 ease-in-out text-white" aria-current="page">Privacy Policy</li>
                    </ul>
                </div>
            </div>
        </section>
        <section className="relative md:py-24 py-16">
            <div className="container relative">
                <div className="md:flex justify-center">
                    <div className="md:w-3/4">
                        <div className="p-6 bg-white dark:bg-slate-900 shadow dark:shadow-gray-800 rounded-md">
                            <h5 className="text-xl font-semibold mb-4">Better Teaching Solutions Privacy Policy</h5>
                            <p className="text-slate-400 mb-4">Last updated: 16 June 2025</p>

                            <h5 className="text-xl font-semibold mb-4">Table of Contents</h5>
                            <ul className="list-none text-slate-400 mt-4">
                                <li className="flex mt-2"><i className="mdi mdi-arrow-right text-amber-400 text-lg align-middle me-2"></i>1. Introduction</li>
                                <li className="flex mt-2"><i className="mdi mdi-arrow-right text-amber-400 text-lg align-middle me-2"></i>2. Key Definitions</li>
                                <li className="flex mt-2"><i className="mdi mdi-arrow-right text-amber-400 text-lg align-middle me-2"></i>3. Information We Collect</li>
                                <li className="flex mt-2"><i className="mdi mdi-arrow-right text-amber-400 text-lg align-middle me-2"></i>4. How We Use Your Personal Data</li>
                                <li className="flex mt-2"><i className="mdi mdi-arrow-right text-amber-400 text-lg align-middle me-2"></i>5. How We Share Your Personal Data</li>
                                <li className="flex mt-2"><i className="mdi mdi-arrow-right text-amber-400 text-lg align-middle me-2"></i>6. Data Retention</li>
                                <li className="flex mt-2"><i className="mdi mdi-arrow-right text-amber-400 text-lg align-middle me-2"></i>7. How We Protect Your Personal Data</li>
                                <li className="flex mt-2"><i className="mdi mdi-arrow-right text-amber-400 text-lg align-middle me-2"></i>8. International Transfers</li>
                                <li className="flex mt-2"><i className="mdi mdi-arrow-right text-amber-400 text-lg align-middle me-2"></i>9. Additional Better Teaching Solutions Sites & Apps</li>
                                <li className="flex mt-2"><i className="mdi mdi-arrow-right text-amber-400 text-lg align-middle me-2"></i>10. Your Privacy Rights & Choices</li>
                                <li className="flex mt-2"><i className="mdi mdi-arrow-right text-amber-400 text-lg align-middle me-2"></i>11. Children</li>
                                <li className="flex mt-2"><i className="mdi mdi-arrow-right text-amber-400 text-lg align-middle me-2"></i>12. Contact Information</li>
                            </ul>

                            <h5 className="text-xl font-semibold mb-4 mt-8">1. Introduction</h5>
                            <p className="text-slate-400">Better Teaching Solutions ("BTS," "we," "us," or "our") is an educational Software-as-a-Service platform that helps public and private DepEd teachers in the Philippines automate lesson planning, grading, and paperwork so they can focus on teaching.</p>
                            <p className="text-slate-400 mt-4">This Privacy Policy explains how we collect, use, store, disclose, and otherwise process your personal data when you:</p>
                            <ul className="list-none text-slate-400 mt-4">
                                <li className="flex mt-2"><i className="mdi mdi-arrow-right text-amber-400 text-lg align-middle me-2"></i>visit any BTS website or mobile/desktop app that links to this Privacy Policy;</li>
                                <li className="flex mt-2"><i className="mdi mdi-arrow-right text-amber-400 text-lg align-middle me-2"></i>create or use a BTS account or subscription;</li>
                                <li className="flex mt-2"><i className="mdi mdi-arrow-right text-amber-400 text-lg align-middle me-2"></i>engage with our social-media pages, webinars, workshops, or events;</li>
                                <li className="flex mt-2"><i className="mdi mdi-arrow-right text-amber-400 text-lg align-middle me-2"></i>communicate with us by email, chat, phone, or other channels.</li>
                            </ul>
                            <p className="text-slate-400 mt-4">If you do not agree with this Privacy Policy, please refrain from using our Services or providing personal data. By continuing to use our websites, apps, and Services, you acknowledge that you have read, understood, and agreed to the practices described here.</p>
                            <p className="text-slate-400 mt-4">This policy complements—but does not replace—our Terms of Service and any data-processing agreements we might sign with institutional customers (e.g., school divisions or DepEd regional offices). Where we process data solely on behalf of an institutional customer, our processing is governed by that contract.</p>
                            <p className="text-slate-400 mt-4">We may update this Privacy Policy periodically. We will post any material changes here and, when required by law, notify you at least seven (7) days before the new version takes effect.</p>

                            <h5 className="text-xl font-semibold mb-4 mt-8">2. Key Definitions</h5>
                            <ul className="list-none text-slate-400 mt-4">
                                <li className="flex mt-2"><i className="mdi mdi-arrow-right text-amber-400 text-lg align-middle me-2"></i><strong>"Account"</strong> – Your registered profile used to access the Services.</li>
                                <li className="flex mt-2"><i className="mdi mdi-arrow-right text-amber-400 text-lg align-middle me-2"></i><strong>"Data Privacy Act"</strong> – Republic Act 10173 and its implementing rules in the Philippines.</li>
                                <li className="flex mt-2"><i className="mdi mdi-arrow-right text-amber-400 text-lg align-middle me-2"></i><strong>"DepEd Data"</strong> – Information uploaded or generated within BTS that relates to DepEd curricula, grading sheets, or lesson plans.</li>
                                <li className="flex mt-2"><i className="mdi mdi-arrow-right text-amber-400 text-lg align-middle me-2"></i><strong>"Personal Data"</strong> – Any information that identifies or can reasonably identify an individual, as defined by the Data Privacy Act.</li>
                                <li className="flex mt-2"><i className="mdi mdi-arrow-right text-amber-400 text-lg align-middle me-2"></i><strong>"Services"</strong> – The BTS SaaS platform, mobile/desktop apps, add-ons, APIs, and related support.</li>
                                <li className="flex mt-2"><i className="mdi mdi-arrow-right text-amber-400 text-lg align-middle me-2"></i><strong>"You" / "User"</strong> – The teacher, school administrator, or other individual who interacts with BTS.</li>
                            </ul>

                            <h5 className="text-xl font-semibold mb-4 mt-8">3. Information We Collect</h5>
                            <p className="text-slate-400">Some features work without personal data, but most require it. We gather three broad categories of information:</p>
                            
                            <h6 className="text-lg font-semibold mb-4 mt-6">3.1 Information You Provide</h6>
                            <ul className="list-none text-slate-400 mt-4">
                                <li className="flex mt-2"><i className="mdi mdi-arrow-right text-amber-400 text-lg align-middle me-2"></i><strong>Account creation / login:</strong> Name, DepEd email, alternative email, mobile no., school name, grade/subject taught, password (hashed). If you sign in with DepEd SSO, Google, or Microsoft, we receive the data those services share (usually your name and verified email).</li>
                                <li className="flex mt-2"><i className="mdi mdi-arrow-right text-amber-400 text-lg align-middle me-2"></i><strong>Profile & classroom content:</strong> Avatar/photo, bio, lesson plans, grading sheets, uploaded files, comments, tags.</li>
                                <li className="flex mt-2"><i className="mdi mdi-arrow-right text-amber-400 text-lg align-middle me-2"></i><strong>Payments (paid tiers):</strong> Billing contact, tax ID, payment method token, transaction history (handled securely by our payment processor).</li>
                                <li className="flex mt-2"><i className="mdi mdi-arrow-right text-amber-400 text-lg align-middle me-2"></i><strong>Support & surveys:</strong> Chat transcripts, feedback forms, bug reports, satisfaction ratings.</li>
                                <li className="flex mt-2"><i className="mdi mdi-arrow-right text-amber-400 text-lg align-middle me-2"></i><strong>Events & webinars:</strong> Name, job title, school, contact details, questions you submit.</li>
                                <li className="flex mt-2"><i className="mdi mdi-arrow-right text-amber-400 text-lg align-middle me-2"></i><strong>Testimonials:</strong> With your consent: testimonial text, name, photo, school.</li>
                            </ul>

                            <h6 className="text-lg font-semibold mb-4 mt-6">3.2 Information from Third Parties</h6>
                            <ul className="list-none text-slate-400 mt-4">
                                <li className="flex mt-2"><i className="mdi mdi-arrow-right text-amber-400 text-lg align-middle me-2"></i>Institutional customers (e.g., school divisions) may supply authorized-user lists.</li>
                                <li className="flex mt-2"><i className="mdi mdi-arrow-right text-amber-400 text-lg align-middle me-2"></i>Integration partners (e.g., DepEd LMS, Google Classroom, Microsoft 365) send data you approve, such as class rosters or assignment scores.</li>
                                <li className="flex mt-2"><i className="mdi mdi-arrow-right text-amber-400 text-lg align-middle me-2"></i>Marketing or data-enrichment providers may give us professional contact details to improve accuracy of our records, consistent with Philippine law.</li>
                            </ul>

                            <h6 className="text-lg font-semibold mb-4 mt-6">3.3 Information Collected Automatically</h6>
                            <ul className="list-none text-slate-400 mt-4">
                                <li className="flex mt-2"><i className="mdi mdi-arrow-right text-amber-400 text-lg align-middle me-2"></i><strong>Device & usage data:</strong> IP address, browser type, operating system, referring URLs, page views, feature clicks, time spent. Logged via server logs and analytics tools.</li>
                                <li className="flex mt-2"><i className="mdi mdi-arrow-right text-amber-400 text-lg align-middle me-2"></i><strong>Cookies & similar tech:</strong> Session cookies, functional cookies, and (with consent) analytics cookies to understand user behavior. See our Cookie Policy for details.</li>
                                <li className="flex mt-2"><i className="mdi mdi-arrow-right text-amber-400 text-lg align-middle me-2"></i><strong>Third-party widgets:</strong> "Share" buttons or embedded videos may set their own cookies and collect interaction data under their respective privacy policies.</li>
                            </ul>

                            <h5 className="text-xl font-semibold mb-4 mt-8">4. How We Use Your Personal Data</h5>
                            <ul className="list-none text-slate-400 mt-4">
                                <li className="flex mt-2"><i className="mdi mdi-arrow-right text-amber-400 text-lg align-middle me-2"></i><strong>Provide and maintain the Services:</strong> Save lesson plans, sync grades, manage subscriptions.</li>
                                <li className="flex mt-2"><i className="mdi mdi-arrow-right text-amber-400 text-lg align-middle me-2"></i><strong>Personalize and improve features:</strong> Troubleshoot issues, run analytics, enhance user experience.</li>
                                <li className="flex mt-2"><i className="mdi mdi-arrow-right text-amber-400 text-lg align-middle me-2"></i><strong>Communicate updates:</strong> Service updates, security alerts, policy changes.</li>
                                <li className="flex mt-2"><i className="mdi mdi-arrow-right text-amber-400 text-lg align-middle me-2"></i><strong>Process payments:</strong> Issue invoices, manage subscriptions, handle billing.</li>
                                <li className="flex mt-2"><i className="mdi mdi-arrow-right text-amber-400 text-lg align-middle me-2"></i><strong>Legal compliance:</strong> Enforce Terms of Service, protect rights, comply with laws.</li>
                            </ul>
                            <p className="text-slate-400 mt-4">We do not use your classroom content for advertising, and we never sell your personal data.</p>

                            <h5 className="text-xl font-semibold mb-4 mt-8">5. How We Share Your Personal Data</h5>
                            <ul className="list-none text-slate-400 mt-4">
                                <li className="flex mt-2"><i className="mdi mdi-arrow-right text-amber-400 text-lg align-middle me-2"></i><strong>Service providers:</strong> Secure hosting (Azure Philippines & Singapore), payment processing, customer-support software, email delivery, analytics. Providers are bound by confidentiality and data-protection agreements.</li>
                                <li className="flex mt-2"><i className="mdi mdi-arrow-right text-amber-400 text-lg align-middle me-2"></i><strong>School or DepEd administrators:</strong> If your account is provisioned by an institution, authorized admins may access aggregated usage reports or, where contractually agreed, teacher-level data.</li>
                                <li className="flex mt-2"><i className="mdi mdi-arrow-right text-amber-400 text-lg align-middle me-2"></i><strong>Integration partners:</strong> At your direction—for example, when you connect Google Classroom or DepEd LMS.</li>
                                <li className="flex mt-2"><i className="mdi mdi-arrow-right text-amber-400 text-lg align-middle me-2"></i><strong>Corporate transactions:</strong> In the event of a merger, acquisition, or asset sale, data may transfer to the successor entity under equivalent safeguards.</li>
                                <li className="flex mt-2"><i className="mdi mdi-arrow-right text-amber-400 text-lg align-middle me-2"></i><strong>Legal & compliance:</strong> Courts, regulators, or law-enforcement agencies when required by law or to protect rights, property, or safety.</li>
                            </ul>
                            <p className="text-slate-400 mt-4">We do not permit third-party advertising networks to track you within our Services.</p>

                            <h5 className="text-xl font-semibold mb-4 mt-8">6. Data Retention</h5>
                            <ul className="list-none text-slate-400 mt-4">
                                <li className="flex mt-2"><i className="mdi mdi-arrow-right text-amber-400 text-lg align-middle me-2"></i><strong>Account & classroom content:</strong> Active account + 12 months (or sooner if you delete it)</li>
                                <li className="flex mt-2"><i className="mdi mdi-arrow-right text-amber-400 text-lg align-middle me-2"></i><strong>Billing & tax records:</strong> 10 years (BIR requirement)</li>
                                <li className="flex mt-2"><i className="mdi mdi-arrow-right text-amber-400 text-lg align-middle me-2"></i><strong>Support tickets & chat logs:</strong> 24 months</li>
                                <li className="flex mt-2"><i className="mdi mdi-arrow-right text-amber-400 text-lg align-middle me-2"></i><strong>Analytics logs:</strong> 24 months, then aggregated/anonymized</li>
                            </ul>
                            <p className="text-slate-400 mt-4">When retention lapses, we delete or irreversibly anonymize the data unless law requires longer storage.</p>

                            <h5 className="text-xl font-semibold mb-4 mt-8">7. How We Protect Your Personal Data</h5>
                            <ul className="list-none text-slate-400 mt-4">
                                <li className="flex mt-2"><i className="mdi mdi-arrow-right text-amber-400 text-lg align-middle me-2"></i><strong>Encryption:</strong> TLS 1.3 in transit; AES-256 at rest.</li>
                                <li className="flex mt-2"><i className="mdi mdi-arrow-right text-amber-400 text-lg align-middle me-2"></i><strong>Access controls:</strong> Role-based permissions and multi-factor authentication for staff.</li>
                                <li className="flex mt-2"><i className="mdi mdi-arrow-right text-amber-400 text-lg align-middle me-2"></i><strong>Network security:</strong> Firewalls, intrusion-detection, routine vulnerability scans, annual penetration testing.</li>
                                <li className="flex mt-2"><i className="mdi mdi-arrow-right text-amber-400 text-lg align-middle me-2"></i><strong>Incident response:</strong> 24/7 monitoring and an NPC-compliant breach-notification plan.</li>
                            </ul>
                            <p className="text-slate-400 mt-4">Despite robust safeguards, no online service is 100% secure. Please keep your password confidential and alert us immediately at security@betterteachingsolutions.com if you suspect unauthorized access.</p>

                            <h5 className="text-xl font-semibold mb-4 mt-8">8. International Transfers</h5>
                            <p className="text-slate-400">Primary data centers are in the Philippines. Encrypted backups replicate to Singapore for disaster recovery. For users in jurisdictions with cross-border transfer rules (e.g., GDPR), we rely on Standard Contractual Clauses or other approved mechanisms to ensure essentially equivalent protection.</p>

                            <h5 className="text-xl font-semibold mb-4 mt-8">9. Additional Better Teaching Solutions Sites & Apps</h5>
                            <p className="text-slate-400">If you purchase physical merchandise from shop.betterteachingsolutions.com or use companion mobile apps, we may collect extra details (shipping address, device identifiers) required to fulfill those orders or operate the app. Such processing follows this Privacy Policy unless stated otherwise in a specific notice.</p>

                            <h5 className="text-xl font-semibold mb-4 mt-8">10. Your Privacy Rights & Choices</h5>
                            <p className="text-slate-400">Under the Philippine Data Privacy Act (and, where applicable, GDPR or other laws), you may:</p>
                            <ul className="list-none text-slate-400 mt-4">
                                <li className="flex mt-2"><i className="mdi mdi-arrow-right text-amber-400 text-lg align-middle me-2"></i><strong>Access</strong> – Know whether we hold personal data about you and request a copy</li>
                                <li className="flex mt-2"><i className="mdi mdi-arrow-right text-amber-400 text-lg align-middle me-2"></i><strong>Rectification</strong> – Correct inaccurate or incomplete data</li>
                                <li className="flex mt-2"><i className="mdi mdi-arrow-right text-amber-400 text-lg align-middle me-2"></i><strong>Erasure</strong> – Ask us to delete personal data no longer needed</li>
                                <li className="flex mt-2"><i className="mdi mdi-arrow-right text-amber-400 text-lg align-middle me-2"></i><strong>Objection / Restriction</strong> – Object to or request restriction of processing</li>
                                <li className="flex mt-2"><i className="mdi mdi-arrow-right text-amber-400 text-lg align-middle me-2"></i><strong>Portability</strong> – Receive your lesson plans or grades in CSV/JSON</li>
                                <li className="flex mt-2"><i className="mdi mdi-arrow-right text-amber-400 text-lg align-middle me-2"></i><strong>Withdraw consent</strong> – Opt out of marketing at any time</li>
                            </ul>
                            <p className="text-slate-400 mt-4">We will respond within 15 calendar days (PH requirement) or applicable statutory period. If you are unsatisfied, you may lodge a complaint with the National Privacy Commission (https://privacy.gov.ph).</p>
                            <p className="text-slate-400 mt-4">Opt-out of cookies: See our Cookie Policy for browser-based choices.<br/>
                            Do Not Track signals: We honor Global Privacy Control where legally required.</p>

                            <h5 className="text-xl font-semibold mb-4 mt-8">11. Children</h5>
                            <p className="text-slate-400">BTS is designed for educators, not learners. We do not knowingly collect personal data from children under 16. If you believe a minor's data is in our system, please contact us so we can delete it.</p>

                            <h5 className="text-xl font-semibold mb-4 mt-8">12. Contact Information</h5>
                            <p className="text-slate-400"><strong>Data Protection Officer (DPO)</strong><br/>
                            Better Teaching Solutions<br/>
                            #23 Ground Floor Jomabo Building<br/>
                            Kadulasan Street, Dadiangas East<br/>
                            General Santos City, 9500 Philippines<br/>
                            Email: support@betterteachingsolutions.com<br/>
                            Phone: 083-305-2423</p>

                            <p className="text-slate-400 mt-8">© 2025 Better Teaching Solutions. All rights reserved.</p>

                            <div className="mt-8">
                                <Link to="" className="py-2 px-5 inline-block font-semibold tracking-wide border align-middle duration-500 text-base text-center bg-amber-400 hover:bg-amber-500 border-amber-400 hover:border-amber-500 text-white rounded-md">Print</Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
        
        <Footer/>
        <Switcher/>
        </>
    )
}