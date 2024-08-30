import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";
import Home from "./Components/Home/Home";
import Products from "./Components/Products/Products";
import Categories from "./Components/Categories/Categories";
import Brands from "./Components/Brands/Brands";
import Login from "./Components/Login/Login";
import Register from "./Components/Register/Register";
import Cart from "./Components/Cart/Cart";
import LayOut from "./Components/LayOut/LayOut";
import NotFound from "./Components/NotFound/NotFound";
import CounterContextProvider from "./Context/CounterContext";
import UserContextProvider from "./Context/UserContext";
import ProtectedRoute from "./Components/ProtectedRoute/ProtectedRoute";
import ProductDetails from "./Components/ProductDetails/ProductDetails";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import toast, { Toaster } from 'react-hot-toast';


import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import CartContextProvider from "./Context/CartContext";
import WishlistContextProvider from "./Context/WishListContext";
import WishList from "./Components/WishList/WishList";
import CheckOut from "./Components/CheckOut/CheckOut";
import ResetPassword from "./Components/ResetPassword/ResetPassword";
import ForgetPassword from "./Components/ForgetPassword/ForgetPassword";
import VerifyCode from "./Components/VerifyCode/VerifyCode";
import Allorders from "./Components/allorders/allorders";
const x = createBrowserRouter([
  {
    path: "",
    element: <LayOut />,
    children: [
      {
        index: true,
        element: (
          <ProtectedRoute>
            <Home />{" "}
          </ProtectedRoute>
        ),
      },
      {
        path: "products",
        element: (
          <ProtectedRoute>
            <Products />
          </ProtectedRoute>
        ),
      },
      {
        path: "forgetpassword",
        element: (
          
            <ForgetPassword />
          
        ),
      },
      {
        path: "productDetails/:id",
        element: (
          <ProtectedRoute>
            <ProductDetails />
          </ProtectedRoute>
        ),
      },
      {
        path: "wishlist",
        element: (
          <ProtectedRoute>
            <WishList/>
          </ProtectedRoute>
        ),
      },
      {
        path: "resetpassword",
        element: (
          
            <ResetPassword/>
         
        ),
      },
      {
        path: "verifycode",
        element: (
          
            <VerifyCode/>
         
        ),
      },
      {
        path: "checkout/:cartId",
        element: (
          <ProtectedRoute>
            <CheckOut/>
          </ProtectedRoute>
        ),
      },
      {
        path: "categories",
        element: (
          <ProtectedRoute>
            <Categories />
          </ProtectedRoute>
        ),
      },
      {
        path: "allorders",
        element: (
          <ProtectedRoute>
            <Allorders />
          </ProtectedRoute>
        ),
      },
      {
        path: "brands",
        element: (
          <ProtectedRoute>
            <Brands />
          </ProtectedRoute>
        ),
      },
      { path: "login", element: <Login /> },
      { path: "register", element: <Register /> },
      {
        path: "cart",
        element: (
          <ProtectedRoute>
            {" "}
            <Cart />
          </ProtectedRoute>
        ),
      },
      { path: "*", element: <NotFound /> },
    ],
  },
]);


//!
const myClient = new QueryClient({
  defaultOptions: {
    queries: {
      


      gcTime: 3000,
    
      refetchOnWindowFocus: true
      
    }
  }
});
function App() {
  return (
    <QueryClientProvider client={myClient}>
      <UserContextProvider>
        <CartContextProvider>
          <WishlistContextProvider>
            <RouterProvider router={x}></RouterProvider>
          </WishlistContextProvider>
        </CartContextProvider>
      </UserContextProvider>
      <ReactQueryDevtools />
      <Toaster />

    </QueryClientProvider>

  );
}

export default App;
