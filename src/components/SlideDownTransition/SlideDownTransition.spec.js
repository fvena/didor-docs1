import { shallowMount } from '@vue/test-utils';
import SlideDownTransition from './SlideDownTransition.vue';

const wrapper = shallowMount(SlideDownTransition, {
  slots: {
    default: '<p>Hola Mundo...</p>',
  },
});

describe('SlideDownTransition', () => {
  test('Antes de iniciar la animación la altura es cero', () => {
    const paragraph = wrapper.find('p');
    paragraph.element.style.height = '100px';
    wrapper.vm.beforeEnter(paragraph.element);
    expect(paragraph.element.style.height).toBe('0px');
  });

  test('Al finalizar la animación la altura será la del elemento', () => {
    const paragraph = wrapper.find('p');
    paragraph.element.style.scrollHeight = '100px';
    wrapper.vm.enter(paragraph.element);
    expect(paragraph.element.style.scrollHeight).toBe('100px');
  });

  test('Si indicamos posicionamiento absoluto, al finalizar la animación su posición será absoluta', async () => {
    wrapper.setProps({ float: true });
    const paragraph = wrapper.find('p');
    paragraph.element.style.scrollHeight = '100px';
    await wrapper.vm.$nextTick();
    wrapper.vm.enter(paragraph.element);
    expect(paragraph.element.style.scrollHeight).toBe('100px');
    expect(paragraph.element.style.position).toBe('absolute');
  });

  test('Al volver al inicio de la animación la altura es cero', () => {
    const paragraph = wrapper.find('p');
    paragraph.element.style.height = '100px';
    wrapper.vm.leave(paragraph.element);
    expect(paragraph.element.style.height).toBe('0px');
  });
});
