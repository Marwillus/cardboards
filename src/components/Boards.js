import React from "react";
import Item from "./Item";
import hole from "../images/BlackHole.png";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import { ACTIONS } from "../reducer/reducer";

function Boards({ columns, dispatch }) {
  const onDragEnd = (result, columns) => {
    if (!result.destination) return;
    const { source, destination } = result;

    if (destination.droppableId === "delete-area") {
      const column = columns[source.droppableId];
      const copiedItems = [...column.items];
      copiedItems.splice(source.index, 1);
      dispatch({
        type: ACTIONS.DELETE_TASK,
        payload: {
          sourceID: source.droppableId,
          sourceItems: copiedItems,
        },
      });
    } else if (source.droppableId !== destination.droppableId) {
      const sourceColumn = columns[source.droppableId];
      const destColumn = columns[destination.droppableId];
      const sourceItems = [...sourceColumn.items];
      const destItems = [...destColumn.items];
      const [removed] = sourceItems.splice(source.index, 1);
      destItems.splice(destination.index, 0, removed);
      dispatch({
        type: ACTIONS.SHIFT_DIFF_COL,
        payload: {
          sourceID: source.droppableId,
          destinationID: destination.droppableId,
          sourceItems: sourceItems,
          destItems: destItems,
        },
      });
    } else {
      const column = columns[source.droppableId];
      const copiedItems = [...column.items];
      const [removed] = copiedItems.splice(source.index, 1);
      copiedItems.splice(destination.index, 0, removed);
      dispatch({
        type: ACTIONS.SHIFT_SAME_COL,
        payload: {
          sourceID: source.droppableId,
          sourceItems: copiedItems,
        },
      });
    }
  };

  return (
    <div className="board-container">
      <DragDropContext onDragEnd={(result) => onDragEnd(result, columns)}>
        {Object.entries(columns).map(([columnId, column], index) => {
          return (
            <div key={columnId} className="board">
              <h2>{column.name}</h2>
              <div>
                <Droppable droppableId={columnId} key={columnId}>
                  {(provided, snapshot) => {
                    return (
                      <div
                        className="drop-area"
                        {...provided.droppableProps}
                        ref={provided.innerRef}
                        style={{
                          background: snapshot.isDraggingOver
                            ? "#d7f1d7"
                            : "#ffffff",
                        }}
                      >
                        {column.items.map((item, index) => {
                          return (
                            <Draggable
                              key={item.id}
                              draggableId={item.id}
                              index={index}
                            >
                              {(provided, snapshot) => {
                                return (
                                  <div
                                    className="item"
                                    ref={provided.innerRef}
                                    {...provided.draggableProps}
                                    {...provided.dragHandleProps}
                                    style={{
                                      backgroundColor: snapshot.isDragging
                                        ? "#eeeeee"
                                        : "white",
                                      ...provided.draggableProps.style,
                                    }}
                                  >
                                    <Item content={item.content} />
                                  </div>
                                );
                              }}
                            </Draggable>
                          );
                        })}
                        {provided.placeholder}
                      </div>
                    );
                  }}
                </Droppable>
              </div>
            </div>
          );
        })}
        <Droppable droppableId="delete-area">
          {(provided, snapshot) => (
            <img
              id="delete-area"
              src={hole}
              alt="delete"
              ref={provided.innerRef}
              {...provided.droppableProps}
              style={{
                animation:
                  snapshot.isDraggingOver &&
                  "rotate reverse infinite 4s linear",
                height: snapshot.isDraggingOver && "350px",
                width: snapshot.isDraggingOver && "350px",
              }}
            />
          )}
        </Droppable>
      </DragDropContext>
    </div>
  );
}

export default Boards;
