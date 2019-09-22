//Core
import { apply } from "redux-saga/effects";
import { expectSaga } from "redux-saga-test-plan";

//Instruments
import { api } from "../../../REST";
import { tasksActions } from "../../tasks/actions";
import { uiActions } from "../../ui/actions";
import { removeTask } from "../saga/workers";

describe("removeTask saga:", () => {
    test("should complete a 204 status response scenario", async () => {
        await expectSaga(removeTask, { payload: __.task.id })
            .put(uiActions.startFetching())
            .provide([
                [
                    apply(api, api.tasks.remove, [__.task.id]),
                    __.fetchResponseSuccess204
                ]
            ])
            .put(tasksActions.removeTask(__.task.id))
            .put(uiActions.stopFetching())
            .run();
    });

    test("should complete a 401 status response scenario", async () => {
        await expectSaga(removeTask, { payload: __.task.id })
            .put(uiActions.startFetching())
            .provide([
                [
                    apply(api, api.tasks.remove, [__.task.id]),
                    __.fetchResponseFail401
                ]
            ])
            .put(uiActions.emitError(__.error, "removeTask worker"))
            .put(uiActions.stopFetching())
            .run();
    });
});
