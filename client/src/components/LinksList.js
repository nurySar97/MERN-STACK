import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { useHttp } from "../hooks/http.hook";
import { AuthContext } from "../context/AuthContext";
import { useMessage } from "../hooks/message.hook";

const LinksList = ({ links, setLinks }) => {
  const { request, loading } = useHttp();
  const { token } = useContext(AuthContext);
  const message = useMessage();

  if (!links.length) return <p className="center">No links yet!</p>;

  const onHandleDelete = async (linkId) => {
    try {
      const data = await request(
        "/api/link/delete",
        "POST",
        { linkId },
        {
          Authorization: `Bearer ${token}`,
        }
      );
      setLinks(data.links);
      message(data.message);
    } catch (e) {
      console.error(e);
    }
  };
  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>№</th>
            <th>Orginal</th>
            <th>Reduced</th>
            <th>Open</th>
            <th>Delete</th>
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
                <td>
                  <button
                    className="btn"
                    onClick={onHandleDelete.bind(null, _id)}
                    disabled={loading}
                  >
                    Delete
                  </button>
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
