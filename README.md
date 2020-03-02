# React HTML Writer
Here are some components which will allow you to animate HTML writing on your application. I will add functionalities and fixes progressively 😊.

## Installation
Via npm
```bash
$ npm i -S react-html-writer
```

## Components
### Tag
`<Tag></Tag>`

As a normal HTML tag, you can add any child element or string as a *Tag* or *String* component.
| Propertie | Type    | Description                                                                       |
| --------- | ------- | --------------------------------------------------------------------------------- |
| tagName   | String  | Define the tagname (*div, span, ...*)                                             |
| attr      | Object  | Add attributes to your tags ( *These attributes do not affect child components* ) |
| open      | Boolean | Open de tags when the writing is finished                                         |
| loop      | Boolean | Loop the animation                                                                |

### String
`<String />`

This component is only used to write **strings**, so you cannot specify any string if not through the `text` property.
| Propertie | Type   | Description                                                               |
| --------- | ------ | ------------------------------------------------------------------------- |
| text      | String | Define the string to write                                                |
| style     | Object | Style the defined text ( *this property will not appear during writing* ) |

## Styling
You can change the color of each part of your *Tags*. *Strings* can already be styled via the `style` propertie but you should better use it for small individual changes 👍🏿.

Both components uses an `.hwe` ("**H**tml **W**riter **E**lement") CSS class to style the content.

You can use CSS3 variables to change colors, sizes, and fonts.

| Variable                  | Description                                               |
| ------------------------- | --------------------------------------------------------- |
| --cursor-color            | the cursor color                                          |
| --string-color            | the string color                                          |
| --tag-hook-color          | the hooks color, so the greater and minus than ("<", ">") |
| --tag-name-color          | the tag names color                                       |
| --attr-name-color         | the attributes name color                                 |
| --attr-symbol-color       | the symbols color, the "="symbol basically                |
| --attr-value-color        | the attributes value color                                |
| --select-color            | the selection color                                       |
| --select-background-color | the background selection color                            |
| --font-size               | the font size                                             |
| --font-family             | the font                                                  |
| --tag-tabsize             | the tabulation size on indentation                        |

## Usage
A simple usage with a simple **HelloWorld**.
```javascript
import React from 'react'
import { Tag, String } from 'react-html-writer'

const HelloWorld = () => (
    <Tag tagName="h1">
        <String text="Hello World !" />
    </Tag>
)

export default HelloWorld
```
> If want to import the library via the `script` tag in your HTML file, you can also use the `ReactHtmlWriter` global object.

So the end result will look like this. ( *no animation* )
```html
<h1>Hello World !</h1>
```
For a full demo with animtions, try this [CodeSandBox](https://codesandbox.io/s/react-html-writer-cyxe8?codemirror=1&fontsize=14&hidenavigation=1&module=%2Fsrc%2Fdemo.js&theme=dark) or use the `demo.jsx` inside the *src* folder.

## Todolist
* [x] Create or choose a theme by default for each component (color, font, size, ...)
* [ ] Add a duration setting
* [ ] Add a timeline
* [ ] Add @types
