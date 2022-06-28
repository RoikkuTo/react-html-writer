# React HTML Writer

Here are some components which will allow you to animate HTML writing on your application.

## Installation

```bash
$ npm i react-html-writer
```

## Components

### Tag

`<Tag></Tag>`

As a normal HTML tag, you can add any child element or string as a _Tag_ or _String_ component.

| Propertie | Type    | Description                                                                       |
| --------- | ------- | --------------------------------------------------------------------------------- |
| name      | String  | Define the tagname (_div, span, ..._)                                             |
| attr      | Object  | Add attributes to your tags ( _These attributes do not affect child components_ ) |
| open      | Boolean | Open de tags when the writing is finished                                         |
| loop      | Boolean | Loop the animation                                                                |

### String

`<Text />`

This component is only used to write **strings**, so you cannot specify any string if not through the `text` property. The _String_ component is complitely independent from the _Tag_ component.

| Propertie | Type   | Description                                                               |
| --------- | ------ | ------------------------------------------------------------------------- |
| text      | String | Define the string to write                                                |
| style     | Object | Style the defined text ( _this property will not appear during writing_ ) |

## Styling

You can change the color of each part of your _Text_ and _Tags_.

_Text_ in the other hand can be styled via the `style` property from react.

_Tags_ are customizable through the `theme` prop. You can use those to change colors, sizes, and fonts.

| Variable              | Description                                               |
| --------------------- | --------------------------------------------------------- |
| cursorColor           | the cursor color                                          |
| textColor             | the string color                                          |
| tagHookColor          | the hooks color, so the greater and minus than ("<", ">") |
| tagNameColor          | the tag names color                                       |
| attrNameColor         | the attributes name color                                 |
| attrSymbolColor       | the symbols color, the "="symbol basically                |
| attrQuoteColor        | the attributes name color                                 |
| attrValueColor        | the attributes value color                                |
| selectColor           | the selection color                                       |
| selectBackgroundColor | the background selection color                            |
| fontSize              | the font size                                             |
| fontFamily            | the font                                                  |
| tagTabsize            | the tabulation size on indentation                        |

## Usage

A simple usage with a simple **HelloWorld**.

```javascript
import React from 'react'
import { Tag, String } from 'react-html-writer'

const HelloWorld = () => (
	<Tag name="h1">
		<Text text="Hello World !" />
	</Tag>
)

export default HelloWorld
```

> If you want to import the library via the `script` tag in your HTML file, you can by using the `ReactHtmlWriter` global object.

So the end result will look like this. ( _no animation_ )

```html
<h1>Hello World !</h1>
```

For a full demo with animtions, try this [CodeSandBox](https://codesandbox.io/s/react-html-writer-cyxe8?codemirror=1&fontsize=14&hidenavigation=1&module=%2Fsrc%2Fdemo.js&theme=dark) or use the `demo.js` inside the _src/demo_ folder.

## Todolist

-   [x] Create or choose a theme for each component (color, font, size, ...)
-   [ ] Add a duration setting
-   [ ] Add a timeline
-   [x] Add @types
