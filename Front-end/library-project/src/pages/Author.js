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
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { toast } from "react-toastify";
import { ClipLoader } from "react-spinners";
import { Link } from "react-router-dom";
import EditIcon from "@mui/icons-material/Edit";

//Import components
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";

function Author() {
  const [open, setOpen] = React.useState(false); // State to store open dialog variables
  const [openEdit, setOpenEdit] = React.useState(false); // State to store open dialog variables
  const [first_name, setFirstName] = React.useState(""); // State to store first name of author
  const [last_name, setLastName] = React.useState(""); // State to store last name of author
  const [loading, setLoading] = React.useState(false); // State to store button loading
  const [authors, setAuthors] = React.useState([]); // State to store authors
  const [id, setId] = React.useState(""); // State to store id of author

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
  //Method to handle first name value
  const handleFirstNameChange = (event) => {
    setFirstName(event.target.value);
  };
  //Method to handle last name value
  const handleLastNameChange = (event) => {
    setLastName(event.target.value);
  };
  //Method to send the author details to the DB
  const handleSubmit = async () => {
    try {
      setLoading(true); // start the loading
      //POST request to save author
      const response = await axios.post("https://viraj-lib.onrender.com/author", {
        first_name: first_name,
        last_name: last_name,
      });
      if (response.data.status === "Success") {
        // The toast will disappear after 3000ms (3 seconds)
        toast.success("Author added successfully!", {
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
  //Method to handle the update function of the autho
  const handleSubmitEdit = async () => {
    try {
      setLoading(true); // Start the loading
      //PUT request to edit author
      const response = await axios.put(`https://viraj-lib.onrender.com/author/${id}`, {
        first_name: first_name,
        last_name: last_name,
      });
      if (response.data.status === "Success") {
        // The toast will disappear after 3000ms (3 seconds)
        toast.success("Author updated successfully!", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: false,
          progress: undefined,
        });
        setOpenEdit(false); //close the dialog
        await fetchAuthors(); //reload the authos with the updated info
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
      const response = await axios.get(`https://viraj-lib.onrender.com/author/${id}`);
      setFirstName(response.data.data.first_name); // Store author details in state
      setLastName(response.data.data.last_name); // Store author details in state
      setId(response.data.data._id); // Store author details in state
      setOpenEdit(true); //open the dialog
    } catch (error) {
      console.error("Error fetching author details:", error);
    }
  };
  //Reset the input fields
  const resetInputFields = () => {
    if (!open) {
      setFirstName("");
      setLastName("");
    }
    if (!openEdit) {
      setFirstName("");
      setLastName("");
      setId("");
    }
  };
  // Function to fetch authors from the backend API
  const fetchAuthors = async () => {
    try {
      const response = await axios.get("https://viraj-lib.onrender.com/author");
      setAuthors(response.data.data); // Store authors in state
    } catch (error) {
      console.error("Error fetching authors:", error);
    }
  };

  React.useEffect(
    () => {
      resetInputFields(); // Call the resetInputFields function initially
      fetchAuthors(); // Call the fetchAuthors function initially
    },
    [open],
    [openEdit],
    []
  );

  return (
    <div>
      {/*navigation bar */}
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
          Add Author
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
        {authors.map((author) => (
          <Card
            key={author._id}
            sx={{ maxWidth: 345, flex: "0 0 32%", marginTop: "14px" }}
          >
            <CardMedia
              sx={{ height: 180 }}
              image="/author.jpg"
              title="green iguana"
            />
            <CardContent>
              <Typography gutterBottom variant="h6" component="div">
                {`${author.first_name} ${author.last_name}`}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Read books, and increase and update your knowledge!
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
                  marginLeft: "auto",
                  color: "black",
                  "&:hover": { color: "#393a3b" },
                  textTransform: "none", // Remove any text transformation
                  minWidth: 0, // Ensure the button doesn't have a minimum width
                }}
                onClick={() => handleViewDetails(author._id)}
              >
                <EditIcon />
              </Button>
            </CardActions>
          </Card>
        ))}
      </div>
      {/* Add new author dialog */}
      <Dialog open={open} onClose={handleCloseDialog}>
        <DialogTitle>Add Author</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Please enter the first name and last name of the author:
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="firstName"
            label="First Name"
            fullWidth
            value={first_name}
            onChange={handleFirstNameChange}
          />
          <TextField
            margin="dense"
            id="lastName"
            label="Last Name"
            fullWidth
            value={last_name}
            onChange={handleLastNameChange}
          />
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

      {/* Edit Author Dialog */}
      <Dialog open={openEdit} onClose={handleCloseDialogEdit}>
        <DialogTitle>Edit Author</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Please enter the first name and last name of the author:
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="firstName"
            label="First Name"
            fullWidth
            value={first_name}
            onChange={handleFirstNameChange}
          />
          <TextField
            margin="dense"
            id="lastName"
            label="Last Name"
            fullWidth
            value={last_name}
            onChange={handleLastNameChange}
          />
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
      {/*navigation bar */}
      <Footer />
    </div>
  );
}

export default Author;
