import { TextField, InputAdornment, Button, Typography } from "@mui/material";
import {
  IconButton,
  VisibilityIcon,
  VisibilityOffIcon,
  MailIcon,
  GoogleIcon,
  TwitterIcon,
  FacebookIcon,
} from "../../icon/icon.js";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { authentication } from "../../firebase/";
import { toast } from "../../components/";

import { useDispatch, currentUser } from "../../redux";

function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loginData, setloginData] = useState({
    email: "",
    password: "",
    showPassword: false,
  });

  // onChange Event handler
  const onChangeHandler = (e) => {
    setloginData({
      ...loginData,
      [e.target.name]: e.target.value,
    });
  };

  // onSubmit Event Handler

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    const response = await authentication.login_with_email_password(loginData);
    if (response.status === true) {
      const { displayName, email, emailVerified, photoURL, uid } =
        response.payload;
      dispatch(
        currentUser({ displayName, email, emailVerified, photoURL, uid })
      );
      const isEmailVerify = await authentication.email_varify_checker(
        response.payload?.emailVerified
      );

      isEmailVerify
        ? navigate("/home")
        : toast.error(`Your email is not verify `);
    }
    //
    else {
      toast.error(`${response.message}`);
    }
  };

  const loginWithGoogle = async () => {
    const response = await authentication.login_with_google();
    if (response.status === true) {
      const { displayName, email, emailVerified, photoURL, uid } =
        response.payload;
      dispatch(
        currentUser({ displayName, email, emailVerified, photoURL, uid })
      );
    }
  };
  const loginWithTwitter = async () => {
    const response = await authentication.login_with_twitter();
    if (response.status === true) {
      const { displayName, email, emailVerified, photoURL, uid } =
        response.payload;
      dispatch(
        currentUser({ displayName, email, emailVerified, photoURL, uid })
      );
    }
  };
  const loginWithFacebook = async () => {
    const response = await authentication.login_with_facebook();
    if (response.status === true) {
      const { displayName, email, emailVerified, photoURL, uid } =
        response.payload;
      dispatch(
        currentUser({ displayName, email, emailVerified, photoURL, uid })
      );
    }
  };
  return (
    <div className="login-page-main" data-aos="zoom-in">
      <Typography variant="h3" style={{ margin: "0.1rem 0 2rem 0 " }}>
        {" "}
        Alpha Bee
      </Typography>
      <form className="login-form" onSubmit={onSubmitHandler}>
        <div className="login-email full-width">
          <TextField
            required
            type="email"
            // label="Email"
            name="email"
            fullWidth
            value={loginData.email}
            onChange={onChangeHandler}
            placeholder="Email"
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton edge="end">
                    <MailIcon />
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
        </div>
        <div className="login-password full-width">
          <TextField
            required
            type={loginData.showPassword ? "text" : "password"}
            placeholder="Password"
            name="password"
            fullWidth
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={() => {
                      setloginData((prev) => ({
                        ...prev,
                        showPassword: !prev.showPassword,
                      }));
                    }}
                    edge="end"
                  >
                    {loginData.showPassword ? (
                      <VisibilityOffIcon />
                    ) : (
                      <VisibilityIcon />
                    )}
                  </IconButton>
                </InputAdornment>
              ),
            }}
            value={loginData.password}
            onChange={onChangeHandler}
          />
        </div>
        <div className="forgot-password ">
          <Typography>
            <Button
              onClick={() => {
                navigate("/auth/forgot-password");
              }}
              style={{ textDecoration: "none" }}
              to="forgot-password"
            >
              {" "}
              Forgot Password ?
            </Button>
          </Typography>
        </div>
        <div className="login-btn full-width">
          <Button type="submit" variant="contained" fullWidth>
            Log In
          </Button>
        </div>
      </form>
      <div className=" login-text full-width">
        <Typography component="div">
          {" "}
          <p style={{ fontSize: "13px" }}>
            You have a already register ?{" "}
            <span>
              {" "}
              <Link to="/auth/" style={{ textDecoration: "none" }}>
                {" "}
                Register
              </Link>
            </span>
          </p>{" "}
        </Typography>
      </div>
      <div className="login-social">
        <hr />
        <div className="social-btn">
          <div className="login-google ">
            <Button
              variant="outlined"
              color="primary"
              startIcon={<GoogleIcon />}
              onClick={loginWithGoogle}
            >
              Google
            </Button>
          </div>
          <div className="login-twitter ">
            <Button
              variant="outlined"
              color="primary"
              startIcon={<TwitterIcon />}
              onClick={loginWithTwitter}
            >
              Twitter
            </Button>
          </div>
          <div className="login-facebook">
            <Button
              variant="outlined"
              color="primary"
              startIcon={<FacebookIcon />}
              onClick={loginWithFacebook}
            >
              Facebook
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
