//Core
import { List } from "immutable";

//Reducer
import { taskReducer } from "../reducer";

//Actions
import { tasksActions } from "../actions";

const initialState = {
    tasks:              List(),
    tasksFilter:        "",
    newTaskMessage:     "",
    editingTaskMessage: "",
    isTaskEditing:      false,
    editingTaskId:      null,
};

describe("tasks reducer", () => {
    test("should return initial state by default", () => {
        expect(taskReducer(void 0, {})).toEqual(initialState);
    });

    test("should handle FILL_TASKS action", () => {
        expect(
            taskReducer(void 0, tasksActions.fillTasks(__.tasks))
        ).toMatchSnapshot();
    });

    test("should handle CREATE_TASK action", () => {
        expect(
            taskReducer(void 0, tasksActions.createTask(__.task))
        ).toMatchSnapshot();
    });

    test("should handle REMOVE_TASK action", () => {
        expect(
            taskReducer(void 0, tasksActions.removeTask(__.task.id))
        ).toMatchSnapshot();
    });

    test("should handle UPDATE_TASK action", () => {
        expect(
            taskReducer(void 0, tasksActions.updateTask(__.task.id))
        ).toMatchSnapshot();
    });

    test("should handle UPDATE_TASKS_FILTER action", () => {
        expect(
            taskReducer(void 0, tasksActions.updateTask(__.task.message))
        ).toMatchSnapshot();
    });

    test("should handle COMPLETE_ALL_TASKS action", () => {
        expect(
            taskReducer(void 0, tasksActions.completeAllTasks(__.tasks))
        ).toMatchSnapshot();
    });

    test("should handle UPDATE_NEW_TASK_MESSAGE action", () => {
        expect(
            taskReducer(
                void 0,
                tasksActions.updateNewTaskMessage(__.task.message)
            )
        ).toMatchSnapshot();
    });

    test("should handle UPDATE_EDITING_TASK_MESSAGE action", () => {
        expect(
            taskReducer(
                void 0,
                tasksActions.updateEditingTaskMessage(__.task.message)
            )
        ).toMatchSnapshot();
    });

    test("should handle CLEAR_EDITING_TASK_MESSAGE action", () => {
        expect(
            taskReducer(void 0, tasksActions.clearEditingTaskMessage())
        ).toMatchSnapshot();
    });

    test("should handle TOGGLE_TASK_EDITING action", () => {
        expect(
            taskReducer(void 0, tasksActions.toggleTaskEditing())
        ).toMatchSnapshot();
    });

    test("should handle SET_EDITING_TASK_ID action", () => {
        expect(
            taskReducer(
                void 0,
                tasksActions.updateEditingTaskMessage(__.task.id)
            )
        ).toMatchSnapshot();
    });
});
