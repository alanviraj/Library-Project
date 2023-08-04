const express = require("express");
const router = express.Router();
/**Importing the model*/
const authorModel = require("../models/Author");
/**Importing the Send response helper*/
const sendResponse = require("../utils/res_helper");
const yup = require("yup");

// Validate the request body against the schema
const schema = yup
  .object()
  .required()
  .noUnknown(true, "additional fields are denied")
  .shape({
    first_name: yup
      .string()
      .trim()
      .strict(true)
      .typeError("first_name must be a string")
      .required("first_name is required"),
    last_name: yup
      .string()
      .trim()
      .strict(true)
      .typeError("last_name must be a string")
      .required("last_name is required"),
  });
/**Adding an author */
router.post("/author", async (req, res) => {
  try {
    await schema.validate(req.body);
    const author = new authorModel({
      first_name: req.body.first_name,
      last_name: req.body.last_name,
    });
    const authorRes = await author.save();
    sendResponse({
      res: res,
      code: 200,
      status: "Success",
      data: authorRes,
      msg: "Author added successfully!",
    });
  } catch (error) {
    console.log(error);
    sendResponse({ res: res, code: 400, status: "Error", msg: error });
  }
});

/**Fetching all authors */
router.get("/author", async (req, res) => {
  try {
    const authorRes = await authorModel.find();
    sendResponse({
      res: res,
      code: 200,
      status: "Success",
      data: authorRes,
      msg: "Retrieving all authors!",
    });
  } catch (error) {
    console.log(error);
    sendResponse({ res: res, code: 400, status: "Error", msg: error });
  }
});

/**Update author */
router.put("/author/:_id", async (req, res) => {
  try {
    const author = await authorModel
      .findOne({ _id: req.params._id })
      .then((obj) => {
        obj.first_name = req.body.first_name;
        obj.last_name = req.body.last_name;
        obj.save().then((updatedResponse) => {
          sendResponse({
            res: res,
            code: 200,
            status: "Success",
            data: updatedResponse,
            msg: "Author updated successfully!",
          });
        });
      });
  } catch (error) {
    console.log(error);
    sendResponse({ res: res, code: 400, status: "Error", msg: error });
  }
});

/**Fetching author */
router.get("/author/:_id", async (req, res) => {
  try {
    const authorRes = await authorModel.findOne({ _id: req.params._id });
    sendResponse({
      res: res,
      code: 200,
      status: "Success",
      data: authorRes,
      msg: "Retrieving author",
    });
  } catch (error) {
    console.log(error);
    sendResponse({ res: res, code: 400, status: "Error", msg: error });
  }
});

module.exports = router;
