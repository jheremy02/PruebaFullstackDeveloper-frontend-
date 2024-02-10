import client from "./client"


export const  getGradosService=async()=>{
    try {
        const response = await client.get('/api/grados')
        return response
    } catch (error) {
        throw new Error(error.message)
    }
}

export const createPersonaService=async(newPersona)=>{
    try {
        const response= await client.post('/api/personas',newPersona)
        return response
    } catch (error) {
        throw new Error(error.message)
    }
}

export const getPersonasService=async () =>{
    try {
        const response=await client.get('/api/personas')  ;

        return response
    } catch (error) {
        throw new Error(error.message)
    }
}

export const deletePersonaService=async(id)=>{
    try {
        const response= await client.delete(`/api/personas/${id}`)
        return response
    } catch (error) {
        throw new Error(error.message)
    }
}