import { Link } from "react-router-dom";

import { FiCheckCircle } from '../assets/icons/vander';

export default function AboutThree() {
    return (
        <>
            <div className="container relative md:mt-24 mt-16">
                <div className="grid md:grid-cols-2 grid-cols-1 items-center gap-6">
                    <div className="relative overflow-hidden after:content-[''] after:absolute after:inset-0 after:mx-auto after:w-72 after:h-72 after:bg-gradient-to-tl after:to-amber-400 after:from-fuchsia-600 after:blur-[80px] after:rounded-full p-6 bg-white dark:bg-slate-900 rounded-md shadow dark:shadow-slate-800">
                        <div className="relative overflow-hidden rounded-lg shadow-md dark:shadow-gray-800 z-1">
                            <div className="relative">
                                <img src="/screenshot_4.png" alt="Teaching tools screenshot" className="w-3/4 max-w-md rounded-lg mx-auto" />
                            </div>
                        </div>
                    </div>

                    <div className="">
                        <h3 className="mb-4 md:text-3xl md:leading-normal text-2xl leading-normal font-semibold">Empower Your Teaching with <br/> AI-Driven Tools</h3>
                        <p className="text-slate-400 max-w-xl">"Effortlessly create lesson plans, quizzes, slideshows, and engaging teaching materials in just minutes. Our AI-powered platform helps teachers save time, inspire students, and focus on what matters most—teaching."</p>

                        <ul className="list-none text-slate-400 mt-4">
                            <li className="mb-2 flex items-center"><FiCheckCircle className="text-amber-400 h-5 w-5 me-2"/> Create Custom Assessments with AI Assistance</li>
                            <li className="mb-2 flex items-center"><FiCheckCircle className="text-amber-400 h-5 w-5 me-2"/> Generate Engaging Visual Teaching Materials</li>
                            <li className="mb-2 flex items-center"><FiCheckCircle className="text-amber-400 h-5 w-5 me-2"/> Simplify Administrative Tasks and Documentation</li>
                        </ul>

                        <div className="mt-4">
                            <Link to="" className="hover:text-amber-400 font-medium duration-500">Find Out More <i className="mdi mdi-chevron-right text-[20px] align-middle"></i></Link>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
