/**
 * FlattenList
 * Toma array de objetos, los cuales a su vez contienen otros arrays,
 * y devuelve un nuevo array donde sustituye al padre por hijos
 *
 * @param {array} list - Listado con todos los links
 * @returns {array} - Listado con un solo nivel
 */
const flattenList = list => {
  let flatList = [];

  list.forEach(item => {
    if (item.children) {
      flatList = flatList.concat(flattenList(item.children));
    } else {
      flatList.push(item);
    }
  });

  return flatList;
};

/**
 * SearchItemByLinks
 * Devuelve el elemento de la lista cuyo link coincida con el indicado,
 * también devuelve el elemento previo y posterior si existen
 * En caso de no encontrar ninguna coincidencia devuelve null
 *
 * @param {array} list - Lista con todos los elementos
 * @param {string} matchingLink - Link que estamos buscando
 * @returns {Object} - Objeto con el elmento y el anterior y posterior si existiese
 */
// prettier-ignore
const searchItemByLinks = (list, matchingLink) => new Promise(resolve => {
  const flatList = flattenList(list);
  const index = flatList.findIndex(item => item.link === matchingLink);
  let item = null;

  if(index >= 0) {
    item = {};
    item.current = flatList[index];
    item.prev = index - 1 >= 0 ? flatList[index - 1] : null;
    item.next = index + 1 < flatList.length ? flatList[index + 1] : null;
  }

  resolve(item);
});

/**
 * CheckArray
 * Comprueba si un valor es un array y tiene algún elemento
 *
 * @param {Array} myArray - Valor a comprobar
 * @returns {Boolean} - indica si el valor es un array
 */
const checkArray = myArray => Array.isArray(myArray) && myArray.length > 0;

export default {
  flattenList,
  searchItemByLinks,
  checkArray,
};
