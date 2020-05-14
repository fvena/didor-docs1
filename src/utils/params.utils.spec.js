import ParamsUtils from './params.utils';

describe('Params Utils', () => {
  describe('getSection', () => {
    test('Si no paso ninguna ruta, devuelve la ruta hacia el root', () => {
      const route = ParamsUtils.getSection('');
      expect(route).toBe('/');
    });

    test('Si estoy en el root devuelvo la misma ruta', () => {
      const route = ParamsUtils.getSection('/');
      expect(route).toBe('/');
    });

    test('Si la ruta contiene una única sección devuelvo la ruta a esa sección', () => {
      const route = ParamsUtils.getSection('/section');
      expect(route).toBe('/section');
    });

    test('Si la ruta contiene una única sección con un slash al final devuelvo la ruta a esa sección sin el slash', () => {
      const route = ParamsUtils.getSection('/section/');
      expect(route).toBe('/section');
    });

    test('Si la ruta contiene varias secciónes devuelvo la ruta de la sección principal', () => {
      const route1 = ParamsUtils.getSection('/section/article');
      const route2 = ParamsUtils.getSection('/section/section2/article');
      const route3 = ParamsUtils.getSection('/section/section2/article/');
      expect(route1).toBe('/section');
      expect(route2).toBe('/section');
      expect(route3).toBe('/section');
    });
  });
});
