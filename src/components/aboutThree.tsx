import { Link } from "react-router-dom";

import { FiCheckCircle } from '../assets/icons/vander';

export default function AboutThree() {
    return (
        <>
            <div className="container relative md:mt-24 mt-16">
                <div className="grid md:grid-cols-2 grid-cols-1 items-center gap-6">
                    <div>
                        <img src="/Screenshot_4.png" alt="Teaching tools screenshot" className="rounded-lg" />
                    </div>

                    <div className="">
                        <h3 className="mb-4 md:text-3xl md:leading-normal text-2xl leading-normal font-semibold text-slate-900 dark:text-white">Empower Your Teaching with <br/> AI-Driven Tools</h3>
                        <p className="text-slate-700 dark:text-slate-400 max-w-xl">"Effortlessly create lesson plans, quizzes, slideshows, and engaging teaching materials in just minutes. Our AI-powered platform helps teachers save time, inspire students, and focus on what matters most—teaching."</p>

                        <ul className="list-none text-slate-700 dark:text-slate-400 mt-4">
                            <li className="mb-2 flex items-center"><FiCheckCircle className="text-amber-600 dark:text-amber-400 h-5 w-5 me-2"/> Create Custom Assessments with AI Assistance</li>
                            <li className="mb-2 flex items-center"><FiCheckCircle className="text-amber-600 dark:text-amber-400 h-5 w-5 me-2"/> Generate Engaging Visual Teaching Materials</li>
                            <li className="mb-2 flex items-center"><FiCheckCircle className="text-amber-600 dark:text-amber-400 h-5 w-5 me-2"/> Simplify Administrative Tasks and Documentation</li>
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
