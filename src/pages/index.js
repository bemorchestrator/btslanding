import React,{useEffect} from "react";

import Navbar from "../components/navbar";
// Using image from public folder instead of importing
import AboutThree from "../components/aboutThree";
import AiFeatures from "../components/aiFeatures";
import AboutOne from "../components/aboutOne";
import AboutTwo from "../components/aboutTwo";
import Pricing from "../components/pricing";
import Footer from "../components/footer";
import Switcher from "../components/switcher";

export default function Index(){
    useEffect(() => {
        document.documentElement.setAttribute("dir", "ltr");
        document.documentElement.classList.add('dark');
        document.documentElement.classList.remove('light');
      }, []);
    const workData = [
        {
            icon:'mdi mdi-account-search-outline',
            title:'Create an Account',
            desc:'You do not need to spend a single peso, just register an account and you are good to go.'
        },
        {
            icon:'mdi mdi-wallet-outline',
            title:'Use Our Tools',
            desc:'From SF forms, Class Room Management and AI Generators, our tools are designed to make your job easier.'
        },
        {
            icon:'mdi mdi-home-plus-outline',
            title:'Save More Time',
            desc:'Stop wasting hours on lesson plans and paperwork. Our tools are design to save you time and effort.'
        },
    ]
    return(
        <>
        <Navbar/>
        <section className="relative table w-full lg:py-40 md:py-36 pt-36 pb-24 overflow-hidden bg-white dark:bg-slate-900">
            <div className="container relative z-1">
                <div className="relative grid lg:grid-cols-12 grid-cols-1 items-center mt-10 gap-[30px]">
                    <div className="lg:col-span-7">
                        <div className="lg:me-6 lg:text-start text-center">
                            <h1 className="font-bold lg:leading-normal leading-normal text-4xl lg:text-6xl mb-5">Teach More <br/> Stress Less.</h1>
                            <p className="text-lg max-w-xl lg:ms-0 mx-auto">Stop wasting hours on lesson plans and paperwork. Our tools help you plan faster, grade smarter, and focus more on real teaching</p>
                        
                            <div className="subcribe-form mt-6 mb-3">
                                <form className="relative max-w-md mx-auto lg:ms-0" action="https://app.betterteachingsolutions.com/register" method="get">
                                    <div className="relative">
                                        <i className="mdi mdi-account-plus-outline text-xl absolute top-3 start-5"></i>
                                        <input type="text" id="register" name="register" className="py-4 pe-40 ps-12 w-full h-[50px] outline-none text-slate-900 dark:text-white rounded-md bg-white/60 dark:bg-slate-900/60 shadow dark:shadow-gray-800" placeholder="No Credit Card Needed"/>
                                    </div>
                                    <button type="submit" className="py-2 px-5 inline-block font-semibold tracking-wide align-middle duration-500 text-base text-center absolute top-[2px] end-[3px] h-[46px] bg-amber-400 hover:bg-amber-500 border border-amber-400 hover:border-amber-500 text-white rounded-md">Join Now</button>
                                </form>
                            </div>
                        </div>
                    </div>

                    <div className="lg:col-span-5">
                        <div className="relative after:content-[''] after:absolute lg:after:-top-0 after:-top-10 after:-right-32 after:w-[36rem] after:h-[36rem] after:border-2 after:border-dashed after:border-slate-700/10 dark:after:border-slate-200/10 after:rounded-full after:animate-[spin_120s_linear_infinite] after:-z-1 before:content-[''] before:absolute lg:before:-top-24 before:-top-36 before:-right-56 before:w-[48rem] before:h-[48rem] before:border-2 before:border-dashed before:border-slate-700/10 dark:before:border-slate-200/10 before:rounded-full before:animate-[spin_240s_linear_infinite] before:-z-1">
                            <div className="relative after:content-[''] after:absolute lg:after:-top-24 after:-top-10 after:-right-0 after:w-[42rem] after:h-[42rem] after:bg-gradient-to-tl after:to-amber-400/30  after:from-fuchsia-600/30 dark:after:to-amber-400/50 dark:after:from-fuchsia-600/50 after:blur-[200px] after:rounded-full after:-z-1">
                                <img src="/Screenshot_4.png" className="lg:max-w-none lg:ms-14 h-auto max-h-[400px] rounded-xl object-contain" alt=""/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
        <section className="relative pt-6 md:pb-24 pb-16 overflow-hidden dark:bg-black">
            <span className="absolute blur-[200px] w-[500px] h-[500px] rounded-full top-[25%] -start-[20%] bg-gradient-to-tl to-amber-400  from-fuchsia-600 -z-1"></span>
            <span className="absolute blur-[200px] w-[500px] h-[500px] rounded-full bottom-[25%] -end-[20%] bg-gradient-to-tl to-amber-400  from-fuchsia-600 -z-1"></span>

            <div className="container relative md:mt-24 mt-16">
                <div className="grid grid-cols-1 pb-6 text-center">
                    <h3 className="mb-4 md:text-3xl md:leading-normal text-2xl leading-normal font-semibold">So, how does it works?</h3>

                    <p className="text-slate-400 max-w-xl mx-auto">Our AI helps you instantly create lesson plans, quizzes, and reports — no more starting from scratch.

Just type what you need, and let the AI do the heavy lifting — so you can focus on teaching, not paperwork.</p>
                </div>

                <div className="grid md:grid-cols-3 grid-cols-1 mt-6 gap-6">
                    {workData.map((item,index)=>{
                        return(
                            <div className="relative p-6" key={index}>
                                <i className={`${item.icon} bg-gradient-to-tl to-amber-400 from-fuchsia-600 text-transparent bg-clip-text text-[45px]`}></i>
        
                                <h5 className="text-xl font-semibold my-5">{item.title}</h5>
        
                                <p className="text-slate-400">{item.desc}</p>
                            </div>
                        )
                    })}
                </div>
            </div>

            <AboutThree/>
            <AiFeatures/>
            <AboutTwo/>
            <AboutOne/>

            <div className="container relative md:mt-24 mt-16">
                <div className="grid grid-cols-1 pb-6 text-center">
                    <h3 className="mb-4 md:text-3xl md:leading-normal text-2xl leading-normal font-semibold">You don't have to choose between cost, time and quality</h3>

                    <p className="text-slate-400 max-w-xl mx-auto">Artificial intelligence helps teachers save hours on planning, grading, and paperwork. Create personalized lessons, assessments, and reports in minutes, not hours!</p>
                </div>
                <Pricing/>
            </div>
        </section>
        <Footer/>
        <Switcher/>
        </>
    )
}