import { mount } from '@vue/test-utils';
import AppDeviceMenu from './AppDeviceMenu.vue';

describe('AppDeviceMenu', () => {
  const wrapper = mount(AppDeviceMenu);

  test('Al hacer click en el botón hamburguesa lanza el evento "isChange"', async () => {
    const button = wrapper.find('.hamburguer');
    button.trigger('click');
    await wrapper.vm.$nextTick();

    expect(wrapper.emitted().isChange).toBeTruthy();
  });
});
