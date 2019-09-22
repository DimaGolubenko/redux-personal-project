//Core
import { createSelector } from "reselect";

//Instruments
import { sortTasksByGroup } from "../../instruments";

const tasksSelector = (state) => state.tasks.tasks;
const tasksFilterSelector = (state) => state.tasks.tasksFilter;

export const filteredTasks = createSelector(
    tasksSelector,
    tasksFilterSelector,
    (tasks, tasksFilter) =>
        tasks.filter((task) => task.get("message").includes(tasksFilter))
);

export const sortedTasks = createSelector(
    filteredTasks,
    (tasks) => sortTasksByGroup(tasks)
);

export const allTasksIsCompleted = createSelector(
    tasksSelector,
    (tasks) => tasks.every((task) => task.get("completed") === true)
);
