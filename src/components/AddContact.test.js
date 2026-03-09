import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import AddContact from './AddContact';

describe('AddContact component', () => {
  it('renders form with input fields and submit button', () => {
    const { getByPlaceholderText, getByText } = render(
      <MemoryRouter>
        <AddContact addContactHandler={() => {}} history={{ push: () => {} }} />
      </MemoryRouter>
    );
    expect(getByPlaceholderText('Name')).toBeInTheDocument();
    expect(getByPlaceholderText('Email')).toBeInTheDocument();
    expect(getByText('Add')).toBeInTheDocument();
  });

  it('calls addContactHandler when form is submitted', () => {
    const addContactHandler = jest.fn();
    const { getByPlaceholderText, getByText } = render(
      <MemoryRouter>
        <AddContact addContactHandler={addContactHandler} history={{ push: () => {} }} />
      </MemoryRouter>
    );
    const nameInput = getByPlaceholderText('Name');
    const emailInput = getByPlaceholderText('Email');
    const submitButton = getByText('Add');
    fireEvent.change(nameInput, { target: { value: 'John Doe' } });
    fireEvent.change(emailInput, { target: { value: 'john@example.com' } });
    fireEvent.click(submitButton);
    expect(addContactHandler).toHaveBeenCalledTimes(1);
    expect(addContactHandler).toHaveBeenCalledWith({ name: 'John Doe', email: 'john@example.com' });
  });

  it('displays error message when form is submitted with empty fields', () => {
    const { getByText } = render(
      <MemoryRouter>
        <AddContact addContactHandler={() => {}} history={{ push: () => {} }} />
      </MemoryRouter>
    );
    const submitButton = getByText('Add');
    fireEvent.click(submitButton);
    expect(getByText('ALl the fields are mandatory!')).toBeInTheDocument();
  });
});