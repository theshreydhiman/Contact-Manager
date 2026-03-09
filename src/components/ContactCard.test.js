import React from 'react';
import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import ContactCard from './ContactCard';

describe('ContactCard component', () => {
  it('renders contact information', () => {
    const contact = { id: 1, name: 'John Doe', email: 'john@example.com' };
    const { getByText } = render(
      <MemoryRouter>
        <ContactCard contact={contact} clickHander={() => {}} />
      </MemoryRouter>
    );
    expect(getByText('John Doe')).toBeInTheDocument();
    expect(getByText('john@example.com')).toBeInTheDocument();
  });

  it('calls clickHander when delete button is clicked', () => {
    const clickHander = jest.fn();
    const contact = { id: 1, name: 'John Doe', email: 'john@example.com' };
    const { getByTestId } = render(
      <MemoryRouter>
        <ContactCard contact={contact} clickHander={clickHander} />
      </MemoryRouter>
    );
    const deleteButton = getByTestId('delete-button');
    fireEvent.click(deleteButton);
    expect(clickHander).toHaveBeenCalledTimes(1);
    expect(clickHander).toHaveBeenCalledWith(1);
  });
});