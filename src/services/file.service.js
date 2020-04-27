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
      console.log(error);
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
      const data = MarkdownUtils.renderMarkdown(response.data);
      return data;
    } catch (error) {
      console.log(error);
      return {};
    }
  },
};

export default FileService;
