import axios from "axios";
import React, { useState } from "react";
import Loading from "../../components/loading/Loading";
import toast from "react-hot-toast";
import { Helmet } from "react-helmet";
import { useQuery } from "@tanstack/react-query";


export default function Brands() {
    async function getAllBrands() {
        const loadingID = toast.loading("loading...");
        const { data } = await axios.get(
            "https://ecommerce.routemisr.com/api/v1/brands"
        );
        toast.dismiss(loadingID);
        return data
    }
    
    
    let {data, isLoading} = useQuery({
        queryKey: ['brands'], // array contain query key name
        queryFn:getAllBrands // func which call api
        })
    
        if(isLoading){
            return <Loading/>
        }

        
    return (
    <>
    <Helmet>
        <title>Brands</title>
    </Helmet>
    <>
                    <div className="grid grid-cols-12 gap-10 pt-10">
                        {" "}
                        {data.data.map((brand, index) => (
                            <div
                                key={index}
                                className="col-span-12 sm:col-span-6 md:col-span-4 lg:col-span-3 rounded-md shadow-lg hover:shadow-green-700/50"
                            >
                                <img
                                    src={brand.image}
                                    className="w-full h-64 object-contain"
                                    alt=""
                                />
                                <div className="text-center font-bold p-5">{brand.name}</div>
                            </div>
                        ))}
                    </div>
                </>
    </>
)
}
