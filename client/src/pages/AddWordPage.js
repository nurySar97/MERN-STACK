import React, { useContext, useState } from "react";
import { useHttp } from "../hooks/http.hook";
import { AuthContext } from "../context/AuthContext";

const AddWordPage = () => {
  const [word, setWord] = useState("");
  const { request } = useHttp();
  const { token } = useContext(AuthContext);

  const onHandleSubmit = async (e) => {
    try {
      e.preventDefault();
      const data = await request(
        "/api/word/add",
        "POST",
        { word },
        {
          Authorization: `Bearer ${token}`,
        }
      );
      console.log(data);
      setWord("");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="row">
      <form className="col s12" onSubmit={onHandleSubmit}>
        <div className="row">
          <div className="input-field col s6">
            <input
              value={word}
              onChange={(e) => setWord(e.target.value)}
              id="addWord"
              type="text"
              className="validate"
            />
            <label htmlFor="addWord">Enter a new word!</label>
            <button className="btn" type="submit">
              Save
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default AddWordPage;
