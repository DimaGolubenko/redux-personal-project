// Core
import React, { PureComponent, createRef } from "react";
import cx from "classnames";

// Instruments
import Styles from "./styles.m.css";
import { validateTaskMessage } from "../../instruments";

// Components
import Checkbox from "../../theme/assets/Checkbox";
import Remove from "../../theme/assets/Remove";
import Edit from "../../theme/assets/Edit";
import Star from "../../theme/assets/Star";

export class Task extends PureComponent {
    componentDidUpdate () {
        if (this.props.isTaskEditing) {
            this.taskInput.current.focus();
        }
    }

    taskInput = createRef();

    _getTaskShape = ({
        id = this.props.id,
        completed = this.props.completed,
        favorite = this.props.favorite,
        message = this.props.message,
    }) => ({
        id,
        completed,
        favorite,
        message,
    });

    _getTaskInputDisableStatus = () => {
        const { editingTaskId, isTaskEditing, id: currentTaskId } = this.props;

        if (editingTaskId === currentTaskId && isTaskEditing) {
            return null;
        }

        return "disabled";
    };

    _updateNewTaskMessage = (event) => {
        const editingTaskMessage = event.target.value;

        if (validateTaskMessage(editingTaskMessage)) {
            this.props.actions.updateEditingTaskMessage(editingTaskMessage);
        }
    };

    _updateTaskMessageOnClick = () => {
        const {
            id,
            message,
            actions: {
                toggleTaskEditing,
                setEditingTaskId,
                updateEditingTaskMessage,
            },
        } = this.props;

        updateEditingTaskMessage(message);
        setEditingTaskId(id);
        toggleTaskEditing();
    };

    _updateTaskMessageOnKeyDown = (event) => {
        switch (event.key) {
            case "Enter": {
                this._updateTaskAsync();
                break;
            }

            case "Escape": {
                this._cancelUpdatingTask();
                break;
            }

            default:
                break;
        }
    };

    _toggleTaskFavoriteState = () => {
        const { actions, favorite } = this.props;

        const taskToUpdate = this._getTaskShape({ favorite: !favorite });

        actions.updateTaskAsync(taskToUpdate);
    };

    _toggleTaskCompletedState = () => {
        const { actions, completed } = this.props;

        const taskToUpdate = this._getTaskShape({ completed: !completed });

        actions.updateTaskAsync(taskToUpdate);
    };

    _cancelUpdatingTask = () => {
        const {
            toggleTaskEditing,
            clearEditingTaskMessage,
        } = this.props.actions;

        toggleTaskEditing();
        clearEditingTaskMessage();
    };

    _updateTaskAsync = () => {
        const { message, editingTaskMessage, actions } = this.props;

        if (!editingTaskMessage.length) {
            return null;
        }

        if (message === editingTaskMessage) {
            actions.toggleTaskEditing();

            return null;
        }

        actions.updateTaskAsync(
            this._getTaskShape({ message: editingTaskMessage })
        );
        actions.clearEditingTaskMessage();
        actions.toggleTaskEditing();
    };

    _removeTaskAsync = () => {
        const { id, actions } = this.props;

        actions.removeTaskAsync(id);
    };

    render () {
        const { completed, favorite, message, editingTaskMessage } = this.props;

        const disabled = this._getTaskInputDisableStatus();
        const taskInputValue = disabled ? message : editingTaskMessage;

        return (
            <li className = { cx(Styles.task, { [Styles.completed]: completed }) }>
                <div className = { Styles.content }>
                    <Checkbox
                        inlineBlock
                        checked = { completed }
                        className = { Styles.toggleTaskCompletedState }
                        color1 = '#3B8EF3'
                        color2 = '#FFF'
                        onClick = { this._toggleTaskCompletedState }
                    />
                    <input
                        disabled = { disabled }
                        maxLength = { 50 }
                        ref = { this.taskInput }
                        type = 'text'
                        value = { taskInputValue }
                        onChange = { this._updateNewTaskMessage }
                        onKeyDown = { this._updateTaskMessageOnKeyDown }
                    />
                </div>
                <div className = { Styles.actions }>
                    <Star
                        inlineBlock
                        checked = { favorite }
                        className = { Styles.toggleTaskFavoriteState }
                        color1 = '#3B8EF3'
                        color2 = '#000'
                        onClick = { this._toggleTaskFavoriteState }
                    />
                    <Edit
                        inlineBlock
                        className = { Styles.updateTaskMessageOnClick }
                        color1 = '#3B8EF3'
                        color2 = '#000'
                        onClick = { this._updateTaskMessageOnClick }
                    />
                    <Remove
                        inlineBlock
                        className = { Styles.removeTask }
                        color1 = '#3B8EF3'
                        color2 = '#000'
                        onClick = { this._removeTaskAsync }
                    />
                </div>
            </li>
        );
    }
}
