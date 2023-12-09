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
        getUser:(state,action)=>{
            state.users=action.payload.map(user=>{
                return{...user};
            })
        },
        updateUser: (state, action) => {
            const index = state.users.findIndex((item) => item._id === action.payload._id);
            state.users[index] = {
                password: action.payload.password,
                name: action.payload.name,
                image: action.payload.image,
                mobile: action.payload.mobile,
                address: action.payload.address,
                _id: action.payload._id

            }
        },
      
    }
})
export const {getUser,addUser,updateUser}=userSlice.actions;
export default userSlice.reducer;