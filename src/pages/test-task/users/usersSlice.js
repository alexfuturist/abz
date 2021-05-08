import {
    createSlice
} from "@reduxjs/toolkit";
import {
    usersAPI
} from "api/api";

//Reducer
export const usersSlice = createSlice({
    name: "users",
    initialState: {
        users: []
    },
    reducers: {
        setUsers: (state, action) => {
            state.users.push(action.payload)
        }
    }
});

export const {
    setUsers
} = usersSlice.actions;
export default usersSlice.reducer;