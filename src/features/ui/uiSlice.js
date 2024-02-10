import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'


const initialState={
    showModalDelete:false
}

const uiSlice=createSlice({
    name:'ui',
    initialState,
    reducers:{
        showModalDeleteReducer: (state,action)=>{
            state.showModalDelete=action.payload
        },
    },
})

export const { showModalDeleteReducer } = uiSlice.actions
export default uiSlice.reducer