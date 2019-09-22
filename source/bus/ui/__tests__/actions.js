//Actions
import { uiActions } from "../actions";

//Types
import { types } from "../types";

describe("ui actions", () => {
    test("startFetching", () => {
        expect(uiActions.startFetching()).toEqual({
            type: types.START_FETCHING,
        });
    });

    test("stopFetching", () => {
        expect(uiActions.stopFetching()).toEqual({
            type: types.STOP_FETCHING,
        });
    });

    test("emitError", () => {
        expect(uiActions.emitError(__.error)).toMatchSnapshot();
    });
});
