function tableSort(table, callback) {
	$(table).on('click', 'a[data-sort]', function() {
		var field = $(this).attr('data-field');
		var sort = $(this).attr('data-sort');
		var fields = field.split(',');
		$(this).closest('tr').find('a[data-sort]').attr('data-sort', '');
		var new_sort = '';
		if (sort != 'asc') {
			new_sort = 'asc';
		} else {
			new_sort = 'desc';
		}
		$(this).attr('data-sort', new_sort);
		var value = fields.join(' ' + new_sort + ', ') + ' ' + new_sort;
		callback(value, true);
	});
	var value = '';
	var element_sort = $(table).find('a[data-sort]:not([data-sort=""])');
	if (element_sort.length) {
		var sort	= element_sort.attr('data-sort');
		var fields	= element_sort.attr('data-field').split(',');
		value = fields.join(' ' + sort + ', ') + ' ' + sort;
	}
	callback(value, false);
}
function removeComma(value, type) {
	if (typeof value == 'string') {
		value = value.replace(/\,/g,'');
	}
	if (value == '' || value == '.') {
		value = 0;
	}
	if (type == 'int') {
		value = parseInt(value);
	} else {
		value = parseFloat(value);
	}
	if ( ! value > 0) {
		value = 0;
	}
	return value;
}
function addComma(value, type) {
	if (typeof value == 'string') {
		value = value.replace(/\,/g,'');
	}
	if (value == '' || value == '.') {
		value = 0;
	}
	var decimal_place = 2;
	if (type == 'int') {
		value = parseInt(value);
		decimal_place = 0;
	} else {
		value = parseFloat(value);
	}
	if ( ! value > 0) {
		value = 0;
	}
	return value.toFixed(decimal_place).replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,");
}
function filterToURL() {
	for (var key in ajax) {
		if (ajax.hasOwnProperty(key)) {
			if (ajax[key] == '') {
				delete(ajax[key]);
			}
		}
	}
	if ( ! $.isEmptyObject(ajax)) {
		console.log('lskjdflksdf');
		var url = window.location.href.replace(window.location.search, '') + '?' + $.param(ajax);
		window.history.pushState("string", "Page", url);
	}
}
function filterFromURL() {
	var json = {};
	try {
		json = JSON.parse('{"' + decodeURIComponent(window.location.search.replace(/\?/g, '').replace(/&/g, "\",\"").replace(/=/g,"\":\"")).replace(/\+/g, ' ') + '"}');
	} catch (e) {}
	return json;
}
function ajaxToFilter(ajax, data, type = 'input') {
	for (var key in data) {
		if (data.hasOwnProperty(key)) {
			if (type == 'input') {
				if (ajax[key]) {
					$(data[key]).val(ajax[key]);
				}
			}
		}
	}
}
function ajaxToFilterTab(ajax, element, key) {
	if (ajax[key]) {
		$(element).find('li').removeClass('active').closest('ul').find('a[href="' + ajax[key] + '"]').closest('li').addClass('active');
	}
}