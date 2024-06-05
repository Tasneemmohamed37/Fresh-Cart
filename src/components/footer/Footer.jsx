import React from "react";
import paypal from '../../assets/images/paypal.png'
import americanExp from '../../assets/images/American-Express-Color.png'
import amazon from '../../assets/images/amazon-pay.png'
import masterCard from '../../assets/images/mastercard.webp'
import googlePlay from '../../assets/images/get-google-play.png'
import appleStore from '../../assets/images/get-apple-store.png'

export default function Footer() {
    return (
        <>
        <footer className="bg-gray-100">
            <div className="container py-6 ">
                <h5 className="text-gray-900 text-xl">Get The FreshCard App</h5>
                <p className="text-gray-600">we will send you a link, open it in your phone to download the app </p>
                <div className="flex gap-5 px-4 my-4">
                    <input type="text" placeholder="Email..." className="form-control flex-grow" />
                    <button className="btn-primary">Share App Link</button>
                </div>
                <div className="flex justify-between mt-5 py-5 border-y border-gray-200">
                    <div className="flex gap-3">
                        <h6 className="text-gray-900 text-lg">Payment Partners</h6>
                        <img className="w-16 object-contain" src={amazon} alt="amazon logo" />
                        <img className="w-16 object-contain" src={americanExp} alt="americanExp" />
                        <img className="w-16 object-contain" src={masterCard} alt="masterCard" />
                        <img className="w-16 object-contain" src={paypal} alt="paypal" />
                    </div>
                    <div className="flex gap-3">
                    <h6 className="text-gray-900 text-lg">Get Deliveries with FreshCard</h6>
                        <img className="w-16 object-contain" src={googlePlay} alt="google play" />
                        <img className="w-16 object-contain" src={appleStore} alt="apple store" />
                    </div>
                </div>
            </div>
        </footer>
        </>
    )
}
