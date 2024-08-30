import { useContext, useState, useEffect } from 'react';
import { CartContext } from '../../Context/CartContext';
import toast from 'react-hot-toast';
import Loading from '../Loading/Loading';
import { Link } from 'react-router-dom';

function Cart() {
    const [userCart, setUserCart] = useState([]);
    const [totalCartPrice, setTotalCartPrice] = useState('0');
    const [cartID, setcartID] = useState(null)
    const [loading, setLoading] = useState(false);
    const {
        getLoggedUserCart,
        deleteProduct,
        updateItemCounter,
        deleteUserCart,
        cartItemsNum,
        setCartItemsNum
    } = useContext(CartContext);

    useEffect(() => {
        fetchLoggedUserCart();
    }, []);

    async function fetchLoggedUserCart() {
        setLoading(true);
        try {
            const { data } = await getLoggedUserCart();
            if (data && data.data) {
                setUserCart(data.data.products);
                setTotalCartPrice(data.data.totalCartPrice);
                setcartID(data.data._id)
            } else {
                setUserCart([]);
            }
        } catch (error) {
            console.error('Error fetching cart:', error);
            toast.error('Failed to load your cart.');
        } finally {
            setLoading(false);
        }
    }

    async function handleDeleteItem(id) {
        setLoading(true);
        try {
            const { data } = await deleteProduct(id);
            if (data.status === 'success') {
                setUserCart(prevCart => prevCart.filter(item => item.product._id !== id));
                setTotalCartPrice(data.data.totalCartPrice);
                setCartItemsNum(data.numOfCartItems);
                toast.success('Item deleted successfully.');
            } else {
                toast.error('Failed to delete the item.');
            }
        } catch (error) {
            console.error('Error deleting item:', error);
            toast.error('An error occurred while deleting the item.');
        } finally {
            setLoading(false);
        }
    }

    async function handleUpdateQuantity(id, count) {
        setLoading(true);
        try {
            const { data } = await updateItemCounter(id, count);
            if (data.status === 'success') {
                setUserCart(data.data.products);
                setTotalCartPrice(data.data.totalCartPrice);
                toast.success('Item updated successfully.');
            } else {
                toast.error('Failed to update item quantity.');
            }
        } catch (error) {
            console.error('Error updating item quantity:', error);
            toast.error('An error occurred while updating the item quantity.');
        } finally {
            setLoading(false);
        }
    }

    async function handleDeleteAllCart() {
        setLoading(true);
        try {
            const { data } = await deleteUserCart();
            if (data.message === 'success') {
                setUserCart([]);
                setTotalCartPrice('0');
                setCartItemsNum(0);
                toast.success('All items deleted successfully.');
            } else {
                toast.error('Failed to delete all items.');
            }
        } catch (error) {
            console.error('Error deleting all items:', error);
            toast.error('An error occurred while deleting all items.');
        } finally {
            setLoading(false);
        }
    }

    if (loading) {
        return <Loading />;
    }

    return (
        <div className="pt-28 rounded-lg">
            <h2 className="text-3xl font-bold mb-6 text-gray-800 dark:text-gray-200">Your Shopping Cart</h2>
            <div className="flex justify-between items-center mb-5">
                <div>
                    <p className="text-xl font-bold text-gray-600">
                        Total number of items: {cartItemsNum}
                    </p>
                    <p>Total cart price: {totalCartPrice}</p>
                </div>
                <button
                    onClick={handleDeleteAllCart}
                    className="rounded-xl px-5 py-3 bg-red-500 text-white"
                >
                    Clear All Cart Items
                </button>
                <Link
                    to={`/checkout/${cartID}`}
                    className="rounded-xl px-5 py-3 bg-green-500 text-white"
                >
                    Checkout
                </Link>
            </div>
            <div className="space-y-4">
                {Array.isArray(userCart) && userCart.length > 0 ? (
                    userCart.map(p => (
                        <div
                            key={p?.product._id}
                            className="flex items-center border border-gray-300 bg-white dark:bg-gray-800 dark:border-gray-700 rounded-lg overflow-hidden shadow-md p-3"
                        >
                            <img
                                src={p?.product.imageCover}
                                className="w-48 h-52 object-cover rounded-lg"
                                alt={p?.product.title}
                            />
                            <div className="ml-4 flex-grow">
                                <h3 className="text-xl font-semibold text-gray-700 dark:text-gray-200 truncate">
                                    {p?.product.title.split(" ").slice(0, 2).join(" ")}
                                </h3>
                                <div className="flex items-center mt-2">
                                    <p className="text-lg text-gray-900 dark:text-gray-100 font-medium">
                                        {p?.price}
                                    </p>
                                </div>
                                <div className="flex items-center">
                                    <button
                                        onClick={() => handleUpdateQuantity(p?.product._id, p?.count - 1)}
                                        className="inline-flex items-center justify-center p-1 mr-3 text-sm font-medium h-6 w-6 text-gray-500 bg-white border border-gray-300 rounded-full focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
                                        type="button"
                                    >
                                        <span className="sr-only">Decrease quantity</span>
                                        <svg
                                            className="w-3 h-3"
                                            aria-hidden="true"
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="none"
                                            viewBox="0 0 18 2"
                                        >
                                            <path
                                                stroke="currentColor"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth="2"
                                                d="M1 1h16"
                                            />
                                        </svg>
                                    </button>
                                    <span className="bg-gray-50 w-14 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block px-2.5 py-1 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                                        {p?.count}
                                    </span>
                                    <button
                                        onClick={() => handleUpdateQuantity(p?.product._id, p?.count + 1)}
                                        className="inline-flex items-center justify-center h-6 w-6 p-1 ml-3 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-full focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
                                        type="button"
                                    >
                                        <span className="sr-only">Increase quantity</span>
                                        <svg
                                            className="w-3 h-3"
                                            aria-hidden="true"
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="none"
                                            viewBox="0 0 18 18"
                                        >
                                            <path
                                                stroke="currentColor"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth="2"
                                                d="M9 1v16M1 9h16"
                                            />
                                        </svg>
                                    </button>
                                </div>
                            </div>
                            <button
                                onClick={() => handleDeleteItem(p?.product._id)}
                                className="ml-4 bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600 dark:bg-red-600 dark:hover:bg-red-700 transition ease-in-out duration-300 flex items-center"
                            >
                                <i className="fas fa-trash-alt mr-2"></i> Remove
                            </button>
                        </div>
                    ))
                ) : (
                    <p className="text-lg text-gray-500 dark:text-gray-400">Your cart is empty.</p>
                )}
            </div>
        </div>
    );
}

export default Cart;
