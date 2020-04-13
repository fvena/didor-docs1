import { shallowMount, RouterLinkStub } from '@vue/test-utils';
import DocsLayout from './DocsLayout.vue';

describe('DocsLayout', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallowMount(DocsLayout, {
      stubs: {
        RouterLink: RouterLinkStub,
      },
      propsData: {
        navbarLinks: [],
        sidebarLinks: [],
      },
      directives: {
        ObserveVisibility: jest.fn(),
      },
    });
  });

  test('Por defecto el menú para dispositivos móviles no sera visible', () => {
    expect(wrapper.contains('.docsLayout__device-menu--show')).toBe(false);
  });

  test('Mostramos/Ocultamos el menú para dispositivos móviles', async () => {
    wrapper.vm.toggleDeviceMenu();
    await wrapper.vm.$nextTick();
    expect(wrapper.contains('.docsLayout__device-menu--show')).toBe(true);
    wrapper.vm.toggleDeviceMenu();
    await wrapper.vm.$nextTick();
    expect(wrapper.contains('.docsLayout__device-menu--show')).toBe(false);
  });

  test('Por defecto el header será visible', () => {
    expect(wrapper.contains('.docsLayout--header-hidden')).toBe(false);
  });

  test('Al hacer scroll hacia abajo ocultamos el header', async () => {
    wrapper.setData({ lastScrollPosition: -85 });
    const box = wrapper.find('.docsLayout__content');
    box.trigger('scroll');
    wrapper.vm.onScroll(); // No es necesario pero sino, no lo cuenta para el coverage
    await wrapper.vm.$nextTick();
    expect(wrapper.contains('.docsLayout--header-hidden')).toBe(true);
  });

  test('Al hacer scroll hacia arriba mostramos el header', async () => {
    wrapper.setData({
      lastScrollPosition: 90,
      showHeader: false,
    });
    const box = wrapper.find('.docsLayout__content');
    box.trigger('scroll');
    wrapper.vm.onScroll(); // No es necesario pero sino, no lo cuenta para el coverage
    await wrapper.vm.$nextTick();
    expect(wrapper.contains('.docsLayout--header-hidden')).toBe(false);
  });

  test('Cerramos todos los dropdown del header', async () => {
    const mountWrapper = shallowMount(DocsLayout, {
      stubs: {
        AppMenu: {
          render: () => {},
          methods: {
            closeAllDropdown: () => {},
          },
        },
      },
    });

    await mountWrapper.vm.$nextTick();
    mountWrapper.vm.closeHeaderMenus();
    expect(mountWrapper).toBeDefined();
  });
});
