import axios from "axios";
import { CARGANDO, ERROR, TRAER_TODAS } from "../types/tareasTypes";

export const traerTodas = () => async (dispatch) => {
  dispatch({
    type: CARGANDO,
  });
  try {
    const respuesta = await axios.get(
      "https://jsonplaceholder.typicode.com/todos"
    );

    const tareas = {};
    respuesta.data.map(
      (tar) =>
        (tareas[tar.userId] = {
          ...tareas[tar.userId], //Todo lo que ya tenía
          [tar.id]: {
            ...tar, //Todo el elemento del array
          },
        })
    );

    dispatch({
      type: TRAER_TODAS,
      payload: respuesta,
    });
  } catch (error) {
    console.log(error.message);
    dispatch({
      type: ERROR,
      payload: "Información de tareas no disponible",
    });
  }
};
