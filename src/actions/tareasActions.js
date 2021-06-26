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
      payload: tareas,
    });
  } catch (error) {
    console.log(error.message);
    dispatch({
      type: ERROR,
      payload: "Información de tareas no disponible",
    });
  }
};

export const cambioUsuarioId = (usuario_id) => (dispatch) => {
  dispatch({
    type: "cambio_usuario_id",
    payload: usuario_id,
  });
};

export const cambioTitulo = (titulo) => (dispatch) => {
  dispatch({
    type: "cambio_titulo",
    payload: titulo,
  });
};

export const agregar = (nuevaTarea) => async (dispatch) => {
  dispatch({
    type: CARGANDO,
  });
  try {
    const respuesta = await axios.post(
      "https://jsonplaceholder.typicode.com/todos",
      nuevaTarea
    );
    console.log(respuesta.data);
    dispatch({
      //No colocamos payload, porque los datos los estamos enviando a una DB
      type: "agregada",
    });
  } catch (error) {
    console.log(error.message);
    dispatch({
      type: ERROR,
      payload: "Intente más tarde",
    });
  }
};
