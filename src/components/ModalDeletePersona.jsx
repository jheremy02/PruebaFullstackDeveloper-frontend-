
'use client';

import { Button, Modal } from 'flowbite-react';
import { useState } from 'react';
import { HiOutlineExclamationCircle } from 'react-icons/hi';
import { useDispatch, useSelector } from 'react-redux';
import { showModalDeleteSelector } from '../features/ui/selectors';
import { showModalDeleteReducer } from '../features/ui/uiSlice';
import { getPersonaSelected } from '../features/personas/selectors';
import { deletePersonaThunk } from '../features/personas/personasSlice';
import { toast } from 'react-toastify';

function ModalDeletePersona() {
  
  const dispatch = useDispatch();
  const showModalDelete = useSelector(showModalDeleteSelector);
  const personaSelected = useSelector(getPersonaSelected);

  function getFullName(persona) {
    const {nom_persona,ape_pate_pers,ape_mate_pers}=persona
      const fullName=`${nom_persona} ${ape_pate_pers} ${ape_mate_pers}`
      return fullName
  }

  async function submitDelete() {
    try {
      dispatch(showModalDeleteReducer(false))
      toast.loading('Cargando...')
      const response= await dispatch(deletePersonaThunk(personaSelected.nid_persona))
      toast.dismiss()
      const {payload}=response
      if (payload && payload.success) {
        toast.success('Estudiante eliminado con exito.')
      } else {
        toast.error('El estudiante no pudo ser eliminado.')
        dispatch(showModalDeleteReducer(true))
      }
    } catch (error) {
      toast.error('El estudiante no pudo ser eliminado.')
      dispatch(showModalDeleteReducer(true))
    }
  }

  return (
    <>
      <Modal show={showModalDelete} size="md" onClose={() => dispatch(showModalDeleteReducer(false))} popup>
        <Modal.Header />
        <Modal.Body>
          <div className="text-center">
            <HiOutlineExclamationCircle className="mx-auto mb-4 h-14 w-14 text-gray-400 dark:text-gray-200" />
            <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
              Seguro que quieres elimnar este estudiante ?
            </h3>
            <h5 className="mb-1 text-xl font-medium text-gray-900 dark:text-white">{personaSelected?getFullName(personaSelected):''}</h5>
            <div className="flex justify-center gap-4">
              <Button color="failure" onClick={() => {
                submitDelete()
              }}>
                {"Si"}
              </Button>
              <Button color="gray" onClick={() => dispatch(showModalDeleteReducer(false))}>
                No, cancelar
              </Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
}


export default ModalDeletePersona