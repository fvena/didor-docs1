import { mount } from '@vue/test-utils';
import DidorLogo from './DidorLogo.vue';

jest.setTimeout(5000);

describe('DidorLogo', () => {
  test('Animación inicial del logo durante 5 segundos', async done => {
    const wrapper = mount(DidorLogo, {
      propsData: {
        initAnimation: true,
      },
    });

    expect(wrapper.contains('.didor-logo--animate')).toBe(true);
    // await jest.setTimeout(5000);
    setTimeout(() => {
      expect(wrapper.contains('.didor-logo--animate')).toBe(false);
      done();
    }, 5000);
  });

  test('Animación del logo', () => {
    const wrapper = mount(DidorLogo, {
      propsData: {
        isAnimate: true,
      },
    });
    expect(wrapper.contains('.didor-logo--animate')).toBe(true);
  });

  test('Logo en horizontal', () => {
    const wrapper = mount(DidorLogo, {
      propsData: {
        horizontal: true,
      },
    });
    expect(wrapper.contains('.didor-logo--horizontal')).toBe(true);
  });

  test('Añadir subtítulo', () => {
    const wrapper = mount(DidorLogo, {
      propsData: {
        title: 'framework',
      },
    });
    expect(wrapper.text()).toMatch('framework');
  });
});
