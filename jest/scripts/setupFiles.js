/* Setup files module.
 **
 ** This module will be executed before each test.
 **
 ** This module contains a code to configure or set up the
 ** testing environment before each test. Since every test
 ** runs in its own environment, these scripts will be
 ** executed in the testing environment immediately before
 ** executing the test code itself.
 **
 ** This module excutes before setupFramework module.
 **
 */
import { fromJS } from "immutable";
import { LocalStorage } from "./mocks/localStorage";

const errorMessage = "TEST_ERROR_MESSAGE.";
const error = new Error(errorMessage);
const successMessage = "TEST_SUCCESS_MESSAGE.";

const task = {
    id:        "5d52c19db808f5cbc8f4570c",
    message:   "первая задача",
    completed: false,
    favorite:  false,
    created:   "2019-08-13T13:56:45.894Z",
    modified:  "2019-09-22T08:34:34.507Z",
};

const tasks = [task, task];

const tasksList = fromJS(tasks);

const responseTaskSuccess = {
    data:    task,
    message: successMessage,
};

const responseTasksSuccess = {
    data:    tasks,
    message: successMessage,
};

const responseDataFail = {
    message: errorMessage,
};

const fetchResponseTaskSuccess = {
    status: 200,
    json:   jest.fn(() => Promise.resolve(responseTaskSuccess)),
};

const fetchResponseTasksSuccess = {
    status: 200,
    json:   jest.fn(() => Promise.resolve(responseTasksSuccess)),
};

const fetchResponseFail400 = {
    status: 400,
    json:   jest.fn(() => Promise.resolve(responseDataFail)),
};

const fetchResponseFail401 = {
    status: 401,
    json:   jest.fn(() => Promise.resolve(responseDataFail)),
};

const fetchResponseSuccess204 = {
    status: 204,
};

const ui = {
    isFetching:    { isFetching: true },
    isNotFetching: { isFetching: false },
};

global.__ = {
    task,
    tasks,
    tasksList,
    error,
    ui,
    responseTaskSuccess,
    responseTasksSuccess,
    responseDataFail,
    fetchResponseTaskSuccess,
    fetchResponseTasksSuccess,
    fetchResponseSuccess204,
    fetchResponseFail400,
    fetchResponseFail401,
};

global.localStorage = new LocalStorage();

global.__ENV__ = global.__PROD__ = process.env.NODE_ENV;
