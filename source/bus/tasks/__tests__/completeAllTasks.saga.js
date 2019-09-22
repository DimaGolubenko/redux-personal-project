//Core
import { apply } from "redux-saga/effects";
import { expectSaga } from "redux-saga-test-plan";

//Instruments
import { api } from "../../../REST";
import { tasksActions } from "../../tasks/actions";
import { uiActions } from "../../ui/actions";
import { completeAllTasks } from "../saga/workers";

describe("completeAllTasks saga:", () => {
    test("should complete a 200 status response scenario", async () => {
        await expectSaga(completeAllTasks, { payload: __.tasks })
            .put(uiActions.startFetching())
            .provide([
                [
                    apply(api, api.tasks.completeAllTasks, [__.tasks]),
                    __.fetchResponseTasksSuccess
                ]
            ])
            .put(tasksActions.completeAllTasks(__.tasks))
            .put(uiActions.stopFetching())
            .run();
    });

    test("should complete a 401 status response scenario", async () => {
        await expectSaga(completeAllTasks, { payload: __.tasksList })
            .put(uiActions.startFetching())
            .provide([
                [
                    apply(api, api.tasks.completeAllTasks, [__.tasksList]),
                    __.fetchResponseFail401
                ]
            ])
            .put(uiActions.emitError(__.error, "completeAllTasks worker"))
            .put(uiActions.stopFetching())
            .run();
    });
});
