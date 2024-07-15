import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { firestore } from "../../firebase";
import parse from "html-react-parser";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector, add, go_for_shop } from "../../redux";

function FullItem() {
  const navigate = useNavigate();
  const { ItemId } = useParams();
  const [data, setData] = useState({});
  const dispatch = useDispatch();
  const cartData = useSelector((state) => state.cartReducer);

  let ADD = (item) => {
    let itemss = cartData.find((cartItems) => cartItems.title === item.title);

    if (!itemss) {
      dispatch(add(item));
    }
  };

  const fatchBlog = async () => {
    const response = await firestore.fatchFullBlog(ItemId);
    if (response.status === true) {
      setData(response.payload);
    }
  };

  useEffect(() => {
    fatchBlog();
  }, []);

  return data ? (
    <>
      <div
        className="full-page-full"
        data-aos="zoom-in"
        style={{
          width: "100vw",
          height: "100vh",
          display: "flex",
          alineItems: "center",
          justifyContent: "center",
        }}
      >
        <div className="full-blog-page-main">
          <div className="full-product-left">
            <img
              src={data.imageUrl}
              style={{ width: "120rem", height: "30rem" }}
              alt="product-image"
            />
          </div>
          <div
            className="full-product-right"
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-start",
            }}
          >
            <div className="product-name">
              <b style={{ fontSize: "30px" }}> {data.title}</b>
              <hr />
            </div>
            <div className="product-discription">
              {!data.content ? "loading..." : parse(data.content)}
            </div>
            <div
              className="product-price"
              style={{ margin: "15px 0", color: "#AD0047" }}
            >
              <h2>
                {" "}
                <b>
                  {" "}
                  Price : ${!data.price ? "loading..." : parse(data.price)}
                </b>
              </h2>
            </div>
            <div
              className="btn-for-last"
              style={{
                display: "flex",
                justifyContent: "space-around",
                margin: "20px auto",
                gap: "1rem",
              }}
            >
              <button
                style={{
                  backgroundColor: "#AD0049",
                  color: "white",
                  padding: "5px 15px 5px 15px",
                  cursor: "pointer",
                }}
                onClick={() => {
                  navigate("/home");
                }}
              >
                Back To Page
              </button>

              <button
                style={{
                  backgroundColor: "#AD0049",
                  color: "white",
                  padding: "5px 15px 5px 15px",
                  cursor: "pointer",
                }}
                onClick={() => ADD(data)}
              >
                Add To Cart
              </button>

              <button
                style={{
                  backgroundColor: "#AD0049",
                  color: "white",
                  padding: "5px 15px 5px 15px",
                  cursor: "pointer",
                }}
                onClick={() => {
                  go_for_shop(data);
                  navigate("/home/payment");
                }}
              >
                Go For Shop
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  ) : (
    "loading"
  );
}

export default FullItem;
