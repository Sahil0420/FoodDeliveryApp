import React from "react";
import { useDispatchCart, useCart } from "../components/ContextReducer";

export default function Cart() {
  let data = useCart();
  let dispatch = useDispatchCart();
  if (data.length === 0) {
    return (
      <div className="m-5 w-100 text-center fs-3">The Cart is Empty !</div>
    );
  }

  const handleCheckOut = async () => {
    try{

      let userEmail = await localStorage.getItem("userEmail");
      
      if(!userEmail){
        console.error("user email not found in localStorage")
        return
      }
      
      let response = await fetch("http://localhost:4000/api/orderData", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body : JSON.stringify({
          order_date:new Date().toDateString(),
          email : userEmail,
          order_data : data
        })
      });
      if(response.status === 200){
        dispatch({type:"DROP"})
      }else{
        console.error('Check out failed with response status : ', response.status);
      }
    }catch(error){
      console.error('An error occurred during checkout',error)
    }
  };

  let totalPrice = data.reduce((total, food) => total + food.price, 0);
  return (
    <div>
      <div className="conatiner m-auto mt-5 table-responsive table-responsive-sm table-responsive-md ">
        <table className="table table-hover">
          <thead className="text-success fs-4">
            <tr>
              <th scope="col">#</th>
              <th scope="col">Name</th>
              <th scope="col">Quantity</th>
              <th scope="col">Option</th>
              <th scope="col">Amount</th>
            </tr>
          </thead>
          <tbody>
            {data.map((food, index) => (
              <tr>
                <th scope="row">{index + 1}</th>
                <td>{food.name}</td>
                <td>{food.qty}</td>
                <td>{food.size}</td>
                <td>{food.price}</td>
                <td>
                  <button
                    type="button"
                    className="btn btn p-0"
                    onClick={() => {
                      dispatch({ type: "REMOVE", index: index });
                    }}
                  >
                    <i className="bi bi-trash"></i>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div>
          <h1 className="fs-2">Total Price : Rs{totalPrice}/- </h1>
        </div>
        <div>
          <button className="btn bg-success mt-5" onClick={handleCheckOut}>Check Out</button>
        </div>
      </div>
    </div>
  );
}
