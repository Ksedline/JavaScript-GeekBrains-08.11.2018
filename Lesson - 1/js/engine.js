/* Make const, not var */

class Container { // Объявляем класс Контейнер
  constructor(id, className, htmlCode) { // Задаём конструктор класса - т.е. те вещи, что содержит класс, они сохраняются при объявлении класса
    this.id = id; 
    this.className = className; 
    this.htmlCode = htmlCode;
  }

  render() { // Объявляем метод класса
    return this.htmlCode; // Он возвращает htmlCode, что мы ему передаем
  }
}

class Menu extends Container { // Объявляем класс Menu и расширяем этим классом Container
  constructor(my_id, my_class, my_items) { // Задаём конструктор класса
    super(my_id, my_class); // Через super - передаём в родительский класс (в этом случае Container) id и className
    this.items = my_items; // Итемы же храним в классе меню
  }

  render() {
    let result = `<ul class="${this.className}" id="${this.id}">`; // Задаем строку с ul, к ней будем крепить другие html строки

    this.items.map(item => { // map - это удобный способ пройти в цикле по массиву, мне он больше нравится чем писать for...
      if (item) { // Если item не пустой, это здесь не обязательно проверять, оставил с момента тестирования своего кода
        if (item instanceof MenuItem) { // если item принадлежит классу MenuItem
          result += item.render(); // то вызываем у этого item метод render, который возвращает строку
        }
      }
    });

    result += '</ul>'; // не забываем закрыть наш ul :)

    return result; // возвращаем result
  }

  remove(removable) { // метод для удаления элемента removable - это индекс
    this.items.splice(removable, 1); // берем массив items и убираем 1 элемент на позиции removable
  }
}

class SubMenu extends Menu { // тут я реализую класс подменю для 2го задания
  constructor(id, my_class, items) { // через конструктор передаем эти элементы
    super(id, my_class, items); // через супер в родительский класс Menu передаем эти элементы
  }

  render() { // создаю render

    let result = `<ul class="${this.className}" id="${this.id}">`; // как и в render у Menu

    this.items.map(item => { // Проходим по items
      if (item) {
        if (item instanceof MenuItem) { // item, содержащий массив не принадлежит MenuItem
          result += item.render();
        } else if (Array.isArray(item)) { // если элемент - массив

          result += `<ul class="sub${this.className}">`; // то создаём новый ul

          item.map(subItem => { // еще раз проходим в цикле
            if (subItem instanceof MenuItem) { // только работаем уже с элементами, что находятся в массиве item
              result += subItem.render(); // вызываем .render(), что возвращает строку
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

const s_items = [ // В моём случае - items это массив с элементами меню
  new MenuItem('/', 'Главная'),
  new MenuItem('/catalogue/', 'Каталог'),
  [ // а подменю - это массив, содержащий в себе элементы подменю
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

/* 
  Массив до удаления 
  m_items = [
  new MenuItem('/', 'Главная'),
  new MenuItem('/catalogue/', 'Каталог'),
  new MenuItem('/catalogue/', 'Каталог (лишний)'),
  new MenuItem('/gallery/', 'Галерея (лишняя)'),
  new MenuItem('/gallery/', 'Галерея'), // Такие запятые не опечатка, они нужны для git
];

*/
menu.remove(2); 

/* 
  Массив после удаления 
  m_items = [
  new MenuItem('/', 'Главная'),
  new MenuItem('/catalogue/', 'Каталог'),
  new MenuItem('/gallery/', 'Галерея (лишняя)'),
  new MenuItem('/gallery/', 'Галерея'), // Такие запятые не опечатка, они нужны для git
];

*/

menu.remove(2); // Метод remove

/* 
  Массив после удаления 
  m_items = [
  new MenuItem('/', 'Главная'),
  new MenuItem('/catalogue/', 'Каталог'),
  new MenuItem('/gallery/', 'Галерея'), // Такие запятые не опечатка, они нужны для git
];

*/

document.write(menu.render());
document.write('<br>');
document.write(subMenu.render());