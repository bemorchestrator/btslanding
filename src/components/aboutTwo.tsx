import { Link } from "react-router-dom";

import { FiCheckCircle, MdKeyboardArrowRight } from '../assets/icons/vander';
import ImageModal from './ImageModal';

export default function AboutTwo() {
    return (
        <>
            <div className="container relative md:mt-24 mt-16 px-6 md:px-4">
                <div className="grid md:grid-cols-2 grid-cols-1 items-center gap-8 md:gap-6">
                    <ImageModal
                        src="/sf2.png"
                        alt="Class record screenshot"
                        className="relative order-2 md:order-2"
                    />

                    <div className="order-1 md:order-1 px-4 md:px-0">
                        <h4 className="mb-4 text-xl md:text-section-title leading-tight md:leading-normal font-semibold text-text-primary dark:text-white">Never Calculate Grades <br/> Manually Again</h4>
                        <p className="text-small md:text-body text-text-secondary dark:text-slate-300 mb-4">Computing final grades for a class of 40 students takes 3-4 hours per quarter when done manually with calculators. The system automatically calculates all grade components following DepEd's formula (WW 30%, PT 50%, QA 20%) the moment you input scores. Final grades appear instantly, with zero calculation errors.</p>
                        <ul className="list-none text-small md:text-body text-text-secondary dark:text-slate-300 mt-4 space-y-2">
                            <li className="flex items-start gap-2"><FiCheckCircle className="text-amber-600 dark:text-amber-400 h-5 w-5 mt-0.5 flex-shrink-0"/> <span>Auto-Compute Final Grades Using DepEd Formula (WW 30%, PT 50%, QA 20%)</span></li>
                            <li className="flex items-start gap-2"><FiCheckCircle className="text-amber-600 dark:text-amber-400 h-5 w-5 mt-0.5 flex-shrink-0"/> <span>Input Scores Once, See Final Grades Instantly—No Calculator Needed</span></li>
                            <li className="flex items-start gap-2"><FiCheckCircle className="text-amber-600 dark:text-amber-400 h-5 w-5 mt-0.5 flex-shrink-0"/> <span>Export Class Records to Excel or Print Ready for SF4 Submission</span></li>
                        </ul>

                        <div className="mt-6">
                            <Link to="/introductory-offer" className="py-3 px-6 inline-flex items-center justify-center gap-2 font-semibold tracking-wide border align-middle duration-500 text-sm md:text-base text-center bg-amber-400 hover:bg-amber-500 border-amber-400 hover:border-amber-500 text-white rounded-md shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all w-full md:w-auto">
                                Try Auto-Grading Now
                                <MdKeyboardArrowRight className="text-[20px]"/>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
