import React from "react";
import parse from "html-react-parser";
import {
  useSelector,
  useDispatch,
  decrement,
  increment,
  remove,
} from "../../redux/index.js";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const navigate = useNavigate();
  let cartData = useSelector((state) => state.cartReducer);

  let dispatch = useDispatch();

  let REMOVE = (itemId) => {
    dispatch(remove(itemId));
  };

  let INCR = (itemId) => {
    dispatch(increment(itemId));
  };

  let DECR = (itemId) => {
    dispatch(decrement(itemId));
  };
  return (
    <div
      className="main-blog-page"
      data-aos="zoom-in"
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: "1rem",
        flexWrap: "wrap",
        margin: "20px 0",
      }}
    >
      {cartData.length === 0 ? (
        <h1 style={{ fontSize: "80px", fontFamily: "sans-serif" }}>
          <b> No items in cart</b>
        </h1>
      ) : (
        ""
      )}
      {cartData?.map((html, index) => {
        return (
          <div
            className="cart-item"
            data-aos="zoom-in"
            style={{
              width: "350px",
              height: "490px",
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
                style={{
                  textAlign: "left",
                  padding: "0.3rem 0.5rem 0.3rem 0.5rem ",
                }}
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
                <br />

                <div
                  className="hishab-vahivat"
                  style={{
                    marginTop: "5px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
                  <div className="price" style={{ color: "#AD0047" }}>
                    <b> ${parse(html.price)}</b>
                  </div>

                  <div className="add-to-cart-btn">
                    <button
                      style={{
                        backgroundColor: "#AD0047",
                        color: "#FFFF",
                        padding: "5px 10px 5px 10px",
                      }}
                      onClick={() => {
                        navigate("/home/payment");
                      }}
                    >
                      Go For Shop
                    </button>
                  </div>
                  <button
                    style={{
                      backgroundColor: "#AD0047",
                      color: "#FFFF",
                      padding: "5px ",
                    }}
                    onClick={() => REMOVE(html.id)}
                  >
                    RemoveToCart
                  </button>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Cart;
