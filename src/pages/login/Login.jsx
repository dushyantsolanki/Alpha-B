import { TextField, InputAdornment, Button, Typography } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import GoogleIcon from "@mui/icons-material/Google";
import TwitterIcon from "@mui/icons-material/Twitter";
import FacebookIcon from "@mui/icons-material/FaceBook";

import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { authentication } from "../../firebase/authentication/authentication";

function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  useEffect(() => {}, [formData, showPassword]);
  // onChange Event handler
  const onChangeHandler = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };
  console.log(formData);
  // onSubmit Event Handler

  const onSubmitHandler = async (e) => {};

  const loginWithGoogle = async () => {
    const response = await authentication.login_with_google();
    console.log(response);
  };
  const loginWithTwitter = async () => {
    const response = await authentication.login_with_twitter();
    console.log(response);
  };
  const loginWithFacebook = async () => {
    const response = await authentication.login_with_facebook();
    console.log(response);
  };
  return (
    <div className="login-page-main">
      <Typography variant="h3" style={{ marginBottom: "2rem" }}>
        {" "}
        Login To Alpha B
      </Typography>
      <form className="login-form" onSubmit={onSubmitHandler}>
        <div className="login-email full-width">
          <TextField
            required
            type="email"
            // label="Email"
            name="email"
            fullWidth
            value={formData.email}
            onChange={onChangeHandler}
            placeholder="Email"
          />
        </div>
        <div className="login-password full-width">
          <TextField
            required
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            name="password"
            fullWidth
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={() => {
                      setShowPassword(!showPassword);
                    }}
                    edge="end"
                  >
                    {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
            value={formData.password}
            onChange={onChangeHandler}
          />
        </div>
        <div className="forgot-password ">
          <Typography>
            <Link style={{ textDecoration: "none" }} to="forgot-password">
              {" "}
              Forgot Password ?
            </Link>
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
