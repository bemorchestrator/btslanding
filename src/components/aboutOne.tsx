import { Link } from "react-router-dom";

import { FiCheckCircle, MdKeyboardArrowRight } from '../assets/icons/vander';

export default function AboutOne() {
    return (
        <>
            <div className="container relative md:mt-24 mt-16">
                <div className="grid md:grid-cols-2 grid-cols-1 items-center gap-6">
                    <div>
                        <img src="/Screenshot_5.png" alt="" className="rounded-lg"/>
                    </div>

                    <div className="">
                        <h3 className="mb-4 md:text-3xl md:leading-normal text-2xl leading-normal font-semibold text-slate-900 dark:text-white">Lesson Plans & Quizzes <br/> Generated in Seconds</h3>
                        <p className="text-slate-700 dark:text-slate-400 max-w-xl">"What used to take me hours to create now happens instantly. I describe what I need, and the AI delivers a complete lesson plan or quiz that I can customize in seconds. It's literally saved me hundreds of hours this year alone."</p>

                        <ul className="list-none text-slate-700 dark:text-slate-400 mt-4">
                            <li className="mb-2 flex items-center"><FiCheckCircle className="text-amber-600 dark:text-amber-400 h-5 w-5 me-2"/>Complete Lesson Plans Generated in Seconds</li>
                            <li className="mb-2 flex items-center"><FiCheckCircle className="text-amber-600 dark:text-amber-400 h-5 w-5 me-2"/>Custom Quizzes with Answer Keys Instantly</li>
                            <li className="mb-2 flex items-center"><FiCheckCircle className="text-amber-600 dark:text-amber-400 h-5 w-5 me-2"/>Visual Teaching Materials Ready to Use</li>
                        </ul>

                        <div className="mt-4">
                            <Link to="" className="hover:text-amber-400 font-medium duration-500 inline-flex items-center">Find Out More <MdKeyboardArrowRight className="ms-1 text-[20px]"/></Link>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
