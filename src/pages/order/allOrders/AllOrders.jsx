import React, { useContext, useEffect, useState } from "react";
import { userContext } from "../../../context/User.Context";
import { jwtDecode } from "jwt-decode";
import axios from "axios";
import Loading from "../../../components/loading/Loading";
import { Helmet } from "react-helmet";

export default function AllOrders() {
    const [orders, setOrders] = useState(null);
    const { token } = useContext(userContext);
    const { id } = jwtDecode(token);
    console.log(id);

    async function getUserOrders() {
        const options = {
            url: `https://ecommerce.routemisr.com/api/v1/orders/user/${id}`,
            method: "GET",
        };

        const { data } = await axios.request(options);
        console.log(data);
        setOrders(data);
    }

    useEffect(() => {
        getUserOrders();
    }, []);

    return (
        <>
            <Helmet>
                <title>Orders</title>
                <meta name="description" content="welcome to home page" />
            </Helmet>
            {!orders ? (
                <Loading />
            ) : (
                orders.map((order) => (
                    <div key={order.id} className="order mt-4 border border-gray-300 rounded-md p-4">
                        <div className="flex justify-between items-center">
                            <div>
                                <h2 className="text-gray-400">Order ID</h2>
                                <h3 className="font-bold">#{order.id}</h3>
                            </div>
                            <div>
                                {order.isDelivered ? (
                                    <span className="btn-primary font-cairo bg-lime-500 inline-block me-2">
                                        تم التوصيل
                                    </span>
                                ) : (
                                    <span className="btn-primary font-cairo bg-blue-500 inline-block me-2">
                                        قيد التوصيل
                                    </span>
                                )}

                                {order.isPaid ? (
                                    <span className="btn-primary font-cairo bg-lime-500 inline-block">
                                        تم الدفع
                                    </span>
                                ) : (
                                    <span className="btn-primary font-cairo bg-red-500 inline-block">
                                        غير مدفوع
                                    </span>
                                )}
                            </div>
                        </div>

                        <div className="grid gap-3 grid-cols-12 mt-5">
                            {order.cartItems.map((product) => (
                                <div key={product._id} className="product border border-gray-300 rounded p-3 col-span-12 md:col-span-4 lg:col-span-3 xl:col-span-2">
                                    <img
                                        src={product.product.imageCover}
                                        alt=""
                                        className="w-full h-32 object-contain "
                                    />
                                    <h3 className="font-semibold my-2">
                                        {product.product.title}
                                    </h3>
                                    <span>{product.price} L.E</span>
                                </div>
                            ))}
                        </div>
                    </div>
                ))
            )}
        </>
    );
}