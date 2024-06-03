import React, { useEffect, useState } from "react";
import axios from "axios";
import OfferCard from "../Components/OfferCard";
import { Checkbox, FormControlLabel } from "@mui/material";

const Home = () => {
  const [offerings, setOfferings] = useState([]);
  const [checkedItem, setCheckedItem] = useState();

  const handleCheckboxChange = (itemName) => {
    setCheckedItem(itemName);
    fetchbyCategory(itemName);
    console.log(itemName);
  };

  const fetchbyCategory = async (category) => {
    console.log(category);
    try {
      const res = await axios.get(
        `https://todayq-assignment-seven.vercel.app/api/offerings/getbyCategory?category=${category}`
      );
      console.log(res.data);
      setOfferings(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    const fetchOfferings = async () => {
      try {
        const res = await axios.get(
          "https://todayq-assignment-seven.vercel.app/api/offerings/getofferings"
        );
        console.log(res.data);
        setOfferings(res.data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchOfferings();
  }, []);

  const checkboxes = [
    { name: "Content Distribution", label: "Content Distribution" },
    { name: "Ads", label: "Ads" },
    { name: "Twitter Influencers", label: "Twitter Influencers" },
    { name: "Telegram Influencers", label: "Telegram Influencers" },
    { name: "Instagram Influencers", label: "Instagram Influencers" },
    { name: "Youtube Influencers", label: "Youtube Influencers" },
    { name: "ICO Listing", label: "ICO Listing" },
    { name: "Exchange Listing", label: "Exchange Listing" },
  ];

  return (
    <div className="flex">
      <div className="flex flex-col p-5 m-2 border-2 rounded-sm w-max">
        <p className="flex flex-col mb-5 text-xl font-semibold">Categories</p>
        {checkboxes.map((checkbox) => (
          <FormControlLabel
            className=" whitespace-nowrap"
            key={checkbox.name}
            control={
              <Checkbox
                checked={checkedItem === checkbox.name}
                onChange={() => handleCheckboxChange(checkbox.name)}
                name={checkbox.name}
              />
            }
            label={checkbox.label}
          />
        ))}
      </div>
      <div>
        <h1 className="m-4 text-2xl font-semibold ">Koinpr Marketplace</h1>
        <ul className="flex flex-wrap">
          {offerings.map((offering) => (
            <OfferCard key={offering._id} offering={offering} />
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Home;
