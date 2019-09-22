//Core
import { applyMiddleware, compose } from "redux";

//Middleware
import { createLogger } from "redux-logger";
import createSagaMiddleware from "redux-saga";

const logger = createLogger({
    duration:  true,
    collapsed: true,
    colors:    {
        title:     () => "#139BFE",
        prevState: () => "#1C5FAF",
        action:    () => "#149945",
        nextState: () => "#A47104",
        error:     () => "#ff0005",
    },
});

const sagaMiddleware = createSagaMiddleware();
const devtools = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__;
const composeEnhancers = devtools ? devtools : compose;

const middleware = [sagaMiddleware];

if (__DEV__) {
    middleware.push(logger);
}

const enchancedStore = composeEnhancers(applyMiddleware(...middleware));

export { enchancedStore, sagaMiddleware };
