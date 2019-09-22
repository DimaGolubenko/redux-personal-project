//Actions
import { tasksActions } from "../actions";

//Types
import { types } from "../types";

describe("tasks actions", () => {
    test("fillTasks", () => {
        expect(tasksActions.fillTasks(__.tasks)).toEqual({
            type:    types.FILL_TASKS,
            payload: __.tasks,
        });
    });

    test("createTask", () => {
        expect(tasksActions.createTask(__.task)).toEqual({
            type:    types.CREATE_TASK,
            payload: __.task,
        });
    });

    test("removeTask", () => {
        expect(tasksActions.removeTask(__.task.id)).toEqual({
            type:    types.REMOVE_TASK,
            payload: __.task.id,
        });
    });

    test("updateTask", () => {
        expect(tasksActions.updateTask(__.task.message)).toEqual({
            type:    types.UPDATE_TASK,
            payload: __.task.message,
        });
    });

    test("updateTasksFilter", () => {
        expect(tasksActions.updateTasksFilter(__.task.message)).toEqual({
            type:    types.UPDATE_TASKS_FILTER,
            payload: __.task.message,
        });
    });

    test("completeAllTasks", () => {
        expect(tasksActions.completeAllTasks(__.tasks)).toEqual({
            type:    types.COMPLETE_ALL_TASKS,
            payload: __.tasks,
        });
    });

    test("updateNewTaskMessage", () => {
        expect(tasksActions.updateNewTaskMessage(__.task.message)).toEqual({
            type:    types.UPDATE_NEW_TASK_MESSAGE,
            payload: __.task.message,
        });
    });

    test("updateEditingTaskMessage", () => {
        expect(tasksActions.updateEditingTaskMessage(__.task.message)).toEqual({
            type:    types.UPDATE_EDITING_TASK_MESSAGE,
            payload: __.task.message,
        });
    });

    test("clearEditingTaskMessage", () => {
        expect(tasksActions.clearEditingTaskMessage()).toEqual({
            type: types.CLEAR_EDITING_TASK_MESSAGE,
        });
    });

    test("toggleTaskEditing", () => {
        expect(tasksActions.toggleTaskEditing()).toEqual({
            type: types.TOGGLE_TASK_EDITING,
        });
    });

    test("setEditingTaskId", () => {
        expect(tasksActions.setEditingTaskId(__.task.id)).toEqual({
            type:    types.SET_EDITING_TASK_ID,
            payload: __.task.id,
        });
    });

    test("fetchTasksAsync", () => {
        expect(tasksActions.fetchTasksAsync()).toEqual({
            type: types.FETCH_TASKS_ASYNC,
        });
    });

    test("createTaskAsync", () => {
        expect(tasksActions.createTaskAsync(__.task)).toEqual({
            type:    types.CREATE_TASK_ASYNC,
            payload: __.task,
        });
    });

    test("removeTaskAsync", () => {
        expect(tasksActions.removeTaskAsync(__.task.id)).toEqual({
            type:    types.REMOVE_TASK_ASYNC,
            payload: __.task.id,
        });
    });

    test("updateTaskAsync", () => {
        expect(tasksActions.updateTaskAsync(__.task)).toEqual({
            type:    types.UPDATE_TASK_ASYNC,
            payload: __.task,
        });
    });

    test("completeAllTasksAsync", () => {
        expect(tasksActions.completeAllTasksAsync(__.tasks)).toEqual({
            type:    types.COMPLETE_ALL_TASKS_ASYNC,
            payload: __.tasks,
        });
    });
});
