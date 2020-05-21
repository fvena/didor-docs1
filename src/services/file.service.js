import ApiService from './api.service';
import LinksUtils from '../utils/links.utils';
import MarkdownUtils from '../utils/markdown.utils';

const FileService = {
  /**
   * Carga un archivo markdown y obtiene un listado de links
   *
   * @param {string} path - Ruta del archivo markdown
   * @return {array} - Listado de links
   */
  async getLinks(path, section) {
    try {
      const response = await ApiService.get(path);
      return LinksUtils.getListLinks(response.data, section);
    } catch (error) {
      // console.log(error); // eslint-disable-line
      return [];
    }
  },

  /**
   * Carga un archivo markdown y lo renderiza
   *
   * @param {string} path - Ruta del archivo markdown
   * @return {object} - Markdown renderizado y datos contenidos en el archivo
   */
  async getArticle(path) {
    try {
      const response = await ApiService.get(path);
      const article = await MarkdownUtils.renderMarkdown(response.data);

      /**
       * Añade en el árticulo la fecha de la última modficación
       */
      const titleIndex = article.render.indexOf('</h1>');
      const lastModified = response.headers['last-modified'];
      if (titleIndex && lastModified) {
        const content = article.render;
        const lastModifiedIndex = titleIndex + 5;
        const lastModifiedComponent = `<lastModified date="${lastModified}" />`;
        article.render = content.slice(0, lastModifiedIndex) + lastModifiedComponent + content.slice(lastModifiedIndex);
      }

      return article;
    } catch (error) {
      // console.log(error); // eslint-disable
      return {};
    }
  },
};

export default FileService;
