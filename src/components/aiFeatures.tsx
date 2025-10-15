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
            title: 'Lesson Plan Generator',
            desc: 'Automatically generate complete lesson plans in minutes based on your curriculum and teaching style'
        },
        {
            icon: FiAirplay,
            title: 'PowerPoint Creator',
            desc: 'Create engaging, visually appealing slide presentations with a single prompt - complete with graphics and key points'
        },
        {
            icon: FiCreditCard,
            title: 'Smart Assessment Builder',
            desc: 'Generate customized quizzes, tests and assignments that align perfectly with your learning objectives'
        },
        {
            icon: FiGlobe,
            title: 'Attendance Tracking',
            desc: 'Simplify attendance management with intelligent tracking, reports and automatic notification systems'
        },
        {
            icon: FiLayout,
            title: 'Automated Grading',
            desc: 'Save hours with AI-powered grading that provides consistent evaluation and personalized feedback'
        },
        {
            icon: FiLifeBuoy,
            title: 'Student Profiling',
            desc: 'Track student progress, identify learning patterns, and receive insights to support individualized learning'
        },
    ];

    return (
        <>
            <div className="container relative md:mt-24 mt-16">
                <div className="grid grid-cols-1 pb-6 text-center">
                    <h3 className="mb-4 md:text-3xl md:leading-normal text-2xl leading-normal font-semibold">AI Tools for Teachers</h3>
                    <p className="text-slate-400 max-w-xl mx-auto">Transform your teaching experience with powerful AI tools designed specifically for educators</p>
                </div>

                <div className="grid md:grid-cols-3 grid-cols-1 mt-6 gap-6">
                    {featureData.map((item, index) => {
                        const Icon = item.icon;
                        return (
                            <div className="group flex duration-500 xl:p-3" key={index}>
                                <div className="flex align-middle justify-center items-center w-14 h-14 mt-1 bg-amber-400/5 group-hover:bg-amber-400 group-hover:text-white border-2 border-amber-400/20 text-amber-400 rounded-lg text-2xl shadow-sm dark:shadow-gray-800 duration-500">
                                    <Icon className="w-5 h-5"/>
                                </div>
                                <div className="flex-1 ms-4">
                                    <h4 className="mb-0 text-lg font-semibold">{item.title}</h4>
                                    <p className="text-slate-400 mt-2">{item.desc}</p>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </>
    );
}
