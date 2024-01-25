import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";


export const signup = createAsyncThunk(
  "signup",
  async (userData, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        "https://tinudo-app.onrender.com/api/v1/user/register",
        userData,{withCredentials:true,}
      );
      return { userData, responseData: response.data };
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const login = createAsyncThunk(
  "login",
  async (userData, { rejectWithValue }) => {
    try {
      const response = await axios.post("https://tinudo-app.onrender.com/api/v1/user/login", userData);
      return { userData, responseData: response.data };
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const getuser = createAsyncThunk(
  "getuser",
  async (userData, { rejectWithValue }) => {
    try {
      const response = await axios.post("https://tinudo-app.onrender.com/api/v1/user/myprofile", userData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const logout = createAsyncThunk(
  "logout",
  async (userData, { rejectWithValue }) => {
    try {
      const response = await axios.post("https://tinudo-app.onrender.com/api/v1/user/logout");
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const User = createSlice({
  name: "user",
  initialState: {
    user: {},
    loading: false,
    error: null,
    login: false,
  },
  reducers: {
    
    setuser:(state,action)=>{
      state.user=action.payload;
    }
  },
  extraReducers: (builder) => {
    // Handle the fulfilled state for login
    builder.addCase(login.fulfilled, (state, action) => {
      state.user = action.payload;
      state.loading = false;
      state.error = null;
      state.login = true;
    });

    builder.addCase(getuser.fulfilled, (state, action) => {
      state.loading = false;
      state.user = action.payload.user[0];
      state.error = null;
    });


    builder.addCase(logout.fulfilled, (state, action) => {
      state.user = null;
      state.loading = false;
      state.error = null;
      state.login = false;
    });

    // Handle the fulfilled state for signup
    builder.addCase(signup.fulfilled, (state, action) => {
      state.user = action.payload.userData;
      state.loading = false;
      state.error = null;
      state.login = true;
    });

 
    builder.addMatcher(
      (action) => [login.pending, signup.pending,logout.pending,getuser.pending].includes(action.type),
      (state) => {
        state.loading = true;
        state.error = null;
      }
    );


    builder.addMatcher(
      (action) => [login.rejected, signup.rejected,getuser.rejected,logout.rejected].includes(action.type),
      (state, action) => {
        state.loading = false;
        state.error = action.payload
          ? action.payload.error
          : "Something went wrong";
      }
    );
  },
});

export default User.reducer;

export const { islogin, islogout ,setuser} = User.actions;
