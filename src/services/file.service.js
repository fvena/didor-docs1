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
  async getLinks(path, buildPath, section) {
    try {
      const fullPath = buildPath ? `./${buildPath}/${path}` : path;
      const response = await ApiService.get(fullPath);
      return LinksUtils.getListLinks(response.data, section);
    } catch (error) {
      return [];
    }
  },

  /**
   * Carga un archivo markdown y lo renderiza
   *
   * @param {string} path - Ruta del archivo markdown
   * @return {object} - Markdown renderizado y datos contenidos en el archivo
   */
  async getArticle(path, buildPath) {
    try {
      const fullPath = buildPath ? buildPath + path : path;
      const response = await ApiService.get(fullPath);
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
      /**
       * No ha encontrado el archivo
       */
      return null;
    }
  },
};

export default FileService;
