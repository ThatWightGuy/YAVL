(function ($) {

	var labelClass = function (options, container, field) {
		if (options && options.labelType) {
			switch (options.labelType) {
				case 'top':
					container.addClass('y-label-top');
					field.appendTo(container);

					break;
				case 'bottom':
					container.addClass('y-label-bottom');

					break;
				case 'left':
					container.addClass('y-label-left');
					field.appendTo(container);

					break;
				case 'right':
					container.addClass('y-label-right');

					break;
				case 'infield':
					container.addClass('y-label-infield');	

					break;
				case 'infield-float':
					container.addClass('y-label-float');

					break;
				default: 
					container.addClass(options.labelType);

					break;
			}
		}
	}

	var validateInput = function(options){
		$('[yavl]').on('input', function() {
			// console.log(this.tagName);
			console.log(); 
		});
	}

	$.fn.yavl = function(options) {
		const fields = this.find('[yavl]');

		for (var i = 0; i < fields.length; i++) {
			var parent = $(fields[i]).parent();
			var container = $('<div class="yavl-container"></div>').appendTo(parent);

			// Add Field To Validation Container:
			$(fields[i]).appendTo(container);

			// Generate Label if "yavl-label" isn't set to false (requires name attr to be set):
			if ($(fields[i]).attr('name') && ($(fields[i]).attr('yavl-label') != 'false')) {
				var f_val = '';
				var l_val = '';

				if ($(fields[i]).attr('yavl-name')) {
					f_val = $(fields[i]).attr('name');
					l_val = $(fields[i]).attr('yavl-name')
				}
				else {
					f_val = $(fields[i]).attr('name');
					l_val = $(fields[i]).attr('name');
				}

				var label_str = '<label for="' + f_val + '">' + l_val + '</label>' 

				$(label_str).appendTo(container);
				$(fields[i]).attr('id', f_val);
				
				labelClass(options, container, $(fields[i]));
			}

			validateInput(options);
		}
	}
}(jQuery));