import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button, TextField, Typography, InputAdornment } from "@mui/material";
import {
  IconButton,
  VisibilityIcon,
  VisibilityOffIcon,
  MailIcon,
  AccountCircleIcon,
} from "../../icon/icon";
import { toast, toastConfig, ConfettiExplosion } from "../../components/";
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
      toast.error(`${res.message}`, toastConfig);
    } else {
      if (formData.userName.length > 0) {
        setFormData((prev) => ({ ...prev, isValidUser: res.payload }));
      } else {
        setFormData((prev) => ({ ...prev, isValidUser: false }));
      }
    }
  };
  useEffect(() => {
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

      toast.success(`${signupUserRes.message}`, toastConfig);

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
      toast.error(`${signupUserRes.message}`, toastConfig);
    }
  };
  return (
    <div className="signup-page">
      <form className="signup-form" onSubmit={onSubmitHandler}>
        <Typography variant="h3" style={{ marginBottom: "2rem" }}>
          {" "}
          Register To Alpha B
        </Typography>

        <div className="username full-width">
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
        </div>
        <div className="fullname full-width">
          <div className="firstName half-width">
            {" "}
            <TextField
              required
              type="text"
              placeholder="First Name"
              name="firstName"
              fullWidth
              value={formData.firstName}
              onChange={onChangeHadler}
            />
          </div>
          <div className="lastName half-width ">
            {" "}
            <TextField
              required
              type="text"
              placeholder="Last Name"
              name="lastName"
              fullWidth
              value={formData.lastName}
              onChange={onChangeHadler}
            />
          </div>
        </div>
        <div className="email full-width">
          <TextField
            required
            id="outline-required"
            type="email"
            placeholder="Email"
            name="email"
            fullWidth
            value={formData.email}
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
        </div>

        <div className="password full-width">
          {" "}
          <TextField
            required
            type={formData.showPassword ? "text" : "password"}
            placeholder="Password"
            name="password"
            fullWidth
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
        </div>
        <div className="register-btn full-width">
          <Button
            type="submit"
            variant="contained"
            disabled={formData.isValidUser}
            fullWidth
          >
            {" "}
            Register
          </Button>
        </div>
        <div className="login-text">
          <Typography component="div">
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
        </div>
      </form>
    </div>
  );
}
export default Signup;
