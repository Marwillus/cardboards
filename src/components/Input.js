// import React, { useState } from "react";

function Input({ setItemCategory, itemText, setItemText, onSubmit }) {
  const onChange = (e) => {
    if (e.target.name === "input-text") {
      setItemText(e.target.value);
    } else if (e.target.id === "category") {
      setItemCategory(e.target.value.split("-")[1]);
    }
  };

  return (
    <form className="card input">
      <select name="Kategorie" id="category" onChange={(e) => onChange(e)}>
        <option defaultValue="">Kategorie</option>
        <option value="category-0">Likes</option>
        <option value="category-1">Wishes</option>
        <option value="category-2">Issues</option>
      </select>
      <input
        name="input-text"
        className="text-input"
        type="text"
        required={true}
        onChange={onChange}
        value={itemText}
      />
      <input
        type="button"
        value="Absenden"
        className="submit-btn"
        onClick={onSubmit}
      />
    </form>
  );
}

export default Input;
