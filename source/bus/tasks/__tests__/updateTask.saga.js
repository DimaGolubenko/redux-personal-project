//Core
import { apply } from "redux-saga/effects";
import { expectSaga } from "redux-saga-test-plan";

//Instruments
import { api } from "../../../REST";
import { tasksActions } from "../../tasks/actions";
import { uiActions } from "../../ui/actions";
import { updateTask } from "../saga/workers";

describe("updateTask saga:", () => {
    test("should complete a 200 status response scenario", async () => {
        await expectSaga(updateTask, { payload: __.task })
            .put(uiActions.startFetching())
            .provide([
                [
                    apply(api, api.tasks.update, [__.task]),
                    __.fetchResponseTasksSuccess
                ]
            ])
            .put(tasksActions.updateTask(__.task))
            .put(uiActions.stopFetching())
            .run();
    });

    test("should complete a 400 status response scenario", async () => {
        await expectSaga(updateTask, { payload: __.task })
            .put(uiActions.startFetching())
            .provide([
                [
                    apply(api, api.tasks.update, [__.task]),
                    __.fetchResponseFail400
                ]
            ])
            .put(uiActions.emitError(__.error, "updateTask worker"))
            .put(uiActions.stopFetching())
            .run();
    });
});
