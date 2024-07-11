import React from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { Avatar } from "@mui/material";
import Badge from "@mui/material/Badge";
import { styled } from "@mui/material/styles";
import IconButton from "@mui/material/IconButton";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";

import { useDispatch, useSelector, logout } from "../../redux";
import { authentication } from "../../firebase/";

const Navbar = () => {
  const StyledBadge = styled(Badge)(({ theme }) => ({
    "& .MuiBadge-badge": {
      right: -3,
      top: 13,
      border: `2px solid ${theme.palette.background.paper}`,
      padding: "0 4px",
      color: "white",
    },
  }));
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userData = useSelector((state) => state.authReducer.userData.payload);
  const noOfItem = useSelector((state) => state.cartReducer);

  const handleLogout = async () => {
    await authentication.logout();
    dispatch(logout());
  };
  return (
    <>
      <div className="home-page">
        <header>
          <div className="navbar">
            <div className="org-logo">
              <h1> BioGroveMarket</h1>
            </div>
            {/* <div className="search-btn-section" style={{ display: "block" }}>
              <input
                type="search"
                style={{ position: "relative", width: "550px" }}
              />
              <button style={{ position: "absolute", left: "895px" }}>
                <i
                  class="fa-solid fa-magnifying-glass"
                  style={{ color: "blue " }}
                ></i>
              </button>
            </div> */}
            <div className="nav-content-list">
              <nav>
                <ul>
                  <li>
                    {" "}
                    <NavLink to="/home">Home</NavLink>{" "}
                  </li>
                  <li>
                    {" "}
                    <NavLink to="/home/contact">Contact Us </NavLink>
                  </li>

                  <IconButton
                    aria-label="cart"
                    onClick={() => {
                      navigate("/home/cart");
                    }}
                  >
                    <StyledBadge badgeContent={noOfItem.length} color="primary">
                      <ShoppingCartIcon style={{ color: "white" }} />
                    </StyledBadge>
                  </IconButton>

                  <Avatar
                    style={{ cursor: "pointer" }}
                    alt="User"
                    src={
                      userData?.photoURL ||
                      "https://img.freepik.com/free-psd/3d-illustration-human-avatar-profile_23-2150671116.jpg?w=740&t=st=1705175078~exp=1705175678~hmac=62501d338b7243623047fc72e9a7ee10ed847d4c78fcf1af5d29528b60aa4f30"
                    }
                    onClick={() => {
                      navigate("/dashboard/profile");
                      console.log("hello");
                    }}
                  />
                  {userData ? (
                    <button
                      style={{
                        border: "2px solid white",
                        padding: "5px 20px 5px 20px",
                      }}
                      onClick={handleLogout}
                    >
                      Logout
                    </button>
                  ) : (
                    ""
                  )}
                </ul>
                <div className="btn">
                  <i
                    className="fa-solid fa-bars"
                    style={{ fontSize: "25px" }}
                    id="openHambarger"
                  ></i>
                  <i
                    className="fa-solid fa-xmark"
                    style={{ fontSize: "25px" }}
                    id="closeHambarger"
                  >
                    {" "}
                  </i>
                </div>
              </nav>
            </div>
          </div>
          <div id="responsive-right-nav">
            <nav className="res-nav">
              <ul>
                <li>Home</li>
                <li>Contact Us</li>
                <i class="fa-solid fa-bag-shopping"></i>
              </ul>
            </nav>
          </div>
        </header>
      </div>
    </>
  );
};

export default Navbar;
