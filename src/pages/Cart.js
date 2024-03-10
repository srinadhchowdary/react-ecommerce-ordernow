import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import CartItem from '../components/CartItem';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import StripeCheckout from 'react-stripe-checkout';
import axios from 'axios';

const Cart = () => {
  const productData = useSelector((state) => state.ordernow.productData);
  const userInfo = useSelector((state) => state.ordernow.userInfo);
  const [totalAmt, setTotalAmt] = useState(0);
  const [payNow, setPayNow] = useState(false);
  const [isMounted, setIsMounted] = useState(true);

  useEffect(() => {
    let price = 0;

    // Calculate the total amount based on each product's price and quantity
    productData.forEach((item) => {
      price = price + item.price * item.quantity;
    });

    // Update the total amount
    setTotalAmt(price.toFixed(2));

    // Cleanup function to set isMounted to false when the component is unmounted
    return () => {
      setIsMounted(false);
    };
  }, [productData]);

  const handleChechout = () => {
    if (userInfo) {
      setPayNow(true);
    } else {
      try {
        throw new Error('Please sign in to checkout');
      } catch (error) {
        if (isMounted) {
          toast.error(error.message);
        }
      }
    }
  };
  const payment = async(token)=>{
    await axios.post("http://localhost:8000/pay",{
      amount : totalAmt * 100,
      token:token,
    })
  }


  const handleToken = (token) => {
    // Handle the token (e.g., send it to your server)
    console.log(token);
    // Optionally, you can update the state or take other actions
    setPayNow(false);

    try {
      // Assuming some successful payment logic
      throw new Error('Payment Successful!');
    } catch (error) {
      if (isMounted) {
        toast.success(error.message, {
          onClose: () => setIsMounted(false), // Set isMounted to false when the ToastContainer is closed
        });
      }
    }
  };
  
  
  return (
    <div>
      <img
        className="w-full h-70 object-cover"
        src="https://blog.sellfy.com/wp-content/uploads/2020/03/add-a-shopping-cart-website-1200x600.png"
        alt="cartImg"
      />
      <div className="max-w-screen-xl mx-auto py-20 flex ">
        <CartItem />
        <div className="w-1/3 bg-[#fafafa] py-6 px-4">
          <div className="flex flex-col gap-6 border-b-[1px] border-b-gray-400 pb-6">
            <h2 className="text-4xl font-bodyFont">cart totals</h2>
            <p className="flex items-center text-base">
              Subtotal <span className="font-bold text-1g ml-2">${totalAmt}</span>
            </p>
            <p className="flex items-start gap-4 text-base">
              Shipping: <span>Lorem ipsum dolor sit amet consectetur adipiscing elit, Quos, Veritatis</span>
            </p>
          </div>
          <p className="font-titleFont font-semibold flex justify-between mt-6">
            Total <span className="text-xl font-bold">${totalAmt}</span>
          </p>
          <button onClick={handleChechout} className="text-base bg-black text-white w-full py-3 rounded hover:bg-gray-800 mt-6 duration-300">
            Proceed to Checkout
          </button>
          {payNow && (
            <div className="w-full mt-6 flex items-center justify-center">
              <StripeCheckout
                stripeKey="pk_test_51OsSl1SImNm7RlausM3j6E66BBhi9kfCE5W0slZRtPUiNbvShYkwg1cW6Rhmy0D14PZ611kD2Rx816E7llEHaorV0068fJKkRk"
                name="OrderNow Ecommerce"
                amount={totalAmt * 100}
                label="Pay to Ordernow"
                description={`Your Payment amount is $${totalAmt}`}
                token={payment}  // <-- Corrected line
                email={userInfo.email}
                closed={() => setPayNow(false)}
              />

            </div>
          )}
        </div>
      </div>
      <ToastContainer
        position="top-left"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
    </div>
  );
};

export default Cart;