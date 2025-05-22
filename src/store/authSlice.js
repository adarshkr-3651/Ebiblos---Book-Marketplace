import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    status:false,
    userData:null,
}

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers:{
        login:(state,action)=>{
            state.status = true;
            state.userData = action.payload;
        },
        logout(state){
            state.status = false;
            state.userData = null;
        }
        //here login and logout are the actions
        //while exporting the slice or reducer, we will export the actions as well
    }
})

const postSclice = createSlice({
    name: 'posts',
    initialState:{
        posts:[]
    },
    reducers:{
        addPost:(state,action)=>{
            state.posts.push(action.payload);
        }
    }
})
//here addPost is the action

export const {login,logout} = authSlice.actions;
export const {addPost} = postSclice.actions;

export default authSlice.reducer;
export const postReducer = postSclice.reducer;
//here we are exporting the reducer