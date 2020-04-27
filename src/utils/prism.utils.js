import Prism from 'prismjs';
import ClipboardJS from 'clipboard';

Prism.plugins.toolbar.registerButton('copy-to-clipboard', env => {
  const icon = `<svg width="18" height="18" viewBox="0 0 25 25" xmlns="http://www.w3.org/2000/svg">
    <path d="M22.219 5.886c-.7 0-1.358.273-1.853.768l-1.38
      1.379-.145.146V4.386c0-.827-.673-1.5-1.5-1.5h-2.592c-.207-.581-.757-1-1.408-1h-1.774a2 2 0
      0 0-1.726-1 2 2 0 0 0-1.726 1H6.34c-.651 0-1.201.419-1.408 1H2.34c-.827 0-1.5.673-1.5
      1.5v19c0 .827.673 1.5 1.5 1.5h15c.827 0 1.5-.673 1.5-1.5v-7.794l3.85-3.85.003-.002c0-.001
      0-.002.002-.003l1.377-1.377a2.6 2.6 0 0 0 .768-1.854 2.624 2.624 0 0 0-2.622-2.62zM5.84
      3.386a.5.5 0 0 1 .5-.5h2.092a.5.5 0 0 0 .47-.333 1 1 0 0 1 .938-.667 1 1 0 0 1 .937.667.5.5
      0 0 0 .47.333h2.093a.5.5 0 0 1 .5.5v.5h-8v-.5zm12 20a.5.5 0 0 1-.5.5h-15a.5.5 0 0
      1-.5-.5v-19a.5.5 0 0 1 .5-.5h2.5v.5a.5.5 0 0 0 .5.5h9a.5.5 0 0 0 .5-.5v-.5h2.5a.5.5 0 0 1
      .5.5v4.793L11 16.019l-.01.01-.003.004-.003.005a.474.474 0 0
      0-.111.197c-.004.01-.014.019-.017.03l-1 4a.499.499 0 0 0
      .606.605l4-1c.012-.003.02-.014.03-.018a.503.503 0 0 0
      .17-.095c.009-.008.023-.01.032-.018l3.147-3.147v6.794zm-6.128-6.423c.323.094.8.302
      1.274.776.474.474.683.953.777 1.275l-2.736.685.685-2.736zm2.893 1.45a4.021 4.021 0 0
      0-.913-1.381 4.012 4.012 0 0 0-1.38-.911l7.028-7.027 2.292 2.292-7.027
      7.027zm8.76-8.76l-1.026 1.026-2.292-2.292 1.026-1.027a1.623 1.623 0 0 1 2.292 2.293z"/>
  </svg>`;

  const linkCopy = document.createElement('a');
  linkCopy.setAttribute('class', 'copied');
  linkCopy.innerHTML = icon;

  function resetText() {
    setTimeout(() => {
      linkCopy.setAttribute('class', 'copied');
    }, 3000);
  }

  function getSiblings(elem) {
    // Setup siblings array and get the first sibling
    let siblings = '';
    let sibling = elem.parentNode.firstChild;

    // Loop through each sibling and push to the array
    while (sibling) {
      if (sibling.nodeType === 1 && sibling.nodeName === 'CODE') {
        siblings += sibling.innerText;
      }
      sibling = sibling.nextSibling;
    }

    return siblings;
  }

  function registerClipboard() {
    const clip = new ClipboardJS(linkCopy, {
      text() {
        return getSiblings(env.element);
      },
    });

    clip.on('success', () => {
      linkCopy.setAttribute('class', 'copied copied--success');

      resetText();
    });
    clip.on('error', () => {
      linkCopy.setAttribute('class', 'copied copied--error');

      resetText();
    });
  }

  registerClipboard();

  return linkCopy;
});

const getHiglightCode = (code, lang) => {
  const getLanguage = /(\w+)/.exec(lang);
  const getLines = /\{(.+)\}/.exec(lang);
  const getFile = /\[(.+)\]/.exec(lang);

  let language = getLanguage && getLanguage[1] ? getLanguage[1] : 'js';
  const isDemo = getLanguage && getLanguage[1] === 'demo';
  const isDemoCode = getLanguage && getLanguage[1] === 'demoCode';
  const isVue = isDemo || (getLanguage && getLanguage[1] === 'vue');

  const lines = getLines ? getLines[1] : '';
  const filename = getFile ? getFile[1] : '';
  const filenameClass = filename ? 'hasFile' : '';

  let highlight = '';

  if (!isVue && !isDemo && !isDemoCode) {
    const prismLanguage = Prism.languages[language];
    highlight = Prism.highlight(code, prismLanguage);
  } else {
    language = 'vue';

    // Obtengo los bloques
    const htmlBlock = code.match(/<template>([\s\S]+)<\/template>/);
    const pugBlock = code.match(/<template lang="pug">([\s\S]+)<\/template>/);
    const jsBlock = code.match(/<script>([\s\S]+)<\/script>/);
    const scssBlock = code.match(/(<style.*>)([\s\S]+)(<\/style>)/);

    // Resalto la sintáxis
    const htmlHighlight = htmlBlock && htmlBlock[0] ? Prism.highlight(htmlBlock[0], Prism.languages.html) : '';
    const pugHighlight = pugBlock && pugBlock[1] ? Prism.highlight(pugBlock[1], Prism.languages.pug) : '';
    const jsHighlight = jsBlock && jsBlock[1] ? Prism.highlight(jsBlock[1], Prism.languages.js) : '';
    const scssOpenLabelHighlihgt = scssBlock && scssBlock[1] ? Prism.highlight(scssBlock[1], Prism.languages.html) : '';
    const scssHighlight = scssBlock && scssBlock[2] ? Prism.highlight(scssBlock[2], Prism.languages.scss) : '';
    const scssCloseLabelHighlihgt = scssBlock && scssBlock[3] ? Prism.highlight(scssBlock[3], Prism.languages.html) : '';

    // Añado los espacios de separación entre bloques
    const spaceTemplate = jsHighlight || scssHighlight ? '\n\n' : '';
    const spaceScript = scssHighlight ? '\n\n' : '';

    // Compongo cada bloque
    if (htmlHighlight) {
      highlight += `<code class="language-html" v-pre>${htmlHighlight}${spaceTemplate}</code>`;
    }

    if (pugHighlight) {
      // eslint-disable-next-line
      highlight +=
        '<code class="language-html"><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>template</span> <span class="token attr-name">lang</span><span class="token attr-value"><span class="token punctuation">=</span><span class="token punctuation">"</span>pug<span class="token punctuation">"</span></span><span class="token punctuation">&gt;</span></span></code>';
      highlight += `<code class="language-pug" v-pre>${pugHighlight}</code>`;
      highlight += `<code class="language-html"><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>template</span><span class="token punctuation">&gt;</span></span>${spaceTemplate}</code>`;
    }

    if (jsHighlight) {
      highlight += '<code class="language-html"><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>script</span><span class="token punctuation">&gt;</span></span></code>';
      highlight += `<code class="language-js" v-pre>${jsHighlight}</code>`;
      highlight += `<code class="language-html"><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>script</span><span class="token punctuation">&gt;</span></span>${spaceScript}</code>`;
    }

    if (scssHighlight) {
      highlight += `<code class="language-html">${scssOpenLabelHighlihgt}</code>`;
      highlight += `<code class="language-css" v-pre>${scssHighlight}</code>`;
      highlight += `<code class="language-html">${scssCloseLabelHighlihgt}</code>`;
    }

    // Si no ha encontrado ningún bloque, la demo solo tiene html
    if (!highlight) {
      language = 'html';
      highlight = `<code class="language-${language}" v-pre>${Prism.highlight(code, Prism.languages.html)}</code>`;
    }
  }

  setTimeout(() => {
    Prism.highlightAll();
  }, 0);

  if (isDemo || isDemoCode) {
    return `<pre v-if="false"></pre><Demo :toggleCode="${isDemoCode}">${encodeURIComponent(code.replace(/ {2}|\r\n|\n|\r/gm, ''))}<template slot="code"><pre class="line-numbers ${filenameClass}" data-lang="${language}">${highlight}<div class="file">${filename}</div></pre></template></Demo>`;
  }

  if (isVue) {
    return `<pre class="${filenameClass}" data-lang="vue"">${highlight}<div class="file">${filename}</div></pre>`;
  }

  return `<pre class="line-numbers ${filenameClass}" data-lang="${language}" data-line="${lines}"><code class="language-${language}" v-pre>${highlight}</code><div class="file">${filename}</div></pre>`;
};

export default {
  getHiglightCode,
};
