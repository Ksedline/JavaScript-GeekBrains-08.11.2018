const text = `Ригидность детерменирована. Страх традиционен. 
<strong>Are you're okay?</strong> <br> 
Лидерство, на первый взгляд, как всегда непредсказуемо.
Действие прекрасно понимает азимут, что отмечают такие крупнейшие ученые как Фрейд, Адлер, Юнг, Эриксон, Фромм. <br><br>
<i>Экскадрилья, оценивая блеск освещенного металического шарика, изменяет Тукан. И сказал Тукан: 'Здравствуйте, я Ваша Тетя', на что прогресс сказал: 'Неминуемо'.</i> <br><br>
Очевидно, что полнолуние аннигилирует продвигаемый стресс.
Психоанализ представляет собой параллельный критерий интегрируемости. <strong>Isn't it?</strong> Практика однозначно показывает, что интеграл от функции, обращающейся в 
бесконечность в изолированной точке неравномерен. <br> Наши исследования позволяют сделать вывод о том, что высшая арифметика программирует из ряда вон выходящий многочлен. 
Метод последовательных приближений интуитивно понятен. Векторное поле изящно отражает многомерный аутизм, учитывая современные тенденции. <strong>Aren't we?</strong>`;

document.write('<h2><strong>Текст до RegExp</strong></h2>');
document.write(`<span>${text}</span><br><br>`);
document.write('<span>Автор: <a href="https://yandex.ru/referats/">Яндекс.Рефераты</a></span><br><br>');

document.write(`<h2><strong>Текст после RegExp</strong></h2>`);
document.write(`${text.replace(/'([^\w']+)'/g, '\"$1\"')}`);