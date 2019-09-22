//Core
import { put, apply } from "redux-saga/effects";

//Instruments
import { api } from "../../../../REST";
import { tasksActions } from "../../actions";
import { uiActions } from "../../../ui/actions";

export function* completeAllTasks ({ payload: tasks }) {
    try {
        yield put(uiActions.startFetching());

        // const completedTasks = tasks
        //     .map((task) => task.set("completed", true))
        //     .toJS();

        const response = yield apply(api, api.tasks.completeAllTasks, [tasks]);
        const { data, message: errorMessage } = yield apply(
            response,
            response.json
        );

        if (response.status !== 200) {
            throw new Error(errorMessage);
        }

        yield put(tasksActions.completeAllTasks(data));
    } catch (error) {
        yield put(uiActions.emitError(error, "completeAllTasks worker"));
    } finally {
        yield put(uiActions.stopFetching());
    }
}
