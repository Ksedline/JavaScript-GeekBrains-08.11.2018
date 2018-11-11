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

  remove(removable) {
    this.items.splice(removable, 1);
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
            }
          });

          result += '</ul>';
        }
      }
    });

    result += '</ul>';

    return result;
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

const m_items = [
  new MenuItem('/', 'Главная'),
  new MenuItem('/catalogue/', 'Каталог'),
  new MenuItem('/catalogue/', 'Каталог (лишний)'),
  new MenuItem('/gallery/', 'Галерея (лишняя)'),
  new MenuItem('/gallery/', 'Галерея'), // Такие запятые не опечатка, они нужны для git
];

const s_items = [
  new MenuItem('/', 'Главная'),
  new MenuItem('/catalogue/', 'Каталог'),
  [
    new MenuItem('/catalogue/', 'Подкаталог'), 
    new MenuItem('/catalogue/', 'Подкаталог'), 
    new MenuItem('/catalogue/', 'Подкаталог'),
  ],
  new MenuItem('/catalogue/', 'Каталог'),
  [
    new MenuItem('/catalogue/', 'Подкаталог'), 
    new MenuItem('/catalogue/', 'Подкаталог'), 
    new MenuItem('/catalogue/', 'Подкаталог'),
  ],  
];

const menu = new Menu('my_menu', 'My_class', m_items);
const subMenu = new SubMenu('sub_menu', 'Sub_class', s_items);

menu.remove(2); // Метод remove
menu.remove(2); // Метод remove

document.write(menu.render());
document.write('<br>');
document.write(subMenu.render());