import { v4 as uuid } from "uuid";

export const ACTIONS = {
  ADD_TASK: "add-task",
  DELETE_TASK: "delete-task",
  SHIFT_DIFF_COL: "shift-to-different-column",
  SHIFT_SAME_COL: "shift-to-same-column",
};

export function reducer(columns, action) {
  switch (action.type) {
    case ACTIONS.ADD_TASK:
      return {
        ...columns,
        [Object.keys(columns)[0]]: {
          ...columns[Object.keys(columns)[0]],
          items: [
            ...columns[Object.keys(columns)[0]].items,
            newTask(action.payload.name),
          ],
        },
      };
    case ACTIONS.DELETE_TASK:
      return;
    case ACTIONS.SHIFT_DIFF_COL:
      return {
        ...columns,
        [action.payload.sourceID]: {
          ...columns[action.payload.sourceID],
          items: action.payload.sourceItems,
        },
        [action.payload.destinationID]: {
          ...columns[action.payload.destinationID],
          items: action.payload.destItems,
        },
      };
    case ACTIONS.SHIFT_SAME_COL:
      console.log(action.payload.sourceID);
      return {
        ...columns,
        [action.payload.sourceID]: {
          ...columns[action.payload.sourceID],
          items: action.payload.sourceItems,
        },
      };
    default:
      return columns;
  }
}

function newTask(value) {
  return { id: uuid(), content: value, list: 0 };
}
