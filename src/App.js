import React, { useReducer } from "react";
import { v4 as uuid } from "uuid";
import "./layout/App.scss";
import logo from "./images/logo_pur.png";
import Boards from "./components/Boards";
import Input from "./components/Input";

export const ACTIONS = {
  ADD_TASK: "add-task",
};

function reducer(tasks, action) {
  switch (action.type) {
    case ACTIONS.ADD_TASK:
      return [...tasks, newTask(value)];
      default
  }
}

function newTask(value) {
  return;
}

const itemsFromBackend = [
  { id: uuid(), content: "First task" },
  { id: uuid(), content: "Second task" },
  { id: uuid(), content: "Third task" },
  { id: uuid(), content: "Fourth task" },
  { id: uuid(), content: "Fifth task" },
];

const columnsFromBackend = {
  [uuid()]: {
    name: "Requested",
    items: itemsFromBackend,
  },
  [uuid()]: {
    name: "To do",
    items: [],
  },
  [uuid()]: {
    name: "In Progress",
    items: [],
  },
  [uuid()]: {
    name: "Done",
    items: [],
  },
};

function App() {
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

  return (
    <div className="App">
      <header>
        <div className="container title">
          <img src={logo} alt="logo" className="logo" />
          <h3>Task Master</h3>
        </div>
      </header>
      <main className="container">
        <Input />
        <h1 className="week">KW {getWeek()}</h1>
        <Boards
          itemsFromBackend={itemsFromBackend}
          columnsFromBackend={columnsFromBackend}
        />
      </main>
    </div>
  );
}

export default App;
