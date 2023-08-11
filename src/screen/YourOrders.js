import React , {useEffect, useState} from "react";
import Navbar from "../components/Navbar";

export default function YourOrders() {

  const [result,setResult] = useState('')

  const ordersData = async (req, res) => {
    try {
      let userEmail = localStorage.getItem('userEmail')
      let response = await fetch("http://localhost:4000/api/yourOrders", {
        method :"POST",
        headers: {
          "Content-Type": "application/json",
        },
        body:JSON.stringify({
          'email': userEmail
        })
      });

      response = await response.json();
      await setResult(response)
      console.log(`result ----> ${result}`)
    }catch(err){
      console.log(`error y in ordersData api ${err}`);
    }
  };

  useEffect(()=>{
    ordersData()
  },[])

  return (
    <div>
      <Navbar></Navbar>
      <div className="container">
        <div className="row">
          {
            result !== {} ? Array(result).map(data=>{
              return (
                data.userOrderData ? 
                data.userOrderData.order_data.slice(0).reverse().map(item => {
                  return (
                    item.map((arrayData)=>{
                      return (
                        <div>
                          {
                            arrayData.Order_date ? 
                              <div className="m-auto mt-5">
                                {data = arrayData.Order_date}
                                <hr/>
                              </div> :
                              <div className="col-12 col-md-6 col-lg-3">
                                <div className="card mt-3">
                                  <img src={arrayData.img} className="card-img-top" alt="..." />  
                                  <div className="card-body">
                                    <h5 className="card-title">{arrayData.name}</h5>
                                    <div className="conatiner w-100 p-0" style={{ height : '38px'}}>
                                      <span className="m-1">{arrayData.qty}</span>
                                      <span className="m-1">{arrayData.size}</span>
                                      <span className="m-1">{data}</span>
                                      <div className="d-inline ms-2 h-100 w-20 fs-5">
                                        Rs. {arrayData.price}/-
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                          }
                        </div>
                      )
                    })
                  )
                }) : " "
              )
            }) : " "
          }
        </div>
      </div>
    </div>
  );
}