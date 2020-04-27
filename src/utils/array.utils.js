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
 * Devuelve el item de la lista cuyo link coincida con el indicado
 *
 * @params {array} list - Lista con todos los items
 * @params {string} matchingLink - Link que estamos buscando
 * @returns {Object} - Objeto encontrado
 */
// prettier-ignore
const searchItemByLinks = (list, matchingLink) => new Promise(resolve => {
  const flatList = flattenList(list);
  const index = flatList.findIndex(item => item.link === matchingLink);
  const current = flatList[index];

  const item = {};
  item.current = current;
  item.prev = index - 1 >= 0 ? flatList[index - 1] : null;
  item.next = index + 1 <= flatList.length ? flatList[index + 1] : null;

  resolve(item);
});

const checkArray = myArray => Array.isArray(myArray) && myArray.length > 0;

export default {
  flattenList,
  searchItemByLinks,
  checkArray,
};
