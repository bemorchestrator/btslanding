import React from "react";
import { Link } from "react-router-dom";

// Using image from public folder instead of importing

import {FiCheckCircle, MdKeyboardArrowRight} from '../assets/icons/vander'

export default function AboutTwo(){
    return(
        <>
            <div className="container relative md:mt-24 mt-16">
                <div className="grid md:grid-cols-2 grid-cols-1 items-center gap-6">
                    <div className="relative order-1 md:order-2">
                        <div className="relative overflow-hidden rounded-lg border border-amber-400/5 bg-gradient-to-tl to-amber-400/30  from-fuchsia-600/30 dark:to-amber-400/50 dark:from-fuchsia-600/50 pe-6 pt-6 lg:ms-8">
                            <img src="/Screenshot_4.png" className="ltr:rounded-tr-lg rtl:rounded-tl-lg" alt=""/>
                        </div>
                    </div>

                    <div className="order-2 md:order-1">
                        <h4 className="mb-4 md:text-3xl md:leading-normal text-2xl leading-normal font-semibold">Automate School Forms <br/> SF1 to SF10 in Minutes</h4>
                        <p className="text-slate-400">"I used to spend weeks filling out SF forms for all my students. With Better Teaching Solutions, what took days now takes minutes. The automation has given me back my weekends."</p>
                        <ul className="list-none text-slate-400 mt-4">
                            <li className="mb-2 flex items-center"><FiCheckCircle className="text-amber-400 h-5 w-5 me-2"/> Automatically Fill SF1 to SF10 Forms for All Students</li>
                            <li className="mb-2 flex items-center"><FiCheckCircle className="text-amber-400 h-5 w-5 me-2"/> Update Forms Once and Apply Changes Everywhere</li>
                            <li className="mb-2 flex items-center"><FiCheckCircle className="text-amber-400 h-5 w-5 me-2"/> Save Hours of Manual Data Entry Every School Year</li>
                        </ul>

                        <div className="mt-4">
                            <Link to="" className="hover:text-amber-400 font-medium duration-500 inline-flex items-center">Find Out More <MdKeyboardArrowRight className="ms-1 text-[20px]"/></Link>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}