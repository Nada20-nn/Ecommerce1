import { useContext, useState } from "react";
import Style from "./ProductDetails.module.css";
import { useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { FaStar } from "react-icons/fa";
import Loading from "../Loading/Loading";
import { CartContext } from "../../Context/CartContext";
import toast from 'react-hot-toast';


function ProductDetails() {
  
  const { id } = useParams();
  const [productDetails, setProductDetails] = useState(null);
  const {addProductToCart , setCartItemsNum} = useContext(CartContext)
  

  async function getProductDetails(id) {
    const { data } = await axios.get(
      "https://ecommerce.routemisr.com/api/v1/products/" + id
    );
    
    setProductDetails(data.data);
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


  useEffect(() => {
    getProductDetails(id);
    console.log("Mounting ProductDetails");
  }, []);

  
  return (
    <>
      {productDetails == null ? (
        <Loading />
      ) : (
        <div className="grid gap-4 sm:grid-cols-12">
          <div className="col-span-4 py-5 ">
            <img src={productDetails?.imageCover} className="w-full" alt="" />
          </div>
          <div className="col-span-8 self-center  py-5 ">
            <h2>{productDetails.title}</h2>
            <p className="my-3 font-light">{productDetails.description}</p>
            <h3 className="mb-2">{productDetails.category.name}</h3>

            <div className="flex mb-3 justify-between">
              <p>{productDetails.price} EGY</p>
              <p>
                {productDetails.ratingsAverage}{" "}
                <FaStar className="text-yellow-400 inline-block" />{" "}
              </p>

            </div>
              <button onClick={() => addToCart(productDetails._id)} className="w-full bg-green-600 py-1 text-white rounded-sm">Add To Cart</button>
          </div>
        </div>
      )}
    </>
  );
}

export default ProductDetails;
