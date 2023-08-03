import "./App.css";
import * as React from "react";
import { Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Author from "./pages/Author";
import Books from "./pages/Books";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/author" element={<Author />} />
        <Route path="/books" element={<Books />} />
      </Routes>
      <ToastContainer
        position="top-right"
        autoClose={3000} // The toast will disappear after 3000ms (3 seconds)
        hideProgressBar
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </div>
  );
}

export default App;
