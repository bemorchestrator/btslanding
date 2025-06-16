import React,{ useState} from "react";
import { Link } from "react-router-dom";

import {FiCheckCircle,AiOutlineClose} from '../assets/icons/vander'

export default function Pricing(){
    const [businessPrice] = useState(200) 
    const [professionalPrice, setProfessionalPrice] = useState(1500)

    let professionalUpdate = (parseFloat(professionalPrice * 0.025).toFixed(1))
    return(
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
                            
                            <li className="flex items-center mt-2"><FiCheckCircle className="text-green-600 h-[18px] w-[18px] me-2"/><span className="text-slate-900 dark:text-white me-1 font-semibold">10 lessons</span> per month</li>
                            <li className="flex items-center mt-2"><FiCheckCircle className="text-green-600 h-[18px] w-[18px] me-2"/> <span className="text-slate-900 dark:text-white me-1 font-semibold">10 Quizzes</span> per month</li>
                            <li className="flex items-center mt-2"><FiCheckCircle className="text-green-600 h-[18px] w-[18px] me-2"/> <span className="text-slate-900 dark:text-white me-1 font-semibold">1 Classroom</span> to manage</li>
                            <li className="flex items-center mt-2 text-slate-400"><AiOutlineClose className="h-[18px] w-[18px] me-2"/> Advanced customization</li>
                            <li className="flex items-center mt-2 text-slate-400"><AiOutlineClose className="h-[18px] w-[18px] me-2"/> Classroom analytics</li>
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
                                    <input type="hidden" id="business-amount" className="form-control"/>
                                    <p className="text-5xl font-semibold mb-0 ms-1" id="busi-amt">{businessPrice}</p>
                                    <p className="text-slate-400 uppercase text-xs">per month</p>
                                </span>
                            </div>

                            <div className="h-14"></div>
                        </div>
                        
                        <Link to="" className="py-2 px-5 inline-block font-semibold tracking-wide border align-middle duration-500 text-base text-center bg-amber-400 hover:bg-amber-500 border-amber-400 hover:border-amber-500 text-white rounded">Coming Soon</Link>
                    </div>

                    <div className="p-6 bg-gray-50 dark:bg-slate-800">
                        <ul className="list-none text-slate-400">
                            <li className="font-semibold text-slate-900 dark:text-white text-sm uppercase">Features:</li>
                            
                            <li className="flex items-center mt-2"><FiCheckCircle className="text-green-600 h-[18px] w-[18px] me-2"/> <span className="text-slate-900 dark:text-white me-1 font-semibold">30 Lesson Plans</span> per month</li>
                            <li className="flex items-center mt-2"><FiCheckCircle className="text-green-600 h-[18px] w-[18px] me-2"/> <span className="text-slate-900 dark:text-white me-1 font-semibold">30 Quizzes</span> per month</li>
                            <li className="flex items-center mt-2"><FiCheckCircle className="text-green-600 h-[18px] w-[18px] me-2"/> <span className="text-slate-900 dark:text-white me-1 font-semibold">1 Classroom</span> to manage</li>
                            <li className="flex items-center mt-2"><FiCheckCircle className="text-green-600 h-[18px] w-[18px] me-2"/> <span className="text-slate-900 dark:text-white mx-1 font-semibold">Anecdotal Analysis</span>AI Generated</li>
                            <li className="flex items-center mt-2"><FiCheckCircle className="text-green-600 h-[18px] w-[18px] me-2"/> <span className="text-slate-900 dark:text-white me-1 font-semibold">Advanced Classroom</span> Analytics</li>
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
                                    <input type="hidden" id="professional-amount" className="form-control"/>
                                    <p className="text-5xl font-semibold mb-0 ms-1" id="pro-amt">{professionalPrice}</p>
                                    <p className="text-slate-400 uppercase text-xs">per month</p>
                                </span>
                            </div>

                            <div className="relative mt-4">
                                <label htmlFor="professional-price" className="form-label"></label>
                                <input id="professional-price" type="range" defaultValue="1500" min={1500} max={15000} onChange={(e) => setProfessionalPrice(e.target.value)} className="w-full h-1 bg-gray-50 dark:bg-slate-800 rounded-lg appearance-none cursor-pointer"/>
                                <span className="font-semibold text-lg absolute end-0 -top-5">
                                    <input type="hidden" id="professional-update" className="form-control"/>
                                    <span className=""></span>
                                    <p className="inline-block" id="pro-update">{professionalUpdate}</p>
                                    <span>X</span>
                                </span>
                            </div>
                        </div>
                        <div className="mt-4">
                            <Link to="" className="py-2 px-5 inline-block font-semibold tracking-wide border align-middle duration-500 text-base text-center bg-amber-400 hover:bg-amber-500 border-amber-400 hover:border-amber-500 text-white rounded">Coming Soon</Link>
                        </div>
                    </div>

                    <div className="p-6 bg-gray-50 dark:bg-slate-800">
                        <ul className="list-none text-slate-400">
                            <li className="font-semibold text-slate-900 dark:text-white text-sm uppercase">Features:</li>
                            
                            <li className="flex items-center mt-2"><FiCheckCircle className="text-green-600 h-[18px] w-[18px] me-2"/> <span className="text-slate-900 dark:text-white me-1 font-semibold">10</span> Teacher Accounts to Manage</li>
                            <li className="flex items-center mt-2"><FiCheckCircle className="text-green-600 h-[18px] w-[18px] me-2"/> <span className="text-slate-900 dark:text-white me-1 font-semibold">Principal</span> Admin Dashboard</li>
                            <li className="flex items-center mt-2"><FiCheckCircle className="text-green-600 h-[18px] w-[18px] me-2"/> <span className="text-slate-900 dark:text-white me-1 font-semibold">Analytics</span> to Manage Entire School</li>
                            <li className="flex items-center mt-2"><FiCheckCircle className="text-green-600 h-[18px] w-[18px] me-2"/> <span className="text-slate-900 dark:text-white me-1 font-semibold">Higher</span> AI Lesson Plan Generations</li>
                            <li className="flex items-center mt-2"><FiCheckCircle className="text-green-600 h-[18px] w-[18px] me-2"/> <span className="text-slate-900 dark:text-white me-1 font-semibold">Higher</span> AI Assessment Generations</li>
                        </ul>
                    </div>
                </div>
            </div>
        </>
    )
}