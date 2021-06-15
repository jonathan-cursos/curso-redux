import React from "react";

const App = () => {
  const ponerFilas = () => [
    <tr>
      <td>Jonathan</td>
      <td>jona@gmail.com</td>
      <td>jona.com</td>
    </tr>,
    <tr>
      <td>Jonathan</td>
      <td>jona@gmail.com</td>
      <td>jona.com</td>
    </tr>,
  ];
  return (
    <div className="margen">
      <table className="tabla">
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Correo</th>
            <th>Enlace</th>
          </tr>
        </thead>
        <tbody>{ponerFilas()}</tbody>
      </table>
    </div>
  );
};

export default App;
