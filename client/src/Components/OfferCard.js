import React from "react";
import { AiFillPlusSquare } from "react-icons/ai";
import { useDispatch } from "react-redux";
import { addToCart } from "../store/reducers/cartReducer";

const OfferCard = ({ offering }) => {
  const dispatch = useDispatch();

  const handleAddToCart = () => {
    dispatch(addToCart(offering));
  };

  return (
    <>
      <li
        key={offering._id}
        className="p-5 rounded-md m-4 border-gray-200 border-2 w-[310px]"
      >
        <div>
          <div className="flex justify-between items-start">
            <img
              className="w-[60px] h-[60px] mr-24 rounded-full"
              src={offering.logo}
            />
            <a href={offering.websiteurl} className="text-gray-400 font-medium">
              today.com
            </a>
          </div>
          <div className="my-2">
            <p className="font-semibold my-3 text-xl">{offering.title}</p>
            <div>
              <p className="text-sm bg-gray-200 w-max p-0.5 rounded-sm px-2">
                {offering.location}
              </p>
            </div>
          </div>
          <div className="flex justify-between border-t border-gray-300 py-3">
            <div>
              <p className="text-gray-500">Starting from</p>
              <p className="font-semibold text-lg">$ {offering.price}</p>
            </div>
            <button onClick={handleAddToCart} className="text-3xl">
              <AiFillPlusSquare />
            </button>
          </div>
        </div>
      </li>
    </>
  );
};

export default OfferCard;
