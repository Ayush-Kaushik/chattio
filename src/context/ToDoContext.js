import React, {createContext, useEffect} from "react";
import {v4 as uuidV4} from "uuid";

export const ToDoContext = createContext();

const addTask = (content) => {
    const taskId = uuidV4();
    console.log("Add this to list: " + content + " with task ID: " + taskId);
};

const removeTask = () => {
    console.log("Remove task");
};

export const ToDoProvider = (props) => {
    const initialState = {
        currentListId: null,
        currentTaskId: null,
    };

    useEffect( () => {
        
    }, []);

    return (
        <ToDoContext.Provider
            value={{
                initialState: initialState,
                addTask: addTask,
                removeTask: removeTask,
            }}
        >
            {props.children}
        </ToDoContext.Provider>
    );
};
