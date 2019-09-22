// Core
import React, { Component } from "react";
import { hot } from "react-hot-loader";

// Components
import { Scheduler, Catcher, Spinner } from "../components";

@hot(module)
class App extends Component {
    render () {
        return (
            <Catcher>
                <Spinner />
                <Scheduler />
            </Catcher>
        );
    }
}

export default App;
