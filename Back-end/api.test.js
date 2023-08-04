// api.test.js

const request = require("supertest");
const axios = require("axios");
const MockAdapter = require("axios-mock-adapter");
const app = require("./routes/author_route"); // Replace with your actual Express app file
const authorModel = require("./models/Author"); // Replace with your actual author model file

describe("Backend API Unit Tests", () => {
  let mock;

  beforeEach(() => {
    mock = new MockAdapter(axios);
  });

  afterEach(() => {
    mock.restore();
  });

  it("should add an author successfully", async () => {
    // Mock the authorModel.save() method to return a sample author object
    const expectedAuthor = {
      _id: "12345",
      first_name: "John",
      last_name: "Doe",
    };
    jest.spyOn(authorModel.prototype, "save").mockResolvedValue(expectedAuthor);

    // Mock the POST request to /author and set the expected response
    const expectedResponse = {
      status: "Success",
      data: expectedAuthor,
      msg: "Author added successfully!",
    };
    mock.onPost("http://localhost:5000/author").reply(200, expectedResponse);

    // Make the POST request to the Express app endpoint
    const response = await request(app).post("/author").send({
      first_name: "John",
      last_name: "Doe",
    });

    // Assert the response
    expect(response.status).toBe(200);
    expect(response.body).toEqual(expectedResponse);
  });

  it("should handle error when adding an author", async () => {
    // Mock the authorModel.save() method to throw an error
    const errorMessage = "Database error";
    jest
      .spyOn(authorModel.prototype, "save")
      .mockRejectedValue(new Error(errorMessage));

    // Mock the POST request to /author and set the expected error response
    const expectedErrorResponse = {
      status: "Error",
      msg: errorMessage,
    };
    mock
      .onPost("http://localhost:5000/author")
      .reply(400, expectedErrorResponse);

    // Make the POST request to the Express app endpoint
    const response = await request(app).post("/author").send({
      first_name: "John",
      last_name: "Doe",
    });

    // Assert the error response
    expect(response.status).toBe(400);
    expect(response.body).toEqual(expectedErrorResponse);
  });

  // Add more test cases as needed to cover different scenarios
});
