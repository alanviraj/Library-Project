import * as React from "react";
import { Typography, AppBar, Toolbar } from "@mui/material";

function Footer() {
  return (
    <AppBar
      position="static"
      color="primary"
      style={{ top: "auto", bottom: 0, marginTop: "70px" }}
      sx={{ bgcolor: "black" }}
    >
      <Toolbar
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Typography variant="body1" color="inherit">
          &copy; {new Date().getFullYear()} American Library. All rights
          reserved.
        </Typography>
      </Toolbar>
    </AppBar>
  );
}

export default Footer;
