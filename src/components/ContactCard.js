
import React from "react";

const ContactCard = (props) => {
  const { id, name, email } = props.contact;

  const handleDelete = (event) => {
    // Check if the event is a keyboard event
    if (event.type === 'keydown' && event.key !== 'Enter' && event.key !== ' ') {
      return;
    }
    props.clickHander(id);
  };

  return (
    <div className="item">
      <img className="ui avatar image" src="user.png" alt="user" />
      <div className="content">
        <Link
          to={{ pathname: `/contact/${id}`, state: { contact: props.contact } }}
        >
          <div className="header">{name}</div>
          <div>{email}</div>
        </Link>
      </div>
      <button
        className="trash alternate outline icon"
        style={{ color: "red", marginTop: "7px" }}
        onClick={handleDelete}
        aria-label="Delete contact"
        tabIndex={0}
        onKeyDown={handleDelete}
      ></button>
    </div>
  );
};

export default ContactCard;
