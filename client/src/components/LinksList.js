import React from "react";
import { Link } from "react-router-dom";

const LinksList = ({ links }) => {
  if (!links.length) return <p className="center">No links yet!</p>;

  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>№</th>
            <th>Orginal</th>
            <th>Reduced</th>
            <th>Open</th>
          </tr>
        </thead>

        <tbody>
          {links.map(({ from, to, _id }, index) => {
            return (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{from}</td>
                <td>{to}</td>
                <td>
                  <Link className="btn" to={`/detail/${_id}`}>
                    open
                  </Link>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default LinksList;
