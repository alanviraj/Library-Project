const express = require('express');
const router = express.Router();
/**Importing the model*/
const bookModel = require('../models/Books');
/**Importing the Send response helper*/
const sendResponse = require('../utils/res_helper');


/**Adding an book */
router.post("/book", async (req, res) => {
    try {
        console.log(req.body.name);
        const book = new bookModel({
            name: req.body.name,
            isbn: req.body.isbn,
            author: req.body.author,
        });
        const bookRes = await book.save();
        sendResponse({ res: res, code: 200, status: 'Success', data: bookRes, msg: 'Book added successfully!' });
    } catch (error) {
        console.log(error);
        sendResponse({ res: res, code: 400, status: 'Error', msg: error });
    }
});

/**Fetching all books */
router.get("/book", async (req, res) => {
    try {
        const bookRes = await bookModel.find();
        sendResponse({ res: res, code: 200, status: 'Success', data: bookRes, msg: 'Retrieving all books!' });
    } catch (error) {
        console.log(error);
        sendResponse({ res: res, code: 400, status: 'Error', msg: error });
    }
});

/**Update book */
router.put("/book/:_id", async (req, res) => {
    try {
        const book = await bookModel.findOne({ "_id": req.params._id }).then((obj) => {
            obj.name = req.body.name;
            obj.isbn = req.body.isbn;
            obj.author = req.body.author;
            obj.save().then((updatedResponse) => {
                sendResponse({ res: res, code: 200, status: 'Success', data: updatedResponse, msg: 'Book updated successfully!' });
            })
        });
    } catch (error) {
        console.log(error);
        sendResponse({ res: res, code: 400, status: 'Error', msg: error });
    }
});

/**Fetching book */
router.get("/book/:_id", async (req, res) => {
    try {
        const bookRes = await bookModel.findOne({ "_id": req.params._id });
        sendResponse({ res: res, code: 200, status: 'Success', data: bookRes, msg: 'Retrieving book' });
    } catch (error) {
        console.log(error);
        sendResponse({ res: res, code: 400, status: 'Error', msg: error });
    }
});

module.exports = router;