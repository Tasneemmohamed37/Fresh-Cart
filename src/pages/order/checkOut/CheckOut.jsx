import React, { createContext, useContext, useState } from "react";
import * as Yup from "yup";
import { useFormik } from "formik";
import { cartContext } from '../../../context/Cart.Context'
import { userContext } from "../../../context/User.Context";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet";



export default function CheckOut() {

  const [orderType, setOrderType] = useState(null)
  const {cartInfo,setCartInfo } = useContext(cartContext)
  const {token} = useContext(userContext)
  const navigate = useNavigate();
  const phoneRegex =
    /(?:\+?20)?(0?1[0125]\d{8}|0?2\d{7,8}|0?3\d{7,8}|0?[4689]\d{7})/;

  const validateSchema = Yup.object({
    shippingAddress : Yup.object({
      city: Yup.string().required("City is required"),
      phone: Yup.string()
        .required("Phone is required")
        .matches(
          phoneRegex,
          "Phone must start with 01 followed by 0|1|2|5 then nine numbers"
        ),
      details: Yup.string().required("Details are required"),
    }),
  });

  const formik = useFormik({
    initialValues: {
      shippingAddress: {
        city: "",
        phone: "",
        details: "",
      },
    },
    validationSchema: validateSchema,
    onSubmit: (values)=>{
      if(orderType == 'cash')
        createCashOrder(values)
      else
        createOnlineOrder(values)
    },
  });

  async function createCashOrder(values) {
    try {
      console.log('cash');
      if(cartInfo.length != 0)
        {
        const options ={
          url:`https://ecommerce.routemisr.com/api/v1/orders/${cartInfo.data._id}`,
          method: 'POST',
          headers:{
            token
          },
          data:{
            shippingAddress: values.shippingAddress
          }
        }
        console.log(options);
        const {data} = await axios.request(options)
        setCartInfo([])
        toast.success('Order Created Successfully')
        navigate('/allOrders')
      }
      else{
        toast.error('please add items to your cart first')
      }
      
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  }

  async function createOnlineOrder(values) {
    try {
      console.log('online');
      if(cartInfo.length != 0){
        const options ={
          url:`https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartInfo.data._id}?url=http://localhost:5173`,
          method: 'POST',
          headers:{
            token
          },
          data:{
            shippingAddress: values.shippingAddress
          }
        }
        console.log(options);
        const {data} = await axios.request(options)
        console.log(data);
        if(data.status == 'success'){
          setCartInfo([])
          toast.loading('redirect to payment gateway')
          setTimeout(() => {
            window.location.href = data.session.url
          }, 2000);
        }
      }
      else{
        toast.error('please add items to your cart first')
      }
      
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  }

  return (
    <>
    <Helmet>
      <title>Check Out</title>
    </Helmet>
      <section>
        <h2 className="text-black text-lg font-semibold">Shipping Address</h2>
        <form
          className="flex flex-col gap-3 p-5"
          onSubmit={formik.handleSubmit}
        >
          <div>
            <input
              type="text"
              placeholder="City"
              name="shippingAddress.city"
              className="form-control"
              value={formik.values.shippingAddress.city}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.errors.shippingAddress?.city &&
            formik.touched.shippingAddress?.city ? (
              <div className="error">
                * {formik.errors.shippingAddress.city}
              </div>
            ) : (
              ""
            )}
          </div>
          <div>
            <input
              type="tel"
              placeholder="phone"
              name="shippingAddress.phone"
              className="form-control"
              value={formik.values.shippingAddress.phone}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.errors.shippingAddress?.phone &&
            formik.touched.shippingAddress?.phone ? (
              <div className="error">
                * {formik.errors.shippingAddress.phone}
              </div>
            ) : (
              ""
            )}
          </div>
          <div>
            <textarea
              placeholder="Address Details"
              name="shippingAddress.details"
              className="form-control"
              value={formik.values.shippingAddress.details}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            ></textarea>
            {formik.errors.shippingAddress?.details &&
            formik.touched.shippingAddress?.details ? (
              <div className="error">
                * {formik.errors.shippingAddress.details}
              </div>
            ) : (
              ""
            )}
          </div>
          <div className="flex gap-3">
            <button
              onClick={()=> setOrderType('cash')}
              type="submit"
              className="btn-primary bg-blue-800 w-fit text-sm px-3 py-[2px]"
            >
              Cash Order
            </button>
            <button
            onClick={()=> setOrderType('online')}
              type="submit"
              className="btn-primary w-fit text-sm px-3 py-[2px]"
            >
              Online Payment
            </button>
          </div>
        </form>
      </section>
    </>
  );
}
