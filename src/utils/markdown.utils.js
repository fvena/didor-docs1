import MarkdownToc from 'markdown-it-toc-and-anchor';
import MarkdownFrontMatter from 'markdown-it-front-matter';
import MarkdownEmoji from 'markdown-it-emoji';
import MarkdownCheckbox from 'markdown-it-task-lists';
import MarkdownVideo from 'markdown-it-video';
import MarkdownNotes from 'markdown-it-div';
import yaml from 'js-yaml';

let data = {};
const tags = [];
const config = window.$didor;

/**
 * Instancio la librería Markdown-it
 */
const md = require('markdown-it')({
  html: true,
  xhtmlOut: true,
  breaks: true,
  linkify: true,
  typographer: true,
  quotes: '“”‘’',
});

/**
 * Plugin Toc,
 * Muestra una tabla de contenidos si añadimos [toc]
 */
md.use(MarkdownToc, {
  tocClassName: 'markdownToc',
  tocFirstLevel: 2,
  tocLastLevel: 2,
  anchorLink: false,
});

/**
 * Plugin FrontMatter
 * Permite leer datos del archivo markdown
 */
md.use(MarkdownFrontMatter, frontMatter => {
  data = yaml.load(frontMatter);
});

/**
 * Plugin Emoki
 */
md.use(MarkdownEmoji);

/**
 * Plugin Video
 */
md.use(MarkdownVideo);

/**
 * Plugin Notes
 */
md.use(MarkdownNotes, {
  render(tokens, idx) {
    let tag = tokens[idx].info.trim();
    const openTag = tokens[idx].nesting === 1;

    // Check is collapse tag
    const collapse = tag.match(/^collapse title="(.*)"$/);
    if (collapse) tag = 'collapse';

    if (tag) {
      tags.push(tag);
    } else {
      tag = tags.pop();
    }

    switch (tag) {
      // Alarms
      case 'tip':
      case 'note':
      case 'warn':
        if (openTag) {
          return `<div>\n<Alarm type="${tag}">\n`;
        }
        return '</Alarm>\n</div>\n';

      // Collapse
      case 'collapse':
        if (openTag) {
          return `<div>\n<Collapse title="${collapse[1]}">\n`;
        }
        return '</Collapse>\n</div>\n';

      // Codegroup
      case 'codegroup':
        if (openTag) {
          return '<div>\n<Codegroup>\n';
        }
        return '</Codegroup>\n</div>\n';

      // Default
      default:
        if (openTag) {
          return `<div class="${tag}">\n`;
        }
        return '</div>\n';
    }
  },
});

/**
 * Plugin Checkbox
 */
md.use(MarkdownCheckbox, { label: true, labelAfter: true });

/**
 * Reescribo el renderizado del código para que se muestre como un componente
 */
md.renderer.rules.fence = (tokens, idx) => {
  const token = tokens[idx];
  const info = token.info ? md.utils.unescapeAll(token.info).trim() : '';
  const lang = info ? info.split(/\s+/g)[0] : '';
  const getLanguage = /(\w+)/.exec(lang);

  // Tengo que codificar el código para que no me dé problemas cuando tengo código Vue
  // ya que intenta interpretar el código
  const code = encodeURI(md.utils.escapeHtml(token.content));

  // Compruebo si es una demo,
  const isDemo = getLanguage && getLanguage[1] === 'demo';
  const isDemoCode = getLanguage && getLanguage[1] === 'demoCode';

  if (isDemo || isDemoCode) {
    const isEditable = isDemoCode ? 'editable' : '';
    return `<AppDemo code="${code}" jsLib="${config.jsLib}" cssLib="${config.cssLib}" ${isEditable}></AppDemo>`;
  }

  // Obtengo el lenguaje, las lineas a resaltar y el nombre del archivo si existen
  const getLines = /\{(.+)\}/.exec(lang);
  const getFile = /\[(.+)\]/.exec(lang);

  const language = getLanguage && getLanguage[1] ? getLanguage[1] : 'js';
  const lines = getLines ? getLines[1] : '';
  const filename = getFile ? getFile[1] : '';

  return `<AppCode lang="${language}" code="${code}" lines="${lines}" filename="${filename}"></AppCode>`;
};

/**
 * Renderiza markdown como html
 */
// prettier-ignore
const renderMarkdown = markdown => new Promise(resolve => {
  const render = md.render(markdown)

  resolve({ render, data });
});

export default {
  renderMarkdown,
};
