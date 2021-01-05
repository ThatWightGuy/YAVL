(function ($) {
	// Pre-defined options for Label Placements (labelTypes):
	const labelFunctions = {
		'top': function(container, field) {
			container.addClass('y-label-top');
			field.appendTo(container);
			return true;
		},
		'bottom': function(container, field) {
			container.addClass('y-label-bottom');
			return true;
		},
		'left': function(container, field) {
			container.addClass('y-label-left');
			field.appendTo(container);
			return true;
		},
		'right': function(container, field) {
			container.addClass('y-label-right');
			return true;
		},
		'infield': function(container, field) {
			container.addClass('y-label-infield');	
			return true;
		},
	}

	// Pre-defined options for yavl attribute. Custom attributes are created
	// in "validation" parameter in the options object on init.
	var validation = {
		'email': function(value) {
			var regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
			return regex.test(value);
		},
		'phone': function(value) {
			var regex = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im;
			return regex.test(value);
		},
		
	}

	var addValid = function(input) {
		input.parent().addClass('yavl-valid');
		input.parent().removeClass('yavl-invalid');
	}

	var addInvalid = function(input) {
		input.parent().addClass('yavl-invalid');
		input.parent().removeClass('yavl-valid');
	}

	var validateInput = function(){
		$('[yavl]').on('input', function() {
			if (this.value) {
				$(this).parent().addClass('yavl-filled');
			}
			else {
				$(this).parent().removeClass('yavl-filled');
			}

			if (validation[$(this).attr('yavl')]) {
				if ($(this).attr('yavl-req') != 'false') {
					if (validation[$(this).attr('yavl')](this.value)) {
						addValid($(this));
					}
					else {
						addInvalid($(this));
					}
				}
				else {
					addValid($(this));
				}
			}
			else {
				if ($(this).attr('yavl-req') != 'false') {
					if (this.value) addValid($(this));
					else addInvalid($(this));
				}
				else addValid($(this));
			}
		});
	}

	var labelClass = function (options, container, field) {
		if (options && options.labelType) {
			if (!labelFunctions[options.labelType](container, field)) {
				container.addClass(options.labelType);
			}
			else {
				// Removes inline labels from any checkbox or radio fields:
				if (['checkbox', 'radio'].includes(field.attr('type')) && container.hasClass('y-label-infield')) {

					container.removeClass('y-label-infield');

					// Option "checkLabelType" cannot be "infield":
					if (options.checkLabelType && options.checkLabelType != 'infield') {
						labelFunctions[options.checkLabelType](container, field);
					}
					else {
						labelFunctions['right'](container, field);
					}
				}
			}
		}
		else {
			labelFunctions['right'](container, field);
		}
	}

	var fieldInit = function (par, options) {
		const fields = par.find('[yavl]');

		for (var i = 0; i < fields.length; i++) {
			var parent = $(fields[i]).parent();
			var container = $('<div class="yavl-container"></div>').appendTo(parent);

			// Add Field To Validation Container:
			$(fields[i]).appendTo(container);

			// Add initial validation:
			if ($(fields[i]).attr('yavl-req') != 'false') {
				if (!$(fields[i]).value) {
					addInvalid($(fields[i]));
				}
				else {
					addValid($(fields[i]));
				}
			}
			else {
				addValid($(fields[i]));
			}

			// Generate Label if "yavl-label" isn't set to false (requires name attr to be set):
			if ($(fields[i]).attr('name') && ($(fields[i]).attr('yavl-label') != 'false')) {
				var f_val = '';
				var l_val = '';

				if ($(fields[i]).attr('yavl-name')) {
					f_val = $(fields[i]).attr('name');
					l_val = $(fields[i]).attr('yavl-name')
				}
				else if ($(fields[i]).attr('value')){
					f_val = $(fields[i]).attr('name');
					l_val = $(fields[i]).attr('value');
				}
				else {
					f_val = $(fields[i]).attr('name');
					l_val = $(fields[i]).attr('name')
				}

				var label_str = '<label for="' + f_val + '">' + l_val + '</label>' 

				$(label_str).appendTo(container);

				if (['checkbox', 'radio'].includes($(fields[i]).attr('type'))) {
					$(fields[i]).attr('id', f_val + "-" + $(fields[i]).attr('value'));
				} 
				else {
					$(fields[i]).attr('id', f_val);
				}
				
				labelClass(options, container, $(fields[i]));
			}
		}
	}

	var submitHanlder = function(form, callback) {
		const allTrue = (value) => value == true;
		
		form.submit(function(e) {
			const fields = $(form).find('.yavl-container');
			var valid = {};

			for (var i = 0; i < fields.length; i++) {
				var name = $(fields[i]).find('[yavl]').attr('name');

				if (!valid[name]) {
					valid[name] = false;
				}

				if ($(fields[i]).hasClass('yavl-valid')) {
					valid[name] = true;
				}
			}

			if (typeof callback === 'function') {
				callback();
			}

			if (!Object.values(valid).every(allTrue)) {
				e.preventDefault();
			}
		});
	}

	$.fn.yavl = function (options={}) {
		// Merge custom validation from options into validation object:
		if (options.validation) {
			validation = Object.assign(validation, options.validation);
		}

		// Initialize form fields:
		fieldInit(this, options);

		// Validation on input handler:
		validateInput();

		// Submit Handler options.yavlSubmit is an optional callback function provided by user:
		if (options.yavlSubmit) submitHanlder(this, options.yavlSubmit());
		else submitHanlder(this);
	}
}(jQuery));