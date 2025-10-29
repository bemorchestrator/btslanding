import { Link } from "react-router-dom";

import errorImg from "../assets/images/error.svg"
import Switcher from "../components/switcher";

export default function Error(): JSX.Element {
    return (
        <>
            <section className="relative overflow-hidden h-screen flex items-center bg-amber-400/5 dark:bg-amber-400/10">
                <div className="container relative">
                    <div className="lg:flex justify-center">
                        <div className="lg:w-1/2">
                            <Link to="/">
                                <img src="/btsolutions.png" className="h-16 py-2" alt="Better Teaching Solutions" />
                            </Link>
                            <div className="mt-8">
                                <img src={errorImg} className="max-w-md mx-auto" alt="" />

                                <div className="text-center">
                                    <h5 className="mb-4 md:text-5xl text-3xl md:leading-normal leading-normal tracking-wider font-bold text-text-primary dark:text-white">Page Not Found</h5>
                                    <p className="text-body text-text-secondary dark:text-slate-300 max-w-xl mx-auto">The page you're looking for doesn't exist. Return to our homepage to explore Better Teaching Solutions.</p>

                                    <div className="mt-6">
                                        <Link to="/" className="py-2 px-5 inline-block font-semibold tracking-wide border align-middle duration-500 text-base text-center bg-amber-400 hover:bg-amber-500 border-amber-400 hover:border-amber-500 text-white rounded-md">Back to Home</Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <Switcher />
        </>
    )
}
