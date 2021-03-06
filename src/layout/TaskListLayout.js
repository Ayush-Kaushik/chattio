import React, { useContext } from "react";
import { FireStoreContext } from "../context/FireStoreContext";
import NewTask from "../components/NewTask";
import { FirebaseContext } from "../context/FirebaseContext";

const TaskListLayout = () => {
    const fireStoreContext = useContext(FireStoreContext);
    const firebaseContext = useContext(FirebaseContext);

    const deleteTask = (event) => {
        event.preventDefault();

        try {
            let taskId = event.target.id;
            console.log(event.target);
            fireStoreContext.deleteTask(firebaseContext.initialUserState.email, taskId).then(fireStoreContext.streamTasks());
        } catch (error) {
            console.log(error);
        }
    }

    const markComplete = (event) => {
        event.preventDefault();

        try {
            let taskId = event.target.id;
            console.log(event.target);
            fireStoreContext.markAsComplete(firebaseContext.initialUserState.email, taskId).then(fireStoreContext.streamTasks());
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div>
            <NewTask />
            <div>

                {fireStoreContext.todoStore.tasks.map((item) => {
                    console.log(item);

                    return (
                        <div key={item.id} className="task-card" id={item.id} onClick={(e) => markComplete(e)}>
                            {item.isComplete ? <label className="task-complete" id={item.id}>{item.title}</label> : <label id={item.id}>{item.title}</label>}
                            <button className="button fail-button" id={item.id} onClick={(e) => deleteTask(e)}>Delete</button>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default TaskListLayout;
