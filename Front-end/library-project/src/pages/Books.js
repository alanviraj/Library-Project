// Import packages
import * as React from "react";
import axios from "axios";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  TextField,
  DialogActions,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Grid,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { toast } from "react-toastify";
import { ClipLoader } from "react-spinners";
import { Link } from "react-router-dom";
import EditIcon from "@mui/icons-material/Edit";
import VisibilityIcon from "@mui/icons-material/Visibility";
//Import components
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";

function Books() {
  const [open, setOpen] = React.useState(false); // State to store open dialog variables
  const [openEdit, setOpenEdit] = React.useState(false); // State to store open dialog variables
  const [openView, setOpenView] = React.useState(false); // State to store open dialog variables
  const [name, setName] = React.useState(""); // State to store first name of author
  const [isbn, setISBN] = React.useState(""); // State to store first name of author
  const [author, setAuthor] = React.useState(""); // State to store first name of author
  const [books, setBooks] = React.useState([]); // State to store first name of author
  const [loading, setLoading] = React.useState(false); // State to store button loading
  const [selectedAuthor, setSelectedAuthor] = React.useState(""); // State to store the selected author
  const [authors, setAuthors] = React.useState([]); // State to store authors
  const [id, setId] = React.useState(""); // State to store id of author
  const [authorName, setAuthorName] = React.useState(""); // State to store id of author

  //Method to open the add author dialog
  const handleOpenDialog = () => {
    setOpen(true);
  };
  //Method to close the add author dialog
  const handleCloseDialog = () => {
    setOpen(false);
  };
  //Method to open the edit author dialog
  const handleCloseDialogEdit = () => {
    setOpenEdit(false);
  };
  //Method to close the add author dialog
  const handleCloseDialogView = () => {
    setOpenView(false);
  };
  //Method to handle first name value
  const handleNameChange = (event) => {
    setName(event.target.value);
  };
  //Method to handle last name value
  const handleISBNChange = (event) => {
    setISBN(event.target.value);
  };
  //Method to send the author details to the DB
  const handleSubmit = async () => {
    try {
      setLoading(true); // start the loading
      //POST request to save author
      const response = await axios.post("http://localhost:5000/book", {
        name: name,
        isbn: isbn,
        author: author,
      });
      if (response.data.status === "Success") {
        // The toast will disappear after 3000ms (3 seconds)
        toast.success("Book added successfully!", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: false,
          progress: undefined,
        });
        //close the dialog
        setOpen(false);
        await fetchBooks(); //reload the authos with the updated info
      } else {
        // Handle other status values if needed
        toast.error("Error occured, Please try again later!", {
          position: "top-right",
          autoClose: 3000, // The toast will disappear after 3000ms (3 seconds)
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: false,
          progress: undefined,
        });
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false); // Set loading to false regardless of the request result
    }
  };
  //Method to handle the individual author detail
  const handleViewDetails = async (id) => {
    try {
      const response = await axios.get(`http://localhost:5000/book/${id}`);
      setName(response.data.data.name); // Store author details in state
      setISBN(response.data.data.isbn); // Store author details in state
      setAuthor(response.data.data.author); // Store author details in state
      setId(response.data.data._id); // Store author details in state
      const response2 = await axios.get(
        `http://localhost:5000/author/${response.data.data.author}`
      );
      setAuthorName(
        `${response2.data.data.first_name} ${response2.data.data.last_name}`
      );
      setOpenView(true); //open the dialog
    } catch (error) {
      console.error("Error fetching author details:", error);
    }
  };
  const handleEditDetails = async (value) => {
    try {
      const response = await axios.get(`http://localhost:5000/book/${value}`);
      setName(response.data.data.name); // Store author details in state
      setISBN(response.data.data.isbn); // Store author details in state
      setAuthor(response.data.data.author); // Store author details in state
      setId(response.data.data._id); // Store author details in state
      setOpenEdit(true); //open the dialog
    } catch (error) {
      console.error("Error fetching author details:", error);
    }
  };
  //Method to handle the update function of the autho
  const handleSubmitEdit = async () => {
    try {
      setLoading(true); // start the loading
      //POST request to save author
      const response = await axios.put(`http://localhost:5000/book/${id}`, {
        name: name,
        isbn: isbn,
        author: author,
      });
      if (response.data.status === "Success") {
        // The toast will disappear after 3000ms (3 seconds)
        toast.success("Book updated successfully!", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: false,
          progress: undefined,
        });
        //close the dialog
        setOpenEdit(false);
        await fetchBooks(); //reload the authos with the updated info
      } else {
        // Handle other status values if needed
        toast.error("Error occured, Please try again later!", {
          position: "top-right",
          autoClose: 3000, // The toast will disappear after 3000ms (3 seconds)
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: false,
          progress: undefined,
        });
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false); // Set loading to false regardless of the request result
    }
  };
  //Reset the input fields
  const resetInputFields = () => {
    if (!open) {
      setName("");
      setISBN("");
      setAuthor("");
    }
    if (!openEdit) {
      setName("");
      setISBN("");
      setAuthor("");
      setId("");
    }
  };
  // Function to fetch authors from the backend API
  const fetchAuthors = async () => {
    try {
      const response = await axios.get("http://localhost:5000/author");
      setAuthors(response.data.data); // Store authors in state
    } catch (error) {
      console.error("Error fetching authors:", error);
    }
  };

  // Function to fetch authors from the backend API
  const fetchBooks = async () => {
    try {
      const response = await axios.get("http://localhost:5000/book");
      console.log(response);
      setBooks(response.data.data); // Store authors in state
    } catch (error) {
      console.error("Error fetching authors:", error);
    }
  };

  React.useEffect(
    () => {
      fetchAuthors(); // Call the fetchAuthors function initially
      fetchBooks(); // Call the fetchAuthors function initially
    },
    [],
    [],
    [open],
    [openEdit]
  );

  return (
    <div>
      <NavBar />
      {/* Show the back and add new author buttons */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginTop: "14px",
        }}
      >
        <Button
          color="inherit" // Use "inherit" to apply the default text color (black in your case)
          component={Link}
          to="/"
          sx={{
            bgcolor: "transparent", // Use "transparent" for transparent background
            "&:hover": {
              bgcolor: "#afb1b3", // Change to #393a3b on hover
            },
            "&:focus": {
              bgcolor: "#afb1b3", // Change to #393a3b on focus
            },
            textTransform: "none", // Preserve the original case of the text
          }}
        >
          <ArrowBackIcon sx={{ mr: 1 }} /> Go Back
        </Button>
        <Button
          variant="contained"
          color="primary"
          onClick={handleOpenDialog}
          sx={{
            bgcolor: "black",
            "&:hover": {
              bgcolor: "#393a3b", // Change to black on hover
            },
            "&:focus": {
              bgcolor: "#393a3b", // Change to black on focus
            },
          }}
        >
          Add Book
        </Button>
      </div>
      {/* Render dynamic cards for each author */}
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "space-between",
        }}
      >
        {books.map((book) => (
          <Card
            key={book._id}
            sx={{ maxWidth: 345, flex: "0 0 32%", marginTop: "14px" }}
          >
            <CardMedia
              sx={{ height: 180 }}
              image="/bookBlack1.jpg"
              title="green iguana"
            />
            <CardContent sx={{ height: 50 }}>
              <Typography gutterBottom variant="h6" component="div">
                {`${book.name}`}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                ISBN: {`${book.isbn}`}
              </Typography>
            </CardContent>
            <CardActions
              sx={{
                display: "flex",
                justifyContent: "flex-end", // Align buttons to the right
                gap: "4px", // Small gap between buttons
              }}
            >
              <Button
                size="small"
                style={{
                  color: "black",
                  "&:hover": { color: "#393a3b" },
                  textTransform: "none",
                  minWidth: 0,
                }}
                onClick={() => handleViewDetails(book._id)}
              >
                <VisibilityIcon />
              </Button>
              <Button
                size="small"
                style={{
                  color: "black",
                  "&:hover": { color: "#393a3b" },
                  textTransform: "none",
                  minWidth: 0,
                }}
                onClick={() => handleEditDetails(book._id)}
              >
                <EditIcon />
              </Button>
            </CardActions>
          </Card>
        ))}
      </div>
      {/* Add new book dialog */}
      <Dialog open={open} onClose={handleCloseDialog}>
        <DialogTitle>Add Book</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Please enter the first name and last name of the author:
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="bookName"
            label="Book name"
            fullWidth
            value={name}
            onChange={handleNameChange}
          />
          <TextField
            margin="dense"
            id="isbnNumber"
            label="ISBN Number"
            fullWidth
            value={isbn}
            onChange={handleISBNChange}
          />
          <FormControl fullWidth sx={{ marginTop: "10px" }}>
            <InputLabel>Author</InputLabel>
            <Select
              label="Author"
              value={author}
              onChange={(event) => setAuthor(event.target.value)}
              fullWidth
            >
              <MenuItem value="">Select an author</MenuItem>
              {authors.map((author) => (
                <MenuItem key={author._id} value={author._id}>
                  {`${author.first_name} ${author.last_name}`}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={handleCloseDialog}
            color="primary"
            style={{ color: "black", "&:hover": { color: "#393a3b" } }}
          >
            Cancel
          </Button>
          <Button
            onClick={handleSubmit}
            color="primary"
            disabled={loading}
            style={{ color: "black", "&:hover": { color: "#393a3b" } }}
          >
            {loading ? (
              <ClipLoader color="primary" loading size={16} />
            ) : (
              "Submit"
            )}
          </Button>
        </DialogActions>
      </Dialog>
      {/* Update book dialog */}
      <Dialog open={openEdit} onClose={handleCloseDialogEdit}>
        <DialogTitle>Add Book</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Please enter the first name and last name of the author:
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="bookName"
            label="Book name"
            fullWidth
            value={name}
            onChange={handleNameChange}
          />
          <TextField
            margin="dense"
            id="isbnNumber"
            label="ISBN Number"
            fullWidth
            value={isbn}
            onChange={handleISBNChange}
          />
          <FormControl fullWidth sx={{ marginTop: "10px" }}>
            <InputLabel>Author</InputLabel>
            <Select
              label="Author"
              value={author}
              onChange={(event) => setAuthor(event.target.value)}
              fullWidth
            >
              <MenuItem value="">Select an author</MenuItem>
              {authors.map((author) => (
                <MenuItem key={author._id} value={author._id}>
                  {`${author.first_name} ${author.last_name}`}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={handleCloseDialogEdit}
            color="primary"
            style={{ color: "black", "&:hover": { color: "#393a3b" } }}
          >
            Cancel
          </Button>
          <Button
            onClick={handleSubmitEdit}
            color="primary"
            disabled={loading}
            style={{ color: "black", "&:hover": { color: "#393a3b" } }}
          >
            {loading ? (
              <ClipLoader color="primary" loading size={16} />
            ) : (
              "Submit"
            )}
          </Button>
        </DialogActions>
      </Dialog>
      {/* View book details */}
      <Dialog
        open={openView}
        onClose={handleCloseDialogView}
        fullWidth
        maxWidth="sm"
      >
        <DialogTitle>Book Details</DialogTitle>
        <DialogContent>
          <Grid container spacing={2}>
            {/* Column 1: Book Image */}
            <Grid item xs={6}>
              <img
                src="/bookBlack2.jpg"
                alt="Book"
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
              />
            </Grid>

            {/* Column 2: Book Details */}
            <Grid item xs={6}>
              <Typography gutterBottom variant="h5">
                {name}
              </Typography>
              <Typography variant="body1" color="text.secondary">
                ISBN: {isbn}
              </Typography>
              <Typography variant="body1" color="text.secondary">
                Author: {authorName}{" "}
                {/* Replace authorName with the name of the selected author */}
              </Typography>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={handleCloseDialogView}
            color="primary"
            style={{ color: "black", "&:hover": { color: "#393a3b" } }}
          >
            Close
          </Button>
        </DialogActions>
      </Dialog>
      {/*navigation bar */}
      <Footer />
    </div>
  );
}

export default Books;
