import React, { useState, useReducer } from "react";
import { ACTIONS } from "../App";

function Input() {
  const [value, setValue] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatchEvent({ type: ACTIONS.ADD_TASK, payload: { name: value } });
    setValue("");
  };
  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
      <button onClick={""}>send</button>
    </form>
  );
}

export default Input;
