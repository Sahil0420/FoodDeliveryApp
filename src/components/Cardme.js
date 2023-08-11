import React, { useRef, useEffect, useState } from "react";
import "./css/cardme.css";

import { useDispatchCart, useCart } from "./ContextReducer";

export default function Cardme(props) {
  // let priceOptions =   Object.keys(props.options[Object.keys(props.options)])
  let options = props.options;
  let priceOptions = Object.keys(options);

  let dispatch = useDispatchCart();
  //cart mein daalne ke liye quantity or size ( regular , medium , large)
  const [qty, setQty] = useState(1);
  const [size, setSize] = useState("");

  const handleAddToCart = async () => {

    let food=[]
    for(let item of data){
      if(item.id === props.items._id){
        food = item;

        break;
      }
    }

    if(food!==[]){
      if(food.size === size){
        await dispatch({type:"UPDATE",id:props.items._id , price : finalPrice , qty : qty})
        return 
      }else if(food.size !== size){
        await dispatch({
          type: "ADD",
          id: props.items._id,
          name: props.items.name,
          price: finalPrice,
          qty: qty,
          size: size,
          img: props.items.img,
        });
        return
      }
      return
    }

    await dispatch({
      type: "ADD",
      id: props.items._id,
      name: props.items.name,
      price: finalPrice,
      qty: qty,
      size: size,
      img: props.items.img,
    });
  };
  let data = useCart();
  //price referencve for default value
  const priceRef = useRef();

  let finalPrice = qty * parseInt(options[size]);
  useEffect(() => {
    setSize(priceRef.current.value);
  }, []);

  return (
    <div>
      <div
        className="card mt-3"
        style={{ width: "18rem", maxHeight: "500px", overflow: "hidden" }}
      >
        <img
          src={props.items.img}
          alt="l"
          style={{ width: "100%", objectFit: "cover", height: "170px" }}
        />
        <div className="card-body">
          <h5 className="card-title bolder">{props.items.name} </h5>
          {/*<p className="card-text">{props.desc}</p>*/}

          <div className="center">
            <div className="innerCenter">
              <select
                className="custom-select"
                onChange={(e) => setQty(e.target.value)}
              >
                {Array.from(Array(6), (e, i) => {
                  return (
                    <option key={i + 1} value={i + 1} className="custom-option">
                      {i + 1}
                    </option>
                  );
                })}
              </select>

              <select
                className="custom-select"
                ref={priceRef}
                onChange={(e) => setSize(e.target.value)}
              >
                {priceOptions.map((item) => {
                  return (
                    <option key={item} value={item}>
                      {item}
                    </option>
                  );
                })}
              </select>
            </div>
            <div>
              {finalPrice && (
                <div className="totprice d-line h-100">Rs.{finalPrice}</div>
              )}
            </div>
          </div>
          <hr />
          <div className="cart">
            <button onClick={handleAddToCart}>
              Add to cart<i className="bi bi-cart"></i>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
