import { useState } from 'react'
import Style from './Footer.module.css'
import { useEffect } from 'react'
import { Link } from 'react-router-dom'

function Footer() {
    
    const [counter, setCounter] = useState(0)
    useEffect(()=> {
        console.log('Mounting Footer');
    } , [])
    return (
       

<footer className="bg-white rounded-lg shadow dark:bg-gray-900 m-4">
    <div className="w-full max-w-screen-xl mx-auto p-4 md:py-8 border-gray-500 border-x-fuchsia-200">
        <div className="sm:flex sm:items-center sm:justify-between">
            <Link href="https://flowbite.com/" className="flex items-center mb-2 sm:mb-0  rtl:space-x-reverse">
                
                <span className="self-center  font-semibold whitespace-nowrap text-green-600 dark:text-white text-2xl ">Ecommerce</span>
            </Link>
           
        </div>
        <hr className="my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8" />
        <span className="block text-sm text-gray-500 sm:text-center dark:text-gray-400">© 2023 <a href="https://flowbite.com/" class="hover:underline">Flowbite™</a>. All Rights Reserved.</span>
    </div>
</footer>


    )
}

export default Footer
