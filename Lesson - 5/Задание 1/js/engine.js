const items = [{
        "id": "1",
        "title": "Товар 1",
        "price": 100
    },
    {
        "id": "2",
        "title": "Товар 2",
        "price": 200
    },
    {
        "id": "3",
        "title": "Товар 3",
        "price": 300
    },
    {
        "id": "4",
        "title": "Товар 4",
        "price": 400
    },
    {
        "id": "5",
        "title": "Товар 5",
        "price": 500
    },
    {
        "id": "6",
        "title": "Товар 6",
        "price": 600
    },
];

class Goods {
    constructor(id, title, price) {
        this.id = id;
        this.title = title;
        this.price = price;
        this.render();
    }

    render() {
        const div = $('<div/>').addClass('goods');

        div.attr('id', this.id);
        div.append($('<div/>').addClass('title').html(this.title));
        div.append($('<div/>').addClass('price').html('Цена: ' + this.price + 'р'));
        div.append($('<div/>').addClass('button').html('Купить'));

        $('.content').append(div);

        $('.button').on('click', event => {
            if ($(event.currentTarget).parent().attr('id') === this.id) {
                basket.add(this.id);
                basket.render();
            }
        });
    }
}

class Basket {
    constructor() {
        this.summ = 0;
        this.count = 0;
        this.render();
    }

    render() {
        const div = $('.basket');

        div.html('');
        div.append($('<div/>').addClass('count').html('Колличество товаров: ' + this.count));
        div.append($('<div/>').addClass('summ').html('Сумма: ' + this.summ));
        div.append($('<div/>').addClass('button_busc').html('Показать'));

        $('.button_busc').on('click', () => {
            $('.modal').css('display', 'flex');
        });

        $('.close').on('click', () => {
            $('.modal').css('display', 'none');
        });

    }

    add(id) {
        items.forEach(elem => {
            if (id === elem.id) {
                this.summ += elem.price;
                $('.modal_window').append($('<div/>').addClass('modal_item').html(`<div style="display: inline;" data-id="${elem.id}">${elem.title} Цена: ${elem.price}</div><div class="del">Удалить</div>`));
            }
        });

        this.remove();
        this.count++;
    }

    remove() {
        $('.modal_item').on('click', event => {
            event.stopPropagation();
            event.stopImmediatePropagation();

            const id = parseInt($(event.currentTarget.children[0]).attr('data-id')) - 1;
            this.summ = this.summ - items[id].price;
            this.count--;

            let check = false;
            $('.modal_item').each((i, item) => {
                if (!check && parseInt($(item.children[0]).attr('data-id')) === (id + 1)) {
                    item.remove();
                    check = true;
                }
            });

            this.render();
        });
    }
}

const basket = new Basket();

items.forEach(elem => {
    new Goods(elem.id, elem.title, elem.price);
});