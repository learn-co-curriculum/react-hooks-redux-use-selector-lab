import React, { useState } from "react";
import { useDispatch } from "react-redux";

function UserInput() {
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    username: "",
    hometown: "",
  });

  function handleInputChange(event) {
    setFormData({
      ...formData,
      [event.target.id]: event.target.value,
    });
  }

  function handleOnSubmit(event) {
    event.preventDefault();
    dispatch({ type: "users/add", payload: formData });
  }

  return (
    <form onSubmit={handleOnSubmit}>
      <p>
        <input
          type="text"
          id="username"
          onChange={handleInputChange}
          placeholder="username"
        />
      </p>
      <p>
        <input
          type="text"
          id="hometown"
          onChange={handleInputChange}
          placeholder="hometown"
        />
      </p>
      <input type="submit" />
    </form>
  );
}

export default UserInput;
