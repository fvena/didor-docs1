import { shallowMount, RouterLinkStub } from '@vue/test-utils';
import AppSidebar from './AppSidebar.vue';

const wrapper = shallowMount(AppSidebar, {
  stubs: {
    RouterLink: RouterLinkStub,
  },
  propsData: {
    title: 'Test title',
    links: [],
  },
});

describe('AppSidebar', () => {
  test('Si no recibo ningún link, el listado estará vacío', () => {
    expect(wrapper.contains('nav.sidebar__list')).toBe(false);
  });

  test('Si recibo links de primer nivel, el listado mostrará links de primer nivel', async () => {
    wrapper.setProps({
      links: [
        { title: 'Link 1', link: '/link1' },
        { title: 'Link 2', link: '/link2' },
        { title: 'Link 3', link: '/link3' },
      ],
    });

    await wrapper.vm.$nextTick();
    expect(wrapper.findAll(RouterLinkStub).length).toBe(3);
    expect(wrapper.findAll('.sidebar__list--level1 li').length).toBe(3);
  });

  test('Si recibo links de segundo nivel, el listado mostrará links de segundo nivel', async () => {
    wrapper.setProps({
      links: [
        { title: 'Link 1', link: '/link1' },
        { title: 'Link 2', link: '/link2' },
        {
          title: 'Menu 1',
          children: [
            { title: 'Link 3', link: '/link3' },
            { title: 'Link 4', link: '/link4' },
          ],
        },
      ],
    });

    await wrapper.vm.$nextTick();
    expect(wrapper.findAll(RouterLinkStub).length).toBe(4);
    expect(wrapper.findAll('.sidebar__list--level1 > li').length).toBe(3);
    expect(wrapper.find('.sidebar__list--level2 > .sidebar__title').text()).toBe('Menu 1');
    expect(wrapper.findAll('.sidebar__list--level2 > li').length).toBe(2);
  });

  test('Si recibo links de tercer nivel, el listado mostrará links de tercer nivel', async () => {
    wrapper.setProps({
      links: [
        { title: 'Link 1', link: '/link1' },
        { title: 'Link 2', link: '/link2' },
        {
          title: 'Menu 1',
          children: [
            { title: 'Link 3', link: '/link3' },
            { title: 'Link 4', link: '/link4' },
            {
              title: 'Menu 2',
              children: [
                { title: 'Link 5', link: '/link5' },
                { title: 'Link 6', link: '/link6' },
              ],
            },
          ],
        },
      ],
    });

    await wrapper.vm.$nextTick();
    expect(wrapper.findAll(RouterLinkStub).length).toBe(6);
    expect(wrapper.findAll('.sidebar__list--level1 > li > a').length).toBe(2);
    expect(wrapper.findAll('.sidebar__list--level1 > li').length).toBe(3);
    expect(wrapper.find('.sidebar__list--level2 > .sidebar__title').text()).toBe('Menu 1');
    expect(wrapper.findAll('.sidebar__list--level2 > li').length).toBe(3);
    expect(wrapper.find('.sidebar__list--level3 > .sidebar__title').text()).toBe('Menu 2');
    expect(wrapper.findAll('.sidebar__list--level3 > li').length).toBe(2);
  });
});
