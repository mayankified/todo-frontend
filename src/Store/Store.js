import { configureStore } from "@reduxjs/toolkit";
import User from "../Features/Userslice.js";
import Task from "../Features/TaskSlice.js";

export const Store=configureStore({
    reducer:{
        users: User,
        tasks: Task,
    },
})