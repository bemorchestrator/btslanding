import React, { useState } from "react";
import { Link } from "react-router-dom";

import { FiCheckCircle, AiOutlineClose } from '../assets/icons/vander';

interface FeatureItemProps {
    isAvailable: boolean;
    children: React.ReactNode;
}

const FeatureItem: React.FC<FeatureItemProps> = ({ isAvailable, children }) => (
    <li className={`flex items-center mt-2 ${!isAvailable ? 'text-slate-400' : ''}`}>
        {isAvailable ? (
            <FiCheckCircle className="text-green-600 h-[18px] w-[18px] me-2" />
        ) : (
            <AiOutlineClose className="h-[18px] w-[18px] me-2" />
        )}
        {children}
    </li>
);

export default function Pricing(): JSX.Element {
    const [businessPrice] = useState<number>(200);
    const [professionalPrice] = useState<number>(1500);

    return (
        <>
            <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 mt-6 gap-6">
                <div className="relative overflow-hidden rounded-md shadow dark:shadow-gray-800">
                    <div className="p-6">
                        <h5 className="text-2xl leading-normal font-semibold">Free</h5>
                        <p className="text-slate-400 mt-2">Automate your workflow with AI</p>
                        <div className="flex mt-4">
                            <span className="text-lg font-semibold">$</span>
                            <span className="text-5xl font-semibold mb-0 ms-1">0</span>
                        </div>
                        <p className="text-slate-400 uppercase text-xs">per month</p>

                        <div className="mt-6">
                            <p className="text-slate-400 text-sm mt-4">No credit card required. Start creating today</p>
                            <Link to="https://app.betterteachingsolutions.com/register" className="py-2 px-5 inline-block font-semibold tracking-wide border align-middle duration-500 text-base text-center bg-amber-400/5 hover:bg-amber-400 rounded border-amber-400/10 hover:border-amber-400 text-amber-400 hover:text-white">Try For Free</Link>
                        </div>
                    </div>

                    <div className="p-6 bg-gray-50 dark:bg-slate-800">
                        <ul className="list-none text-slate-400">
                            <li className="font-semibold text-slate-900 dark:text-white text-sm uppercase">Features:</li>

                            <FeatureItem isAvailable={true}>
                                <span className="text-slate-900 dark:text-white me-1 font-semibold">40 Students</span>, 1 Classroom
                            </FeatureItem>
                            <FeatureItem isAvailable={true}>
                                <span className="text-slate-900 dark:text-white me-1 font-semibold">5 DLL AI Generations</span> per day
                            </FeatureItem>
                            <FeatureItem isAvailable={true}>
                                <span className="text-slate-900 dark:text-white me-1 font-semibold">Automated SF1 to SF10</span>
                            </FeatureItem>
                            <FeatureItem isAvailable={true}>
                                <span className="text-slate-900 dark:text-white me-1 font-semibold">Bulk Upload</span> (10 students)
                            </FeatureItem>
                            <FeatureItem isAvailable={true}>
                                <span className="text-slate-900 dark:text-white me-1 font-semibold">Basic Analytics</span>
                            </FeatureItem>
                            <FeatureItem isAvailable={false}>
                                Advanced AI Features
                            </FeatureItem>
                            <FeatureItem isAvailable={false}>
                                Priority Support
                            </FeatureItem>
                        </ul>
                    </div>
                </div>

                <div className="relative overflow-hidden rounded-md shadow dark:shadow-gray-800">
                    <div className="p-6">
                        <h5 className="text-2xl leading-normal font-semibold">Teacher</h5>
                        <p className="text-slate-400 mt-2">Everything from Free Plan and More</p>

                        <div className="relative">
                            <div className="flex mt-4">
                                <span className="text-lg font-semibold">₱</span>
                                <span className="">
                                    <input type="hidden" id="business-amount" className="form-control" />
                                    <p className="text-5xl font-semibold mb-0 ms-1" id="busi-amt">{businessPrice}</p>
                                    <p className="text-slate-400 uppercase text-xs">per month</p>
                                </span>
                            </div>

                            <div className="h-14"></div>
                        </div>

                        <Link to="https://app.betterteachingsolutions.com/pricing" className="py-2 px-5 inline-block font-semibold tracking-wide border align-middle duration-500 text-base text-center bg-amber-400 hover:bg-amber-500 border-amber-400 hover:border-amber-500 text-white rounded">Select Plan</Link>
                    </div>

                    <div className="p-6 bg-gray-50 dark:bg-slate-800">
                        <ul className="list-none text-slate-400">
                            <li className="font-semibold text-slate-900 dark:text-white text-sm uppercase">Features:</li>

                            <FeatureItem isAvailable={true}>
                                <span className="text-slate-900 dark:text-white me-1 font-semibold">150 Students</span>, 3 Classrooms
                            </FeatureItem>
                            <FeatureItem isAvailable={true}>
                                <span className="text-slate-900 dark:text-white me-1 font-semibold">20 DLL AI Generations</span> per day
                            </FeatureItem>
                            <FeatureItem isAvailable={true}>
                                <span className="text-slate-900 dark:text-white me-1 font-semibold">Automated SF1 to SF10</span>
                            </FeatureItem>
                            <FeatureItem isAvailable={true}>
                                <span className="text-slate-900 dark:text-white me-1 font-semibold">Bulk Upload</span> (40 students)
                            </FeatureItem>
                            <FeatureItem isAvailable={true}>
                                <span className="text-slate-900 dark:text-white me-1 font-semibold">Advanced Analytics</span>
                            </FeatureItem>
                            <FeatureItem isAvailable={true}>
                                <span className="text-slate-900 dark:text-white me-1 font-semibold">Worksheet Generator</span>
                            </FeatureItem>
                            <FeatureItem isAvailable={true}>
                                <span className="text-slate-900 dark:text-white me-1 font-semibold">PowerPoint Maker</span>
                            </FeatureItem>
                            <FeatureItem isAvailable={true}>
                                <span className="text-slate-900 dark:text-white me-1 font-semibold">Anecdotal Analysis</span>
                            </FeatureItem>
                            <FeatureItem isAvailable={true}>
                                <span className="text-slate-900 dark:text-white me-1 font-semibold">Priority Support</span>
                            </FeatureItem>
                        </ul>
                    </div>
                </div>

                <div className="relative overflow-hidden rounded-md shadow dark:shadow-gray-800">
                    <div className="p-6">
                        <h5 className="text-2xl leading-normal font-semibold">School Admin</h5>
                        <p className="text-slate-400 mt-2">For growing & established schools</p>

                        <div className="relative">
                            <div className="flex mt-4">
                                <span className="text-lg font-semibold">₱</span>
                                <span className="">
                                    <input type="hidden" id="professional-amount" className="form-control" />
                                    <p className="text-5xl font-semibold mb-0 ms-1" id="pro-amt">{professionalPrice}</p>
                                    <p className="text-slate-400 uppercase text-xs">per month</p>
                                </span>
                            </div>

                            <div className="h-14"></div>
                        </div>

                        <Link to="https://app.betterteachingsolutions.com/pricing" className="py-2 px-5 inline-block font-semibold tracking-wide border align-middle duration-500 text-base text-center bg-amber-400 hover:bg-amber-500 border-amber-400 hover:border-amber-500 text-white rounded">Select Plan</Link>
                    </div>

                    <div className="p-6 bg-gray-50 dark:bg-slate-800">
                        <ul className="list-none text-slate-400">
                            <li className="font-semibold text-slate-900 dark:text-white text-sm uppercase">Features:</li>

                            <FeatureItem isAvailable={true}>
                                <span className="text-slate-900 dark:text-white me-1 font-semibold">500 Students</span>, 12 Classrooms
                            </FeatureItem>
                            <FeatureItem isAvailable={true}>
                                <span className="text-slate-900 dark:text-white me-1 font-semibold">50 DLL AI Generations</span> per day
                            </FeatureItem>
                            <FeatureItem isAvailable={true}>
                                <span className="text-slate-900 dark:text-white me-1 font-semibold">Automated SF1 to SF10</span>
                            </FeatureItem>
                            <FeatureItem isAvailable={true}>
                                <span className="text-slate-900 dark:text-white me-1 font-semibold">Bulk Upload</span> (100 students)
                            </FeatureItem>
                            <FeatureItem isAvailable={true}>
                                <span className="text-slate-900 dark:text-white me-1 font-semibold">Advanced Analytics</span>
                            </FeatureItem>
                            <FeatureItem isAvailable={true}>
                                <span className="text-slate-900 dark:text-white me-1 font-semibold">All Premium Features</span>
                            </FeatureItem>
                            <FeatureItem isAvailable={true}>
                                <span className="text-slate-900 dark:text-white me-1 font-semibold">Teacher Community Access</span>
                            </FeatureItem>
                            <FeatureItem isAvailable={true}>
                                <span className="text-slate-900 dark:text-white me-1 font-semibold">Priority Support</span>
                            </FeatureItem>
                        </ul>
                    </div>
                </div>
            </div>

            {/* Comprehensive Feature Comparison Table */}
            <div className="mt-16">
                <div className="text-center mb-8">
                    <h2 className="text-3xl font-bold">Complete Feature Comparison</h2>
                    <p className="mt-2 text-lg text-slate-400">See exactly what's included in each plan</p>
                </div>

                <div className="relative overflow-hidden rounded-md shadow dark:shadow-gray-800 border border-gray-100 dark:border-gray-700">
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead>
                                <tr className="bg-gradient-to-r from-amber-400 to-orange-400 text-white">
                                    <th className="px-6 py-4 text-left text-sm font-semibold">Features</th>
                                    <th className="px-6 py-4 text-center text-sm font-semibold">Free</th>
                                    <th className="px-6 py-4 text-center text-sm font-semibold">Teacher</th>
                                    <th className="px-6 py-4 text-center text-sm font-semibold">School Admin</th>
                                </tr>
                            </thead>
                            <tbody>
                                {/* Capacity & Scale */}
                                <tr className="bg-amber-50/30 dark:bg-amber-900/5 border-b border-amber-100 dark:border-amber-900/20">
                                    <td colSpan={4} className="px-6 py-2 text-xs font-semibold text-amber-700 dark:text-amber-400 uppercase tracking-wider">Capacity & Scale</td>
                                </tr>
                                <tr className="hover:bg-amber-50/20 dark:hover:bg-amber-900/5 transition-colors">
                                    <td className="px-6 py-4 text-sm font-medium border-b border-gray-100 dark:border-gray-800">Students</td>
                                    <td className="px-6 py-4 text-center text-sm border-b border-gray-100 dark:border-gray-800">40</td>
                                    <td className="px-6 py-4 text-center text-sm border-b border-gray-100 dark:border-gray-800 bg-amber-50/50 dark:bg-amber-900/10 font-semibold">150</td>
                                    <td className="px-6 py-4 text-center text-sm border-b border-gray-100 dark:border-gray-800">500</td>
                                </tr>
                                <tr className="hover:bg-amber-50/20 dark:hover:bg-amber-900/5 transition-colors">
                                    <td className="px-6 py-4 text-sm font-medium border-b border-gray-100 dark:border-gray-800">Classrooms</td>
                                    <td className="px-6 py-4 text-center text-sm border-b border-gray-100 dark:border-gray-800">1</td>
                                    <td className="px-6 py-4 text-center text-sm border-b border-gray-100 dark:border-gray-800 bg-amber-50/50 dark:bg-amber-900/10 font-semibold">3</td>
                                    <td className="px-6 py-4 text-center text-sm border-b border-gray-100 dark:border-gray-800">12</td>
                                </tr>

                                {/* AI Features */}
                                <tr className="bg-amber-50/30 dark:bg-amber-900/5 border-b border-amber-100 dark:border-amber-900/20">
                                    <td colSpan={4} className="px-6 py-2 text-xs font-semibold text-amber-700 dark:text-amber-400 uppercase tracking-wider">AI Features</td>
                                </tr>
                                <tr className="hover:bg-amber-50/20 dark:hover:bg-amber-900/5 transition-colors">
                                    <td className="px-6 py-4 text-sm font-medium border-b border-gray-100 dark:border-gray-800">DLL AI Generations/day</td>
                                    <td className="px-6 py-4 text-center text-sm border-b border-gray-100 dark:border-gray-800">5</td>
                                    <td className="px-6 py-4 text-center text-sm border-b border-gray-100 dark:border-gray-800 bg-amber-50/50 dark:bg-amber-900/10 font-semibold">20</td>
                                    <td className="px-6 py-4 text-center text-sm border-b border-gray-100 dark:border-gray-800">50</td>
                                </tr>
                                <tr className="hover:bg-amber-50/20 dark:hover:bg-amber-900/5 transition-colors">
                                    <td className="px-6 py-4 text-sm font-medium border-b border-gray-100 dark:border-gray-800">Monthly AI Allowance</td>
                                    <td className="px-6 py-4 text-center text-sm border-b border-gray-100 dark:border-gray-800">150</td>
                                    <td className="px-6 py-4 text-center text-sm border-b border-gray-100 dark:border-gray-800 bg-amber-50/50 dark:bg-amber-900/10 font-semibold">240</td>
                                    <td className="px-6 py-4 text-center text-sm border-b border-gray-100 dark:border-gray-800">600</td>
                                </tr>
                                <tr className="hover:bg-amber-50/20 dark:hover:bg-amber-900/5 transition-colors">
                                    <td className="px-6 py-4 text-sm font-medium border-b border-gray-100 dark:border-gray-800">AI Lesson Plan Generator/day</td>
                                    <td className="px-6 py-4 text-center text-sm border-b border-gray-100 dark:border-gray-800">5</td>
                                    <td className="px-6 py-4 text-center text-sm border-b border-gray-100 dark:border-gray-800 bg-amber-50/50 dark:bg-amber-900/10 font-semibold">10</td>
                                    <td className="px-6 py-4 text-center text-sm border-b border-gray-100 dark:border-gray-800">20</td>
                                </tr>
                                <tr className="hover:bg-amber-50/20 dark:hover:bg-amber-900/5 transition-colors">
                                    <td className="px-6 py-4 text-sm font-medium border-b border-gray-100 dark:border-gray-800">Assessment Generator/day</td>
                                    <td className="px-6 py-4 text-center text-sm border-b border-gray-100 dark:border-gray-800">5</td>
                                    <td className="px-6 py-4 text-center text-sm border-b border-gray-100 dark:border-gray-800 bg-amber-50/50 dark:bg-amber-900/10 font-semibold">10</td>
                                    <td className="px-6 py-4 text-center text-sm border-b border-gray-100 dark:border-gray-800">50</td>
                                </tr>

                                {/* School Forms & Enrollment */}
                                <tr className="bg-amber-50/30 dark:bg-amber-900/5 border-b border-amber-100 dark:border-amber-900/20">
                                    <td colSpan={4} className="px-6 py-2 text-xs font-semibold text-amber-700 dark:text-amber-400 uppercase tracking-wider">School Forms & Enrollment</td>
                                </tr>
                                <tr className="hover:bg-amber-50/20 dark:hover:bg-amber-900/5 transition-colors">
                                    <td className="px-6 py-4 text-sm font-medium border-b border-gray-100 dark:border-gray-800">Automated SF1 to SF10</td>
                                    <td className="px-6 py-4 text-center border-b border-gray-100 dark:border-gray-800"><FiCheckCircle className="h-5 w-5 text-green-600 mx-auto" /></td>
                                    <td className="px-6 py-4 text-center border-b border-gray-100 dark:border-gray-800 bg-amber-50/50 dark:bg-amber-900/10"><FiCheckCircle className="h-5 w-5 text-green-600 mx-auto" /></td>
                                    <td className="px-6 py-4 text-center border-b border-gray-100 dark:border-gray-800"><FiCheckCircle className="h-5 w-5 text-green-600 mx-auto" /></td>
                                </tr>
                                <tr className="hover:bg-amber-50/20 dark:hover:bg-amber-900/5 transition-colors">
                                    <td className="px-6 py-4 text-sm font-medium border-b border-gray-100 dark:border-gray-800">3 Enrollment Modes</td>
                                    <td className="px-6 py-4 text-center border-b border-gray-100 dark:border-gray-800"><FiCheckCircle className="h-5 w-5 text-green-600 mx-auto" /></td>
                                    <td className="px-6 py-4 text-center border-b border-gray-100 dark:border-gray-800 bg-amber-50/50 dark:bg-amber-900/10"><FiCheckCircle className="h-5 w-5 text-green-600 mx-auto" /></td>
                                    <td className="px-6 py-4 text-center border-b border-gray-100 dark:border-gray-800"><FiCheckCircle className="h-5 w-5 text-green-600 mx-auto" /></td>
                                </tr>
                                <tr className="hover:bg-amber-50/20 dark:hover:bg-amber-900/5 transition-colors">
                                    <td className="px-6 py-4 text-sm font-medium border-b border-gray-100 dark:border-gray-800">AI Document Processing</td>
                                    <td className="px-6 py-4 text-center border-b border-gray-100 dark:border-gray-800"><FiCheckCircle className="h-5 w-5 text-green-600 mx-auto" /></td>
                                    <td className="px-6 py-4 text-center border-b border-gray-100 dark:border-gray-800 bg-amber-50/50 dark:bg-amber-900/10"><FiCheckCircle className="h-5 w-5 text-green-600 mx-auto" /></td>
                                    <td className="px-6 py-4 text-center border-b border-gray-100 dark:border-gray-800"><FiCheckCircle className="h-5 w-5 text-green-600 mx-auto" /></td>
                                </tr>
                                <tr className="hover:bg-amber-50/20 dark:hover:bg-amber-900/5 transition-colors">
                                    <td className="px-6 py-4 text-sm font-medium border-b border-gray-100 dark:border-gray-800">Bulk CSV/Excel Upload</td>
                                    <td className="px-6 py-4 text-center text-sm border-b border-gray-100 dark:border-gray-800">10 students</td>
                                    <td className="px-6 py-4 text-center text-sm border-b border-gray-100 dark:border-gray-800 bg-amber-50/50 dark:bg-amber-900/10 font-semibold">40 students</td>
                                    <td className="px-6 py-4 text-center text-sm border-b border-gray-100 dark:border-gray-800">100 students</td>
                                </tr>
                                <tr className="hover:bg-amber-50/20 dark:hover:bg-amber-900/5 transition-colors">
                                    <td className="px-6 py-4 text-sm font-medium border-b border-gray-100 dark:border-gray-800">Schedule Management</td>
                                    <td className="px-6 py-4 text-center border-b border-gray-100 dark:border-gray-800"><FiCheckCircle className="h-5 w-5 text-green-600 mx-auto" /></td>
                                    <td className="px-6 py-4 text-center border-b border-gray-100 dark:border-gray-800 bg-amber-50/50 dark:bg-amber-900/10"><FiCheckCircle className="h-5 w-5 text-green-600 mx-auto" /></td>
                                    <td className="px-6 py-4 text-center border-b border-gray-100 dark:border-gray-800"><FiCheckCircle className="h-5 w-5 text-green-600 mx-auto" /></td>
                                </tr>

                                {/* Analytics & Reports */}
                                <tr className="bg-amber-50/30 dark:bg-amber-900/5 border-b border-amber-100 dark:border-amber-900/20">
                                    <td colSpan={4} className="px-6 py-2 text-xs font-semibold text-amber-700 dark:text-amber-400 uppercase tracking-wider">Analytics & Reports</td>
                                </tr>
                                <tr className="hover:bg-amber-50/20 dark:hover:bg-amber-900/5 transition-colors">
                                    <td className="px-6 py-4 text-sm font-medium border-b border-gray-100 dark:border-gray-800">Analytics Reports</td>
                                    <td className="px-6 py-4 text-center text-sm border-b border-gray-100 dark:border-gray-800">Basic</td>
                                    <td className="px-6 py-4 text-center text-sm border-b border-gray-100 dark:border-gray-800 bg-amber-50/50 dark:bg-amber-900/10 font-semibold">Advanced</td>
                                    <td className="px-6 py-4 text-center text-sm border-b border-gray-100 dark:border-gray-800">Advanced</td>
                                </tr>

                                {/* Premium Features */}
                                <tr className="bg-amber-50/30 dark:bg-amber-900/5 border-b border-amber-100 dark:border-amber-900/20">
                                    <td colSpan={4} className="px-6 py-2 text-xs font-semibold text-amber-700 dark:text-amber-400 uppercase tracking-wider">Premium Features</td>
                                </tr>
                                <tr className="hover:bg-amber-50/20 dark:hover:bg-amber-900/5 transition-colors">
                                    <td className="px-6 py-4 text-sm font-medium border-b border-gray-100 dark:border-gray-800">Worksheet Generator</td>
                                    <td className="px-6 py-4 text-center border-b border-gray-100 dark:border-gray-800"><AiOutlineClose className="h-5 w-5 text-gray-400 mx-auto" /></td>
                                    <td className="px-6 py-4 text-center border-b border-gray-100 dark:border-gray-800 bg-amber-50/50 dark:bg-amber-900/10"><FiCheckCircle className="h-5 w-5 text-green-600 mx-auto" /></td>
                                    <td className="px-6 py-4 text-center border-b border-gray-100 dark:border-gray-800"><FiCheckCircle className="h-5 w-5 text-green-600 mx-auto" /></td>
                                </tr>
                                <tr className="hover:bg-amber-50/20 dark:hover:bg-amber-900/5 transition-colors">
                                    <td className="px-6 py-4 text-sm font-medium border-b border-gray-100 dark:border-gray-800">PowerPoint Maker</td>
                                    <td className="px-6 py-4 text-center border-b border-gray-100 dark:border-gray-800"><AiOutlineClose className="h-5 w-5 text-gray-400 mx-auto" /></td>
                                    <td className="px-6 py-4 text-center border-b border-gray-100 dark:border-gray-800 bg-amber-50/50 dark:bg-amber-900/10"><FiCheckCircle className="h-5 w-5 text-green-600 mx-auto" /></td>
                                    <td className="px-6 py-4 text-center border-b border-gray-100 dark:border-gray-800"><FiCheckCircle className="h-5 w-5 text-green-600 mx-auto" /></td>
                                </tr>
                                <tr className="hover:bg-amber-50/20 dark:hover:bg-amber-900/5 transition-colors">
                                    <td className="px-6 py-4 text-sm font-medium border-b border-gray-100 dark:border-gray-800">Anecdotal Analysis</td>
                                    <td className="px-6 py-4 text-center border-b border-gray-100 dark:border-gray-800"><AiOutlineClose className="h-5 w-5 text-gray-400 mx-auto" /></td>
                                    <td className="px-6 py-4 text-center border-b border-gray-100 dark:border-gray-800 bg-amber-50/50 dark:bg-amber-900/10"><FiCheckCircle className="h-5 w-5 text-green-600 mx-auto" /></td>
                                    <td className="px-6 py-4 text-center border-b border-gray-100 dark:border-gray-800"><FiCheckCircle className="h-5 w-5 text-green-600 mx-auto" /></td>
                                </tr>

                                {/* Community & Support */}
                                <tr className="bg-amber-50/30 dark:bg-amber-900/5 border-b border-amber-100 dark:border-amber-900/20">
                                    <td colSpan={4} className="px-6 py-2 text-xs font-semibold text-amber-700 dark:text-amber-400 uppercase tracking-wider">Community & Support</td>
                                </tr>
                                <tr className="hover:bg-amber-50/20 dark:hover:bg-amber-900/5 transition-colors">
                                    <td className="px-6 py-4 text-sm font-medium border-b border-gray-100 dark:border-gray-800">Teacher Community Access</td>
                                    <td className="px-6 py-4 text-center border-b border-gray-100 dark:border-gray-800"><AiOutlineClose className="h-5 w-5 text-gray-400 mx-auto" /></td>
                                    <td className="px-6 py-4 text-center border-b border-gray-100 dark:border-gray-800 bg-amber-50/50 dark:bg-amber-900/10"><FiCheckCircle className="h-5 w-5 text-green-600 mx-auto" /></td>
                                    <td className="px-6 py-4 text-center border-b border-gray-100 dark:border-gray-800"><FiCheckCircle className="h-5 w-5 text-green-600 mx-auto" /></td>
                                </tr>
                                <tr className="hover:bg-amber-50/20 dark:hover:bg-amber-900/5 transition-colors">
                                    <td className="px-6 py-4 text-sm font-medium">Priority Support</td>
                                    <td className="px-6 py-4 text-center"><AiOutlineClose className="h-5 w-5 text-gray-400 mx-auto" /></td>
                                    <td className="px-6 py-4 text-center bg-amber-50/50 dark:bg-amber-900/10"><FiCheckCircle className="h-5 w-5 text-green-600 mx-auto" /></td>
                                    <td className="px-6 py-4 text-center"><FiCheckCircle className="h-5 w-5 text-green-600 mx-auto" /></td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </>
    );
}
