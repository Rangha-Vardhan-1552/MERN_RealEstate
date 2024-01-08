import { createSlice } from "@reduxjs/toolkit";

const initialState={
    currentUser:null,
    error:false,
    loading:false

};

const userSlice =createSlice({
    name:'user',
    initialState,
    reducers:{
        signInStart:(state)=>{
            state.loading=true;
        },
        signInSuccess:(state, action)=>{
            state.currentUser=action.payload;
            state.error=null;
            state.loading=false;
        },
        signInFailure:(state,action)=>{
            state.error=action.payload
            state.loading=false
        },
        updateUserStart:(state)=>{
            state.loading=true;
        },
        updateUserSuccess:(state,action)=>{
            state.currentUser=action.payload;
            state.loading=false;
            state.error=null;
        },
        updateFailure:(state,action)=>{
            state.error=action.payload;
            state.loading=false;
        },

        deleteUserStart:(state)=>{
            state.loading=true
        },
        deleteUserSuccess:(state)=>{
            state.currentUser=null
            state.loading=false;
            state.error=null;
        },
        deleteUserFailure:(state,action)=>{
            state.loading=false;
            state.error=action.payload;
        },

        signOuteUserStart:(state)=>{
            state.loading=true
        },
        signOuteUserSuccess:(state)=>{
            state.currentUser=null
            state.loading=false;
            state.error=null;
        },
        signOuteUserFailure:(state,action)=>{
            state.loading=false;
            state.error=action.payload;
        }
    }
})

export const {signInStart,
    signInSuccess, 
    signInFailure,
    updateUserStart,
    updateUserSuccess,
    updateFailure,
    deleteUserStart,
    deleteUserSuccess,
    deleteUserFailure,
    signOuteUserStart,
    signOuteUserSuccess,
    signOuteUserFailure

} = userSlice.actions;

export default userSlice.reducer;