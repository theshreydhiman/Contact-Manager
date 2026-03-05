
import React, { useState } from 'react';

const AddContact = (props) => {
  // Using useState to manage state in functional component
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  // Handling form submission
  const add = (e) => {
    e.preventDefault();
    if (name === '' || email === '') {
      alert('All the fields are mandatory!');
      return;
    }
    // Passing state to parent component
    props.addContactHandler({ name, email });
    // Resetting state after submission
    setName('');
    setEmail('');
    console.log(props);
    props.history.push('/');
  };

  return (
    <div className='ui main'>
      <h2>Add Contact</h2>
      <form className='ui form' onSubmit={add}>
        <div className='field'>
          <label>Name</label>
          <input
            type='text'
            name='name'
            placeholder='Name'
            value={name}
            // Updating state on input change
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className='field'>
          <label>Email</label>
          <input
            type='text'
            name='email'
            placeholder='Email'
            value={email}
            // Updating state on input change
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <button className='ui button blue'>Add</button>
      </form>
    </div>
  );
};

export default AddContact;
