import { useContext, useState, useEffect } from 'react';
import { WishlistContext } from '../../Context/WishListContext';
import toast from 'react-hot-toast';
import { CartContext } from '../../Context/CartContext';

function WishList() {
    useEffect(() => {
        console.log('Mounting WishList');
        getWishList();
    }, []);

    const [userWishList, setUserWishList] = useState(null);
    const { getLoggedUserWishlist, removeFromWishlist } = useContext(WishlistContext);
    const { addProductToCart, setCartItemsNum } = useContext(CartContext)

    async function getWishList() {
        const { data } = await getLoggedUserWishlist();
        if (data.status === 'success') {
            setUserWishList(data.data);
            console.log(data.data);
        }
    }

    async function deleteItem(id) {
        const { data } = await removeFromWishlist(id);
        if (data.status === 'success') {
            setUserWishList((prev) => prev.filter((item) => item._id !== id));
            toast.success('Product removed successfully');
        }
    }


    async function addToCart(id) {

        const { data } = await addProductToCart(id);
        console.log(data.data.products);
        if (data.status === 'success') {
            setCartItemsNum(data.numOfCartItems)
            toast.success('Item added successfully to your cart');
        }
        deleteItem(id)
    }

    return (
        <div className="pt-28 px-4">
            <h2 className="text-3xl font-bold mb-8 text-center">WishList</h2>
            <div className= "my-8 space-y-4">
                {userWishList?.map((p) => (
                    <div
                        key={p._id}
                        className="flex flex-col hover:bg-green-300 md:flex-row items-center border border-gray-500 bg-white dark:bg-gray-800 dark:border-gray-700 rounded-lg overflow-hidden shadow-md p-4 transition-all transform hover:scale-105"
                    >
                        <img
                            src={p.imageCover}
                            className="w-full sm:w-32 h-48 object-cover rounded-lg"
                            alt={p.title}
                        />
                        <div className="sm:ml-4 flex-grow mt-4 sm:mt-0">
                            <h3 className="text-xl font-semibold text-gray-700 dark:text-gray-200 line-clamp-1">
                                {p.title.split(" ").slice(0, 8).join(" ")}
                            </h3>
                            <p className="text-lg text-gray-900 dark:text-gray-100 font-medium mt-2">
                                {p.price} EGP
                            </p>
                        </div>
                        <div className="flex flex-col sm:flex-row sm:space-x-3 mt-4 sm:mt-0">
                            <button
                                onClick={() => deleteItem(p._id)}
                                className="bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600 dark:bg-red-600 dark:hover:bg-red-700 transition ease-in-out duration-300 w-full sm:w-auto"
                            >
                                <i className="fas fa-trash-alt mr-2"></i> Remove
                            </button>
                            <button
                                onClick={() => addToCart(p._id)}
                                className="bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-green-600 dark:bg-green-600 dark:hover:bg-green-700 transition ease-in-out duration-300 mt-2 sm:mt-0 w-full sm:w-auto"
                            >
                                <i className="fas fa-cart-plus mr-2"></i> Add to cart
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default WishList;
