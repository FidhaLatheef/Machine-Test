import {createSlice} from "@reduxjs/toolkit"

const userSlice=createSlice({
    name:'users',
    initialState:{
        users:[],
    },
    reducers:{
        addUser: (state, action) => {
            state.users.push(action.payload)
        },
      
    }
})
export const {getUser,addUser}=userSlice.actions;
export default userSlice.reducer;