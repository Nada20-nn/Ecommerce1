import React, { useEffect, useState } from 'react'
import style from './ForgetPassword.module.css';
import { useFormik } from 'formik';
import * as Yup from "yup";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { FaSpinner } from 'react-icons/fa';
import { FaSpaghettiMonsterFlying } from 'react-icons/fa6';


export default function ForgetPassword() {

  useEffect(() => {
    document.title = 'forget password'
  }, [])

  const [errMsg, setErrMsg] = useState('')
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate();
  const schema = Yup.object().shape({
    email: Yup.string().required('email is required').email()
  })
  const formik = useFormik({
    initialValues: {
      email: ''
    },
    onSubmit: submitForm,
    validationSchema: schema
  })
  async function submitForm(values) {
    setLoading(true)
    try {
      const { data } = await axios.post('https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords', values)
      if (data.statusMsg == 'success') {
        navigate('/verifycode')
      }
    } catch (error) {
      setErrMsg(error.response.data.message);
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className='pt-32 max-w-2xl  border-gray-500 '>

      <h1 className=" text-green-500 ">Forget password ?</h1>
      <form onSubmit={formik.handleSubmit} className=" max-w-screen-lg mx-auto "  >
        <div className="relative z-0 w-full group mt-8">
          <input
            {...formik.getFieldProps("email")}
            type="email"
            name="email"
            id="email"
            className="block py-2.5 px-0 w-full  text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer"
            placeholder=""
          />
          <label
            htmlFor="email"
            className="peer-focus:font-medium absolute  text-lg text-gray-500 dark:text-gray-300 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
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


      {errMsg ? (
        <>
          <div
            className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
            role="alert"
          >
            {errMsg}
          </div>
        </>
      ) : null}
        <button
          disabled={loading}
          type="submit"
          className=" flex ms-auto mt-6 justify-center items-center  text-white disabled:bg-green-300 disabled:text-gray-700 dark:disabled:bg-green-300 dark:disabled:text-gray-700 bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-md w-full sm:w-auto px-6 py-3 text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
        >
          {loading ? <FaSpaghettiMonsterFlying className="animate-spin text-gray-800 text-xl" /> : 'verify'}
        </button>
      </form>
    </div>
  )
}
