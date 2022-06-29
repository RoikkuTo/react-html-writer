# React HTML Writer

Here are some components that will allow you to animate HTML writing on your React application.

## Installation

```bash
$ npm i react-html-writer
```

## Components

### Tag

`<Tag></Tag>`

As a normal HTML tag, you can nest as much `Tag` and `Text` component as you want.

| Propertie | Type    | Description                                                                       |
| --------- | ------- | --------------------------------------------------------------------------------- |
| name      | String  | Define the tagname (_div, span, ..._)                                             |
| attr      | Object  | Add attributes to your tags ( _These attributes do not affect child components_ ) |
| open      | Boolean | Open de tags when the writing is finished                                         |
| loop      | Boolean | Loop the animation                                                                |

### Text

`<Text />`

This component is only used to write **strings**. The _Text_ component is complitely independent from the _Tag_ component, which means that use it by itself to simulate keyboard simple text writing.

| Propertie | Type   | Description                |
| --------- | ------ | -------------------------- |
| text      | String | Define the string to write |
| style     | Object | Style the defined text     |

## Styling

You can change the color of each part of your **Text** and **Tags**.

`<Text />` can be styled via the `style` property from react.

`<Tag></Tag>` in the other hand are customizable through the `theme` prop. You can use those to change colors, sizes, and fonts.

| Variable              | Description                                           |
| --------------------- | ----------------------------------------------------- |
| cursorColor           | the cursor color                                      |
| textColor             | text color                                            |
| tagHookColor          | hooks color, so the greater and minus than ("<", ">") |
| tagNameColor          | tag names color                                       |
| attrNameColor         | the attributes name color                             |
| attrSymbolColor       | symbols color, the "=" symbol basically               |
| attrQuoteColor        | attributes name color                                 |
| attrValueColor        | attributes value color                                |
| selectColor           | the selection color                                   |
| selectBackgroundColor | the background selection color                        |
| fontSize              | the font size                                         |
| fontFamily            | the font                                              |
| tagTabsize            | tabulation size on indentation                        |

## Usage

> For a full demo with animtions, try this [CodeSandBox](https://codesandbox.io/s/react-html-writer-cyxe8?codemirror=1&fontsize=14&hidenavigation=1&module=%2Fsrc%2Fdemo.js&theme=dark) or use the `demo.js` inside the _src/demo_ folder.

A simple usage with a simple **HelloWorld**.

```javascript
import React from 'react'
import { Tag, Text } from 'react-html-writer'

const HelloWorld = () => (
	<Tag name="h1">
		<Text text="Hello World!" />
	</Tag>
)

export default HelloWorld
```

So the end result will look like this. ( _no animation_ )

```html
<h1>Hello World !</h1>
```

> If you want to import the library via the `script` tag in your HTML file, you can by using the `HTMLWriter` global object.

## Todolist

-   [x] Create or choose a theme for each component (color, font, size, ...)
-   [ ] Add a duration setting
-   [ ] Add a timeline
-   [x] Add @types
