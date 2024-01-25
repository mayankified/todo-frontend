import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const createTask = createAsyncThunk(
  "createTask",
  async (taskData, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        "https://tinudo-app.onrender.com/api/v1/task/create",
        taskData,
        { withCredentials: true }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const fetchTasks = createAsyncThunk(
  "fetchTasks",
  async (user,{ rejectWithValue }) => {
    try {
      const response = await axios.post(
        "https://tinudo-app.onrender.com/api/v1/task/gettask",user
      );
      return response.data.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const updateTask = createAsyncThunk(
  "tasks/updateTask",
  async (taskData,{ rejectWithValue }) => {
    try {
      const response = await axios.post(
        `https://tinudo-app.onrender.com/api/v1/task/update`,taskData
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const deleteTask = createAsyncThunk(
  "tasks/deleteTask",
  async (task, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        'https://tinudo-app.onrender.com/api/v1/task/delete',task
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Task Slice
export const Task = createSlice({
  name: "tasks",
  initialState: {
    tasks: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(createTask.fulfilled, (state, action) => {
      state.tasks.push(action.payload);
      state.loading = false;
      state.error = null;
    });

    builder.addCase(fetchTasks.fulfilled, (state, action) => {
      state.tasks = action.payload;
      state.loading = false;
      state.error = null;
    });

    builder.addCase(updateTask.fulfilled, (state, action) => {
      const updatedTaskIndex = state.tasks.findIndex(
        (task) => task.id === action.payload.id
      );
      if (updatedTaskIndex !== -1) {
        state.tasks[updatedTaskIndex] = action.payload;
      }
      state.loading = false;
      state.error = null;
    });

    builder.addCase(deleteTask.fulfilled, (state, action) => {
      state.loading = false;
      state.error = null;
    });

    builder.addMatcher(
      (action) =>
        [
          createTask.pending,
          fetchTasks.pending,
          updateTask.pending,
          deleteTask.pending,
        ].includes(action.type),
      (state) => {
        state.loading = true;
        state.error = null;
      }
    );

    builder.addMatcher(
      (action) =>
        [
          createTask.rejected,
          fetchTasks.rejected,
          updateTask.rejected,
          deleteTask.rejected,
        ].includes(action.type),
      (state, action) => {
        state.loading = false;
        state.error = action.payload
          ? action.payload.error
          : "Something went wrong";
      }
    );
  },
});

export default Task.reducer;
