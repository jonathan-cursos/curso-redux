import axios from "axios";
import {
  CARGANDO,
  ERROR,
  TRAER_TODAS,
  CAMBIO_USUARIO_ID,
  CAMBIO_TITULO,
  GUARDAR,
  ACTUALIZAR,
} from "../types/tareasTypes";

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
    type: CAMBIO_USUARIO_ID,
    payload: usuario_id,
  });
};

export const cambioTitulo = (titulo) => (dispatch) => {
  dispatch({
    type: CAMBIO_TITULO,
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
      type: GUARDAR,
    });
  } catch (error) {
    console.log(error.message);
    dispatch({
      type: ERROR,
      payload: "Intente más tarde",
    });
  }
};

export const editar = (tareaEditada) => async (dispatch) => {
  dispatch({
    type: CARGANDO,
  });
  try {
    const respuesta = await axios.put(
      `https://jsonplaceholder.typicode.com/todos/${tareaEditada.id}`,
      tareaEditada
    );
    console.log(respuesta.data);
    dispatch({
      //No colocamos payload, porque los datos los estamos enviando a una DB
      type: GUARDAR,
    });
  } catch (error) {
    console.log(error.message);
    dispatch({
      type: ERROR,
      payload: "Intente más tarde",
    });
  }
};

export const cambioCheck = (usu_id, tar_id) => (dispatch, getState) => {
  const { tareas } = getState().tareasReducer;
  const seleccionada = tareas[usu_id][tar_id];

  const actualizadas = {
    ...tareas,
  };
  actualizadas[usu_id] = {
    ...tareas[usu_id],
  };
  actualizadas[usu_id][tar_id] = {
    //Lo que hacemos al hacer esto tantas veces es subir de niveles dentro de los objetos que tienen dentro otros objetos
    ...tareas[usu_id][tar_id],
    completed: !seleccionada.completed,
  };
  dispatch({
    type: ACTUALIZAR,
    payload: actualizadas,
  });
};
