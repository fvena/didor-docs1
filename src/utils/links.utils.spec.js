import LinksUtils from './links.utils';

const list = `
- [Home](/home.md)
- [Markdown](/markdown)
- [Desplegable]
  - [Desplegable]
    - [Link 1](/link1.md)
    - [Link 2](/link2.md)`;

const match = [
  { title: 'Home', file: '/home.md', link: '/home' },
  { title: 'Markdown', file: '/markdown', link: '/markdown' },
  {
    title: 'Desplegable',
    children: [
      {
        title: 'Desplegable',
        children: [
          { title: 'Link 1', file: '/link1.md', link: '/link_1' },
          { title: 'Link 2', file: '/link2.md', link: '/link_2' },
        ],
      },
    ],
  },
];

const matchSection = [
  { title: 'Home', file: '/home.md', link: 'section/home' },
  { title: 'Markdown', file: '/markdown', link: 'section/markdown' },
  {
    title: 'Desplegable',
    children: [
      {
        title: 'Desplegable',
        children: [
          { title: 'Link 1', file: '/link1.md', link: 'section/link_1' },
          { title: 'Link 2', file: '/link2.md', link: 'section/link_2' },
        ],
      },
    ],
  },
];

describe('Links Utils', () => {
  describe('slugify', () => {
    test('Si paso una cadena con letras mayúsculas, devuelve la cadena en minúscula', () => {
      const slug = LinksUtils.slugify('HolA');
      expect(slug).toBe('hola');
    });

    test('Si paso una cadena con espacios, devuelve la cadena sustituyendolos por barras bajas', () => {
      const slug = LinksUtils.slugify('Hola Mundo');
      expect(slug).toBe('hola_mundo');
    });

    test('Si paso una cadena con caracteres inválidos, devuelve la cadena sustituyendolos por caracteres válidos', () => {
      const slug = LinksUtils.slugify('España Mayúsculas');
      expect(slug).toBe('espana_mayusculas');
    });

    test('Si paso una cadena con el caracter &, devuelve la cadena sustituyendolo por _and_', () => {
      const slug = LinksUtils.slugify('España&Portugal');
      expect(slug).toBe('espana_y_portugal');
    });

    test('Si paso una cadena con algo que no sea un caracter los elimina', () => {
      const slug = LinksUtils.slugify(`España
        Portugal`);
      expect(slug).toBe('espana_portugal');
    });

    test('Si paso una cadena con varios espacios seguidos o se acumulan al sustituirlos los reduce a une', () => {
      const slug = LinksUtils.slugify('España  &  Portugal');
      expect(slug).toBe('espana_y_portugal');
    });

    test('Si paso una cadena con espacios al principio o al final los elimina', () => {
      const slug = LinksUtils.slugify('   España   ');
      expect(slug).toBe('espana');
    });
  });

  describe('getListLinks', () => {
    test('prueba', () => {});
  });

  describe('getListLinks', () => {
    test('si el listado está vacío de vuelve un array vacío', async () => {
      const emptyList = '';
      const links = await LinksUtils.getListLinks(emptyList);
      expect(links).toStrictEqual([]);
    });

    test('si recibo un listado de links en markdown, devuelvo un array de objetos con los links', async () => {
      const links = await LinksUtils.getListLinks(list);
      expect(links).toMatchObject(match);
    });

    test('si paso una sección, la añade a los links', async () => {
      const links = await LinksUtils.getListLinks(list, 'section');
      expect(links).toMatchObject(matchSection);
    });
  });
});
