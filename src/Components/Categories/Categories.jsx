
import { useState, useEffect } from 'react';
import axios from 'axios';
import Loading from '../Loading/Loading';
import Style from './Categories.module.css';

function Categories() {
    const [categories, setCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [selectedCategoryName, setSelectedCategoryName] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        console.log('Mounting Categories');
        getAllCategories();
    }, []);

    async function getAllCategories() {
        setIsLoading(true);
        try {
            const { data } = await axios.get('https://ecommerce.routemisr.com/api/v1/categories');
            setCategories(data.data);
        } catch (error) {
            console.error('Error fetching categories:', error);
        } finally {
            setIsLoading(false);
        }
    }

    async function getSubCategory(id, name) {
        setIsLoading(true);
        try {
            const { data } = await axios.get(`https://ecommerce.routemisr.com/api/v1/categories/${id}/subcategories`);
            setSelectedCategory(data.data);
            setSelectedCategoryName(name);
        } catch (error) {
            console.error('Error fetching subcategories:', error);
        } finally {
            setIsLoading(false);
        }
    }

    if (isLoading) {
        return <Loading />;
    }

    return (
        <div className="pt-28">
            <h2 className="text-center mb-8">Categories</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {categories?.map((category) => (
                    <div
                        onClick={() => getSubCategory(category?._id, category?.name)}
                        key={category?._id}
                        className="bg-white border border-gray-200 rounded-lg overflow-hidden shadow dark:bg-gray-800 dark:border-gray-700"
                    >
                        <a href="#">
                            <img className="w-full h-96 object-cover" src={category?.image} alt={category?.name} />
                        </a>
                        <div className="p-5">
                            <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                                {category?.name}
                            </h5>
                        </div>
                    </div>
                ))}
            </div>

            {selectedCategory && (
                <div className="my-10">
                    <h2 className="text-center text-3xl font-semibold text-green-600 mb-5">
                        {selectedCategoryName} Subcategories
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                        {selectedCategory.map((subcategory) => (
                            <div
                                key={subcategory._id}
                                className="cursor-pointer w-full hover:shadow-lg hover:shadow-slate-600 dark:hover:shadow-lg dark:hover:shadow-slate-200 duration-300 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700"
                            >
                                <div className="p-5">
                                    <h5 className="mb-2 text-[25px] font-semibold text-center tracking-tight dark:text-gray-300">
                                        {subcategory.name}
                                    </h5>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}

export default Categories;
