import React, { useContext, useEffect, useState } from 'react'
import style from './ResetPassword.module.css';
import { useFormik } from 'formik';
import axios from 'axios';
import * as Yup from 'yup'
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../../Context/UserContext';
import { FaSpinner } from 'react-icons/fa';

export default function ResetPassword() {

    const [isLoading, setIsLoading] = useState(false)
    const [errMsg, setErrMsg] = useState('')
    const navigate = useNavigate()
    const { setToken } = useContext(UserContext)

    useEffect(() => {
        console.log('ResetPassword Mounting');
    }, [])
    const schema = Yup.object().shape({
        email: Yup.string().required('email is required ').email(),
        newPassword: Yup.string().required("password is required ").matches(/^[a-z]||[A-Z].{5,}/, 'must start with uppercase or lowercase then at least 5 chars'),
    })
    const formik = useFormik({
        initialValues: {
            email: "",
            newPassword: ""
        },
        onSubmit: submitForm,
        validationSchema: schema
    })
    
    async function submitForm(values) {
        setIsLoading(true)
        try {
            const { data } = await axios.put('https://ecommerce.routemisr.com/api/v1/auth/resetPassword', values)
            console.log(data);

            if (data.token) {
                setToken(data.token)
                navigate('/')
            }
        } catch (error) {
            setErrMsg(error.response.data.message)
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <div className='pt-28'>
            <h1 className='text-green-500'>Reset Your Password</h1>
            <form onSubmit={formik.handleSubmit} className=" max-w-screen-lg mx-auto mt-14">
               
                {errMsg ? (
                    <div
                        className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
                        role="alert"
                    >
                        <div>
                            {errMsg}
                        </div>
                    </div>
                ) : null}

               
                <div className="relative z-0 w-full mb-6 group ">
                    <input
                        {...formik.getFieldProps("email")}
                        type="email"
                        name="email"
                        id="email"
                        className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer"
                        placeholder=""
                    />
                    <label
                        htmlFor="email"
                        className="peer-focus:font-medium absolute text-md text-gray-500 dark:text-gray-300 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                    >
                        Email :
                    </label>
                    {formik.errors.email && formik.touched.email ? (
                        <div
                            className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
                            role="alert"
                        >
                            <div>
                                {formik.errors.email}
                            </div>
                        </div>
                    ) : null}
                </div>
               
                <div className="relative z-0 w-full mb-6 group">
                    <input
                        {...formik.getFieldProps("newPassword")}
                        type="password"
                        name="newPassword"
                        id="newPassword"
                        className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer"
                        placeholder=" "
                    />
                    <label
                        htmlFor="newPassword"
                        className="peer-focus:font-medium absolute text-md text-gray-500 dark:text-gray-300 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                    >
                        New Password :
                    </label>
                    {formik.errors.newPassword && formik.touched.newPassword ? (
                        <div
                            className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
                            role="alert"
                        >
                            <div>
                                {formik.errors.newPassword}
                            </div>
                        </div>
                    ) : null}
                </div>
                <div className="flex justify-between ">
                   
                    <button
                        disabled={isLoading}
                        type="submit"
                        className=" flex ms-auto justify-center items-center  text-white disabled:bg-green-300 disabled:text-gray-700 dark:disabled:bg-green-300 dark:disabled:text-gray-700 bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-md w-full sm:w-auto px-6 py-3 text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
                    >
                        {isLoading ? <FaSpinner className="animate-spin text-gray-800 text-xl" /> : 'Reset Password'}
                    </button>
                </div>
            </form>
        </div>
    )
}
