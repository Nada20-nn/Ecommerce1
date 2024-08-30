import React, { useEffect, useState } from 'react'
import style from './CheckOut.module.css';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useContext } from 'react';
import { CartContext } from '../../Context/CartContext';
import { useParams } from 'react-router-dom';
import { FaSpinner } from 'react-icons/fa';
import { FaSpaghettiMonsterFlying } from 'react-icons/fa6';

export default function CheckOut() {

    useEffect(() => {
        console.log('CheckOut Mounting');
        document.title = 'ckeckout'
    }, [])
    const { cartId } = useParams();
    const { CkeckOutSession } = useContext(CartContext)
    const [loading, setloading] = useState(false)
    const [errMsg, setErrMsg] = useState(null)

    const schema = Yup.object().shape({
        details: Yup.string().required('details is required'),
        phone: Yup.string().required("phone is required ").matches(/^01[0125][0-9]{8}$/, "must be valid egyption phone "),
        city: Yup.string().required('city is required')
    })
    const formik = useFormik({
        initialValues: {
            details: "",
            phone: "",
            city: ""
        },
        onSubmit: handleSubmit,
        validationSchema: schema
    })
    async function handleSubmit(values) {
        setloading(true)
        try {
            const res = await CkeckOutSession(cartId, values)
            if (res.data.status == 'success') {
                window.location.href = res.data.session.url
                console.log(res.data.session.url);
            }
        } catch (error) {
            setErrMsg(error.response.data.message);
        }
        setloading(false)
    }

    return (

  
         <div className='pt-28 mt-10 w-50  md:pt-28 lg:pt-32  md:mt-10 w-full max-w-2xl mx-auto px-4 sm:px-6 lg:px-8'>
             <h1 className='text-center text-3xl text-green-600'>CheckOut</h1>

             <form onSubmit={formik.handleSubmit} className=" max-w-screen-lg mx-auto mt-5"  >
                 {errMsg ?
                     <div
                         className="  text-red-700 rounded-lg p-4 mb-4 text-sm bg-red-50 dark:bg-gray-800 dark:text-red-400"
                         role="alert"
                     >
                         <div>
                             {errMsg}
                         </div>
                     </div> : null}
                 <div className="relative z-0 w-full mb-7 group ">
                     <input
                         {...formik.getFieldProps("details")}
                         type="text"
                         name="details"
                         id="details"
                         className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer"
                         placeholder=""
                     />
                    <label
                        htmlFor="details"
                        className="peer-focus:font-medium  absolute text-md text-gray-500 dark:text-gray-300 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                    >
                        Details :
                    </label>
                    {formik.errors.details && formik.touched.details ? (
                        <div
                            className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
                            role="alert"
                        >
                            <div>
                                {formik.errors.details}
                            </div>
                        </div>
                    ) : null}
                </div>
                <div className="relative z-0 w-full mb-6 group">
                    <input
                        {...formik.getFieldProps("phone")}
                        type="tel"
                        name="phone"
                        id="phone"
                        className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer"
                        placeholder=" "
                    />
                    <label
                        htmlFor="phone"
                        className="peer-focus:font-medium absolute text-md text-gray-500 dark:text-gray-300 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                    >
                        phone :
                    </label>
                    {formik.errors.phone && formik.touched.phone ? (
                        <div
                            className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
                            role="alert"
                        >
                            <div>
                                {formik.errors.phone}
                            </div>
                        </div>
                    ) : null}
                </div>
                <div className="relative z-0 w-full mb-6 group">
                    <input
                        {...formik.getFieldProps("city")}
                        type="text"
                        name="city"
                        id="city"
                        className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer"
                        placeholder=" "
                    />
                    <label
                        htmlFor="city"
                        className="peer-focus:font-medium absolute text-md text-gray-500 dark:text-gray-300 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                    >
                        city :
                    </label>
                    {formik.errors.city && formik.touched.city ? (
                        <div
                            className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
                            role="alert"
                        >
                            <div>
                                {formik.errors.city}
                            </div>
                        </div>
                    ) : null}
                </div>

                <div className="w-full">
                    <button
                        disabled={loading}
                        type="submit"
                        className="flex justify-center items-center duration-300 text-white mt-10 sm:mt-0 disabled:bg-green-400 disabled:text-gray-700 dark:disabled:bg-green-400 dark:disabled:text-gray-700 bg-green-600 hover:bg-green-700 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-md w-full px-6 py-3 text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">
                        {loading ? <FaSpaghettiMonsterFlying className="animate-spin text-gray-800 text-xl" /> : 'Pay Now'}
                    </button>
                </div>
            </form>
         </div>
    )
}
