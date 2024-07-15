import { Grid, Box, Typography } from "@mui/material";
import { Container } from "postcss";
import { Outlet } from "react-router-dom";

function AuthLayout() {
  return (
    <>
      <Grid container sx={{ width: "100vw", height: "100vh" }}>
        <Grid
          item
          md={4}
          sx={{
            height: { xs: "50%", sm: "30%", md: "100%" },
            width: { sx: "100vw", sm: "100vw", md: "100%" },
          }}
          sm={12}
        >
          {" "}
          <img
            src="https://images.unsplash.com/photo-1718414738167-0dd5de626229?h=2154.857142857143&amp;w=1200&amp;auto=format&amp;fit=crop&amp;q=60&amp;ixid=M3wxMjA3fDB8MXxhbGx8fHx8fHx8fHwxNzIxMDEyNjA0fA&amp;ixlib=rb-4.0.3"
            loading="lazy"
            style={{
              aspectRratio: 700 / 1257,
              objectFit: "cover",
              width: "100vw",
              height: "100%",
            }}
          />
        </Grid>
        <Grid
          container
          md={8}
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            alignContent: "center",
            height: {
              sm: "100%",
              md: "90%",
            },
          }}
        >
          <Outlet />
        </Grid>
      </Grid>
    </>
  );
}

export default AuthLayout;
