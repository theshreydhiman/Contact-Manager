import React from "react";
import { Link, useParams } from "react-router-dom";
import user from "../images/user.jpg";

const ContactDetail = () => {
  const { id } = useParams();
  const contact = JSON.parse(localStorage.getItem('contacts')).find((contact) => contact.id === id);
  return (
    <div className="main">
      <div className="ui card centered">
        <div className="image">
          <img src={user} alt="user" />
        </div>
        <div className="content">
          <div className="header">{contact.name}</div>
          <div className="description">{contact.email}</div>
        </div>
      </div>
      <div className="center-div">
        <Link to="/">
          <button className="ui button blue center">
            Back to Contact List
          </button>
        </Link>
      </div>
    </div>
  );
};

export default ContactDetail;