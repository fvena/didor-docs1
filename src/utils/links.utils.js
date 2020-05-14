function slugify(string) {
  const a = 'àáâäæãåāăąçćčđďèéêëēėęěğǵḧîïíīįìłḿñńǹňôöòóœøōõőṕŕřßśšşșťțûüùúūǘůűųẃẍÿýžźż·/-,:;';
  const b = 'aaaaaaaaaacccddeeeeeeeegghiiiiiilmnnnnoooooooooprrsssssttuuuuuuuuuuwxyyzzz______';
  const p = new RegExp(a.split('').join('|'), 'g');

  return string
    .toString()
    .toLowerCase()
    .replace(/\s+/g, '_') // Replace spaces with _
    .replace(p, c => b.charAt(a.indexOf(c))) // Replace special characters
    .replace(/&/g, '_y_') // Replace & with 'and'
    .replace(/[^\w-]+/g, '') // Remove all non-word characters
    .replace(/__+/g, '_') // ceplace multiple __ with single _
    .replace(/^_+/, '') // Trim - from start of text
    .replace(/_+$/, ''); // Trim - from end of text
}

function getParentNode(level, jsonTree) {
  let i = 0;
  let node = jsonTree[jsonTree.length - 1];

  while (i < level - 1) {
    const children = node.children;
    if (children) {
      node = children[children.length - 1];
    }
    i += 1;
  }

  if (!node.children) {
    node.children = [];
  }

  return node;
}

/**
 * GetListLinks
 * Convierte un listado de links en Markdown en un array de objetos con los links
 *
 * @params  {String} markdown - Listado de links en Markdown
 * @params  {String} section - Ruta de la sección para añadirla a los links
 * @returns {Array} - Array de objetos con los links
 */
// prettier-ignore
const getListLinks = (markdown, section) => new Promise(resolve => {
  const jsonTree = [];
  const lines = markdown.split('\n');
  const regex = /^(\s*)-\s\[(.*)\]\s*(\((.*)\))?/;

  lines.forEach(line => {
    const matchs = line.match(regex);

    if (matchs) {
      const level = matchs[1].length / 2;
      const title = matchs[2];
      const file = matchs[4] && matchs[4] !== '/' ? matchs[4] : null;
      const link = !file ? null : section ? `${section}/${slugify(title)}` : `/${slugify(title)}`;
      const node = {title};
      if (file) node.file = file;
      if (link) node.link = link;

      if (level === 0) {
        jsonTree.push(node);
      } else {
        const p = getParentNode(level, jsonTree);
        p.children.push(node);
      }
    }
  });

  resolve(jsonTree);
});

export default {
  slugify,
  getParentNode,
  getListLinks,
};
