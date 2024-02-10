"use client";
import React, { useCallback, useEffect } from "react";
import { useDropzone } from "react-dropzone";
import { Button, Modal } from "flowbite-react";
import { forwardRef, useState } from "react";

import { Controller, set, useForm } from "react-hook-form";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useDispatch, useSelector } from "react-redux";
import { getGradosSelector } from "../features/grados/selectors";
import {
  calculateAge,
  convertFileToBase64,
  formatDate,
} from "../utils/toolsFunctions";
import UploadFile from "./UploadFile";
import { createPersonaThunk } from "../features/personas/personasSlice";
import { toast } from "react-toastify";
function ModalAddStudent() {
  const onDrop = useCallback((acceptedFiles) => {
    // Do something with the files
  }, []);
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });
  const [files, setFiles] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [dateSelected, setDateSelected] = useState(null);
  const [currentAge, setCurrentAge] = useState(null);
  const grados = useSelector(getGradosSelector);
  const dispatch = useDispatch();
  const InputDateOperation = forwardRef(({ value, onClick }, ref) => (
    <input
      type="text"
      value={value}
      id="fecha_naci"
      onClick={onClick}
      name="fecha_naci"
      ref={ref}
      className="bg-gray-50 border border-gray-300 text-gray-900 outline-none text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
      placeholder="yyyy-mm-dd"
      required
    />
  ));

  InputDateOperation.displayName = "date_born";
  const {
    register,
    setValue,
    control,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    setValue(
      "age_student",
      dateSelected ? calculateAge(formatDate(dateSelected)) : null
    );
  }, [dateSelected]);

  const onSubmit = async (data) => {
    toast.loading("Cargando...");
    setOpenModal(false);

    try {
      let file = null;

      if (data.file_photo) {
        file = await convertFileToBase64(data.file_photo);
      }
      const fecha_naci = formatDate(data.fecha_naci);
      const newPerson = {
        ...data,
        photo: file,
        fecha_naci,
        name_photo: data.file_photo?.name || null,
      };
      const response = await dispatch(createPersonaThunk(newPerson));
      const { payload } = response;
      toast.dismiss();
      if (payload && payload.success) {
        reset()
        toast.success("Estudiante creado con exito !!");
      } else {
        toast.error("No se pudo crear al estudiante");
        setOpenModal(true);
      }
    } catch (error) {
      toast.dismiss();
      setOpenModal(true);
      toast.error("No se pudo crear al estudiante");
    }
  };

  function handleChangeFile(event) {
    const file = event.target.files[0];
    console.log(file);
    setValue("file", file);
  }

  return (
    <>
      <Button onClick={() => setOpenModal(true)}>Nuevo</Button>
      <Modal show={openModal} onClose={() => setOpenModal(false)}>
        <Modal.Header>Nuevo Estudiante</Modal.Header>
        <Modal.Body>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="grid gap-6 mb-6 md:grid-cols-2">
              <div>
                <label
                  htmlFor="nom_persona"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Nombres
                </label>
                <input
                  type="text"
                  id="nom_persona"
                  className="bg-gray-50 border outline-none border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder=""
                  {...register("nom_persona", {
                    required: true,
                    maxLength: 40,
                  })}
                />
                {errors.nom_persona?.type === "required" && (
                  <p className="mt-2 mb-0 text-xs text-red-600 dark:text-red-500">
                    Este Campo es obligatorio.
                  </p>
                )}
                {errors.nom_persona?.type === "maxLength" && (
                  <p className="mt-2 mb-0 text-xs text-red-600 dark:text-red-500">
                    Maximo 40 caracteres.
                  </p>
                )}
              </div>
              <div>
                <label
                  htmlFor="ape_pate_pers"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Apellido Paterno
                </label>
                <input
                  type="text"
                  id="ape_pate_pers"
                  className="bg-gray-50 border outline-none border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder=""
                  {...register("ape_pate_pers", {
                    required: true,
                    maxLength: 40,
                  })}
                />
                {errors.ape_pate_pers?.type === "required" && (
                  <p className="mt-2 mb-0 text-xs text-red-600 dark:text-red-500">
                    Este Campo es obligatorio.
                  </p>
                )}
                {errors.ape_pate_pers?.type === "maxLength" && (
                  <p className="mt-2 mb-0 text-xs text-red-600 dark:text-red-500">
                    Maximo 40 caracteres.
                  </p>
                )}
              </div>
              <div>
                <label
                  htmlFor="ape_mate_pers"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Apellido Materno
                </label>
                <input
                  type="text"
                  id="ape_mate_pers"
                  className="bg-gray-50 border outline-none border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Flowbite"
                  {...register("ape_mate_pers", {
                    required: true,
                    maxLength: 40,
                  })}
                />
                {errors.ape_mate_pers?.type === "required" && (
                  <p className="mt-2 mb-0 text-xs text-red-600 dark:text-red-500">
                    Este Campo es obligatorio.
                  </p>
                )}
                {errors.ape_mate_pers?.type === "maxLength" && (
                  <p className="mt-2 mb-0 text-xs text-red-600 dark:text-red-500">
                    Maximo 40 caracteres.
                  </p>
                )}
              </div>
              <div>
                <label
                  htmlFor="nid_grado"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Grado
                </label>

                <Controller
                  control={control}
                  rules={{ required: true }}
                  name="nid_grado"
                  render={({ field: { onChange, onBlur, value, ref } }) => (
                    <select
                      id="nid_grado"
                      value={value}
                      className="bg-gray-50 outline-none border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      onChange={onChange}
                    >
                      <option value="" selected>
                        Selecciona
                      </option>
                      {grados.map((grado) => {
                        return (
                          <option
                            key={crypto.randomUUID()}
                            value={grado.nid_grado}
                          >
                            {grado.desc_grado} {grado.nivel}
                          </option>
                        );
                      })}
                    </select>
                  )}
                />
                {errors.nid_grado && (
                  <p className="mt-2 mb-0 text-xs text-red-600 dark:text-red-500">
                    Esate Campo es obligatorio
                  </p>
                )}
              </div>
              <div>
                <label
                  htmlFor="fecha_naci"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Fecha Nacimiento
                </label>
                <Controller
                  defaultValue={dateSelected}
                  name="fecha_naci"
                  control={control}
                  rules={{ required: true }}
                  render={({ field }) => (
                    <DatePicker
                    dropdownMode="select"
                    showYearDropdown
                    
                      dateFormat={"yyyy-MM-dd"}
                      {...field}
                      value={field.value}
                      onChange={(date) => {
                        field.onChange(date);
                        setDateSelected(date);
                      }}
                      selected={field.value}
                      customInput={<InputDateOperation></InputDateOperation>}
                    />
                  )}
                />
                {errors.date_operation && (
                  <p className="mt-2 mb-0 text-xs text-red-600 dark:text-red-500">
                    Esate Campo es obligatorio
                  </p>
                )}
              </div>
              <div>
                <label
                  htmlFor="age_student"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Edad
                </label>
                <input
                  value={currentAge}
                  type="text"
                  id="age_student"
                  className="bg-gray-50 border outline-none border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="años(s) mes(es)"
                  {...register("age_student")}
                />
              </div>
            </div>
            <div className="mb-6">
              {/*
              <UploadFile files={files} setFiles={setFiles}></UploadFile>
            */}
              <input  className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400" id="file_input" type="file" name="picture" accept=".png, .jpg, .jpeg" {...register('photo')} onChange={(e)=>{
                setValue('file_photo',e.target.files[0])
              }}/>
              <p className="mt-1 text-sm text-gray-500 dark:text-gray-300" id="file_input_help">PNG, JPG, JPEG</p>
            </div>
            <div className="flex gap-5">
              <button
                type="submit"
                className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
              >
                Agregar
              </button>
            </div>
          </form>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default ModalAddStudent;
