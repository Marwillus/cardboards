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
    <form onSubmit={handleSubmit} className="task-input">
      <input
        type="text"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="...add item"
      />
    </form>
  );
}

export default Input;
