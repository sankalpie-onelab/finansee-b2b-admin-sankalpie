import { createSlice, combineReducers } from "@reduxjs/toolkit";

interface User {
    user_id: string;
    name: number;
    email: string;
    role: string;
}

interface Role {
    role_name: string;
    features: string[];
}

export const usersReducer = createSlice({
    name: "data",
    initialState: [] as User[],
    reducers: {
        setUsersData: (_state, action) => {
            return action.payload;
        }
    }
})

export const roleReducer = createSlice({
    name: "role",
    initialState: [] as Role[],
    reducers: {
        setRoleData: (_state, action) => {
            return action.payload;
        }
    }
})

export const { setUsersData } = usersReducer.actions;
export const { setRoleData } = roleReducer.actions;

const rootReducer = combineReducers({
    users: usersReducer.reducer,
    roles: roleReducer.reducer
});

export default rootReducer;
