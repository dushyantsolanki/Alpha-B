import React, { useState, useMemo } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Button,
  TextField,
  Typography,
  InputAdornment,
  Grid,
  Box,
} from "@mui/material";
import {
  IconButton,
  VisibilityIcon,
  VisibilityOffIcon,
  MailIcon,
  AccountCircleIcon,
} from "../../icon/icon";
import { toast } from "../../components/";
import { firestore, authentication } from "../../firebase/";

function Signup() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    userName: "",
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    showPassword: false,
    isValidUser: false,
  });

  const onChangeHadler = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const user = async () => {
    const res = await firestore.retriveDoc(formData);

    if (res.status === false) {
      toast.error(`${res.message}`);
    } else {
      if (formData.userName.length > 0) {
        setFormData((prev) => ({ ...prev, isValidUser: res.payload }));
      } else {
        setFormData((prev) => ({ ...prev, isValidUser: false }));
      }
    }
  };
  useMemo(() => {
    user();
    console.log("inside effect");
  }, [formData.userName]);

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    // send data to authentication :
    const signupUserRes = await authentication.signupUser(formData);
    if (signupUserRes.status === true) {
      // send data to the firebase firestore :
      await firestore.registerDoc(
        {
          ...formData,
        },
        signupUserRes.payload
      );
      // At the end form field clear :

      toast.success(`${signupUserRes.message}`);

      setFormData({
        userName: "",
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        showPassword: false,
        isValidUser: false,
      });
    } else {
      toast.error(`${signupUserRes.message}`);
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
            xs: "95%",
            sm: "95%",
            md: "95%",
          },
          padding: "1rem",
          display: "felx",
          alineItems: "center",
          justifyContent: "center",
        }}
        md={8}
        sm={12}
        xs={12}
      >
        <Grid item md={12} sm={12} xs={12}>
          <Typography
            component="h1"
            variant="h1"
            sx={{
              margin: {
                xs: "0rem 0 1rem 0",
                sm: "0rem 0 1rem 0",
                md: "2rem 0 1rem 0",
              },
              fontSize: {
                xs: "2.5rem",
                md: "5rem",
                sm: "3.5rem",
              },
            }}
          >
            Welcome{" "}
          </Typography>
        </Grid>

        <Grid item md={12} sm={12} xs={12}>
          <TextField
            required
            type="text"
            placeholder="Username"
            name="userName"
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton edge="end">
                    <AccountCircleIcon />
                  </IconButton>
                </InputAdornment>
              ),
            }}
            fullWidth
            value={formData.userName}
            onChange={onChangeHadler}
            error={formData.isValidUser}
            helperText={
              formData.isValidUser && `${formData.userName} is already use`
            }
          />
        </Grid>
        <Grid item md={6} sm={12} xs={12}>
          <TextField
            required
            type="text"
            placeholder="First Name"
            name="firstName"
            fullWidth
            value={formData.firstName}
            onChange={onChangeHadler}
            sx={{
              padding: {
                sm: "0rem 0rem 0rem 0rem",
                md: "0 1rem 0 0",
                xs: "0rem 0rem 0rem 0rem",
              },
            }}
          />
        </Grid>
        <Grid item md={6} sm={12} xs={12}>
          <TextField
            required
            type="text"
            placeholder="Last Name"
            name="lastName"
            fullWidth
            value={formData.lastName}
            onChange={onChangeHadler}
            sx={{
              padding: {
                sm: "0rem 0rem 0rem 0rem",
                md: "0 1rem 0 0",
                xs: "0rem 0rem 0rem 0rem",
              },
            }}
          />
        </Grid>
        <Grid item md={12} sm={12} xs={12}>
          <TextField
            required
            id="outline-required"
            type="email"
            placeholder="Email"
            name="email"
            fullWidth
            value={formData.email}
            // sx={{
            //   padding: {
            //     sm: "1rem 0rem 1rem 0rem",
            //     md: "0 1rem 0 0",
            //     xs: "1rem 0rem 1rem 0rem",
            //   },
            // }}
            onChange={onChangeHadler}
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
        <Grid item md={12} sm={12} xs={12}>
          <TextField
            required
            type={formData.showPassword ? "text" : "password"}
            placeholder="Password"
            name="password"
            fullWidth
            // sx={{
            //   padding: {
            //     sm: "1rem 0rem 1rem 0rem",
            //     md: "0 1rem 0 0",
            //     xs: "1rem  0rem 1rem 0rem",
            //   },
            // }}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={() => {
                      setFormData((prev) => ({
                        ...prev,
                        showPassword: !prev.showPassword,
                      }));
                    }}
                    edge="end"
                  >
                    {formData.showPassword ? (
                      <VisibilityOffIcon />
                    ) : (
                      <VisibilityIcon />
                    )}
                  </IconButton>
                </InputAdornment>
              ),
            }}
            value={formData.password}
            onChange={onChangeHadler}
          />
        </Grid>
        <Grid item md={12} sm={12} xs={12}>
          <Button
            type="submit"
            variant="contained"
            disabled={formData.isValidUser}
            fullWidth
          >
            {" "}
            Register
          </Button>{" "}
        </Grid>

        <Grid item sm={12} xs={12}>
          <Typography
            component="div"
            sx={{
              padding: {
                sm: "1rem 0rem 1rem 0rem",
                md: "0 1rem 0 0",
                xs: "1rem 1rem 1rem 1rem",
              },
            }}
          >
            {" "}
            <p style={{ fontSize: "13px" }}>
              You have a already registered ?{" "}
              <span>
                {" "}
                <Link to="/auth/login" style={{ textDecoration: "none" }}>
                  {" "}
                  <b> Login</b>
                </Link>
              </span>
            </p>{" "}
          </Typography>
        </Grid>
      </Grid>
    </form>
  );
}
export default Signup;
