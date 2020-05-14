import MarkdownUtils from './markdown.utils';

describe('Markdown Utils', () => {
  test('Convierte un texto markdown en html', async () => {
    const markdown = `
# Título 1
## Título 2
Esto es un párrafo`;

    const html = `<h1 id="título-1">Título 1</h1>
<h2 id="título-2">Título 2</h2>
<p>Esto es un párrafo</p>
`;
    const result = await MarkdownUtils.renderMarkdown(markdown);
    expect(result.render).toBe(html);
  });

  test('Crea un tip', async () => {
    const markdown = `
::: tip
Dimer only needs markdown files to generate a documentation website. Say goodbye to complex build tools
:::`;

    const html = `<div>
<Alarm type="tip">
<p>Dimer only needs markdown files to generate a documentation website. Say goodbye to complex build tools</p>
</Alarm>
</div>
`;
    const result = await MarkdownUtils.renderMarkdown(markdown);
    expect(result.render).toBe(html);
  });

  test('Crea un note', async () => {
    const markdown = `
::: note
Dimer only needs markdown files to generate a documentation website. Say goodbye to complex build tools
:::`;

    const html = `<div>
<Alarm type="note">
<p>Dimer only needs markdown files to generate a documentation website. Say goodbye to complex build tools</p>
</Alarm>
</div>
`;
    const result = await MarkdownUtils.renderMarkdown(markdown);
    expect(result.render).toBe(html);
  });

  test('Crea un warn', async () => {
    const markdown = `
::: warn
Dimer only needs markdown files to generate a documentation website. Say goodbye to complex build tools
:::`;

    const html = `<div>
<Alarm type="warn">
<p>Dimer only needs markdown files to generate a documentation website. Say goodbye to complex build tools</p>
</Alarm>
</div>
`;
    const result = await MarkdownUtils.renderMarkdown(markdown);
    expect(result.render).toBe(html);
  });

  test('Crea un tag', async () => {
    const markdown = `
::: tag
Dimer only needs markdown files to generate a documentation website. Say goodbye to complex build tools
:::`;

    const html = `<div class="tag">
<p>Dimer only needs markdown files to generate a documentation website. Say goodbye to complex build tools</p>
</div>
`;
    const result = await MarkdownUtils.renderMarkdown(markdown);
    expect(result.render).toBe(html);
  });

  test('Crea un collapse', async () => {
    const markdown = `
::: collapse title="Contact Us"
Dimer only needs markdown files to generate a documentation website. Say goodbye to complex build tools
:::`;

    const html = `<div>
<Collapse title="Contact Us">
<p>Dimer only needs markdown files to generate a documentation website. Say goodbye to complex build tools</p>
</Collapse>
</div>
`;
    const result = await MarkdownUtils.renderMarkdown(markdown);
    expect(result.render).toBe(html);
  });

  test('Crea un codegroup', async () => {
    const markdown = `
::: codegroup
\`\`\`html[index.html]
<h1>Hola Mundo</h1>
\`\`\`
\`\`\`js[script.js]
console.log('Hola Mundo');
\`\`\`
\`\`\`css{2}[style.css]
h1 {
  color: red;
}
\`\`\`
:::`;

    const html = `<div>
<Codegroup>
<pre class="line-numbers hasFile" data-lang="html" data-line=""><code class="language-html" v-pre><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>h1</span><span class="token punctuation">></span></span>Hola Mundo<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>h1</span><span class="token punctuation">></span></span>
</code><div class="file">index.html</div></pre>
<pre class="line-numbers hasFile" data-lang="js" data-line=""><code class="language-js" v-pre>console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">'Hola Mundo'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code><div class="file">script.js</div></pre>
<pre class="line-numbers hasFile" data-lang="css" data-line="2"><code class="language-css" v-pre><span class="token selector">h1</span> <span class="token punctuation">{</span>
  <span class="token property">color</span><span class="token punctuation">:</span> red<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code><div class="file">style.css</div></pre>
</Codegroup>
</div>
`;
    const result = await MarkdownUtils.renderMarkdown(markdown);
    expect(result.render).toBe(html);
  });

  test('Convierte un texto markdown en html', async () => {
    const markdown = `---
device: true
---

# Título 1`;

    const html = `
<h1 id="título-1">Título 1</h1>
`;
    const result = await MarkdownUtils.renderMarkdown(markdown);
    expect(result.render).toBe(html);
    expect(result.data).toMatchObject({ device: true });
  });
});
