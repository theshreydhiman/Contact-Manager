import React from 'react';
import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import ContactDetail from './ContactDetail';

describe('ContactDetail component', () => {
  it('renders contact details', () => {
    const contact = { name: 'John Doe', email: 'john@example.com' };
    const { getByText } = render(
      <MemoryRouter initialEntries={[{ pathname: '/contact/1', state: { contact } }]}>
        <ContactDetail />
      </MemoryRouter>
    );
    expect(getByText('John Doe')).toBeInTheDocument();
    expect(getByText('john@example.com')).toBeInTheDocument();
  });

  it('renders back to contact list button', () => {
    const contact = { name: 'John Doe', email: 'john@example.com' };
    const { getByText } = render(
      <MemoryRouter initialEntries={[{ pathname: '/contact/1', state: { contact } }]}>
        <ContactDetail />
      </MemoryRouter>
    );
    expect(getByText('Back to Contact List')).toBeInTheDocument();
  });
});