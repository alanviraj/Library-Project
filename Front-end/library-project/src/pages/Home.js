import React from "react";
import NavBar from "../components/NavBar";
import { Container, Typography, Box, Button } from "@mui/material";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Link } from "react-router-dom";
import Footer from "../components/Footer";

function Home() {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
  };

  return (
    <div>
      <NavBar />
      <Container maxWidth="md">
        <Box mt={4} textAlign="center">
          <Typography variant="h4" component="h1" gutterBottom>
            Welcome to our American Library
          </Typography>
          <Typography variant="body1" component="p" gutterBottom>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam a
            elit vel mauris bibendum tincidunt. In vestibulum tortor vel lacus
            aliquet, sit amet viverra urna eleifend.
          </Typography>
          <Button
            variant="contained"
            sx={{
              bgcolor: "black",
              "&:hover": {
                bgcolor: "#393a3b", // Change to black on hover
              },
              "&:focus": {
                bgcolor: "#393a3b", // Change to black on focus
              },
            }}
            size="large"
            style={{ marginTop: "20px" }}
            component={Link}
            to="/books"
          >
            Explore Books
          </Button>
        </Box>
        {/* Full-width Slideshow */}
        <Slider {...settings} style={{ marginTop: "60px" }}>
          <div>
            <img
              src="book1.jpg"
              alt="Book 1"
              style={{ width: "100%", height: "auto" }}
            />
          </div>
          <div>
            <img
              src="book1.jpg"
              alt="Book 2"
              style={{ width: "100%", height: "auto" }}
            />
          </div>
          <div>
            <img
              src="book1.jpg"
              alt="Book 3"
              style={{ width: "100%", height: "auto" }}
            />
          </div>
        </Slider>
      </Container>
      {/*navigation bar */}
      <Footer />
    </div>
  );
}

export default Home;
