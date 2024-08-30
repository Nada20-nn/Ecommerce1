

import { useState } from 'react';
import Style from './Brands.module.css';
import { useEffect } from 'react';
import axios from 'axios';
import Loading from '../Loading/Loading';

function Brands() {

    const [brands, setBrands] = useState([]);
    
    const [subBrand, setSubBrand] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    useEffect(() => {
        console.log('Mounting Brands');
        getAllBrands();
    }, [])

    async function getAllBrands() {
        setIsLoading(true);
        try {
            const response = await axios.get('https://ecommerce.routemisr.com/api/v1/brands')
            setBrands(response.data.data)

        } catch (error) {
            console.error('Error fetching categories:', error);
        }
        finally {
            setIsLoading(false);
        }
    }


    async function getSpecificBrand(id, name) {
        setIsLoading(true);
        try {
            const data = await axios.get(`https://ecommerce.routemisr.com/api/v1/brands/${id}`);
            setSubBrand(data.data.data);
            // setSubBrandName(name); 
            openModal();
        } catch (error) {
            console.error('Error fetching categories:', error);
        }
        finally {
            setIsLoading(false);
        }

    }
    function closeModal() {
        setIsModalOpen(false);
        setSubBrand(null);
    }
    function openModal() {
        setIsModalOpen(true);
        
    }

    if (isLoading) {
        return <Loading />
    }

    return (

        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-8 text-center">Brands</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {brands?.map((brand) => (
                    <div
                        key={brand?._id}
                        onClick={() => getSpecificBrand(brand?._id, brand?.name)}
                        className="bg-white border border-gray-200 rounded-lg overflow-hidden shadow hover:bg-gray-100 cursor-pointer transition dark:bg-gray-800 dark:border-gray-700"
                    >
                        <img className="w-full h-64 object-cover" src={brand?.image} alt={brand?.name} />
                        <div className="p-4">
                            <h5 className="text-xl font-bold text-gray-900 dark:text-white">{brand?.name}</h5>
                        </div>
                    </div>
                ))}
            </div>


            {isModalOpen && subBrand && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg w-11/12 max-w-lg">
                        <div className="flex justify-between items-center mb-4">
                            <h2 className="text-2xl font-bold">{subBrand.name}</h2>
                            <button
                                onClick={closeModal}
                                className="text-gray-500 hover:text-gray-700 dark:text-gray-300 dark:hover:text-gray-500"
                            >
                                &times;
                            </button>
                        </div>

                        <div >
                            <img
                                src={subBrand.image}
                                alt={subBrand.name}
                                className="w-full h-64 object-cover rounded-lg mb-4"
                            />
                            <p className="text-gray-700 dark:text-gray-300 mb-2">
                               {subBrand.slug}
                            </p>
                           
                        </div>

                        <div className="mt-4 flex justify-end">
                            <button
                                onClick={closeModal}
                                className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
                            >
                                Close
                            </button>
                        </div>
                    </div>
                </div>)}

          
        </div>
    );
}

export default Brands

