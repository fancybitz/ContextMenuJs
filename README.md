# ContextMenuJs

### Versions
```
- 0.0.1 Barely functional menu
- 0.0.2 Bugfix
- 0.0.3 Code Refactor
- 0.1.0 Stable version
```

## Add Menu

1. Open js/menus.js file
2. Add an object

```javascript
    var tmpMenu = {
        title: "title",
        code: "identifier",
        voicesList:[{
            voice: "voice 1",
            link: "link1",
            img: "imgs/god.png",
            submenu: undefined
        }]
    };
    
```

submenu can also contain an array like the one defined in voiceList

```javascript
var otherMenu = {
	title: "titolo",
	code: "titleMenu",
	voicesList:[{
		voice: "voice 1",
		link: "link1",
		img: "imgs/god.png",
		submenu: [{
			voice: "voice 1.1",
			link: "link1.1",
			img: "imgs/god.png",
			submenu: undefined
		},{
			voice: "voice 1.2",
			link: "link1.1",
			submenu: undefined
		},{
			voice: "voice 1.3",
			link: "link1.1",
			separator: true,
			submenu: undefined
		},{
			voice: "voice 1.4",
			link: "link1.1",
			submenu: undefined
		},{
			voice: "voice 1.5",
			link: "link1.1",
			submenu: undefined
		}]
	}]
};
```

## Menu Attributes

menu attributes(**EVERY ATTRIBUTE IF NOT SET IS UNDEFINED**):
1. **title**: defines what header title will be displayed
2. **code**: defines what menu will be displayed on click(for default menu use code: "default", if not set the console will warn you but is not obligatory to set a default value)
        example: if you want to use the second menu(otherMenu) when clicking some p element, you have to use the **menuCode** attribute inside the p element ```<p menuCode="otherMenu">click me</p>```
3. **voicesList**: contains all the voices of the menu
4. **img**: contains the url of the image that you want to display inside your menu voice
5. **submenu**: contains an array of voices
6. **separator**: (boolean value) creates a small line after this menu voice


## Using Menu in your page
1. Include css, jquery and scripts:

```html
<link rel="stylesheet" type="text/css" href="css/contextMenu.css"/>
<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.4.1/jquery.min.js"></script>
<script src="js/contextMenu.js"></script>
<script src="js/menus.js"></script>
```

2. Add your defined menus to the page with generateMenus([tmpMenu, otherMenu, ...]) function
```javascript
generateMenus([tmpMenu, otherMenu, ...]);
```

# Coming soon
- Submenu positioning on left when overflowing on x axis 
