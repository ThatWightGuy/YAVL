# YAVL
Yet Another Validation Library - jQuery plugin for easily validating form elements.

## Usage:

### Initialization of Inputs:

At minimum, all inputs require two attributes: ```yavl``` and ```name```. Attribute ```yavl``` tells the validator that the current field requires validation while ```name``` (on top of its main function) is the fallback for how YAVL determines the label text.

### Example:
```HTML 
<input yavl name="test">
```

Other attributes can also be provided on each input for extra validation options:

| Option     | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  |
|------------|----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| yavl       | This is the only required yavl attribute needed. This attribute can be provided with or without a value. Attribute ```yavl``` without a value means that the current input only needs to have a value on submit. Attribute ```yavl``` with a value defines the specific validation function to be used. Pre-defined validation functions included with yavl are ```email``` (checks if current value is a valid email) and ```phone``` (checks if current value is a valid phone number). Custom validation functions are defined in the ```validation``` parameter in the options object on initialization. |
| yavl-name  | This attribute is used to override label name generated by ```name``` attribute. Attribute ```value``` can also be used as the label name.                                                                                                                                                                                                                                                                                                                                                                                                                                                   |
| yavl-label | If this attribute is defined with value ```false```, YAVL will not provide a label to that input.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            |
| yavl-req   | If this attribute is defined with value ```false```, YAVL will treat that input as always valid. This input does not need to be given a value (in other words, it'll be treated as an optional field).                                                                                                                                                                                                                                                                                                                                                                                       |

### Example:
```HTML 
<input yavl name="Name">
<input yavl="phone" name="Number" yavl-name="Phone">
<input yavl="email" name="Email">
<select yavl name="Options" yavl-label="false">
...
</select>
<textarea yavl name="Message" yavl-req="false"></textarea>
```

### Initialization of YAVL:

The most simple setup with default settings:

```Javascript
$(form).yavl();
```

An options object can also be provided to the yavl function. Below is a table of options that can be provided:

| Option         | Type     | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        |
|----------------|----------|--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| labelType      | String   | Determines where labels are placed. Pre-defined labels include: ```left``` (labels are placed to the left of input), ```right``` (labels are placed to the right of input), ```bottom``` (labels are placed to the bottom of input), ```top``` (labels are placed to the top of input), and ```infield``` (labels are placed inside of input). Custom ```labelType``` options can be used for added cutomization. By default, this value is set to ```left```. |
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
	
