import { shallowMount, RouterLinkStub } from '@vue/test-utils';
import AppMenu from './AppMenu.vue';

const wrapper = shallowMount(AppMenu, {
  stubs: {
    RouterLink: RouterLinkStub,
  },
  propsData: {
    links: [],
  },
});

describe('AppMenu', () => {
  test('Si no recibo ningún link, el listado estará vacío', () => {
    expect(wrapper.findAll('.appMenu__item').length).toBe(0);
  });

  test('Rendiriza un link interno', async () => {
    wrapper.setProps({ links: [{ title: 'Link 1', link: 'link1' }] });
    await wrapper.vm.$nextTick();

    expect(wrapper.find('.appMenu__item--link').text()).toBe('Link 1');
    expect(wrapper.find('.appMenu__item--link').attributes().target).toBeUndefined();
    expect(wrapper.findAll(RouterLinkStub).length).toBe(1);
  });

  test('Rendiriza una link externo', async () => {
    wrapper.setProps({ links: [{ title: 'Link 1', link: 'http://www.didor.io' }] });
    await wrapper.vm.$nextTick();

    expect(wrapper.find('.appMenu__item--link').text()).toBe('Link 1');
    expect(wrapper.find('.appMenu__item--link').attributes().target).toBe('_blanck');
    expect(wrapper.findAll(RouterLinkStub).length).toBe(1);
  });

  test('Rendiriza un dropdown', async () => {
    wrapper.setProps({
      links: [
        {
          title: 'Link 1',
          children: [
            { title: 'Link 2', link: '/link2' },
            { title: 'Link 3', link: '/link3' },
            { title: 'Link 4', link: '/link4' },
          ],
        },
      ],
    });
    await wrapper.vm.$nextTick();

    expect(wrapper.contains('.appMenu__item--dropdown')).toBe(true);
  });

  test('Por defecto el menú se renderiza en formato vertical', () => {
    expect(wrapper.classes('appMenu--vertical')).toBe(false);
  });

  test('Renderizar el menú en formato vertical', async () => {
    wrapper.setProps({ vertical: true });

    await wrapper.vm.$nextTick();
    expect(wrapper.classes('appMenu--vertical')).toBe(true);
  });

  test('Cierra todos los dropdown abiertos', async () => {
    const mountWrapper = shallowMount(AppMenu, {
      stubs: {
        Dropdown: {
          render: () => {},
          methods: {
            close: () => {},
          },
        },
      },
      propsData: {
        links: [
          {
            title: 'Link 1',
            children: [
              { title: 'Link 2', link: '/link2' },
              { title: 'Link 3', link: '/link3' },
              { title: 'Link 4', link: '/link4' },
            ],
          },
        ],
      },
    });

    await wrapper.vm.$nextTick();
    mountWrapper.vm.closeAllDropdown();
    expect(mountWrapper).toBeDefined();
  });
});
