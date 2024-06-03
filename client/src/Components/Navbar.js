import React from "react";
import { Link } from "react-router-dom";
import { FaCartShopping } from "react-icons/fa6";
import { useSelector } from "react-redux";

const Navbar = () => {
  const cartItems = useSelector((state) => state.cart.items);
  return (
    <div className="bg-black flex items-center justify-between text-white p-5 px-10">
      <Link to={"/"}>
        <div>
          <h1 className="text-3xl font-semibold my-1">Koinpr</h1>
          <p>
            A <span className="font-semibold">Todayq</span> Product
          </p>
        </div>
      </Link>
      <div className="flex justify-center items-center gap-10">
        <Link to={"/form"} className="text-white font-semibold ">
          Create Offering
        </Link>
        <Link to={"/cart"}>
          {cartItems.length > 0 ? (
            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
          ) : (
            ""
          )}
          <FaCartShopping />
        </Link>
      </div>
    </div>
  );
};

export default Navbar;
