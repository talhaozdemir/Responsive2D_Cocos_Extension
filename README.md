# Responsive 2D

## Before Start
Please rename your canvas node name as "Canvas" in the editor.

## How to Install
On the menu 
* Extension -> Extension Manager
* Open Project panel from Extension Manager
* Press + icon
* Choose zip file
* After installation restart editor

## How to Use

This extension works in real time. When you change something on the component, you can see changes instantly on the editor.

![portraittutorial.png](https://download.cocos.com/CocosStore/markdown/7c4706869ada49f6ab433f2a15f5ae36/7c4706869ada49f6ab433f2a15f5ae36.png)

### 1- Width Ratio
Scales game object with entered value. For example, if the value equals 1, so the game object width will be equal to screen size. 

### 2- Height Ratio
Same with width ratio, in this case the game object height changes.

### 3- Ratio Type
Options are 'min, max and stretch'
##### min
Chooses minimum value between width and height ratio and apply scale to game object.
##### max
Chooses maximum value between width and height ratio and apply scale to game object.
##### stretch
Scales game object seperately for width and height ratios.

### 4- Referance Node
Initially game objects align self acoording to screen dimensions. If a referance node applied so the game object considers referance node transform values. 

### 5- Alignment
The all screen is divided into sections. The yellow part that you see on the image is the chosen alignment (center - center) which means the game object will be placed at the center of the screen. Choose different sections to place game object different areas and we will use spacing to give offset to the game object.

### 6- Follow Node
Enabling this option disables alignment and the game object follow chosen node position.

### 7- Horizontal Space
This works with Alignment and Follow Node. This spec includes 8 options. These are:
##### %
Gives space to the game object using the percent of available space. For example choosing 50% moves the game object right as much as half of the screen width.
### 8- Ratio Type
##### px
Gives space using pixel value
##### self
Gives space by calculating game object self width. For example If 100% setted, so the game object will be moved as much as self width
##### left
Gives space by calculating left referance node width. For example If 100% setted, so the game object will be moved as much as left referance node width
##### right
##### top
##### bottom
Same thing goes for other referance nodes
##### follow
And same thing goes for followed node that I explained in the entry 6

### 9- Vertical Space
This is vertical spacing, it is same with Horizontal Space. The only difference is spacing vertically.
### 10- Flip X
Flips the game object horizontally and the flip y is flips the game object verticalls as its name explains the case.
### 11- Portrait Menu
Settings for portrait orientation
### 12- Landscape Menu
Settings for landscape orientation
### 13- Settings Menu
General settings
### 14- Rotate Screen
Rotates editor gameplay area so we can set things for both portrait and landscape orientations.
### 15- Change Dimension
Changes gameplay area's dimension. Currently we have 3 different device. But you can add different device dimensions in the script.

![landscapetutorial.png](https://download.cocos.com/CocosStore/markdown/60cf0122cc0c4b2caa5f8949e5f745dc/60cf0122cc0c4b2caa5f8949e5f745dc.png)

### 16- Enable Landscape
If this option is not enabled, the game object uses portrait values for the landscape and if it is enabled so you can set landscape alignment for the game object.
### 17- Paste Portrait
Quickly copy and paste portrait settings.

![settingstutorial.png](https://download.cocos.com/CocosStore/markdown/99c6d02de5a94871a4820520ab4ba14b/99c6d02de5a94871a4820520ab4ba14b.png)

### 18- Resize Frequency
This is includes 3 options which are:
##### ON_WINDOW_RESIZE
Calculation is made for each screen dimension change event, like switching between portrait and landscape orientations.
##### ONCE
Calculation is made for only once.
##### ALWAYS
Calculation is made in the update method.

### 19- Calculate Content Size
If you have parent node and this node has child nodes, so place child nodes in the editor and calculate the parent dimensions with this option and then untick this option. The main purpose is getting transform values of the parent node so we can align parent with right proprtions.
### 20- Positioning from Anchor
Normally extension positions the game object by using its edge points. If this option is enabled, the game object will be aligned from it's anchor points.

### For Questions
###### Discord: agonima#2526

### Sample Video
https://www.bilibili.com/video/BV11V4y1G73R/?vd_source=8a00213194b707e014a428f79bdd7b33