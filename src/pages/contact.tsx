import React, { useEffect, useState, useRef, useCallback } from "react";
import { Link } from "react-router-dom";
import ReCAPTCHA from "react-google-recaptcha";

import contactImg from "../assets/images/contact.svg"
import bgImage from "../assets/images/bg/btshome1.jpg"

import NavLight from "../components/navlight";
import Footer from "../components/footer";
import Switcher from "../components/switcher";

import { FiHexagon, FiPhone, FiMail, FiMapPin, FiCheck, FiAlertCircle } from "../assets/icons/vander"

interface FormData {
    name: string;
    email: string;
    subject: string;
    message: string;
    website: string;
}

interface StatusState {
    loading: boolean;
    success: boolean;
    error: string | null;
}

interface ValidationResult {
    isValid: boolean;
    error: string | null;
}

declare global {
    interface Window {
        grecaptcha: {
            ready: (callback: () => void) => void;
        };
    }
}

export default function Contact(): JSX.Element {
    const recaptchaRef = useRef<ReCAPTCHA>(null);
    const [formStartTime, setFormStartTime] = useState<number>(Date.now());

    const [formData, setFormData] = useState<FormData>({
        name: '',
        email: '',
        subject: '',
        message: '',
        website: ''
    });

    const [status, setStatus] = useState<StatusState>({
        loading: false,
        success: false,
        error: null
    });

    const [recaptchaLoaded, setRecaptchaLoaded] = useState<boolean>(false);
    const [recaptchaError, setRecaptchaError] = useState<string | null>(null);

    useEffect(() => {
        // Dark mode is now handled globally by StyleManager
        setFormStartTime(Date.now());

        const checkRecaptcha = (): void => {
            if (window.grecaptcha && window.grecaptcha.ready) {
                window.grecaptcha.ready(() => {
                    setRecaptchaLoaded(true);
                    setRecaptchaError(null);
                });
            } else {
                setTimeout(checkRecaptcha, 100);
            }
        };
        checkRecaptcha();
    }, []);

    const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
        if (status.error) {
            setStatus(prev => ({ ...prev, error: null }));
        }
    }, [status.error]);

    const validateForm = useCallback((): ValidationResult => {
        if (formData.website) {
            return { isValid: false, error: 'Form submission failed. Please try again.' };
        }

        const timeElapsed = Date.now() - formStartTime;
        if (timeElapsed < 3000) {
            return { isValid: false, error: 'Please take a moment to review your message before submitting.' };
        }

        if (!formData.name.trim()) {
            return { isValid: false, error: 'Please enter your name.' };
        }
        if (!formData.email.trim()) {
            return { isValid: false, error: 'Please enter your email address.' };
        }
        if (!formData.subject.trim()) {
            return { isValid: false, error: 'Please enter a subject.' };
        }
        if (!formData.message.trim()) {
            return { isValid: false, error: 'Please enter your message.' };
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(formData.email)) {
            return { isValid: false, error: 'Please enter a valid email address.' };
        }

        if (formData.message.length < 10) {
            return { isValid: false, error: 'Your message must be at least 10 characters long.' };
        }
        if (formData.message.length > 5000) {
            return { isValid: false, error: 'Your message is too long. Please keep it under 5000 characters.' };
        }

        const spamKeywords = ['casino', 'loan', 'viagra', 'free money', 'deposit', 'click here', 'urgent', 'winner'];
        const containsSpamKeyword = spamKeywords.some(keyword =>
            formData.message.toLowerCase().includes(keyword) ||
            formData.subject.toLowerCase().includes(keyword)
        );

        if (containsSpamKeyword) {
            return { isValid: false, error: 'Your message contains content that cannot be processed. Please revise and try again.' };
        }

        const urlRegex = /(https?:\/\/[^\s]+)/g;
        const urls = formData.message.match(urlRegex) || [];
        if (urls.length > 2) {
            return { isValid: false, error: 'Please limit the number of links in your message.' };
        }

        return { isValid: true, error: null };
    }, [formData, formStartTime]);

    const handleRecaptchaChange = useCallback((token: string | null) => {
        if (token) {
            setRecaptchaError(null);
        }
    }, []);

    const handleRecaptchaExpired = useCallback(() => {
        setRecaptchaError('reCAPTCHA expired. Please try again.');
        if (recaptchaRef.current) {
            recaptchaRef.current.reset();
        }
    }, []);

    const handleRecaptchaError = useCallback(() => {
        setRecaptchaError('reCAPTCHA failed to load. Please refresh the page and try again.');
    }, []);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
        e.preventDefault();
        setStatus({ loading: true, success: false, error: null });

        try {
            const validation = validateForm();
            if (!validation.isValid) {
                setStatus({ loading: false, success: false, error: validation.error });
                return;
            }

            let recaptchaToken: string | null = null;
            if (siteKey && recaptchaRef.current && recaptchaLoaded) {
                try {
                    recaptchaToken = await recaptchaRef.current.executeAsync();
                    if (!recaptchaToken) {
                        throw new Error('reCAPTCHA verification failed');
                    }
                } catch {
                    setStatus({
                        loading: false,
                        success: false,
                        error: 'Security verification failed. Please refresh the page and try again.'
                    });
                    return;
                }
            } else if (siteKey && !recaptchaLoaded) {
                setStatus({
                    loading: false,
                    success: false,
                    error: 'Security verification is loading. Please wait a moment and try again.'
                });
                return;
            }

            const response = await fetch('/api/contact', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name: formData.name.trim(),
                    email: formData.email.trim(),
                    subject: formData.subject.trim(),
                    message: formData.message.trim(),
                    recaptchaToken,
                    submissionTime: Date.now() - formStartTime,
                    website: formData.website
                })
            });

            const responseData = await response.json();

            if (!response.ok) {
                throw new Error(responseData.message || 'Failed to send message. Please try again later.');
            }

            setStatus({ loading: false, success: true, error: null });
            setFormData({ name: '', email: '', subject: '', message: '', website: '' });

            if (recaptchaRef.current) {
                try {
                    recaptchaRef.current.reset();
                } catch (resetError) {
                    console.error('reCAPTCHA reset failed:', resetError);
                }
            }
            setFormStartTime(Date.now());

            setTimeout(() => {
                setStatus(prev => ({ ...prev, success: false }));
            }, 5000);

        } catch (error) {
            console.error('Error submitting form:', error);
            setStatus({
                loading: false,
                success: false,
                error: error instanceof Error ? error.message : 'Failed to send message. Please check your connection and try again.'
            });
        }
    };

    const siteKey = process.env.REACT_APP_RECAPTCHA_SITE_KEY;

    return (
        <>
            <NavLight />
            <section className="relative md:py-44 py-32 bg-no-repeat bg-bottom bg-cover" style={{ backgroundImage: `url(${bgImage})` }}>
                <div className="absolute inset-0" style={{ background: 'linear-gradient(to bottom, rgba(0,0,0,0.7), rgba(0,0,0,1))' }}></div>
                <div className="container relative">
                    <div className="grid grid-cols-1 text-center mt-6">
                        <div>
                            <h5 className="md:text-4xl text-3xl md:leading-normal leading-normal tracking-wider font-semibold text-white mb-0">Contact Us</h5>
                        </div>

                        <ul className="tracking-[0.5px] mb-0 inline-block mt-5">
                            <li className="inline-block capitalize text-[15px] font-medium duration-500 ease-in-out text-white/50 hover:text-white"><Link to="/">Better Teaching Solutions</Link></li>
                            <li className="inline-block text-base text-white/50 mx-0.5 ltr:rotate-0 rtl:rotate-180"><i className="mdi mdi-chevron-right"></i></li>
                            <li className="inline-block capitalize text-[15px] font-medium duration-500 ease-in-out text-white" aria-current="page">Contact Us</li>
                        </ul>
                    </div>
                </div>
            </section>
            <div className="relative">
                <div className="shape absolute sm:-bottom-px -bottom-[2px] start-0 end-0 overflow-hidden z-1 text-white dark:text-black">
                    <svg className="w-full h-auto scale-[2.0] origin-top" viewBox="0 0 2880 48" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ color: 'var(--tw-text-opacity, 1)', fill: 'currentColor' }}>
                        <path d="M0 48H1437.5H2880V0H2160C1442.5 52 720 0 720 0H0V48Z" fill="currentColor"></path>
                    </svg>
                </div>
            </div>
            <section className="relative lg:py-24 py-16">
                <div className="container">
                    <div className="grid md:grid-cols-12 grid-cols-1 items-center gap-[30px]">
                        <div className="lg:col-span-7 md:col-span-6">
                            <img src={contactImg} alt="Contact us" />
                        </div>

                        <div className="lg:col-span-5 md:col-span-6">
                            <div className="lg:ms-5">
                                <div className="bg-slate-200 dark:bg-slate-900 rounded-md shadow dark:shadow-gray-700 p-6">
                                    <h3 className="mb-6 text-2xl leading-normal font-semibold">Get in touch!</h3>

                                    <form onSubmit={handleSubmit}>
                                        {siteKey && (
                                            <ReCAPTCHA
                                                ref={recaptchaRef}
                                                size="invisible"
                                                sitekey={siteKey}
                                                onChange={handleRecaptchaChange}
                                                onExpired={handleRecaptchaExpired}
                                                onErrored={handleRecaptchaError}
                                            />
                                        )}

                                        {status.error && (
                                            <div className="mb-4 p-4 rounded-md bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800">
                                                <div className="flex items-center">
                                                    <FiAlertCircle className="text-red-500 mr-2" />
                                                    <p className="text-red-700 dark:text-red-300 text-sm">{status.error}</p>
                                                </div>
                                            </div>
                                        )}

                                        {recaptchaError && (
                                            <div className="mb-4 p-4 rounded-md bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800">
                                                <div className="flex items-center">
                                                    <FiAlertCircle className="text-yellow-500 mr-2" />
                                                    <p className="text-yellow-700 dark:text-yellow-300 text-sm">{recaptchaError}</p>
                                                </div>
                                            </div>
                                        )}

                                        {status.success && (
                                            <div className="mb-4 p-4 rounded-md bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800">
                                                <div className="flex items-center">
                                                    <FiCheck className="text-green-500 mr-2" />
                                                    <div>
                                                        <p className="text-green-700 dark:text-green-300 font-medium text-sm">Message sent successfully!</p>
                                                        <p className="text-green-600 dark:text-green-400 text-xs mt-1">Thank you for contacting us. We'll get back to you within 24 hours.</p>
                                                    </div>
                                                </div>
                                            </div>
                                        )}

                                        {!siteKey && (
                                            <div className="mb-4 p-4 rounded-md bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800">
                                                <div className="flex items-center">
                                                    <FiAlertCircle className="text-blue-500 mr-2" />
                                                    <p className="text-blue-700 dark:text-blue-300 text-sm">Development mode: Security verification is disabled. Add reCAPTCHA keys to enable protection.</p>
                                                </div>
                                            </div>
                                        )}

                                        <div className="grid lg:grid-cols-12 lg:gap-6">
                                            <div className="lg:col-span-6 mb-5">
                                                <label htmlFor="name" className="font-semibold">Your Name: <span className="text-red-500">*</span></label>
                                                <input
                                                    name="name"
                                                    id="name"
                                                    type="text"
                                                    value={formData.name}
                                                    onChange={handleChange}
                                                    required
                                                    maxLength={100}
                                                    className="form-input w-full py-2 px-3 h-10 bg-transparent dark:bg-slate-900 dark:text-slate-200 rounded outline-none border border-gray-200 focus:border-amber-400 dark:border-gray-800 dark:focus:border-amber-400 focus:ring-0 mt-2"
                                                    placeholder="Enter your full name"
                                                    disabled={status.loading}
                                                />
                                            </div>

                                            <div className="lg:col-span-6 mb-5">
                                                <label htmlFor="email" className="font-semibold">Your Email: <span className="text-red-500">*</span></label>
                                                <input
                                                    name="email"
                                                    id="email"
                                                    type="email"
                                                    value={formData.email}
                                                    onChange={handleChange}
                                                    required
                                                    maxLength={255}
                                                    className="form-input w-full py-2 px-3 h-10 bg-transparent dark:bg-slate-900 dark:text-slate-200 rounded outline-none border border-gray-200 focus:border-amber-400 dark:border-gray-800 dark:focus:border-amber-400 focus:ring-0 mt-2"
                                                    placeholder="Enter your email address"
                                                    disabled={status.loading}
                                                />
                                            </div>
                                        </div>

                                        <div style={{ display: 'none' }} className="hidden">
                                            <input
                                                name="website"
                                                type="text"
                                                value={formData.website}
                                                onChange={handleChange}
                                                tabIndex={-1}
                                                autoComplete="off"
                                                aria-hidden="true"
                                            />
                                        </div>

                                        <div className="grid grid-cols-1">
                                            <div className="mb-5">
                                                <label htmlFor="subject" className="font-semibold">Subject: <span className="text-red-500">*</span></label>
                                                <input
                                                    name="subject"
                                                    id="subject"
                                                    type="text"
                                                    value={formData.subject}
                                                    onChange={handleChange}
                                                    required
                                                    maxLength={200}
                                                    className="form-input w-full py-2 px-3 h-10 bg-transparent dark:bg-slate-900 dark:text-slate-200 rounded outline-none border border-gray-200 focus:border-amber-400 dark:border-gray-800 dark:focus:border-amber-400 focus:ring-0 mt-2"
                                                    placeholder="What's this about?"
                                                    disabled={status.loading}
                                                />
                                            </div>

                                            <div className="mb-5">
                                                <label htmlFor="message" className="font-semibold">Your Message: <span className="text-red-500">*</span></label>
                                                <textarea
                                                    name="message"
                                                    id="message"
                                                    value={formData.message}
                                                    onChange={handleChange}
                                                    required
                                                    minLength={10}
                                                    maxLength={5000}
                                                    rows={6}
                                                    className="form-input w-full py-2 px-3 bg-transparent dark:bg-slate-900 dark:text-slate-200 rounded outline-none border border-gray-200 focus:border-amber-400 dark:border-gray-800 dark:focus:border-amber-400 focus:ring-0 mt-2 resize-vertical"
                                                    placeholder="Please describe your question or concern in detail..."
                                                    disabled={status.loading}
                                                ></textarea>
                                                <div className="text-xs text-slate-400 mt-1">
                                                    {formData.message.length}/5000 characters
                                                </div>
                                            </div>
                                        </div>

                                        <div className="mb-4">
                                            <button
                                                type="submit"
                                                disabled={status.loading || (siteKey ? (!recaptchaLoaded || !!recaptchaError) : false)}
                                                className="py-2 px-5 inline-flex items-center justify-center font-semibold tracking-wide border align-middle duration-500 text-base text-center bg-amber-400 hover:bg-amber-500 border-amber-400 hover:border-amber-500 text-white rounded-md disabled:opacity-50 disabled:cursor-not-allowed w-full sm:w-auto"
                                            >
                                                {status.loading ? (
                                                    <>
                                                        <svg className="animate-spin -ml-1 mr-3 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                                        </svg>
                                                        Sending...
                                                    </>
                                                ) : (
                                                    'Send Message'
                                                )}
                                            </button>
                                        </div>

                                        <div className="text-xs text-slate-400">
                                            <p>This site is protected by reCAPTCHA and the Google{' '}
                                                <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer" className="text-amber-400 hover:underline">Privacy Policy</a> and{' '}
                                                <a href="https://policies.google.com/terms" target="_blank" rel="noopener noreferrer" className="text-amber-400 hover:underline">Terms of Service</a> apply.
                                            </p>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="container lg:mt-24 mt-16">
                    <div className="grid grid-cols-1 lg:grid-cols-3 md:grid-cols-2 gap-[30px]">
                        <div className="text-center px-6">
                            <div className="relative overflow-hidden text-transparent -m-3">
                                <FiHexagon className="h-24 w-24 fill-amber-400/5 group-hover:fill-white/10 mx-auto" />
                                <div className="absolute top-2/4 -translate-y-2/4 start-0 end-0 mx-auto text-amber-400 rounded-xl group-hover:text-white duration-500 text-2xl flex align-middle justify-center items-center">
                                    <FiPhone />
                                </div>
                            </div>

                            <div className="content mt-7">
                                <h5 className="title h5 text-lg font-semibold">Phone Support</h5>
                                <p className="text-slate-400 mt-3">Need immediate assistance? Our dedicated support team is available to help you with any questions or concerns.</p>

                                <div className="mt-5">
                                    <Link to="tel:083-305-2423" className="hover:text-amber-400 font-medium">083-305-2423</Link>
                                    <p className="text-xs text-slate-500 mt-1">Monday - Friday, 9AM - 5PM (PHT)</p>
                                </div>
                            </div>
                        </div>

                        <div className="text-center px-6">
                            <div className="relative overflow-hidden text-transparent -m-3">
                                <FiHexagon className="h-24 w-24 fill-amber-400/5 group-hover:fill-white/10 mx-auto" />
                                <div className="absolute top-2/4 -translate-y-2/4 start-0 end-0 mx-auto text-amber-400 rounded-xl group-hover:text-white duration-500 text-2xl flex align-middle justify-center items-center">
                                    <FiMail />
                                </div>
                            </div>

                            <div className="content mt-7">
                                <h5 className="title h5 text-lg font-semibold">Email Support</h5>
                                <p className="text-slate-400 mt-3">Get in touch with our support team for any questions, feedback, or assistance you may need. We typically respond within 24 hours.</p>

                                <div className="mt-5">
                                    <Link to="mailto:support@betterteachingsolutions.com" className="hover:text-amber-400 font-medium">support@betterteachingsolutions.com</Link>
                                    <p className="text-xs text-slate-500 mt-1">24/7 - We'll respond within 24 hours</p>
                                </div>
                            </div>
                        </div>

                        <div className="text-center px-6">
                            <div className="relative overflow-hidden text-transparent -m-3">
                                <FiHexagon className="h-24 w-24 fill-amber-400/5 group-hover:fill-white/10 mx-auto" />
                                <div className="absolute top-2/4 -translate-y-2/4 start-0 end-0 mx-auto text-amber-400 rounded-xl group-hover:text-white duration-500 text-2xl flex align-middle justify-center items-center">
                                    <FiMapPin />
                                </div>
                            </div>

                            <div className="content mt-7">
                                <h5 className="title h5 text-lg font-semibold">Feature Requests</h5>
                                <p className="text-slate-400 mt-3">Have an idea for a feature that would make Better Teaching Solutions even better? We'd love to hear from you!</p>

                                <div className="mt-5">
                                    <Link to="mailto:support@betterteachingsolutions.com?subject=Feature Request" className="hover:text-amber-400 font-medium">Submit Feature Request</Link>
                                    <p className="text-xs text-slate-500 mt-1">Help us improve our platform</p>
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
