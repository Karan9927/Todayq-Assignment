import React, { useState } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import useRazorpay from "react-razorpay";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const cartItems = useSelector((state) => state.cart.items);
  const [Razorpay] = useRazorpay();
  const navigate = useNavigate();
  const [transaction, setTransaction] = useState({
    orderId: null,
    transactionId: null,
  });
  const [paymentDone, setPaymentDone] = useState(false);
  const createOrder = async () => {
    try {
      const response = await axios.post(
        "http://localhost:3000/api/create-order",
        {
          amount: totalPrice,
        }
      );
      await handlePayment(response.data.id);
      console.log(response);
    } catch (err) {
      toast.error(err.msg);
    }
  };

  const totalPrice =
    cartItems.reduce((acc, item) => {
      return acc + item.price;
    }, 0) * 100; // Convert to paisa

  const handlePayment = async (id) => {
    const options = {
      key: "rzp_test_cZDabhMfr5eWkd",
      amount: totalPrice,
      currency: "INR",
      name: "Example Corp",
      description: "Test payment",
      image:
        "https://miro.medium.com/v2/resize:fit:1080/1*8DDN_DRuSBlM74dVYUjR9Q.png",
      order_id: id,
      handler: async function (response) {
        const tresponse = await axios.post(
          "http://localhost:3000/api/transactions",
          {
            transactionId: response.razorpay_payment_id,
            orderId: response.razorpay_order_id,
            productIds: cartItems.map((item) => item._id),
            amount: totalPrice,
          }
        );
        setTransaction({
          orderId: tresponse.data.orderId,
          transactionId: tresponse.data.transactionId,
        });
        setPaymentDone(true);
        setTimeout(() => {
          navigate("/");
        }, 3000);
      },
      prefill: {
        name: "John Doe",
        email: "john@example.com",
        contact: "9876543210",
      },
      notes: {
        address: "Example Address",
      },
      theme: {
        color: "#F37254",
      },
    };

    const razorpay = new Razorpay(options);
    razorpay.on("payment.failed", function (response) {
      alert(response.error.code);
      alert(response.error.description);
      alert(response.error.source);
      alert(response.error.step);
      alert(response.error.reason);
      alert(response.error.metadata.order_id);
      alert(response.error.metadata.payment_id);
    });
    razorpay.open();
  };

  return (
    <div className="my-24">
      <div className="max-w-3xl mx-auto bg-white shadow-lg rounded-lg p-6">
        <h2 className="text-2xl font-bold mb-4">Shopping Cart</h2>
        <div className="space-y-4">
          {cartItems.map((item) => (
            <div
              className="flex justify-between items-center border-b pb-4"
              key={item._id}
            >
              <div className="text-lg">{item.title}</div>
              <div className="text-lg font-semibold">$ {item.price}</div>
            </div>
          ))}
        </div>
        <div className="mt-6 flex justify-between items-center">
          <div className="text-xl font-bold">Total</div>
          <div className="text-xl font-bold">$ {totalPrice / 100}</div>{" "}
        </div>
        {!paymentDone && (
          <button
            onClick={createOrder}
            className="mt-6 w-full bg-blue-500 text-white py-2 rounded-lg text-lg font-semibold hover:bg-blue-600"
          >
            Checkout
          </button>
        )}
        {paymentDone && (
          <p className="mt-6 text-center text-green-500 text-lg font-semibold">
            Payment successful! Thank you for your purchase.
          </p>
        )}
      </div>
    </div>
  );
};

export default Cart;
