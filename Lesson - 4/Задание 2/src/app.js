(async () => {

	const $form = $('form');
	const $datalist = $('form > datalist');
	let data;

	await $.ajax({
		url: 'src/cities.json',
		dataType: 'json',
		success: response => data = response.city,
		error: error => alert('Ошибка загрузки городов: ' + error.responseText),
	});

	await $(document).ready(() => {
		$('#counter').text(`Осторожно, BigData! ${data.length} городов`);

		$datalist.html(data.map(item => {
			return `<option value=${item.name}></option>`;
		}));

		$form.submit(event => {
			event.preventDefault();

			alert('Выбран город: ' + $('input[list=city]').val());
		});
	});
})();