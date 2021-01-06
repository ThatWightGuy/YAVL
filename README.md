# YAVL
Yet Another Validation Library - jQuery plugin for easily validating field elements.

## Usage:

### Initialization:

At minimum, all inputs require two attributes: ```yavl``` and ```name```. Attribute ```yavl``` tells the validator that the current field requires validation while ```name``` (on top of its main function) is the fallback for how YAVL determines the label text.

### Example:
```HTML 
<input yavl name="test"></input>
```

Other attributes can also be provided for extra 

The most simple setup with default settings:

```Javascript
$(form).yavl();
```

An options object can also be provided to the yavl function. Below is a table of options that can be provided:

| Option         | Type     | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        |
|----------------|----------|--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| labelType      | String   | Determines where labels are placed. Predefined labels include: ```left``` (labels are placed to the left of input), ```right``` (labels are placed to the right of input), ```bottom``` (labels are placed to the bottom of input), ```top``` (labels are placed to the top of input), 'bottom' (labels are placed to the bottom of input), and ```infield``` (labels are placed inside of input). Custom ```labelType``` options can be used for added cutomization. By default, this value is set to ```left```. |
| checkLabelType | String   | Similar to ```labelType```, ```checkLabelType``` defines the placement of labels associated with checkbox and radio input types. This is used when the ```infield``` ```labelType``` is used. All values usable with labelType except for ```infield``` are accpetible. By default, this value is set to ```left```.                                                                                                                                                                                               |
| vaildation     | Object   | This object allows users to define validation functions on top of the pre-defined options provided with YAVL. Object key is the name associated with the function, and the value must be a function with single parameter ```value```. Parameter ```value``` is the value of the input being validated.                                                                                                                                                                                                            |
| yavlSubmit     | Function | This is a callback function that runs on form submission. Function requires one parameter ```form```. This parameter is the current form object on submission.                                                                                                                                                                                                                                                                                                                                                     |

### Example:

```Javascript
$('#test').yavl({
  labelType: 'infield',
  checkLabelType: 'left',
  validation: {
    'url': function(value) {
      var regex = /^(https?:\/\/)?([\w\-])+\.{1}([a-zA-Z]{2,63})([\/\w-]*)*\/?\??([^#\n\r]*)?#?([^\n\r]*)/;
      return regex.test(value);
    }
  },
  yavlSubmit: function (form) {
    console.log('test');
  }
});
```
	
