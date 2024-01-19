import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button, TextField, Typography } from "@mui/material";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { firestore } from "../../firebase/firestore/firestore";
import { toast } from "react-toastify";
import { toastConfig } from "../../components/react-toastify/toastConfig";
import { authentication } from "../../firebase/authentication/authentication";

function Signup() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [isValidUser, setIsValidUser] = useState(false);
  const [formData, setFormData] = useState({
    userName: "",
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });

  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };
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
        setIsValidUser(res.payload);
      } else {
        setIsValidUser(false);
      }
    }
  };
  useEffect(() => {
    user();
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
      navigate("/auth/login");
    }
    //
    else {
      toast.error(`${signupUserRes.message}`, toastConfig);
    }

    // At the end form field clear :
    setFormData({
      userName: "",
      firstName: "",
      lastName: "",
      email: "",
      password: "",
    });
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
            fullWidth
            value={formData.userName}
            onChange={onChangeHadler}
            error={isValidUser}
            helperText={isValidUser && `${formData.userName} is already use`}
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
          />
        </div>

        <div className="password full-width">
          {" "}
          <TextField
            required
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            name="password"
            fullWidth
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={handleTogglePassword} edge="end">
                    {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
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
            disabled={isValidUser}
            fullWidth
          >
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
