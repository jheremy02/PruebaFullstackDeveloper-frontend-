import React from 'react'
import { calculateAge } from '../utils/toolsFunctions';
import { useDispatch } from 'react-redux';
import { showModalDeleteReducer } from '../features/ui/uiSlice';
import { selectedPersona } from '../features/personas/personasSlice';
const api_base=import.meta.env.VITE_API_BASE_URL

function Card({person}) {

  const dispatch=useDispatch();
  const {nid_persona, nom_persona, ape_pate_pers, ape_mate_pers, nid_grado, fecha_naci, foto_ruta,nivel,desc_grado}=person
  
  return (
    

<div className="w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
    <div className="flex justify-end px-3 pt-5">
        
    </div>
    <div className="flex flex-col items-center pb-8">
        <img className="w-24 h-24 mb-3 rounded-full shadow-lg"  onError={({ currentTarget }) => {
    currentTarget.onerror = null; // prevents looping
    currentTarget.src="https://flowbite.com/docs/images/people/profile-picture-5.jpg";
  }}  src={api_base+foto_ruta} alt="Bonnie image"/>
        <h5 className="mb-1 text-xl font-medium text-gray-900 dark:text-white">{`${nom_persona} ${ape_pate_pers} ${ape_mate_pers}`}</h5>
        <span className="text-sm text-gray-500 dark:text-gray-400">{calculateAge(fecha_naci)}</span>
        <span className="text-sm mt-3 text-gray-500 dark:text-gray-400">{`${desc_grado} ${nivel}`}</span>
        <div className="flex mt-4 md:mt-6">
        <button type="button" onClick={()=>{
          dispatch(selectedPersona(person))
          dispatch(showModalDeleteReducer(true))
          
        }} className="text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">Borrar</button>
        </div>
    </div>
</div>

  )
}

export default Card