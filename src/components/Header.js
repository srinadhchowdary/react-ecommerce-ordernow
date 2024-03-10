import React from "react";
import {cart,logo} from "../assets/index";
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';


const Header = () => {
    const productData = useSelector((state)=> state.ordernow.productData);
    const userInfo = useSelector((state) => state.ordernow.userInfo);
    console.log(userInfo);

    
return (
        <div className="w-full h-20 bg-white border-b-[1px] border-b-gray-800 font-bold  sticky top-0 z-50">
          <div className="max-w-screen-xl h-full mx-auto flex items-center justify-between">
            <Link to="/">
                <div>             
                <img cLassName="w-28" src={logo} alt="logo" />
                </ div>
            </Link>
            
            <div className="flex item-center gap-8">
                <ul className="flex item-center gap-8">
                <Link to ="/">
                    <div>
                    <li className="text-base text-black font-bond hover:text-orange-900
                    hover:underline underline-offset-2 decoration-[1px] cursor-pointer">
                        Home</li>
                    </div>
                </Link>
                <li className="text-base text-black font-bond hover:text-orange-900
                hover:underline underline-offset-2 decoration-[1px] cursor-pointer">
                    Pages</li>
                <li className="text-base text-black font-bond hover:text-orange-900
                hover:underline underline-offset-2 decoration-[1px] cursor-pointer">
                    Shop</li>
                <li className="text-base text-black font-bond hover:text-orange-900
                hover:underline underline-offset-2 decoration-[1px] cursor-pointer">
                    Element</li>
                <li className="text-base text-black font-bond hover:text-orange-900
                hover:underline underline-offset-2 decoration-[1px] cursor-pointer">
                    Blog</li>
                </ul>
                <Link to ="/cart">
                <div className="relative">
                    <img className="w-10" src={cart} alt="cart" />
                    <span className="absolute top-2 left-5 text-sm flex items-center justify-center font-semibold">
                        {productData.length}
                    </span>
                </div>
                </Link>
                <Link to ="/login">
                <img
                className="w-8 h-8 rounded-full"
                src={userInfo ? userInfo.image 
                    :
                "https://upload.wikimedia.org/wikipedia/commons/9/99/Sample_User_Icon.png"}
                alt="userLogo"
                />
                </Link>
                {
                    userInfo && <p className="text-base font-titleFont font-semibold underline umderline-offset-2">{userInfo.name}</p>
                }
            </div>
        </div>
        
    </div>
    );
};
export default Header;