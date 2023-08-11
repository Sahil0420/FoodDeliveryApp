import React, { useState, useEffect } from "react";
import Footer from "../components/Footer";
import Cardme from "../components/Cardme";
import "bootstrap-icons/font/bootstrap-icons.css";
import Navbar from "../components/Navbar";
// import Login form ./Login'
import "./css/home.css";

export default function Home() {
  const capitalize = (str) => str.charAt(0).toUpperCase() + str.slice(1);

  const [search, setSearch] = useState("");
  const [foodCat, setFoodCat] = useState([]);
  const [foodItem, setFoodItem] = useState([]);

  const loadData = async () => {
    try {
      let response = await fetch("http://localhost:4000/api/foodData", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });

      response = await response.json();
      setFoodItem(response[0]);
      setFoodCat(response[1]);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  return (
    <>
      <div>
        <Navbar />
        <div
          id="carouselExampleFade"
          className="carousel slide carousel-fade"
          data-bs-ride="carousel"
          style={{ objectFit: "fill" }}
        >
          <div className="carousel-inner " id="carousel">
            <div className="carousel-caption" style={{ zIndex: "10" }}>
              <div className="d-flex justify-content-center">
                <input
                  className="form-control me-2"
                  type="search"
                  placeholder="Search"
                  aria-label="Search"
                  value={search}
                  onChange={(e) => {
                    setSearch(e.target.value);
                  }}
                />
                {/*<button className="btn btn-outline-success text-white bg-success" type="submit">Search</button>*/}
              </div>
            </div>

            <div className="carousel-item active fixHeight">
              <img
                className="d-block w-100 "
                src="https://images.unsplash.com/photo-1604382354936-07c5d9983bd3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8cGl6emF8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=400&q=60"
                style={{ filter: "brightness(30%)" }}
                alt="First slide"
              />
            </div>

            <div className="carousel-item fixHeight">
              <img
                className="d-block w-100"
                src="https://images.unsplash.com/photo-1615557960916-5f4791effe9d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTZ8fGNoaWNrZW4lMjBmb29kfGVufDB8fDB8fHww&auto=format&fit=crop&w=400&q=60"
                style={{ filter: "brightness(30%)" }}
                alt="Second slide"
              />
            </div>

            <div className="carousel-item fixHeight">
              <img
                className="d-block w-100"
                src="https://images.unsplash.com/photo-1575739263357-efe1118edb47?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8b2xkJTIwbW9ua3xlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=400&q=60"
                style={{ filter: "brightness(30%)" }}
                alt="Third slide"
              />
            </div>

            {/* {//carousel next prev buttons} */}

            <button
              className="carousel-control-prev"
              type="button"
              data-bs-target="#carouselExampleFade"
              data-bs-slide=""
            >
              <span className="carousel-control-prev-icon" aria-hidden="true">
                {" "}
              </span>
              <span className="visually-hidden">Previous</span>
            </button>

            <button
              className="carousel-control-next"
              type="button"
              data-bs-target="#carouselExampleFade"
              data-bs-slide=""
            >
              <span className="carousel-control-next-icon" aria-hidden="true">
                {" "}
              </span>
              <span className="visually-hidden">Next</span>
            </button>
          </div>
        </div>
      </div>
      <div className="container">
        {foodCat.length > 0 ? (
          foodCat.map((data) => {
            return (
              <div className="row mb-3">
                <div key={data._id} className="fs-3 m-3">
                  {capitalize(data.categoryName)}
                </div>
                <hr />
                {foodItem.length > 0 ? (
                  foodItem
                    .filter(
                      (item) =>
                        item.CategoryName.toLowerCase() ===
                          data.categoryName.toLowerCase() &&
                        item.name
                          .toLowerCase()
                          .includes(search.toLocaleLowerCase())
                    )
                    .map((filterItems) => {
                      return (
                        <div
                          key={filterItems._id}
                          className="col-12 col-md-6 col-lg-3"
                        >
                          <Cardme
                            items={filterItems}
                            options={filterItems.options[0]}
                          ></Cardme>
                          {/*{Object.keys(filterItems.options[Object.keys(filterItems.options)]).map(item => {console.log(item)})}*/}
                          {/*{console.log(Object.keys(filterItems.options[Object.keys(filterItems.options)]))}*/}
                        </div>
                      );
                    })
                ) : (
                  <div>No such Data Found</div>
                )}
              </div>
            );
          })
        ) : (
          <div> </div>
        )}
      </div>
      <Footer />
    </>
  );
}
