import React from "react";

const LinkCard = ({ link: { date, to, from, clicks } }) => {
  return (
    <>
      <h2>Links</h2>
      <p>
        Your links:{" "}
        <a href={to} target="_blank_" rel="noopener noreferrer">
          {to}
        </a>
      </p>
      <p>
        From:{" "}
        <a href={from} target="_blank_" rel="noopener noreferrer">
          {from}
        </a>
      </p>
      <p>
        Count of clicks: <strong>{clicks}</strong>
      </p>
      <p>
        Data creating: <strong>{new Date(date).toDateString()}</strong>
      </p>
    </>
  );
};

export default LinkCard;
