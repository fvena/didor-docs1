/**
 * Obtengo el código del error;
 *
 * 1- Errores devueltos por el Backend
 * 2- Errores dentro de la aplicación
 * 3- Cualquier otro error
 *
 * @param {Error} error - Objeto Error
 * @return {String} Código del error
 */
/* prettier-ignore */
const getErrorId = error => {
  let errorId = null;

  if (error.response && error.response.status) {
    errorId = error.response.status; // [1]
  } else if (error.name) {
    errorId = error.name; // [2]
  } else {
    errorId = 'default'; // [3]
  }

  return errorId;
};

export default { getErrorId };
