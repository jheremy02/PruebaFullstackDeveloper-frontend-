import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { createPersonaService, deletePersonaService, getPersonasService } from '../../api/services'


export const geTPersonasThunk = createAsyncThunk('persona/geTPersonasThunk', async (params) => {
    const response = await getPersonasService();
    return response
})

export const deletePersonaThunk = createAsyncThunk('persona/deletePersonaThunk', async (idPersona) => {
    const response = await deletePersonaService(idPersona)
    return response
})

export const createPersonaThunk = createAsyncThunk('persona/createPersonaThunk', async (newPersona) => {
    const response = await createPersonaService(newPersona)
    return response
})

const initialState = {

    isLoading: false,
    success: true,
    error: false,
    personasList: [],
    personaSelected: null,
    personasFiltered: []
}

const personasSlice = createSlice({
    name: 'personas',
    initialState,
    reducers: {
        selectedPersona: (state, action) => {
            state.personaSelected = action.payload
        },

        filteredPersonas: (state, action) => {
            
            
            state.personasFiltered = action.payload
        }
    },
    extraReducers: (builder) => {
        builder.addCase(createPersonaThunk.pending, (state, action) => {
            state.isLoading = true

        })

        builder.addCase(createPersonaThunk.fulfilled, (state, action) => {

            state.isLoading = false
            state.success = true
            state.error = false
            const { data } = action.payload
            state.personasList.push(data)


        })

        builder.addCase(createPersonaThunk.rejected, (state, action) => {
            state.isLoading = false
            state.success = false
            state.error = true
        })


        builder.addCase(geTPersonasThunk.pending, (state, action) => {
            state.isLoading = true
        })

        builder.addCase(geTPersonasThunk.fulfilled, (state, action) => {

            state.isLoading = false
            state.success = true
            state.error = false
            const { data } = action.payload
            state.personasList = data
            state.personasFiltered=data
        })

        builder.addCase(geTPersonasThunk.rejected, (state, action) => {
            state.isLoading = false
            state.success = false
            state.error = true
        })

        builder.addCase(deletePersonaThunk.pending, (state, action) => {
            state.isLoading = true
        })

        builder.addCase(deletePersonaThunk.fulfilled, (state, action) => {
            state.isLoading = false
            state.success = true
            state.error = false
            const { idPersona } = action.payload
            const updatedPersonas = state.personasList.filter(persona => persona.nid_persona != Number(idPersona))
            state.personasList = updatedPersonas

        })

        builder.addCase(deletePersonaThunk.rejected, (state, action) => {
            state.isLoading = false
            state.success = false
            state.error = true
        })

    }
})

export const { selectedPersona, filteredPersonas } = personasSlice.actions
export default personasSlice.reducer