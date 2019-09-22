// Core
import React, { Component } from "react";
import Move from "react-flip-move";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

// Instruments
import Styles from "./styles.m.css";
import { validateTaskMessage } from "../../instruments";

// Components
import { Task } from "../Task";
import Checkbox from "../../theme/assets/Checkbox";

//Actions
import { tasksActions } from "../../bus/tasks/actions";

//Selectors
import * as tasksSelectors from "../../bus/tasks/selectors";

const mapStateToProps = (state) => {
    return {
        tasks:               state.tasks.tasks,
        tasksFilter:         state.tasks.tasksFilter,
        filteredTasks:       tasksSelectors.filteredTasks(state),
        sortedTasks:         tasksSelectors.sortedTasks(state),
        allTasksIsCompleted: tasksSelectors.allTasksIsCompleted(state),
        newTaskMessage:      state.tasks.newTaskMessage,
        editingTaskMessage:  state.tasks.editingTaskMessage,
        isTaskEditing:       state.tasks.isTaskEditing,
        editingTaskId:       state.tasks.editingTaskId,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        actions: bindActionCreators(
            {
                updateTasksFilter:        tasksActions.updateTasksFilter,
                fetchTasksAsync:          tasksActions.fetchTasksAsync,
                createTaskAsync:          tasksActions.createTaskAsync,
                removeTaskAsync:          tasksActions.removeTaskAsync,
                updateTaskAsync:          tasksActions.updateTaskAsync,
                completeAllTasksAsync:    tasksActions.completeAllTasksAsync,
                updateNewTaskMessage:     tasksActions.updateNewTaskMessage,
                updateEditingTaskMessage: tasksActions.updateEditingTaskMessage,
                clearEditingTaskMessage:  tasksActions.clearEditingTaskMessage,
                toggleTaskEditing:        tasksActions.toggleTaskEditing,
                setEditingTaskId:         tasksActions.setEditingTaskId,
            },
            dispatch
        ),
    };
};

@connect(
    mapStateToProps,
    mapDispatchToProps
)
class Scheduler extends Component {
    componentDidMount () {
        const { actions } = this.props;

        actions.fetchTasksAsync();
    }

    _updateNewTaskMessage = (event) => {
        const newTaskMessage = event.target.value;

        if (!validateTaskMessage(newTaskMessage)) {
            return null;
        }
        this.props.actions.updateNewTaskMessage(newTaskMessage);
    };

    _updateTasksFilter = (event) => {
        const { actions } = this.props;
        const tasksFilter = event.target.value.trim().toLowerCase();

        actions.updateTasksFilter(tasksFilter);
    };

    _createTaskAsync = (event) => {
        event.preventDefault();
        const { newTaskMessage, actions } = this.props;

        if (newTaskMessage.length) {
            actions.createTaskAsync(newTaskMessage);
            actions.updateNewTaskMessage("");
        }
    };

    _completeAllTasksAsync = () => {
        const { allTasksIsCompleted, tasks, actions } = this.props;

        if (allTasksIsCompleted) {
            return null;
        }

        const completedTasks = tasks.map((task) => task.set("completed", true));

        actions.completeAllTasksAsync(completedTasks);
    };

    render () {
        const {
            sortedTasks,
            actions,
            tasksFilter,
            newTaskMessage,
            editingTaskId,
            editingTaskMessage,
            allTasksIsCompleted,
            isTaskEditing,
        } = this.props;

        const todoListJSX = sortedTasks.map((task) => (
            <Task
                actions = { actions }
                completed = { task.get("completed") }
                editingTaskId = { editingTaskId }
                editingTaskMessage = { editingTaskMessage }
                favorite = { task.get("favorite") }
                id = { task.get("id") }
                isTaskEditing = { isTaskEditing }
                key = { task.get("id") }
                message = { task.get("message") }
                { ...task }
            />
        ));

        return (
            <section className = { Styles.scheduler }>
                <main>
                    <header>
                        <h1>Планировщик задач</h1>
                        <input
                            placeholder = 'Поиск'
                            type = 'search'
                            value = { tasksFilter }
                            onChange = { this._updateTasksFilter }
                        />
                    </header>
                    <section>
                        <form onSubmit = { this._createTaskAsync }>
                            <input
                                className = { Styles.createTask }
                                maxLength = { 50 }
                                placeholder = 'Описание моей новой задачи'
                                type = 'text'
                                value = { newTaskMessage }
                                onChange = { this._updateNewTaskMessage }
                            />
                            <button>Добавить задачу</button>
                        </form>
                        <div className = { Styles.overlay }>
                            <ul>
                                <Move duration = { 400 } easing = 'ease-in-out'>
                                    {todoListJSX}
                                </Move>
                            </ul>
                        </div>
                    </section>
                    <footer>
                        <Checkbox
                            checked = { allTasksIsCompleted }
                            color1 = '#363636'
                            color2 = '#fff'
                            onClick = { this._completeAllTasksAsync }
                        />
                        <span className = { Styles.completeAllTasks }>
                            Все задачи выполнены
                        </span>
                    </footer>
                </main>
            </section>
        );
    }
}

export { Scheduler };
