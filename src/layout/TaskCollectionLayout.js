import React, {useContext} from "react";
import {FireStoreContext} from "../context/FireStoreContext";
import {Checkbox} from "evergreen-ui";
import NewTask from "../components/NewTask";

const TaskCollectionLayout = () => {
    const fireStoreContext = useContext(FireStoreContext);

    return (
        <div
            style={{
                marginLeft: "20%",
                width: "80%",
                marginRight: "20%",
                marginTop: "10%",
            }}
        >
            <div>
                {fireStoreContext.initialStore.tasks.map((item) => {
                    console.log(item);
                    return (
                        <div
                            key={item.id}
                            style={{
                                display: "flex",
                                padding: "15px",
                                marginRight: "5px",
                            }}
                        >
                            <Checkbox
                                label={item.title}
                                checked={false}
                                onChange={(e) => {
                                    console.log(e.target.value);
                                }}
                            />
                        </div>
                    );
                })}
            </div>
            <NewTask />
        </div>
    );
};

export default TaskCollectionLayout;
