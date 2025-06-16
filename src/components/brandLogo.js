import React from "react";
import amazon from "../assets/images/client/amazon.svg"
import google from "../assets/images/client/google.svg"
import lenovo from "../assets/images/client/lenovo.svg"
import paypal from "../assets/images/client/paypal.svg"
import shopify from "../assets/images/client/shopify.svg"
import spotify from "../assets/images/client/spotify.svg"

export default function BrandLogo(){
    const brandLogo = [amazon,google,lenovo,paypal,shopify,spotify]
    return(
        <div className="container relative">
            <div className="grid md:grid-cols-6 grid-cols-2 justify-center gap-6">
                {brandLogo.map((item,index) => {
                   return(
                        <div className="mx-auto py-4" key={index}>
                            <img src={item} className="h-6" alt=""/>
                        </div>
                   )
                })}
            </div>
        </div>
    )
}