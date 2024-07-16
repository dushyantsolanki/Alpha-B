import React, { useState } from "react";
import parse from "html-react-parser";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "../../redux";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

import { Card, CardContent, Typography, Grid } from "@mui/material";
import { go_for_shop } from "../../redux";
import { product_clear } from "../../redux/reducers/shopReducer";
const steps = ["Item Quentity", "Home Address", "Pay", "Completed"];

function QuantityStep({ nextStep }) {
  const [quantity, setQuantity] = useState(1);
  const [shopingData, setShopingData] = useState([]);

  let shopData = useSelector((prev) => prev.shopReducer);

  console.log("shopData", shopData);

  return (
    <Box componet="div">
      <div className="product-list-layout">
        {shopData.length !== 0
          ? shopData.map((item) => {
              return (
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-around",
                  }}
                >
                  <img src={item.imageUrl} width="10%" alt="" />
                  <div className="name">
                    <b> {parse(item.title)}</b>
                  </div>
                  <div className="quntity">
                    {quantity == 0
                      ? parse(item.price)
                      : parse(item.price) * quantity}
                  </div>
                </div>
              );
            })
          : ""}
      </div>
      <div
        className="quentity"
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <TextField
          label="Quantity (kg)"
          variant="outlined"
          value={quantity}
          onChange={(e) => {
            setQuantity(e.target.value);
          }}
          sx={{ marginRight: "1rem" }}
        />
        <Button variant="contained" onClick={nextStep}>
          Next
        </Button>
      </div>
    </Box>
  );
}

function AddressStep({ nextStep, prevStep }) {
  const [address, setAddress] = useState("");
  const handleSubmit = (event) => {
    event.preventDefault();
    alert("adress saved");
  };

  return (
    <Card>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          Delivery Address
        </Typography>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                label="Full Name"
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                label="Address Line 1"
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField fullWidth label="Address Line 2" variant="outlined" />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField required fullWidth label="City" variant="outlined" />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField required fullWidth label="State" variant="outlined" />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                label="Postal Code"
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                label="Country"
                variant="outlined"
              />
            </Grid>

            <Grid item xs={6}>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                fullWidth
              >
                Save Address
              </Button>
            </Grid>
            <Grid item xs={3}>
              <Button fullWidth variant="contained" onClick={prevStep}>
                Back
              </Button>
            </Grid>
            <Grid item xs={3}>
              <Button fullWidth variant="contained" onClick={nextStep}>
                Next
              </Button>
            </Grid>
          </Grid>
        </form>
      </CardContent>
    </Card>
  );
}

function PaymentStep({ nextStep, prevStep }) {
  const [cardNumber, setCardNumber] = useState("");
  const handleSubmit = (event) => {
    event.preventDefault();
    alert("Payment detailed done");
  };

  return (
    <>
      <Card>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            Payment Details
          </Typography>
          <form onSubmit={handleSubmit}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  label="Cardholder Name"
                  variant="outlined"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  label="Card Number"
                  variant="outlined"
                  inputProps={{ maxLength: 16 }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  label="Expiry Date (MM/YY)"
                  variant="outlined"
                  inputProps={{ maxLength: 5 }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  label="CVV"
                  variant="outlined"
                  inputProps={{ maxLength: 3 }}
                />
              </Grid>

              <Grid item xs={6}>
                {" "}
                <Button
                  fullWidth
                  variant="contained"
                  onClick={prevStep}
                  sx={{ marginRight: "1rem" }}
                >
                  Back
                </Button>
              </Grid>
              <Grid item xs={6}>
                <Button fullWidth variant="contained" onClick={nextStep}>
                  Pay
                </Button>
              </Grid>
            </Grid>
          </form>
        </CardContent>
      </Card>
    </>
  );
}

function CompleteStep() {
  let dispatch = useDispatch();
  dispatch(product_clear());
  return <Box> Thank you for your purchase!</Box>;
}
const Payment = () => {
  let shoping_data = useSelector((state) => state.shopReducer);
  const navigate = useNavigate();
  const [activeStep, setActiveStep] = useState(0);

  const nextStep = () => setActiveStep((prev) => prev + 1);
  const prevStep = () => setActiveStep((prev) => prev - 1);
  return (
    <>
      <Box sx={{ width: "100%", height: "100%", marginTop: "2rem" }}>
        <Stepper activeStep={activeStep} alternativeLabel>
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>
        <Box sx={{ marginTop: "2rem" }}>
          {activeStep === 0 && <QuantityStep nextStep={nextStep} />}
          {activeStep === 1 && (
            <AddressStep nextStep={nextStep} prevStep={prevStep} />
          )}
          {activeStep === 2 && (
            <PaymentStep nextStep={nextStep} prevStep={prevStep} />
          )}
          {activeStep === 3 && <CompleteStep />}
        </Box>
      </Box>
    </>
  );
};

export default Payment;
