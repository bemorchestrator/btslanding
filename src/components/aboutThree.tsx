import { Link } from "react-router-dom";

import { FiCheckCircle } from '../assets/icons/vander';
import ImageModal from './ImageModal';

export default function AboutThree() {
    return (
        <>
            <div className="container relative md:mt-24 mt-16 px-6 md:px-4">
                <div className="grid md:grid-cols-2 grid-cols-1 items-center gap-8 md:gap-6">
                    <ImageModal
                        src="/lesson-generator.jpeg"
                        alt="Lesson plan generator screenshot"
                        className="relative order-2 md:order-1"
                    />

                    <div className="order-1 md:order-2 px-4 md:px-0">
                        <h3 className="mb-4 text-xl md:text-section-title leading-tight md:leading-normal font-semibold text-text-primary dark:text-white">AI Creates Your Lesson Plans & DLLs in Minutes</h3>
                        <p className="text-small md:text-body text-text-secondary dark:text-slate-300 mb-4">Planning a week of lessons typically takes 10+ hours of research, formatting, and alignment to MATATAG competencies. Our AI generates complete lesson plans and daily lesson logs in minutes—including objectives, activities, assessments, and curriculum codes. You review, customize as needed, and you're done.</p>

                        <ul className="list-none text-small md:text-body text-text-secondary dark:text-slate-300 mt-4 space-y-2">
                            <li className="flex items-start gap-2"><FiCheckCircle className="text-amber-600 dark:text-amber-400 h-5 w-5 mt-0.5 flex-shrink-0"/> <span>AI Generates Complete Lesson Plans with Objectives, Activities & Assessments</span></li>
                            <li className="flex items-start gap-2"><FiCheckCircle className="text-amber-600 dark:text-amber-400 h-5 w-5 mt-0.5 flex-shrink-0"/> <span>Week-Long DLLs Created Instantly for All 5 School Days</span></li>
                            <li className="flex items-start gap-2"><FiCheckCircle className="text-amber-600 dark:text-amber-400 h-5 w-5 mt-0.5 flex-shrink-0"/> <span>100% Aligned with MATATAG Curriculum Standards</span></li>
                        </ul>

                        <div className="mt-6">
                            <Link to="/introductory-offer" className="py-3 px-6 inline-flex items-center justify-center gap-2 font-semibold tracking-wide border align-middle duration-500 text-sm md:text-base text-center bg-amber-400 hover:bg-amber-500 border-amber-400 hover:border-amber-500 text-white rounded-md shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all w-full md:w-auto">
                                Create Your First Lesson Plan
                                <i className="mdi mdi-chevron-right text-[20px]"></i>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
