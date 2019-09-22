//Core
import { fromJS, List, Map } from "immutable";

//Instruments
import { types } from "./types";

const initialState = {
    tasks:              List(),
    tasksFilter:        "",
    newTaskMessage:     "",
    editingTaskMessage: "",
    isTaskEditing:      false,
    editingTaskId:      null,
};

export const taskReducer = (state = initialState, action) => {
    const { payload } = action;

    switch (action.type) {
        case types.FILL_TASKS:
            return {
                ...state,
                tasks: fromJS(payload),
            };
        case types.CREATE_TASK: {
            return {
                ...state,
                tasks: state.tasks.unshift(fromJS(payload)),
            };
        }
        case types.REMOVE_TASK: {
            return {
                ...state,
                tasks: state.tasks.filter((task) => task.get("id") !== payload),
            };
        }
        case types.UPDATE_TASK: {
            const { payload: updatedTask } = action;

            return {
                ...state,
                tasks: state.tasks.map((task) =>
                    task.get("id") === updatedTask.id ? Map(updatedTask) : task
                ),
            };
        }
        case types.UPDATE_TASKS_FILTER: {
            const { payload: tasksFilter } = action;

            return {
                ...state,
                tasksFilter,
            };
        }
        case types.COMPLETE_ALL_TASKS:
            return {
                ...state,
                tasks: fromJS(payload),
            };
        case types.UPDATE_NEW_TASK_MESSAGE:
            return {
                ...state,
                newTaskMessage: payload,
            };
        case types.UPDATE_EDITING_TASK_MESSAGE:
            return {
                ...state,
                editingTaskMessage: payload,
            };
        case types.CLEAR_EDITING_TASK_MESSAGE:
            return {
                ...state,
                editingTaskMessage: "",
            };
        case types.TOGGLE_TASK_EDITING:
            return {
                ...state,
                isTaskEditing: !state.isTaskEditing,
            };
        case types.SET_EDITING_TASK_ID:
            return {
                ...state,
                editingTaskId: payload,
            };
        default:
            return state;
    }
};
