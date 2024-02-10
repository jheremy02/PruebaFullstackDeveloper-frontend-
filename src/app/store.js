import { configureStore } from '@reduxjs/toolkit'
import gradosSlice from '../features/grados/gradosSlice'
import personasSlice from '../features/personas/personasSlice'
import uiSlice from '../features/ui/uiSlice'


export const store = configureStore({
    reducer: {
      grados:gradosSlice,
      personas:personasSlice,
      ui:uiSlice
    },
  })