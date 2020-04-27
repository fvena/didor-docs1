import MarkdownIt from 'markdown-it';
import MarkdownToc from 'markdown-it-toc-and-anchor';
import MarkdownFrontMatter from 'markdown-it-front-matter';
import MarkdownEmoji from 'markdown-it-emoji';
import MarkdownCheckbox from 'markdown-it-task-lists';
import MarkdownVideo from 'markdown-it-video';
import MarkdownNotes from 'markdown-it-div';
import yaml from 'js-yaml';
import PrismUtils from './prism.utils';

/**
 * Renderiza markdown como html
 */
// prettier-ignore
const renderMarkdown = markdown => new Promise(resolve => {
  let data = {};
  const tags = [];

  const render = new MarkdownIt({
    html: true,
    xhtmlOut: true,
    breaks: true,
    linkify: true,
    typographer: true,
    quotes: '“”‘’',
    highlight(code, lang) {
      return PrismUtils.getHiglightCode(code, lang);
    },
  })
    .use(MarkdownToc, {
      tocClassName: 'markdownToc',
      tocFirstLevel: 2,
      tocLastLevel: 2,
      anchorLink: false,
    })
    .use(MarkdownFrontMatter, frontMatter => {
      data = yaml.load(frontMatter);
    })
    .use(MarkdownEmoji)
    .use(MarkdownVideo)
    .use(MarkdownNotes, {
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

            // Demo
            // case 'demo':
            //   if (openTag) {
            //     return '<div>\n<Demo>\n';
            //   }
            //   return '</Demo>\n</div>\n';

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
    })
    .use(MarkdownCheckbox, { label: true, labelAfter: true })
    .render(markdown);

  resolve({ render, data });
});

export default {
  renderMarkdown,
};
