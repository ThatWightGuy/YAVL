# YAVL
Yet Another Validation Library - jQuery plugin for easily validating field elements.

# Usage:

## Initialization:

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

| Option    | Type   | Description                                                                                                                                                                                                                                                                                                                                                                             |
|-----------|--------|-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| labelType | String | Determines where labels are placed. Predefined labels include: ```left``` (labels are placed to the left of input), ```right``` (labels are placed to the right of input), ```bottom``` (labels are placed to the bottom of input), ```top``` (labels are placed to the top of input), ```bottom``` (labels are placed to the bottom of input), and ```infield``` 'bottom' (labels are placed inside of input). |
|           |        |                                                                                                                                                                                                                                                                                                                                                                                         |
|           |        |              
 
