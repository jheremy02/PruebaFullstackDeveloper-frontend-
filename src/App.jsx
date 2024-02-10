import { useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import "react-toastify/dist/ReactToastify.css";
import { Tabs } from "flowbite-react";
import { HiAdjustments, HiClipboardList, HiUserCircle } from "react-icons/hi";
import { MdDashboard } from "react-icons/md";
import Card from "./components/Card";
import ModalAddStudent from "./components/ModalAddStudent";
import { useDispatch, useSelector } from "react-redux";
import { getGradosThunk } from "./features/grados/gradosSlice";
import 'flowbite';
import {  filteredPersonas, geTPersonasThunk } from "./features/personas/personasSlice";
import { getFilteredSelector, getPersonasSelector } from "./features/personas/selectors";
import ModalDeletePersona from "./components/ModalDeletePersona";
import { filterObjectsByAttribute } from "./utils/toolsFunctions";
function App() {
  const [count, setCount] = useState(0);
  const [serchText,setTextSearch]=useState('')
  const personasList=useSelector(getPersonasSelector)
  const filtered=useSelector( getFilteredSelector)
  const dispatch=useDispatch()

  useEffect(()=>{
    (async() =>{
      await dispatch(getGradosThunk())
      await dispatch(geTPersonasThunk())
      
    })()
  },[])

  function filterStudents(event) {
    try {
      setTextSearch(event.target.value)
      const filtered = filterObjectsByAttribute(personasList, ['nom_persona', 'ape_pate_pers', 'ape_mate_pers'],event.target.value)
      dispatch(filteredPersonas(filtered))
    } catch (error) {
      console.log(error)
    }
    
  }

  useEffect(()=>{

    const filtered = filterObjectsByAttribute(personasList, ['nom_persona', 'ape_pate_pers', 'ape_mate_pers'],serchText)
    dispatch(filteredPersonas(filtered))

  },[personasList])

  return (
    <>
      <div className="bg-white dark:bg-gray-900">
        <div className="py-8 px-10 mx-auto">
          <div className=" text-gray-500 sm:text-lg dark:text-gray-400">
            <Tabs aria-label="Default tabs" style="default">
              <Tabs.Item active title="Estudiantes" icon={HiUserCircle}>
                <div className="flex gap-6">
                  <div className="relative w-full">
                    <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                      <svg
                        className="w-4 h-4 text-gray-500 dark:text-gray-400"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 20 20"
                      >
                        <path
                          stroke="currentColor"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                        />
                      </svg>
                    </div>
                    <input
                      onInput={filterStudents}
                      type="search"
                      id="default-search"
                      className="block w-full outline-none p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      placeholder="Buscar estudiantes"
                      required
                    />
                  </div>
                  <div>
                    <ModalAddStudent></ModalAddStudent>
                    <ModalDeletePersona></ModalDeletePersona>
                  </div>
                </div>
                <div className="flex flex-wrap gap-6 mt-6 justify-center">
                  {filtered.slice().reverse().map(item=>{
                    return <Card key={crypto.randomUUID()} person={item} ></Card>
                  })}
                </div>
              </Tabs.Item>
              <Tabs.Item title="Pagos" icon={MdDashboard}>
                This is{" "}
                <span className="font-medium text-gray-800 dark:text-white">
                  Dashboard tab's associated content
                </span>
                . Clicking another tab will toggle the visibility of this one
                for the next. The tab JavaScript swaps classes to control the
                content visibility and styling.
              </Tabs.Item>
              <Tabs.Item title="Reportes" icon={HiAdjustments}>
                This is{" "}
                <span className="font-medium text-gray-800 dark:text-white">
                  Settings tab's associated content
                </span>
                . Clicking another tab will toggle the visibility of this one
                for the next. The tab JavaScript swaps classes to control the
                content visibility and styling.
              </Tabs.Item>
            </Tabs>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
