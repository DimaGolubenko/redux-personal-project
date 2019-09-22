//Types
import { types } from "./types";

export const tasksActions = {
    //Sync
    fillTasks: (tasks) => {
        return {
            type:    types.FILL_TASKS,
            payload: tasks,
        };
    },
    createTask: (task) => {
        return {
            type:    types.CREATE_TASK,
            payload: task,
        };
    },
    removeTask: (taskId) => {
        return {
            type:    types.REMOVE_TASK,
            payload: taskId,
        };
    },
    updateTask: (message) => {
        return {
            type:    types.UPDATE_TASK,
            payload: message,
        };
    },
    updateTasksFilter: (message) => {
        return {
            type:    types.UPDATE_TASKS_FILTER,
            payload: message,
        };
    },
    completeAllTasks: (tasks) => {
        return {
            type:    types.COMPLETE_ALL_TASKS,
            payload: tasks,
        };
    },
    updateNewTaskMessage: (message) => {
        return {
            type:    types.UPDATE_NEW_TASK_MESSAGE,
            payload: message,
        };
    },
    updateEditingTaskMessage: (message) => {
        return {
            type:    types.UPDATE_EDITING_TASK_MESSAGE,
            payload: message,
        };
    },
    clearEditingTaskMessage: () => {
        return {
            type: types.CLEAR_EDITING_TASK_MESSAGE,
        };
    },
    toggleTaskEditing: () => {
        return {
            type: types.TOGGLE_TASK_EDITING,
        };
    },
    setEditingTaskId: (id) => {
        return {
            type:    types.SET_EDITING_TASK_ID,
            payload: id,
        };
    },
    //Async
    fetchTasksAsync: () => {
        return {
            type: types.FETCH_TASKS_ASYNC,
        };
    },
    createTaskAsync: (task) => {
        return {
            type:    types.CREATE_TASK_ASYNC,
            payload: task,
        };
    },
    removeTaskAsync: (taskId) => {
        return {
            type:    types.REMOVE_TASK_ASYNC,
            payload: taskId,
        };
    },
    updateTaskAsync: (task) => {
        return {
            type:    types.UPDATE_TASK_ASYNC,
            payload: task,
        };
    },
    completeAllTasksAsync: (tasks) => {
        return {
            type:    types.COMPLETE_ALL_TASKS_ASYNC,
            payload: tasks,
        };
    },
};
