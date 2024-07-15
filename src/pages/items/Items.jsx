import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import parse from "html-react-parser";
import { firestore } from "../../firebase";
import { useDispatch, useSelector, add } from "../../redux";
function Items() {
  const [data, setData] = useState([]);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const cartData = useSelector((state) => state.cartReducer);

  let ADD = (item) => {
    let itemss = cartData.find((cartItems) => cartItems.title === item.title);
    if (!itemss) {
      dispatch(add(item));
    }
    console.log("cart data : ", itemss);
    console.log("cart data : ", cartData);
  };
  const fetchData = async () => {
    const response = await firestore.receveDoc();
    // console.log(response.payload);
    if (response.status === true) {
      setData(response.payload);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <div
        className="main-blog-page"
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: "1rem",
          flexWrap: "wrap",
        }}
      >
        {data?.map((html, index) => {
          return (
            <div
              data-aos="zoom-in"
              key={index + 1}
              className="cart-item"
              style={{
                width: "350px",
                height: "500px",
                border: "2px solid grey",
                boxShadow: " 0 0 5px rgba(0 0 0 / 20%)",
                boxSizing: "border-box",
              }}
            >
              <div className="item-img">
                <img
                  src={html.imageUrl}
                  alt="item-imge"
                  width="350px"
                  onClick={() => {
                    navigate(`/home/items/${html.id}`);
                  }}
                />
                <div
                  className="item-content"
                  style={{ textAlign: "left", padding: "1rem" }}
                >
                  <div className="item-name">
                    <h2 style={{ fontSize: "20px" }}>
                      {" "}
                      <b> {parse(html.title)} </b>
                    </h2>
                  </div>
                  <div className="item-rating">
                    <h5 style={{ color: "#AD0047" }}>no rating yet</h5>
                  </div>
                  <div
                    className="hishab-vahivat"
                    style={{
                      marginTop: "20px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                    }}
                  >
                    <div className="price" style={{ color: "#AD0047" }}>
                      <b> ${parse(html.price)}/</b>
                      <sub>
                        <b style={{ fontSize: "15px" }}>kg</b>
                      </sub>
                    </div>
                    <div className="add-to-cart-btn">
                      <button
                        style={{
                          backgroundColor: "#AD0047",
                          color: "#FFFF",
                          padding: "5px 10px 5px 10px",
                        }}
                        onClick={() => ADD(html)}
                      >
                        <i
                          className="fa-solid fa-bag-shopping"
                          style={{ margin: "auto 5px auto auto" }}
                        ></i>
                        Add To Cart
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
}

export default Items;
