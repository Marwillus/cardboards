import React, { useState } from "react";

function Item({ content }) {
  const [edit, setEdit] = useState(false);
  const [itemContent, setitemContent] = useState(content);

  const handleInput = (e) => {
    setitemContent(e.target.value);
  };

  return (
    <div onDoubleClick={() => setEdit(!edit)}>
      {edit ? (
        <div>
          <input type="text" value={itemContent} onChange={handleInput} />
          <input type="range" name="priority" id="" />
        </div>
      ) : (
        <span>{content}</span>
      )}
    </div>
  );
}

export default Item;
