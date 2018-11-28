class Comments {
    constructor() {
        this.comments = [];
        this.get();
        this.events();
    }

    async get() {
        await $.ajax({
            url: '/json/review.list.json',
            type: 'get', // Здесь GET, тк нет сервера, который принял бы POST
            dataType: 'json',
            success: data => {
                if (data.result === 1) {
                    data.comments.map(item => item.status = 'unapproved');
                    this.comments = data.comments;
                } else {
                    if (data.error_message) {
                        alert(data.error_message)
                    } else {
                        alert('Произошла ошибка');
                    }
                }
            },
            error: (data, error) => {
                alert('Произошла ошибка ' + error);
            }
        });

        await this.render();
    }

    render() {
        let comments = '';
        this.comments.map((item, index) => comments +=
            `<div class="comment ${item.status}" data-id="${index}">
                <p>ID: ${item.id_comment};</p>
                <p>Text: ${item.text}</p>
                <div class="del">Удалить</div>
                <div class="app">Одобрить&nbsp;</div>
            </div>`);

        $('.content').html(`<div><h3>Комментарии</h3>${comments}</div>`);

        this.eventsUpdate();
    }

    eventsUpdate() {
        $('.comment').on('click', event => {
            const id = parseInt($(event.currentTarget).attr('data-id'));
            if ($(event.target).hasClass('del')) {
                this.removeComment(id);
            } else if ($(event.target).hasClass('app')) {
                this.approveComment(id);
            }
        });
    }

    events() {
        $('#button').on('click', () => {
            const $text = $('#textarea');
            if ($text.val()) {
                this.addComment(Math.round(10 * Math.random()), $text.val());
                $text.val('');
            } else {
                alert('Введен пустой комментарий');
            }
        });
    }

    addComment(idComment, text) {
        this.comments.push({
            'id_comment': idComment,
            'text': text,
            status: 'unapproved'
        });

        this.render();
    }

    approveComment(idComment) {
        this.comments[idComment].status = 'approved';
        this.render();
    }

    removeComment(idComment) {
        this.comments.splice(idComment, 1);
        this.render();
    }

    /* Закомментировал методы с ajax

    addComment(idUser, text) {
        $.ajax({
            url: 'review.add.json',
            type: 'post',
            dataType: 'json',
            data: JSON.stringify({
                id_user: idUser,
                text: text
            }),
            success: data => {
                if (data.result === 1) {
                    if (data.userMessage) {
                        alert(data.userMessage);
                    } else {
                        alert('Ваш отзыв был отправлен на модерацию');
                    }
                } else {
                    if (data.error_message) {
                        alert(data.error_message)
                    } else {
                        alert('Произошла ошибка');
                    }
                }
            },
            error: (data, error) => {
                alert('Произошла ошибка ' + error);
            }
        });
    }

    approveComment(idComment) {
        $.ajax({
            url: 'review.submit.json',
            type: 'post',
            dataType: 'json',
            data: JSON.stringify({
                id_comment: idComment
            }),
            success: data => {
                if (data.result === 1) {
                    alert('Комментарий одобрен');
                } else {
                    if (data.error_message) {
                        alert(data.error_message)
                    } else {
                        alert('Произошла ошибка');
                    }
                }
            },
            error: (data, error) => {
                alert('Произошла ошибка ' + error);
            }
        });
    }

    removeComment(idComment) {
        $.ajax({
            url: 'review.delete.json',
            type: 'post',
            dataType: 'json',
            data: JSON.stringify({
                id_comment: idComment
            }),
            success: data => {
                if (data.result === 1) {
                    alert('Комментарий удален');
                } else {
                    if (data.error_message) {
                        alert(data.error_message)
                    } else {
                        alert('Произошла ошибка');
                    }
                }
            },
            error: (data, error) => {
                alert('Произошла ошибка ' + error);
            }
        });
    } */
}

new Comments();