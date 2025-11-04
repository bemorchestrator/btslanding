import { Link } from "react-router-dom";

import { FiCheckCircle, MdKeyboardArrowRight } from '../assets/icons/vander';

export default function AboutTwo() {
    return (
        <>
            <div className="container relative md:mt-24 mt-16">
                <div className="grid md:grid-cols-2 grid-cols-1 items-center gap-6">
                    <div className="relative order-1 md:order-2">
                        <img src="/sf2.png" alt="" className="rounded-lg"/>
                    </div>

                    <div className="order-2 md:order-1">
                        <h4 className="mb-4 md:text-3xl md:leading-normal text-2xl leading-normal font-semibold text-slate-900 dark:text-white">Automate School Forms <br/> SF1 to SF10 in Minutes</h4>
                        <p className="text-slate-700 dark:text-slate-400">"I used to spend weeks filling out SF forms for all my students. With Better Teaching Solutions, what took days now takes minutes. The automation has given me back my weekends."</p>
                        <ul className="list-none text-slate-700 dark:text-slate-400 mt-4">
                            <li className="mb-2 flex items-center"><FiCheckCircle className="text-amber-600 dark:text-amber-400 h-5 w-5 me-2"/> Automatically Fill SF1 to SF10 Forms for All Students</li>
                            <li className="mb-2 flex items-center"><FiCheckCircle className="text-amber-600 dark:text-amber-400 h-5 w-5 me-2"/> Update Forms Once and Apply Changes Everywhere</li>
                            <li className="mb-2 flex items-center"><FiCheckCircle className="text-amber-600 dark:text-amber-400 h-5 w-5 me-2"/> Save Hours of Manual Data Entry Every School Year</li>
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
