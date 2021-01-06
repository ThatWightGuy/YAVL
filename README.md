# YAVL
Yet Another Validation Library - jQuery plugin for easily validating field elements.

# Usage:

## Initialization:

At minimum, all inputs require two attributes: ```yavl``` and ```name```. Attribute ```yavl``` tells the validator that the current field requires validation.

### Example:
```HTML 
<input yavl name="test"></input>
```

Other attributes can also be provided 

The most simple setup with default settings:

### Example:
```Javascript
$(form).yavl();
```

An options object can also be provided to the yavl function. Below is a table of options that can be provided:
