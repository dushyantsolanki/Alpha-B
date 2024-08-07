import { TextField, InputAdornment, Button, Typography } from "@mui/material";
import { IconButton, MailIcon } from "../../icon/icon.js";
import React, { useState } from "react";
import { authentication } from "../../firebase";
import { toast } from "../../components/";
import { useNavigate } from "react-router-dom";

function ForgotPassword() {
  const [email, setEmail] = useState();
  const navigate = useNavigate();
  const onSubmitHandler = async (e) => {
    e.preventDefault();

    // send link for password reset

    const response = await authentication.password_reset(email);
    if (response.status === true) {
      toast.success(`${response.message}`);
      setEmail("");
    } else {
      toast.error(`${response.message}`);
    }
    // at the end email input clear
  };
  return (
    <div className="forgot-password-main" data-aos="zoom-in">
      <form onSubmit={onSubmitHandler}>
        <Typography variant="h4">Forgot Password</Typography>
        <TextField
          required
          type="email"
          name="email"
          fullWidth
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
          }}
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
          style={{ margin: "3rem 0 1.5rem 0 " }}
        />
        <Button type="submit" variant="outlined" disabled={!email}>
          Send Link
        </Button>
        <Button
          sx={{ marginLeft: "2rem" }}
          type="submit"
          variant="outlined"
          onClick={() => {
            navigate("/auth/login");
          }}
        >
          Login
        </Button>
      </form>
    </div>
  );
}

export default ForgotPassword;
