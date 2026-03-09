import React from 'react';
import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import ContactList from './ContactList';

describe('ContactList component', () => {
  it('renders contact list with add contact button', () => {
    const { getByText } = render(
      <MemoryRouter>
        <ContactList contacts={[]} getContactId={() => {}} />
      </MemoryRouter>
    );
    expect(getByText('Contact List')).toBeInTheDocument();
    expect(getByText('Add Contact')).toBeInTheDocument();
  });

  it('renders contact cards for each contact in the list', () => {
    const contacts = [
      { id: 1, name: 'John Doe', email: 'john@example.com' },
      { id: 2, name: 'Jane Doe', email: 'jane@example.com' },
    ];
    const { getAllByTestId } = render(
      <MemoryRouter>
        <ContactList contacts={contacts} getContactId={() => {}} />
      </MemoryRouter>
    );
    const contactCards = getAllByTestId('contact-card');
    expect(contactCards).toHaveLength(2);
  });

  it('calls getContactId when delete button is clicked', () => {
    const getContactId = jest.fn();
    const contacts = [
      { id: 1, name: 'John Doe', email: 'john@example.com' },
    ];
    const { getByTestId } = render(
      <MemoryRouter>
        <ContactList contacts={contacts} getContactId={getContactId} />
      </MemoryRouter>
    );
    const deleteButton = getByTestId('delete-button');
    fireEvent.click(deleteButton);
    expect(getContactId).toHaveBeenCalledTimes(1);
    expect(getContactId).toHaveBeenCalledWith(1);
  });
});