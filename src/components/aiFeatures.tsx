import { FiEdit2, FiAirplay, FiCreditCard, FiGlobe, FiLayout, FiLifeBuoy } from "../assets/icons/vander";
import { IconType } from "react-icons";

interface FeatureItem {
    icon: IconType;
    title: string;
    desc: string;
}

export default function AiFeatures() {
    const featureData: FeatureItem[] = [
        {
            icon: FiEdit2,
            title: 'Daily Lesson Log (DLL) Generator',
            desc: 'Generate complete weekly DLLs in seconds—fully aligned with MATATAG curriculum and ready to submit'
        },
        {
            icon: FiLayout,
            title: 'SF1-SF10 Forms Automation',
            desc: 'Auto-fill all DepEd school forms with your class data. No more manual entry—just download and print'
        },
        {
            icon: FiGlobe,
            title: 'Weekly Lesson Plan Builder',
            desc: 'Create lesson plans instantly with learning competencies, objectives, and assessments included'
        },
        {
            icon: FiCreditCard,
            title: 'Assessment & Quiz Generator',
            desc: 'Generate quizzes, tests, and performance tasks aligned with your lesson plans—complete with answer keys'
        },
        {
            icon: FiAirplay,
            title: 'Class Record Management',
            desc: 'Digital gradebook with automatic computation following K-12 grading system (WW, PT, QA)'
        },
        {
            icon: FiLifeBuoy,
            title: 'Attendance & Reports',
            desc: 'Track daily attendance and generate SF2 reports instantly—mark all students present with one click'
        },
    ];

    return (
        <>
            <div className="container relative md:mt-24 mt-16 px-6 md:px-4">
                <div className="grid grid-cols-1 pb-6 text-center px-4 md:px-0">
                    <h3 className="mb-4 text-xl md:text-section-title leading-tight md:leading-normal font-semibold text-text-primary dark:text-white">All Your Teaching Tools in One Place</h3>
                    <p className="text-small md:text-body text-text-secondary dark:text-slate-300 max-w-xl mx-auto">Generate DLLs, lesson plans, SF1-SF10 forms, and class records—ready to submit instantly</p>
                </div>

                <div className="grid md:grid-cols-3 grid-cols-1 mt-6 gap-6">
                    {featureData.map((item, index) => {
                        const Icon = item.icon;
                        return (
                            <div className="group flex duration-500 xl:p-3" key={index}>
                                <div className="flex align-middle justify-center items-center w-14 h-14 mt-1 bg-amber-400/5 group-hover:bg-amber-400 group-hover:text-white border-2 border-amber-400/20 text-amber-600 dark:text-amber-400 rounded-lg text-2xl shadow-sm dark:shadow-gray-800 duration-500">
                                    <Icon className="w-5 h-5"/>
                                </div>
                                <div className="flex-1 ms-4">
                                    <h4 className="mb-0 text-small md:text-body font-semibold text-text-primary dark:text-white">{item.title}</h4>
                                    <p className="text-small md:text-small text-text-secondary dark:text-slate-300 mt-2">{item.desc}</p>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </>
    );
}
