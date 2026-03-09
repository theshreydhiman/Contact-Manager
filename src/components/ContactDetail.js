
import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import user from '../images/user.jpg';

const ContactDetail = (props) => {
  const history = useHistory();
  const contact = props.location.state && props.location.state.contact;

  // If contact is not found, redirect to contact list
  if (!contact) {
    history.push('/');
    return null;
  }

  const { name, email } = contact;

  return (
    <div className='main'>
      <div className='ui card centered'>
        <div className='image'>
          <img src={user} alt='user' />
        </div>
        <div className='content'>
          <div className='header'>{name}</div>
          <div className='description'>{email}</div>
        </div>
      </div>
      <div className='center-div'>
        <Link to='/'>
          <button className='ui button blue center'>
            Back to Contact List
          </button>
        </Link>
      </div>
    </div>
  );
};

export default ContactDetail;
