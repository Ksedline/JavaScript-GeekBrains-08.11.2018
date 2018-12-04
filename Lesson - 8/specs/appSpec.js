describe('HomeWork6 Валидация ->', () => {
/* Тестируемый фрагмент
  				if (!$fio.val()) {
					wrongify($fio);
					$('#dialog').dialog('option', 'title', 'Ошибка');
					$('#dialog > p').text('Введите ФИО!');
					$('#dialog').dialog('open');
				} else {
					if (!$datep.val()) {
						wrongify($datep);
						$('#dialog').dialog('option', 'title', 'Ошибка');
						$('#dialog > p').text('Введите дату!');
						$('#dialog').dialog('open');
					} else {
						const match = $datep.val().toString();
						if (match.match(/^\d{2}([./-])\d{2}\1\d{4}$/)) {
							$('#dialog').dialog('option', 'title', 'Отправлено');
							$('#dialog > p').text(`Ваше ФИО: ${$fio.val()}. Дата рождения: ${$datep.val()}`);
							$('#dialog').dialog('open');
						} else {
							wrongify($datep);
							$('#dialog').dialog('option', 'title', 'Ошибка');
							$('#dialog > p').text('Введите корректную дату по формату дд.мм.гггг или выберите её');
							$('#dialog').dialog('open');
						}
					}
				}
  */

it('Проверка отрабатывания условия на пустой val() в ФИО или datep JQuery', () => {
  let checker1 = true; // По умолчанию пустое

  let $fio = {
    val: () => ''
  };

  if ($fio.val()) {
    checker1 = false; // Не пустое
  }

  expect(checker1).toBe(true);
});

describe('Проверка прохождения валидации даты ->', () => {
  describe('Кейсы ->', () => {
    it('Корректная дата', () => {
      let $datep1 = {
        val: () => '16.01.2000'
      };

      const match = $datep1.val().toString();
      let checker2 = false; // По умолчанию не проходит валидацию

      if (match.match(/^\d{2}([./-])\d{2}\1\d{4}$/)) {
        checker2 = true;
      }

      expect(checker2).toBe(true); // Ожидается, что валидация будет пройдена
    });

    it('Некорректная дата', () => {
      let $datep2 = {
        val: () => '16.01.200'
      };

      const match = $datep2.val().toString();
      let checker3 = false; // По умолчанию не проходит валидацию

      if (match.match(/^\d{2}([./-])\d{2}\1\d{4}$/)) {
        checker3 = true;
      }

      expect(checker3).toBe(false); // Ожидается, что валидация будет не пройдена
    });
  });
});
});

