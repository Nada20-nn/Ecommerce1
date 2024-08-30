import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { FaRegHeart, FaSpinner, FaStar } from "react-icons/fa";
import { Link } from "react-router-dom";
import { CartContext } from "../../Context/CartContext";
import Loading from "../Loading/Loading";
import toast from 'react-hot-toast'
import { WishlistContext } from "../../Context/WishListContext";
import { FaSpaghettiMonsterFlying , FaHeart } from "react-icons/fa6";
<FaHeart/>
function RecentProducts() {
  const { addProductToCart, setCartItemsNum } = useContext(CartContext);
  const { addToWishlist } = useContext(WishlistContext)
  const [AddLoading, setAddLoading] = useState(null)
  const [AddWishListLoading, setAddWishListLoading] = useState(null)

  async function addToCart(id) {
    setAddLoading(id)
    const { data } = await addProductToCart(id);
    console.log(data.data.products);
    if (data.status === 'success') {
      setCartItemsNum(data.numOfCartItems)
      toast.success('Item added successfully to your cart');
    }
    setAddLoading(null)

  }


  async function addItemToWishlist(id) {
    setAddWishListLoading(id)
    const { data } = await addToWishlist(id);
    if (data.status === 'success') {
      toast.success('Item added successfully');
    }
    setAddWishListLoading(null)
  }

  const { isFetching, isLoading, isError, error, data } = useQuery({
    queryKey: ["products"],
    queryFn: () => axios.get("https://ecommerce.routemisr.com/api/v1/products"),
    select: (data) => data?.data.data,
  });

  console.log({
    isLoading,
    isFetching,
  });

  if (isLoading) {
    return <Loading />;
  }

  if (isError) {
    return <h3>{error}</h3>;
  }

  return (
    <div className="py-10 grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      {data.map((product) => (
        <div key={product._id} className="border p-3 rounded-lg dark:border-gray-500">
          <Link to={`/productDetails/${product._id}`}>
            <img
              src={product.imageCover}
              className="w-full object-cover"
              alt={product.title}
            />
          </Link>
          <p className="text-sm text-green-600 my-2">{product.category.name}</p>
          <h3 className="truncate h4 mb-2">
            {product.title.split(" ").slice(0, 2).join(" ")}
          </h3>
          <div className="flex justify-between">
            <p>{product.price} EGP</p>
            <p>
              {product.ratingsAverage}{" "}
              <FaStar className="text-yellow-400 inline-block" />
            </p>
          </div>
          <div className="flex items-center justify-between">
            <button
              onClick={() => addToCart(product._id)}
              type="button"
              className="focus:outline-none mt-2  text-white bg-green-700 hover:bg-green-800   font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 "
            >

              {AddLoading === product._id ? <FaSpinner className="animate-spin" /> : "Add to cart"}

            </button>
            <div className="cursor-pointer" onClick={() => addItemToWishlist(product._id)}>
              {AddWishListLoading === product._id ? <FaSpaghettiMonsterFlying className="animate-spin text-3xl" /> : <FaHeart className="text-3xl hover:text-red-500" />}
              
            </div>

          </div>

        </div>
      ))}
    </div>
  );
}

export default RecentProducts;
