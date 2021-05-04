import React, { useState } from "react";
import { DragDropContext, Droppable } from "react-beautiful-dnd";

import "./layout/App.scss";
import logo from "./images/Logo_pur.png";
import Board from "./components/Board";
import Input from "./components/Input";

const fakeData = [
  {
    id: "like-board",
    title: "likes",
    data: [
      {
        id: "like-0",
        value: "Yannick ist wieder öfter bei daily/checkout dabei!!",
        likes: 3,
        liked: false,
      },
      {
        id: "like-1",
        value:
          "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Aspernatur sunt in quis nisi ipsam corrupti?",
        likes: 1,
        liked: false,
      },
      {
        id: "like-2",
        value:
          "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Tempora sed, ea neque soluta recusandae similique id illo dolor voluptate. Animi vel a repellendus voluptatem at, eveniet fugit commodi praesentium enim?",
        likes: 5,
        liked: false,
      },
    ],
  },
  {
    id: "wish-board",
    title: "wishes",
    data: [
      {
        id: "wish-0",
        value: "wuensche mir ein Pony",
        likes: 3,
        liked: false,
      },
      {
        id: "wish-1",
        value: "mehr transparenz",
        likes: 3,
        liked: false,
      },
    ],
  },
  {
    id: "issue-board",
    title: "issues",
    data: [
      {
        id: "issue-1",
        value:
          "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Aspernatur sunt in quis nisi ipsam corrupti?",
        likes: 8,
        liked: false,
      },
      {
        id: "issue-2",
        value:
          "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Tempora sed, ea neque soluta recusandae similique id illo dolor voluptate. Animi vel a repellendus voluptatem at, eveniet fugit commodi praesentium enim?",
        likes: 5,
        liked: false,
      },
    ],
  },
];

const reorder = (list, startIndex, endIndex) => {
  const result = [...list];
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};

/**
 * Moves an item from one list to another list.
 */
const move = (source, destination, droppableSource, droppableDestination) => {
  const sourceClone = [...source];
  const destClone = [...destination];
  const [removed] = sourceClone.splice(droppableSource.index, 1);

  destClone.splice(droppableDestination.index, 0, removed);

  const result = {};
  result[droppableSource.droppableId] = sourceClone;
  result[droppableDestination.droppableId] = destClone;

  return result;
};

const getListStyle = (isDraggingOver) => ({
  background: isDraggingOver ?? "lightblue",
});

function App() {
  const [data, setData] = useState(fakeData);
  const [itemText, setItemText] = useState("");
  const [itemCategory, setItemCategory] = useState("");

  const getWeek = () => {
    var date = new Date();
    var week1 = new Date(date.getFullYear(), 0, 4);
    return (
      1 +
      Math.round(
        ((date.getTime() - week1.getTime()) / 86400000 -
          3 +
          ((week1.getDay() + 6) % 7)) /
          7
      )
    );
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const updateList = [...data];
    updateList[itemCategory].data.push({
      id: `${e.target.value}-${data[itemCategory].data.length}`,
      value: itemText,
      likes: 0,
    });
    setData(updateList);
    setItemText("");
  };

  const handleLike = (id, boardNr) => {
    const updateLikes = [...data];
    updateLikes[boardNr].data.forEach((element) => {
      if (element.id === id) {
        if (!element.liked) {
          element.likes++;
          element.liked = true;
        } else {
          element.likes--;
          element.liked = false;
        }
      }
    });
    setData(updateLikes);
  };
  const handleOnDragEnd = (event) => {
    const { source, destination } = event;
    const sourceId = parseInt(source.droppableId.split("-")[0]);
    const destinationId = parseInt(destination.droppableId.split("-")[0]);

    if (!destination) {
      return;
    }
    if (destinationId === sourceId) {
      const result = [...data];
      const [removed] = result[sourceId].data.splice(source.index, 1);
      result[destinationId].data.splice(destination.index, 0, removed);
      setData(result);
    }
  };

  return (
    <div className="App">
      <header>
        <div className="container title">
          <img src={logo} alt="logo" className="logo" />
          <h3>
            {data.map((el, index) => {
              return index !== data.length - 1
                ? el.title.toUpperCase() + " / "
                : el.title.toUpperCase();
            })}
          </h3>
        </div>
      </header>
      <main className="container">
        <h1 className="week">KW {getWeek()}</h1>
        <section className="board-section">
          {data.map((board, index) => {
            return (
              <DragDropContext onDragEnd={handleOnDragEnd} key={board.title}>
                <Droppable droppableId={index + "-" + board.id}>
                  {(provided, snapshot) => (
                    <div
                      {...provided.droppableProps}
                      ref={provided.innerRef}
                      style={getListStyle(snapshot.isDraggingOver)}
                    >
                      <Board
                        title={board.title.toUpperCase()}
                        data={board.data}
                        handleLike={handleLike}
                        boardNr={index}
                      />
                      {provided.placeholder}
                    </div>
                  )}
                </Droppable>
              </DragDropContext>
            );
          })}
        </section>
        <Input
          setItemCategory={setItemCategory}
          itemText={itemText}
          setItemText={setItemText}
          onSubmit={onSubmit}
        />
      </main>
    </div>
  );
}

export default App;
