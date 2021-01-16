import React, {createContext, useContext, useState} from "react";
import firebase from "firebase/app";
import {fireStore} from "../components/Firebase";
import * as COLLECTION from "../constants/fireStoreCollections";
import {FirebaseContext} from "./FirebaseContext";

export const FireStoreContext = createContext(null);

export const FireStoreProvider = (props) => {
    const fireBaseContext = useContext(FirebaseContext);
    const [initialStore, setInitialStore] = useState({
        list: [],
        tasks: [],
        selectedListId: null,
        selectedTaskId: null,
    });

    /**
     * streams list created by a specific user
     */
    const streamList = () => {
        fireStore
            .collection(COLLECTION.LISTS)
            .where("createdBy", "==", fireBaseContext.initialUserState.email)
            .get()
            .then((snapshot) => {
                console.log("Stream lists is called!");

                const firestoreList = snapshot.docs.map((item) => {
                    return {...item.data(), id: item.id};
                });
        
                setInitialStore((prevStore) => {
                    return {
                        ...prevStore,
                        list: firestoreList,
                    };
                });
            })
            .catch((error) => {
                setInitialStore((prevStore) => {
                    return {
                        ...prevStore,
                        list: [],
                    };
                });
                console.log(error);
            });
    };

    /**
     * Returns a promise which can be fulfilled inside the caller component
     * @param listDetails
     * @returns {Promise<firebase.firestore.DocumentReference<firebase.firestore.DocumentData>>}
     */
    const createNewList = (listDetails) => {
        fireStore
            .collection(COLLECTION.LISTS)
            .add({
                createdBy: listDetails.createdBy,
                createAt: firebase.firestore.FieldValue.serverTimestamp(),
                title: listDetails.title,
                taskCount: listDetails.taskCount,
            })
            .then((result) => {

                

                console.log(result);
            })
            .catch((error) => {
                console.log(error);
            });
    };

    /**
     * Creates a new task and returns the promise
     * @param listId
     * @param taskDetails
     * @returns {Promise<firebase.firestore.DocumentReference<firebase.firestore.DocumentData>>}
     */
    const createNewTask = (listId, taskDetails) => {
        return fireStore.collection(listId).add({
            completed: "",
            createdDateTime: firebase.firestore.FieldValue.serverTimestamp(),
            description: taskDetails.description,
            priority: taskDetails.priority,
            title: taskDetails.title,
        });
    };

    const streamListTasks = (listId) => {

        

        setInitialStore((prevStore) => {
            return {
                ...prevStore,
                selectedListId: listId,
            };
        });

        fireStore
            .collection(`${COLLECTION.LISTS}/${listId}${COLLECTION.TASKS}`)
            .get()
            .then((querySnapshot) => {
                const data = querySnapshot.docs.map((doc) => ({
                    ...doc.data(),
                    id: doc.id,
                }));
                setInitialStore((prevStore) => {
                    console.log(data);

                    return {
                        ...prevStore,
                        tasks: data,
                    };
                });
            })
            .catch((error) => {
                console.log(error);
            });
    };

    return (
        <FireStoreContext.Provider
            value={{
                initialStore: initialStore,
                streamList: streamList,
                streamListTasks: streamListTasks,
                createNewList: createNewList,
            }}
        >
            {props.children}
        </FireStoreContext.Provider>
    );
};
