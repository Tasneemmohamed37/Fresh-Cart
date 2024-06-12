import axios from "axios";
import React, { useEffect, useState } from "react";
import Loading from "../../components/loading/Loading";
import toast from "react-hot-toast";
import { Helmet } from "react-helmet";

export default function Categories() {
    const [categories, setCategories] = useState(null);
    const [subCategories, setSubCategories] = useState(null);
    const [catName, setCatName] = useState('');

    async function getAllCategories() {
        const loadingID = toast.loading("loading...");
        const { data } = await axios.get(
            "https://ecommerce.routemisr.com/api/v1/categories"
        );
        setCategories(data.data);
        toast.dismiss(loadingID);
    }

    async function getSubCategoriesForSpecCategory(catID, catName) {
        const loadingID = toast.loading("loading...");
        const { data } = await axios.get(
            `https://ecommerce.routemisr.com/api/v1/categories/${catID}/subcategories`
        );
        setCatName(catName)
        setSubCategories(data.data);
        toast.dismiss(loadingID);
    }

    useEffect(() => {
        getAllCategories();
    }, []);

    return (
        <>
        <Helmet>
            <title>Categories</title>
        </Helmet>
            {categories == null ? (
                <Loading />
            ) : (
                <>
                    <div className="grid grid-cols-12 gap-10 pt-10">
                        {" "}
                        {categories.map((cat, index) => (
                            <div
                                key={index}
                                onClick={() => {
                                    getSubCategoriesForSpecCategory(cat._id,cat.name);
                                }}
                                className="col-span-12 sm:col-span-6 md:col-span-4 lg:col-span-3 rounded-md shadow-lg hover:shadow-green-700/50 cursor-pointer"
                            >
                                <img
                                    src={cat.image}
                                    className="w-full h-64 object-contain"
                                    alt=""
                                />
                                <div className="text-center font-bold p-5">{cat.name}</div>
                            </div>
                        ))}
                    </div>
                    {subCategories != null && (
                        <div className=" text-center shadow-lg shadow-green-700/50 p-10 mt-10 rounded-md bg-white transition-transform duration-300 ease-in-out transform hover:scale-105">
                            <h2 className="text-2xl font-bold text-mainColor mb-4">
                                {catName} SubCategories
                            </h2>
                            <div className="flex flex-wrap gap-4 my-4">
                            {subCategories.map((sc, index) => (
                                <div
                                    key={index}
                                    className="p-2 bg-gray-100 rounded-md hover:bg-gray-200 w-fit"
                                >
                                    <h6 className="text-lg">{sc.name}</h6>
                                </div>
                            ))}
                            </div>
                        </div>
                    )}
                </>
            )}
        </>
    );
}