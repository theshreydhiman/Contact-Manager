
import React, { useState, useEffect } from "react"; 
import { BrowserRouter, Routes, Route } from "react-router-dom"; 
import { v4 as uuidv4 } from "uuid"; 
import "./App.css"; 
import Header from "./Header"; 
import AddContact from "./AddContact"; 
import ContactList from "./ContactList"; 
import ContactDetail from "./ContactDetail"; 
import NotFound from './NotFound'; // Import the new NotFound component
import Login from './Login'; 
import Register from './Register';

function App() {
  const LOCAL_STORAGE_KEY = "contacts"; 
  const [contacts, setContacts] = useState([]); 
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Update addContactHandler to use functional state update
  const addContactHandler = (contact) => {
    console.log(contact);
    setContacts(prevContacts => [...prevContacts, { id: uuidv4(), ...contact }]);
  };

  const removeContactHandler = (id) => {
    const newContactList = contacts.filter((contact) => {
      return contact.id !== id;
    });

    setContacts(newContactList);
  };

  useEffect(() => {
    const retrieveContacts = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY));
    if (retrieveContacts) setContacts(retrieveContacts);
  }, []);

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(contacts));
  }, [contacts]);

  const loginHandler = () => {
    setIsLoggedIn(true);
  };

  const logoutHandler = () => {
    setIsLoggedIn(false);
  };

  return (
    <div className="ui container">
      <BrowserRouter>
        <Header />
        <Routes>
          <Route
            path="/" 
            element={<ContactList contacts={contacts} getContactId={removeContactHandler} />}
          />
          <Route
            path="/add" 
            element={<AddContact addContactHandler={addContactHandler} />}
          />

          <Route path="/contact/:id" element={<ContactDetail />} />
        
          <Route path="/contact/:id" component={ContactDetail} />
          <Route component={NotFound} /> // Add a catch-all route for unmatched URLs
          <Route path="/login" component={Login} />
          <Route path="/register" component={Register} />
          <Route path="/logout" render={(props) => <div onClick={logoutHandler}>Logout</div>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
