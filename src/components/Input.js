import React, { useState } from "react";
import { ACTIONS } from "../reducer/reducer";

function Input({ dispatch }) {
  const [value, setValue] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch({ type: ACTIONS.ADD_TASK, payload: { name: value } });
    setValue("");
  };
  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
      <button type="submit">send</button>
    </form>
  );
}

export default Input;
