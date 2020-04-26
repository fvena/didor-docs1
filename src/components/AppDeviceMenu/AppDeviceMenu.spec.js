import { mount } from '@vue/test-utils';
import AppDeviceMenu from './AppDeviceMenu.vue';

describe('AppDeviceMenu', () => {
  const wrapper = mount(AppDeviceMenu);

  test('Por defecto el menú para dispositivos móviles no sera visible', () => {
    expect(wrapper.contains('.appDeviceMenu--show')).toBe(false);
  });

  test('Al hacer click en el botón hamburguesa muestra el menú y lanza el evento "isOpen"', async () => {
    const button = wrapper.find('.appDeviceMenu__hamburguer');
    button.trigger('click');
    await wrapper.vm.$nextTick();

    expect(wrapper.contains('.appDeviceMenu--show')).toBe(true);
    expect(wrapper.emitted().isOpen).toBeTruthy();
  });

  test('Al hacer click en el botón hamburguesa con el menú visible lo oculta y lanza el evento "isClose"', async () => {
    const button = wrapper.find('.appDeviceMenu__hamburguer');
    button.trigger('click');

    wrapper.setData({ isShow: true });
    await wrapper.vm.$nextTick();

    expect(wrapper.contains('.appDeviceMenu--show')).toBe(true);
    expect(wrapper.emitted().isClose).toBeTruthy();
  });
});
