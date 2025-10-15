import React from "react";
import { Link } from "react-router-dom";
import Client1 from '../assets/images/client/01.jpg';
import Client2 from '../assets/images/client/02.jpg';
import Client3 from '../assets/images/client/03.jpg';
import Client4 from '../assets/images/client/04.jpg';
import Client5 from '../assets/images/client/05.jpg';
import Client6 from '../assets/images/client/06.jpg';
import Client7 from '../assets/images/client/07.jpg';
import Client8 from '../assets/images/client/08.jpg';

interface TestimonialCardProps {
    image: string;
    name: string;
    role: string;
    testimonial: string;
}

const TestimonialCard: React.FC<TestimonialCardProps> = ({ image, name, role, testimonial }) => (
    <li className="rounded-lg shadow dark:shadow-gray-800 p-6 border-b-4 border-amber-400">
        <div className="flex items-center pb-6 border-b border-gray-200 dark:border-gray-800">
            <img src={image} className="h-16 w-16 rounded-full shadow dark:shadow-gray-800" alt={name} />

            <div className="ps-4">
                <Link to="" className="text-lg hover:text-amber-400 duration-500 ease-in-out">{name}</Link>
                <p className="text-slate-400">{role}</p>
            </div>
        </div>

        <div className="mt-6">
            <p className="text-slate-400">{testimonial}</p>
            <ul className="list-none mb-0 text-amber-400 mt-2">
                <li className="inline"><i className="mdi mdi-star"></i></li>
                <li className="inline"><i className="mdi mdi-star"></i></li>
                <li className="inline"><i className="mdi mdi-star"></i></li>
                <li className="inline"><i className="mdi mdi-star"></i></li>
                <li className="inline"><i className="mdi mdi-star"></i></li>
            </ul>
        </div>
    </li>
);

export default function ClientsTwo(): JSX.Element {
    const testimonials = [
        [
            {
                image: Client1,
                name: "Thomas Israel",
                role: "User",
                testimonial: "I didn't know a thing about icon design until I read this book. Now I can create any icon I need in no time. Great resource!"
            },
            {
                image: Client2,
                name: "Barbara McIntosh",
                role: "User",
                testimonial: "There are so many things I had to do with my old software that I just don't do at all with Better Teaching Solutions.Ai. Suspicious but I can't say I don't love it."
            }
        ],
        [
            {
                image: Client3,
                name: "Carl Oliver",
                role: "User",
                testimonial: "The best part about Better Teaching Solutions is every time I pay my employees, my bank balance doesn't go down like it used to. Looking forward to spending this extra cash when I figure out why my card is being declined."
            },
            {
                image: Client4,
                name: "Jill Webb",
                role: "User",
                testimonial: "I'm trying to get a hold of someone in support, I'm in a lot of trouble right now and they are saying it has something to do with my books. Please get back to me right away."
            }
        ],
        [
            {
                image: Client5,
                name: "Barbara McIntosh",
                role: "User",
                testimonial: "I used to have to remit tax to the EU and with Better Teaching Solutions.Ai I somehow don't have to do that anymore. Nervous to travel there now though."
            },
            {
                image: Client6,
                name: "Janisha Doll",
                role: "User",
                testimonial: "This is the fourth email I've sent to your support team. I am literally being held in jail for tax fraud. Please answer your damn emails, this is important."
            }
        ],
        [
            {
                image: Client7,
                name: "Thomas Israel",
                role: "User",
                testimonial: "I didn't know a thing about icon design until I read this book. Now I can create any icon I need in no time. Great resource!"
            },
            {
                image: Client8,
                name: "Barbara McIntosh",
                role: "User",
                testimonial: "There are so many things I had to do with my old software that I just don't do at all with Better Teaching Solutions.Ai. Suspicious but I can't say I don't love it."
            }
        ],
        [
            {
                image: Client1,
                name: "Carl Oliver",
                role: "User",
                testimonial: "The best part about Better Teaching Solutions is every time I pay my employees, my bank balance doesn't go down like it used to. Looking forward to spending this extra cash when I figure out why my card is being declined."
            },
            {
                image: Client2,
                name: "Jill Webb",
                role: "User",
                testimonial: "I'm trying to get a hold of someone in support, I'm in a lot of trouble right now and they are saying it has something to do with my books. Please get back to me right away."
            }
        ],
        [
            {
                image: Client3,
                name: "Barbara McIntosh",
                role: "User",
                testimonial: "I used to have to remit tax to the EU and with Better Teaching Solutions.Ai I somehow don't have to do that anymore. Nervous to travel there now though."
            },
            {
                image: Client4,
                name: "Janisha Doll",
                role: "User",
                testimonial: "This is the fourth email I've sent to your support team. I am literally being held in jail for tax fraud. Please answer your damn emails, this is important."
            }
        ],
        [
            {
                image: Client5,
                name: "Barbara McIntosh",
                role: "User",
                testimonial: "I used to have to remit tax to the EU and with Better Teaching Solutions.Ai I somehow don't have to do that anymore. Nervous to travel there now though."
            },
            {
                image: Client6,
                name: "Janisha Doll",
                role: "User",
                testimonial: "This is the fourth email I've sent to your support team. I am literally being held in jail for tax fraud. Please answer your damn emails, this is important."
            }
        ],
        [
            {
                image: Client7,
                name: "Thomas Israel",
                role: "User",
                testimonial: "I didn't know a thing about icon design until I read this book. Now I can create any icon I need in no time. Great resource!"
            },
            {
                image: Client8,
                name: "Barbara McIntosh",
                role: "User",
                testimonial: "There are so many things I had to do with my old software that I just don't do at all with Better Teaching Solutions.Ai. Suspicious but I can't say I don't love it."
            }
        ]
    ];

    return (
        <>
            <div className="container relative md:mt-24 mt-16">
                <div className="grid grid-cols-1 pb-6 text-center">
                    <h3 className="mb-4 md:text-3xl md:leading-normal text-2xl leading-normal font-semibold">What Our Users Say</h3>

                    <p className="text-slate-400 max-w-xl mx-auto">Artificial intelligence makes it fast easy to create content for your blog, social media, website, and more!</p>
                </div>
            </div>

            <div className="container-fluid relative overflow-hidden">
                <div className="grid grid-cols-1 mt-6">
                    <div className="slider relative overflow-hidden m-auto mb-4 before:content-[''] before:absolute before:top-0 before:start-0 before:z-2 after:content-[''] after:absolute after:top-0 after:end-0 after:z-2">
                        <div className="slide-track flex items-center">
                            {testimonials.map((slideGroup, index) => (
                                <div key={index} className="slide h-auto md:w-[360px] w-72 m-2">
                                    <ul className="space-y-4">
                                        {slideGroup.map((testimonial, testimonialIndex) => (
                                            <TestimonialCard
                                                key={testimonialIndex}
                                                image={testimonial.image}
                                                name={testimonial.name}
                                                role={testimonial.role}
                                                testimonial={testimonial.testimonial}
                                            />
                                        ))}
                                    </ul>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
