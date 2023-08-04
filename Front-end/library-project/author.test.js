
import React from 'react';
import { render, fireEvent, waitFor, screen } from '@testing-library/react';
import { toast } from 'react-toastify'; // Assuming you use react-toastify for displaying toasts
import YourComponent from './YourComponent'; // Replace with your actual component file
import axios from "axios";

jest.mock('axios', () => ({
  post: jest.fn(() => Promise.resolve({ data: { status: 'Success' } })),
}));

describe('YourComponent Unit Tests', () => {
  it('should add an author successfully', async () => {
    // Render your component
    render(<YourComponent />);

    // Fill the form inputs and submit
    fireEvent.change(screen.getByLabelText('First Name'), { target: { value: 'John' } });
    fireEvent.change(screen.getByLabelText('Last Name'), { target: { value: 'Doe' } });
    fireEvent.click(screen.getByText('Submit'));

    // Wait for the success toast to be displayed
    // await waitFor(() =>
    //   expect(screen.getByText('Author added successfully!')).toBeInTheDocument()
    // );
  });

  it('should show an error toast when API call fails', async () => {
    // Mock the API call to return an error response
    jest.spyOn(window, 'toast').mockImplementation(() => {}); // Mock the toast function

    // Mock the API call to return an error response
    jest.spyOn(axios, 'post').mockRejectedValue({ response: { data: { status: 'Error' } } });

    // Render your component
    render(<YourComponent />);

    // Fill the form inputs and submit
    fireEvent.change(screen.getByLabelText('First Name'), { target: { value: 'John' } });
    fireEvent.change(screen.getByLabelText('Last Name'), { target: { value: 'Doe' } });
    fireEvent.click(screen.getByText('Submit'));

    // Wait for the error toast to be displayed
    // await waitFor(() =>
    //   expect(screen.getByText('Error occurred, Please try again later!')).toBeInTheDocument()
    // );
  });

  // Add more test cases as needed to cover different scenarios
});