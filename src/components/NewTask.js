import React, { useContext, useState } from "react";
import { Add } from "@material-ui/icons";
import { Button, TextField, Select, MenuItem, InputLabel, FormControl } from "@material-ui/core";
import { FireStoreContext } from "../context/FireStoreContext";
import * as LABELS from "../constants/labels";
import { DateTimePicker } from '@material-ui/pickers';

const NewTask = () => {
    const [title, setTitle] = useState("");
    const [priority, setPriority] = useState("MEDIUM");
    const [dueDateTime, setDueDateTime] = useState(null);
    const fireStoreContext = useContext(FireStoreContext);

    const onSubmit = (e) => {
        e.preventDefault();
        console.log(dueDateTime);

        fireStoreContext.createNewTask(fireStoreContext.initialStore.selectedListId, {
            title: title,
            createDateTime: new Date(),
            dueDateTime: JSON.stringify(dueDateTime),
            completed: false
        });

        fireStoreContext.streamListTasks(fireStoreContext.initialUserState.selectedListId);
        setTitle("");
    };

    return (
        <div
            style={{
                display: "flex",
                flexDirection: "column"
            }}
        >
            {console.log(JSON.stringify(dueDateTime))}
            <div
                style={{
                    display: "flex",
                    flexDirection: "column",
                    marginBottom: "5px",
                    width: "50%"
                }}
            >
                <TextField
                    style={{
                        marginRight: "2px",
                        marginBottom: "5px"
                    }}
                    type="text"
                    variant="outlined"
                    value={title}
                    height={32}
                    label={"Title"}
                    placeholder={"eg. Finish CI/CD pipeline"}
                    onChange={(e) => {
                        setTitle(e.target.value);
                    }}
                />

                <DateTimePicker
                    style={{
                        marginRight: "2px",
                        marginBottom: "5px"
                    }}
                    label="Due Date"
                    value={dueDateTime}
                    inputVariant="outlined"
                    onChange={setDueDateTime} />


                <FormControl
                    variant="outlined"
                    style={{
                        marginRight: "2px",
                        marginBottom: "5px"
                    }}>
                    <InputLabel id="priority-outlined-label">{"Priority"}</InputLabel>
                    <Select
                        id="priority-outlined-label"
                        selected={priority}
                        options={LABELS.PRIORITY}
                        onChange={(e) => {
                            console.log(e.target.value)
                            setPriority(e.target.value)
                        }}
                        value={priority}
                        label="Priority"
                    >
                        {
                            LABELS.PRIORITY.map((item, index) => (
                                <MenuItem value={item.value} key={`${item.label}-${index}`}>{item.label}</MenuItem>
                            ))
                        }
                    </Select>
                </FormControl>

            </div>

            <div
                style={{
                    display: "flex",
                    justifyContent: "flex-start",
                }}
            >
                <Button
                    style={{
                        marginRight: "2px",
                    }}
                    color="primary"
                    variant="contained"
                    startIcon={<Add />}
                    onClick={(e) => {
                        onSubmit(e);
                    }}
                >
                    {"Add Task"}
                </Button>
            </div>
        </div>
    );
};

export default NewTask;
