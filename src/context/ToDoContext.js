import React, {createContext, useEffect} from "react";
import {v4 as uuidV4} from "uuid";
import axios from 'axios';

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
        const getArticles = async() => {
            const response = await axios.get("https://dev.to/api/articles?username=ayushkaushik");
            console.log(response.data);
        }

        getArticles();
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
