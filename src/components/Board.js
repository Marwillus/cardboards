import React from "react";

import Item from "./Item";
import { Draggable } from "react-beautiful-dnd";

const getItemStyle = (isDragging, draggableStyle) => ({
  // change background colour if dragging
  background: isDragging ? "lightgreen" : "grey",

  // styles we need to apply on draggables
  ...draggableStyle,
});

function Board({ title, data, handleLike, boardNr }) {
  // console.log(data);
  return (
    <div className="card board">
      <h3 className="board-title">{title}</h3>
      {data.map((item, index) => {
        return (
          <Draggable
            key={item.id}
            draggableId={item.id.toString()}
            index={index}
          >
            {(provided, snapshot) => (
              <div
                {...provided.draggableProps}
                {...provided.dragHandleProps}
                ref={provided.innerRef}
                style={getItemStyle(
                  snapshot.isDragging,
                  provided.draggableProps.style
                )}
              >
                <Item
                  key={item.id}
                  id={item.id}
                  text={item.value}
                  likes={item.likes}
                  liked={item.liked}
                  handleLike={handleLike}
                  boardNr={boardNr}
                />
              </div>
            )}
          </Draggable>
        );
      })}
    </div>
  );
}

export default Board;
