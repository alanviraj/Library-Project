import * as React from "react";
import { Link } from "react-router-dom";
import { AppBar, IconButton, Toolbar, Typography, Button } from "@mui/material";
import LocalLibraryIcon from "@mui/icons-material/LocalLibrary";

function NavBar() {
  return (
    <React.Fragment>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="logo"
          >
            <LocalLibraryIcon />
          </IconButton>
          <Typography variant="h6" component="div">
            American Library
          </Typography>
          <div style={{ marginLeft: "auto" }}>
            <Button
              variant="text"
              color="inherit"
              component={Link}
              to="/author"
            >
              Author
            </Button>
            <Button variant="text" color="inherit" component={Link} to="/books">
              Books
            </Button>
          </div>
        </Toolbar>
      </AppBar>
    </React.Fragment>
  );
}

export default NavBar;
