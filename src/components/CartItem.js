import React, { useState } from "react";
import { MdOutlineClose } from "react-icons/md";
import {useDispatch, useSelector } from "react-redux";
import { deleteItem,resetCart } from "../redux/ordernowSlice";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link } from 'react-router-dom';
import { HiOutlineArrowLeft } from 'react-icons/hi';
import { incrementQuantity, decrementQuantity } from '../redux/ordernowSlice'; // Make sure to import these actions



const CartItem = () => {
    const dispatch = useDispatch()
  const productData = useSelector((state) => state.ordernow.productData);

  const CartItem = ({ item }) => {
    const dispatch = useDispatch();
    const baseQty = item.quantity; // Use item.quantity instead of local state
  
    const handleQuantityChange = (newQuantity) => {
      if (newQuantity > item.quantity) {
        dispatch(incrementQuantity({ _id: item._id }));
      } else if (newQuantity < item.quantity) {
        dispatch(decrementQuantity({ _id: item._id }));
      }
    };

    return (
      <div key={item.id} className="flex items-center justify-between gap-6 mt-6">
        <div className="flex items-center gap-2">
          <MdOutlineClose 
             onClick={()=>dispatch(deleteItem(item._id)) & 
               toast.error(`${item.title} is removed`)
            }
            className="text-xl cursor-pointer duration-300 text-gray-600 hover:text-red-600"
          />
          <img
            className="w-32 h-32 object-cover"
            src={item.image}
            alt="productImg"
          />
        </div>
        <div className="flex flex-col">
          <div className="flex gap-4 items-center">
            <h2 className="w-40 font-semibold">{item.title}</h2>
            <p className="text-sm">${item.price}</p>
            <div className="w-52 flex items-center justify-between text-gray-500 gap-4 border p-3">
              <p className="text-sm">Quantity</p>
              <div className="flex items-center gap-4 text-sm font-semibold">
                <button
                  onClick={() => handleQuantityChange(baseQty === 1 ? 1 : baseQty - 1)}
                  className="quantity-button hover:bg-black hover:text-white cursor-pointer w-8 p-2"
                >
                  -
                </button>
                <span>{baseQty}</span>
                <button
                  onClick={() => handleQuantityChange(baseQty + 1)}
                  className="quantity-button hover:bg-black hover:text-white cursor-pointer w-8 p-2"
                >
                  +
                </button>
              </div>
            </div>
            <p className="w-16">${baseQty * item.price}</p>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="w-2/3 pr-10">
      <div className="w-full">
        <h2 className="font-bold text-2xl">Shopping Cart</h2>
      </div>
      <div>
        {productData.map((item) => (
          <CartItem key={item.id} item={item} />
        ))}
      </div>

      <button
  onClick={() => {
    dispatch(resetCart());
    toast.error('Oops! Your Cart is Empty!', {
      position: 'top-left',
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: false, // Set closeOnClick to false
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  }}
  className="bg-red-500 text-white mt-8 ml-7 py-1 px-6 hover:bg-red-800"
>
  Reset Cart
</button>


<Link to="/">
  <button className="mt-8 ml-7 flex items-center gap-1 text-gray-400 hover:text-black duration-300">
    <span>
      <HiOutlineArrowLeft /> {/* Fix: Correct icon component usage */}
    </span>
    go shopping
  </button>
</Link>

      <ToastContainer
            position="top-left"
            autoClose={2000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnCLick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="dark"
        />
    </div>
  );
};

export default CartItem;