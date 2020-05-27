import MarkdownToc from 'markdown-it-toc-and-anchor';
import MarkdownFrontMatter from 'markdown-it-front-matter';
import MarkdownEmoji from 'markdown-it-emoji';
import MarkdownCheckbox from 'markdown-it-task-lists';
import MarkdownVideo from 'markdown-it-block-embed';
import MarkdownNotes from 'markdown-it-div';
import MarkdownFigures from 'markdown-it-implicit-figures';
import MarkdownExternalLinks from 'markdown-it-external-links';
import markdownItRegex from 'markdown-it-regex';
import yaml from 'js-yaml';
import LinksUtils from './links.utils';

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
  linkify: false,
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
  anchorLink: true,
  anchorLinkSpace: false,
  wrapHeadingTextInAnchor: true,
  anchorClassName: 'anchor-link',
  slugify: string => LinksUtils.slugify(string),
});

/**
 * Plugin FrontMatter
 * Permite leer datos del archivo markdown
 */
md.use(MarkdownFrontMatter, frontMatter => {
  data = yaml.load(frontMatter);
});

/**
 * Iconos
 */
md.use(markdownItRegex, {
  name: 'icons',
  regex: /:([a-zA-Z-]+):/,
  replace: match => {
    return `<dd-icon name="${match}" scale="0.8"></dd-icon>`;
  },
});

/**
 * Plugin Emoji
 */
md.use(MarkdownEmoji);

/**
 * Plugin Video
 */
md.use(MarkdownVideo);

/**
 * Plugin Figures
 */
md.use(MarkdownFigures, {
  figcaption: true,
});

/**
 * Plugin Links externos
 */
md.use(MarkdownExternalLinks, {
  externalClassName: 'link link--external',
  internalClassName: 'link link--internal',
  externalTarget: '_blank',
  internalTarget: '_self',
});

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

    // Check is tab tag
    const tab = tag.match(/^tab \((.*)\)$/);
    if (tab) tag = 'tab';

    if (tag) {
      tags.push(tag);
    } else {
      tag = tags.pop();
    }

    // Check is embed tag
    const embed = tag.match(/^embed \((.*)\)$/);
    if (embed) tag = 'embed';

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

      // Tree
      case 'tree':
      case 'tree(open)':
        if (openTag) {
          const open = tag === 'tree(open)' ? 'open' : '';
          return `<div>\n<FileTree ${open}>\n`;
        }
        return '</FileTree>\n</div>\n';

      // Tags
      case 'tabs':
        if (openTag) {
          return '<div>\n<Tabs>\n';
        }
        return '</Tabs>\n</div>\n';

      // Tab
      case 'tab':
        if (openTag && tab) {
          return `<div>\n<Tab title="${tab[1]}">\n`;
        }
        return '</Tab>\n</div>\n';

      // Collapse
      case 'embed':
        if (openTag && embed) {
          return `<div>\n<Embed link="${embed[1]}">\n`;
        }
        return '</Embed>\n</div>\n';

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
 * KBD
 */
const MARKER_OPEN = '[';
const MARKER_CLOSE = ']';
const TAG = 'DDKBD';

const kbdComponent = state => {
  const start = state.pos;
  const max = state.posMax;
  let momChar = state.src.charAt(start);
  let nextChar = state.src.charAt(start + 1);

  // we're looking for two times the open symbol.
  if (momChar !== MARKER_OPEN || nextChar !== MARKER_OPEN) {
    return false;
  }

  // find the end sequence
  let end = -1;
  nextChar = state.src.charAt(start + 2);
  for (let i = start + 2; i < max && end === -1; i += 1) {
    momChar = nextChar;
    nextChar = state.src.charAt(i + 1);
    if (momChar === MARKER_CLOSE && nextChar === MARKER_CLOSE) {
      // found the end!
      end = i;
    }
    if (momChar === MARKER_OPEN) {
      // found another opening sequence before the end. Thus, ignore ours!
      return false;
    }
    if (momChar === '\n') {
      // found end of line before the end sequence. Thus, ignore our start sequence!
      return false;
    }
  }

  // input ended before closing sequence
  if (end === -1) {
    return false;
  }

  // start tag
  state.push('kbd_open', TAG, 1);

  // parse inner
  state.pos += 2;
  state.posMax = end;
  state.md.inline.tokenize(state);
  state.pos = end + 2;
  state.posMax = max;

  // end tag
  state.push('kbd_close', TAG, -1);
  return true;
};

md.inline.ruler.before('link', 'kbd', kbdComponent);

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
  const isDemo = getLanguage && getLanguage[1].includes('demo');
  const isDemoCode = getLanguage && getLanguage[1].includes('demoCode');

  if (isDemo || isDemoCode) {
    const getDemoLanguage = /\[(.+)\]/.exec(lang);
    const language = getDemoLanguage ? getDemoLanguage[1] : 'vue';
    const isEditable = isDemoCode ? 'editable' : '';
    const isOpen = isDemoCode && info.includes('open') ? 'open' : '';
    return `<AppDemo lang="${language}" code="${code}" jsLib="${config.jsLib}" cssLib="${config.cssLib}" ${isEditable} ${isOpen}></AppDemo>`;
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
