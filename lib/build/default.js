module.exports = {
  devServer: {
    port: 3001,
    open: true,
  },
  content: {
    folders: ['/docs'],
    navbar: '_navbar.md',
    sidebar: '_sidebar.md',
    defaultPath: '/home.md',
    didorDocs: false,
    didorStyles: false,
  },
  customize: {
    logo: '',
    title: 'Didor Docs',
    description: '',
    mode: 'auto',
    toggleMode: false,
    pwa: {
      outputFolder: '/img',
    },
    social: {
      twitter: '',
      facebook: '',
      linkedin: '',
      instagram: '',
      slack: '',
      github: '',
      gitlab: '',
    },
    style: [],
    scripts: [],
  },
  demo: {
    jsLib: [],
    cssLib: [],
    components: '',
    styles: '',
    shareStyles: '',
  },
  build: {
    path: 'publish',
    onlyMarkdown: false,
    assets: [],
  },
};
