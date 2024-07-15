import {
  TextField,
  InputAdornment,
  Button,
  Typography,
  Grid,
} from "@mui/material";
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
    <form
      onSubmit={onSubmitHandler}
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        justifyContent: "center",
      }}
      data-aos="zoom-in"
    >
      <Grid
        container
        sx={{
          height: {
            xs: "100%",
            sm: "100%",
            md: "95%",
          },
          padding: "1rem",
          display: "flex",
          alineItems: "center",
          justifyContent: "center",
          alignContent: "space-evenly",
        }}
        md={8}
        sm={12}
        xs={12}
      >
        <Grid item md={12} sm={12} xs={12}>
          {" "}
          <Typography variant="h3" style={{ margin: "0.1rem 0 2rem 0 " }}>
            Alpha Bee
          </Typography>
        </Grid>

        <Grid item md={12} sm={12} xs={12}>
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
        </Grid>
        
        <Grid item md={12} xs={12} sm={12}>
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
        </Grid>

        <Grid
          item
          md={5}
          xs={12}
          sm={12}
          sx={{ margin: { md: "0 2rem 0 2rem", xs: "0", sm: "0" } }}
        >
          <Button type="submit" variant="contained" fullWidth>
            Log In
          </Button>
        </Grid>
        <Grid md={5} xs={12} sm={12}>
          <Button
            variant="contained"
            fullWidth
            onClick={() => {
              navigate("/auth/");
            }}
          >
            {" "}
            Signup
          </Button>
        </Grid>
        <Grid
          container
          sm={12}
          md={12}
          xs={12}
          sx={{
            display: "flex",
            alineItems: "center",
            justifyContent: "space-around",
          }}
        >
          <Grid item md={4}>
            {" "}
            <Button
              variant="outlined"
              color="primary"
              startIcon={<FacebookIcon />}
              onClick={loginWithFacebook}
            >
              Facebook
            </Button>
          </Grid>
          <Grid item md={4}>
            {" "}
            <Button
              variant="outlined"
              color="primary"
              startIcon={<GoogleIcon />}
              onClick={loginWithGoogle}
            >
              Google
            </Button>
          </Grid>
          <Grid item md={4}>
            <Button
              variant="outlined"
              color="primary"
              startIcon={<TwitterIcon />}
              onClick={loginWithTwitter}
            >
              Twitter
            </Button>
          </Grid>
        </Grid>
        <Grid item xs={12} md={12} sm={12}>
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
        </Grid>
      </Grid>
    </form>
  );
}

export default Login;
