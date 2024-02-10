import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { getGradosService } from '../../api/services'


export const getGradosThunk=createAsyncThunk('grados/getGradosThunk',async()=>{
    const response= await getGradosService()
    return response
})

const initialState={
    isLoading:false,
    success:true,
    error:false,
    gradosList:[]
}

const gradosSlice=createSlice({
    name:'grados',
    initialState,
    extraReducers:(builder)=>{
        builder.addCase(getGradosThunk.pending,(state,action)=>{
            state.isLoading=true
        })

        builder.addCase(getGradosThunk.fulfilled,(state,action)=>{
            state.isLoading=false
            state.error=false
            state.success=true
            const {data}=action.payload
            state.gradosList=data
        })

        builder.addCase(getGradosThunk.rejected,(state,action)=>{
            state.isLoading=false
            state.error=true
            state.success=false
        })
    }
})


export  default gradosSlice.reducer
