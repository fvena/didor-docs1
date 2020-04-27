module.exports = {
  presets: ['@vue/cli-plugin-babel/preset'],
  plugins: [
    [
      'prismjs',
      {
        languages: ['javascript', 'css', 'markup', 'scss', 'json', 'pug', 'bash', 'markdown'],
        plugins: ['line-numbers', 'line-highlight', 'toolbar'],
        css: true,
      },
    ],
  ],
};
