import React from "react";
import { Link } from "react-router-dom";
import {FiFacebook, FiMail, FiFileText} from '../assets/icons/vander'

export default function Footer(){
    return(
        <>
         <div className="relative">
            <div className="shape absolute xl:-bottom-[30px] lg:-bottom-[16px] md:-bottom-[13px] -bottom-[5px] start-0 end-0 overflow-hidden z-1 rotate-180 text-white dark:text-black">
                <svg className="w-full h-auto scale-[2.0] origin-top" viewBox="0 0 2880 48" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ color: 'var(--tw-text-opacity, 1)', fill: 'currentColor' }}>
                    <path d="M0 48H1437.5H2880V0H2160C1442.5 52 720 0 720 0H0V48Z" fill="currentColor"></path>
                </svg>
            </div>
        </div>
        <footer className="relative bg-gray-900 dark:bg-black overflow-hidden">
            <span className="absolute blur-[200px] w-[300px] h-[300px] rounded-full top-0 -start-[0] bg-gradient-to-tl to-amber-400  from-fuchsia-600 z-0"></span>
            <div className="container-fluid relative md:py-24 py-16">
                <div className="container relative">
                    <div className="grid grid-cols-1 text-center">
                        <div className="">
                            <h4 className="font-bold lg:leading-normal leading-normal text-4xl lg:text-5xl text-white tracking-normal mb-4">Start Your Free Trial.</h4>
                            <p className="text-white/70 text-lg max-w-xl mx-auto">Artificial intelligence makes it fast easy to create content for your blog, social media, website, and more!</p>

                            <div className="mt-6">
                                <a href="https://app.betterteachingsolutions.com/register" target="_blank" rel="noopener noreferrer" className="py-2 px-5 inline-block font-semibold tracking-wide border align-middle duration-500 text-base text-center bg-transparent hover:bg-amber-400 border-gray-800 dark:border-black hover:border-amber-400 dark:hover:border-amber-400 text-white rounded-md">Join Now!</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="container relative text-center">
                <div className="grid grid-cols-1 border-t border-gray-800 dark:border-black">
                    <div className="py-[30px] px-0">
                        <div className="grid md:grid-cols-3 items-center">
                            <div className="md:text-start text-center">
                                <Link to="#" className="text-[22px] focus:outline-none font-bold text-white">
                                    Better Teaching Solutions
                                </Link>
                            </div>

                            <div className="text-center my-4 md:my-0">
                                <Link to="/terms" className="text-gray-500 hover:text-amber-400 text-sm mx-2">Terms of Service</Link>
                                <span className="text-gray-500 text-sm mx-2">|</span>
                                <Link to="/privacy" className="text-gray-500 hover:text-amber-400 text-sm mx-2">Privacy Policy</Link>
                            </div>

                            <ul className="list-none footer-list md:text-end text-center space-x-1">
                                <li className="inline"><Link to="#" className="h-8 w-8 inline-flex items-center justify-center tracking-wide align-middle duration-500 text-base text-center border border-gray-800 dark:border-black rounded-md hover:border-amber-400 dark:hover:border-amber-400 hover:bg-amber-400 dark:hover:bg-amber-400 text-slate-300 hover:text-white"><FiFacebook className="h-4 w-4 align-middle"/></Link></li>
                                <li className="inline"><Link to="mailto:support@shreethemes.in" className="h-8 w-8 inline-flex items-center justify-center tracking-wide align-middle duration-500 text-base text-center border border-gray-800 dark:border-black rounded-md hover:border-amber-400 dark:hover:border-amber-400 hover:bg-amber-400 dark:hover:bg-amber-400 text-slate-300 hover:text-white"><FiMail className="h-4 w-4 align-middle"/></Link></li>
                                <li className="inline"><Link to="https://forms.gle/QkTueCikDGqJnbky9" target="_blank" className="h-8 w-8 inline-flex items-center justify-center tracking-wide align-middle duration-500 text-base text-center border border-gray-800 dark:border-black rounded-md hover:border-amber-400 dark:hover:border-amber-400 hover:bg-amber-400 dark:hover:bg-amber-400 text-slate-300 hover:text-white"><FiFileText className="h-4 w-4 align-middle"/></Link></li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>

            <div className="py-[30px] px-0 border-t border-gray-800 dark:border-black">
                <div className="container relative text-center">
                    <div className="grid grid-cols-1">
                        <div className="text-center">
                            <p className="text-gray-400">© {new Date().getFullYear()} Better Teaching Solutions.</p>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
        </>
    )
}