import { Link } from "react-router-dom";

import { FiCheckCircle, MdKeyboardArrowRight } from '../assets/icons/vander';
import ImageModal from './ImageModal';

export default function AboutOne() {
    return (
        <>
            <div className="container relative md:mt-24 mt-16 px-6 md:px-4">
                <div className="grid md:grid-cols-2 grid-cols-1 items-center gap-8 md:gap-6">
                    <ImageModal
                        src="/sf2.png"
                        alt="SF2 form screenshot"
                        className="relative order-2 md:order-1"
                    />

                    <div className="order-1 md:order-2 px-4 md:px-0">
                        <h3 className="mb-4 text-xl md:text-section-title leading-tight md:leading-normal font-semibold text-text-primary dark:text-white">All DepEd Forms <br/> Auto-Filled & Ready to Submit</h3>
                        <p className="text-small md:text-body text-text-secondary dark:text-slate-300 mb-4">Filling out SF1-SF10 forms manually involves hours of copying student data, calculating totals, and formatting in Word or Excel. The system provides all forms in official DepEd format and auto-populates them from your existing class roster, grades, and attendance records. You review the pre-filled data, then print or export to PDF for submission.</p>

                        <ul className="list-none text-small md:text-body text-text-secondary dark:text-slate-300 mt-4 space-y-2">
                            <li className="flex items-start gap-2"><FiCheckCircle className="text-amber-600 dark:text-amber-400 h-5 w-5 mt-0.5 flex-shrink-0"/> <span>All SF1-SF10 Forms in Official DepEd Format</span></li>
                            <li className="flex items-start gap-2"><FiCheckCircle className="text-amber-600 dark:text-amber-400 h-5 w-5 mt-0.5 flex-shrink-0"/> <span>Forms Auto-Populate from Your Class Roster, Grades, and Attendance</span></li>
                            <li className="flex items-start gap-2"><FiCheckCircle className="text-amber-600 dark:text-amber-400 h-5 w-5 mt-0.5 flex-shrink-0"/> <span>Print or Export to PDF Ready for DepEd Submission</span></li>
                        </ul>

                        <div className="mt-6">
                            <Link to="/introductory-offer" className="py-3 px-6 inline-flex items-center justify-center gap-2 font-semibold tracking-wide border align-middle duration-500 text-sm md:text-base text-center bg-amber-400 hover:bg-amber-500 border-amber-400 hover:border-amber-500 text-white rounded-md shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all w-full md:w-auto">
                                Generate Your First Form Now
                                <MdKeyboardArrowRight className="text-[20px]"/>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
