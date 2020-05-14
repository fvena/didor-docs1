// import { mount } from '@vue/test-utils';
import ArrayUtils from './array.utils';

describe('Array Utils', () => {
  describe('FlattenList', () => {
    test('Si recibo un array vacío, devulevo un array vacío', () => {
      const array = [];
      const flatArray = ArrayUtils.flattenList(array);
      expect(flatArray).toStrictEqual(array);
    });

    test('Si recibo un array con un solo nivel, devuelvo el mismo array', () => {
      const array = [{ title: 'title1' }, { title: 'title2' }, { title: 'title3' }];
      const flatArray = ArrayUtils.flattenList(array);
      expect(flatArray).toStrictEqual(array);
    });

    test('Si recibo un array con dos niveles, devuelvo un array con un solo nivel', () => {
      const array = [{ title: 'title1', children: [{ title: 'title4' }, { title: 'title5' }] }, { title: 'title2' }, { title: 'title3' }];
      const result = [{ title: 'title4' }, { title: 'title5' }, { title: 'title2' }, { title: 'title3' }];
      const flatArray = ArrayUtils.flattenList(array);
      expect(flatArray).toStrictEqual(result);
    });

    test('Si recibo un array con tres niveles, devuelvo un array con un solo nivel', () => {
      const array = [{ title: 'title1', children: [{ title: 'title4' }, { title: 'title5', children: [{ title: 'title6' }, { title: 'title7' }] }] }, { title: 'title2' }, { title: 'title3' }];
      const result = [{ title: 'title4' }, { title: 'title6' }, { title: 'title7' }, { title: 'title2' }, { title: 'title3' }];
      const flatArray = ArrayUtils.flattenList(array);
      expect(flatArray).toStrictEqual(result);
    });
  });

  describe('searchItemByLinks', () => {
    const array = [
      {
        title: 'title1',
        children: [
          { title: 'title4', link: 'link4' },
          { title: 'title5', link: 'link5' },
        ],
      },
      { title: 'title2', link: 'link2' },
      { title: 'title3', link: 'link3' },
    ];

    test('Si recibo un array vacio, devuelvo un objeto nulo', async () => {
      const emptyArray = [];
      const link = 'link1';
      const item = await ArrayUtils.searchItemByLinks(emptyArray, link);
      expect(item).toBeNull();
    });

    test('Si no encuentra el elemento, devuelvo un objeto nulo', async () => {
      const link = 'notFound';
      const item = await ArrayUtils.searchItemByLinks(array, link);
      expect(item).toBeNull();
    });

    test('Si encuentra el elemento, lo devuelve dentro de la propiedad current', async () => {
      const link = 'link2';
      const item = await ArrayUtils.searchItemByLinks(array, link);
      expect(item.current).toMatchObject({ title: 'title2', link: 'link2' });
    });

    test('Si encuentra el elemento, devuelve el elemento previo cuando existe', async () => {
      const link = 'link2';
      const item = await ArrayUtils.searchItemByLinks(array, link);
      expect(item.prev).toMatchObject({ title: 'title5', link: 'link5' });
    });

    test('Si encuentra el elemento, devuelve el elemento posterior cuando existe', async () => {
      const link = 'link2';
      const item = await ArrayUtils.searchItemByLinks(array, link);
      expect(item.next).toMatchObject({ title: 'title3', link: 'link3' });
    });

    test('Si encuentra el elemento, pero es el primero, el elemento previo es nulo', async () => {
      const link = 'link4';
      const item = await ArrayUtils.searchItemByLinks(array, link);
      expect(item.prev).toBeNull();
    });

    test('Si encuentra el elemento, pero es el último, el elemento siguiente es nulo', async () => {
      const link = 'link3';
      const item = await ArrayUtils.searchItemByLinks(array, link);
      expect(item.next).toBeNull();
    });
  });

  describe('checkArray', () => {
    test('Si le paso un array me devuelve true', () => {
      const array = ['item1', 'item2', 'item3'];
      const result = ArrayUtils.checkArray(array);
      expect(result).toBeTruthy();
    });

    test('Si le paso un array vacío devuelve false', () => {
      const array = [];
      const result = ArrayUtils.checkArray(array);
      expect(result).toBeFalsy();
    });

    test('Si le paso un objeto devuelve false', () => {
      const array = { title: 'title1', link: 'link' };
      const result = ArrayUtils.checkArray(array);
      expect(result).toBeFalsy();
    });
  });
});
