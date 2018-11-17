/* Make const, not var */

class Container {
  constructor(id, className, htmlCode) {
    this.id = id;
    this.className = className;
    this.htmlCode = htmlCode;
  }

  render() {
    return this.htmlCode;
  }
}

class Menu extends Container {
  constructor(my_id, my_class, my_items) {
    super(my_id, my_class);
    this.items = my_items;
  }

  render() {
    let result = `<ul class="${this.className}" id="${this.id}">`;

    this.items.map(item => {
      if (item) {
        if (item instanceof MenuItem) {
          result += item.render();
        }
      }
    });

    result += '</ul>';

    return result;
  }

  remove(removable, menuId) {
    const $node = document.getElementById(menuId).childNodes[removable];
    document.getElementById(menuId).removeChild($node);
  }
}

class SubMenu extends Menu {
  constructor(id, my_class, items) {
    super(id, my_class, items);
  }

  render() {

    let result = `<ul class="${this.className}" id="${this.id}">`;

    this.items.map(item => {
      if (item) {
        if (item instanceof MenuItem) {
          result += item.render();
        } else if (Array.isArray(item)) {

          result += `<ul class="sub${this.className}">`;

          item.map(subItem => {
            if (subItem instanceof MenuItem) {
              result += subItem.render();
            } else if (Array.isArray(subItem)) {

              result += `<ul class="sub${this.className}">`;

              subItem.map(subSubItem => {
                if (subSubItem instanceof MenuItem) {
                  result += subSubItem.render();
                }
              });

              result += '</ul>';
            }
          });

          result += '</ul>';
        }
      }
    });

    result += '</ul>';

    return result;
  }

  remove(removable, menuId) {
    super.remove(removable, menuId);
  }
}

class MenuItem extends Container {
  constructor(my_href, my_name) {
    super(my_href, my_name);
    this.className = 'menu-item';
    this.href = my_href;
    this.itemName = my_name;
  }

  render() {
    return `<li class="${this.className}"><a href="${this.href}">${this.itemName}</a></li>`;
  }
}

const s_items = [
  new MenuItem('/', 'Главная'),
  new MenuItem('/lk/', 'Личный кабинет'),
  new MenuItem('/goods/', 'Каталог'),
  new MenuItem('/actions/', 'Промоакции'),
  new MenuItem('/about/', 'Адреса и контакты'),
  new MenuItem('/order/', 'Заказ'),
  [
    new MenuItem('/goods/', 'Товары'),
    new MenuItem('/services/', 'Услуги'),
    new MenuItem('/support/', 'Поддержка'),
  ],
  new MenuItem('/pay/', 'Оплата'),
  new MenuItem('/get/', 'Получение'),
  [
    new MenuItem('/catalogue/', 'Доставка'),
    new MenuItem('/catalogue/', 'Самовывоз'),
    new MenuItem('/catalogue/', 'Отправление почтой'),
  ],
  new MenuItem('/refund/', 'Гарантия и возврат'),
  [
    new MenuItem('/', 'Гарантия'),
    [
      new MenuItem('/', 'И'),
      new MenuItem('/', 'Возврат'),
    ]
  ]
];

const subMenu = new SubMenu('sub_menu', 'Sub_class', s_items);

document.write(subMenu.render());

subMenu.remove(11, 'sub_menu');