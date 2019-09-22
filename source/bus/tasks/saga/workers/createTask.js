//Core
import { put, apply } from "redux-saga/effects";

//Instruments
import { api } from "../../../../REST";
import { tasksActions } from "../../actions";
import { uiActions } from "../../../ui/actions";

export function* createTask ({ payload: message }) {
    try {
        yield put(uiActions.startFetching());

        const response = yield apply(api, api.tasks.create, [message]);
        const { data: task, message: errorMessage } = yield apply(
            response,
            response.json
        );

        if (response.status !== 200) {
            throw new Error(errorMessage);
        }

        yield put(tasksActions.createTask(task));
    } catch (error) {
        yield put(uiActions.emitError(error, "createTask worker"));
    } finally {
        yield put(uiActions.stopFetching());
    }
}
