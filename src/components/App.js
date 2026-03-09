
import React, { useState, useEffect } from "react"; 
import { BrowserRouter, Switch, Route } from "react-router-dom"; 
import { uuid } from "uuidv4"; 
import "./App.css"; 
import Header from "./Header"; 
import AddContact from "./AddContact"; 
import ContactList from "./ContactList"; 
import ContactDetail from "./ContactDetail"; 

function App() { 
  const LOCAL_STORAGE_KEY = "contacts"; 
  // Use lazy initialization for useState to prevent data loss
  const [contacts, setContacts] = useState(() => {
    const stored = localStorage.getItem(LOCAL_STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  });

  const addContactHandler = (contact) => {
    console.log(contact);
    setContacts([...contacts, { id: uuid(), ...contact }]);
  };

  const removeContactHandler = (id) => {
    const newContactList = contacts.filter((contact) => {
      return contact.id !== id;
    });

    setContacts(newContactList);
  };

  // Remove the load effect as it's no longer needed with lazy initialization
  // useEffect(() => {
  //   const retriveContacts = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY));
  //   if (retriveContacts) setContacts(retriveContacts);
  // }, []);

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(contacts));
  }, [contacts]);

  return (
    <div className="ui container">
      <BrowserRouter>
        <Header />
        <Switch>
          <Route
            path="/"
            exact
            render={(props) => (
              <ContactList
                {...props}
                contacts={contacts}
                getContactId={removeContactHandler}
              />
            )}
          />
          <Route
            path="/add"
            render={(props) => (
              <AddContact {...props} addContactHandler={addContactHandler} />
            )}
          />

          <Route path="/contact/:id" component={ContactDetail} />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
