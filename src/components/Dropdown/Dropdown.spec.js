import { shallowMount, RouterLinkStub } from '@vue/test-utils';
import Dropdown from './Dropdown.vue';

const $route = {
  path: '/some_path',
};

const wrapper = shallowMount(Dropdown, {
  stubs: {
    RouterLink: RouterLinkStub,
  },
  propsData: {
    title: 'Test title',
    options: [],
  },
  mocks: {
    $route,
  },
});

describe('Dropdown', () => {
  test('Rendiriza el título del dropdown', () => {
    expect(wrapper.find('.dropdown__header').text()).toBe('Test title');
  });

  test('Por defecto, no debe mostrar el listado de opciones', () => {
    expect(wrapper.contains('.dropdown__content')).toBe(false);
  });

  test('Al hacer click en el título lanza un evento "isOpen" y muestra el listado de opciones', async () => {
    const title = wrapper.find('.dropdown__header');
    title.trigger('click');
    await wrapper.vm.$nextTick();

    expect(wrapper.contains('.dropdown__content')).toBe(true);
    expect(wrapper.emitted().isOpen).toBeTruthy();
  });

  test('Si el listado está visible, al hacer click en el título lanza un evento "isClose" y oculta el listado de opciones', async () => {
    const title = wrapper.find('.dropdown__header');

    wrapper.setData({ isVisible: true });
    await wrapper.vm.$nextTick();
    title.trigger('click');
    await wrapper.vm.$nextTick();

    expect(wrapper.contains('.dropdown__content')).toBe(false);
    expect(wrapper.emitted().isClose).toBeTruthy();
  });

  test('Rendiriza una opción', async () => {
    wrapper.setData({ isVisible: true });
    wrapper.setProps({ options: [{ title: 'Option 1', value: 'option1' }] });
    await wrapper.vm.$nextTick();

    expect(wrapper.find('.dropdown__item--option').text()).toBe('Option 1');
  });

  test('Al seleccionar una opción lanza un evento "isChange" con el valor de la opción, oculta el listado y lanza un evento "isClose"', async () => {
    wrapper.setData({ isVisible: true });
    wrapper.setProps({ options: [{ title: 'Option 1', value: 'option1' }] });
    await wrapper.vm.$nextTick();

    const option = wrapper.find('.dropdown__item--option');
    option.trigger('click');

    expect(wrapper.emitted().isChange).toBeTruthy();
    expect(wrapper.emitted().isChange[0]).toEqual(['option1']);

    await wrapper.vm.$nextTick();

    expect(wrapper.contains('.dropdown__content')).toBe(false);
    expect(wrapper.emitted().isClose).toBeTruthy();
  });

  test('Rendiriza una link interno', async () => {
    wrapper.setData({ isVisible: true });
    wrapper.setProps({ options: [{ title: 'Link 1', link: '/link1' }] });
    await wrapper.vm.$nextTick();

    expect(wrapper.find('.dropdown__item--link').text()).toBe('Link 1');
    expect(wrapper.find('.dropdown__item--link').attributes().target).toBeUndefined();
    expect(wrapper.findAll(RouterLinkStub).length).toBe(1);
  });

  test('Rendiriza una link externo', async () => {
    wrapper.setData({ isVisible: true });
    wrapper.setProps({ options: [{ title: 'Link 1', link: 'http://www.didor.io' }] });
    await wrapper.vm.$nextTick();

    expect(wrapper.find('.dropdown__item--link').text()).toBe('Link 1');
    expect(wrapper.find('.dropdown__item--link').attributes().target).toBe('_blanck');
    expect(wrapper.findAll(RouterLinkStub).length).toBe(1);
  });

  test('Rendiriza un separador', async () => {
    wrapper.setData({ isVisible: true });
    wrapper.setProps({ options: [{ separator: true }] });
    await wrapper.vm.$nextTick();

    expect(wrapper.contains('.dropdown__item--separator')).toBe(true);
  });

  test('Al seleccionar una link oculta el listado y lanza un evento "isClose"', async () => {
    wrapper.setData({ isVisible: true });
    wrapper.setProps({ options: [{ title: 'Link 1', link: '/link1' }] });
    await wrapper.vm.$nextTick();

    const link = wrapper.find('.dropdown__item--link');
    link.trigger('click');
    await wrapper.vm.$nextTick();

    expect(wrapper.contains('.dropdown__content')).toBe(false);
    expect(wrapper.emitted().isClose).toBeTruthy();
  });

  test('Por defecto el listado se renderiza como flotante', () => {
    expect(wrapper.classes('dropdown--float')).toBe(true);
  });

  test('Si definimos la propiedad float a false, se renderiza como elemento de bloque', async () => {
    wrapper.setProps({ float: false });

    await wrapper.vm.$nextTick();
    expect(wrapper.classes('dropdown--float')).toBe(false);
  });

  test('Si contiene link internos, y alguno está activo, le añadimos la clase "dropdown--link-active"', async () => {
    wrapper.setProps({ options: [{ title: 'Link 1', link: '/some_path' }] });
    await wrapper.vm.$nextTick();
    expect(wrapper.classes('dropdown--link-active')).toBe(true);
  });

  test('Si contiene link internos, y ninguno está activo, no debe tener la clase "dropdown--link-active"', async () => {
    wrapper.setProps({ options: [{ title: 'Link 1', link: '/link1' }] });
    await wrapper.vm.$nextTick();
    expect(wrapper.classes('dropdown--link-active')).toBe(false);
  });
});
