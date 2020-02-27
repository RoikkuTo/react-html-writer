# React HTML Writer
This are some components that will allow you to animate HTML writing on your application.

## Installation
Via npm
```bash
$ npm install react-html-writer
```

## Components
### Tag
`<Tag></Tag>`

As a normal HTML tag, you can add any child element or string as a child component.
| Properties | Type    | Description                                                                       |
| ---------- | ------- | --------------------------------------------------------------------------------- |
| tagName    | String  | Define the tagname (*div, span, ...*)                                             |
| attr       | Object  | Add attributes to your tags ( *These attributes do not affect child components* ) |
| open       | Boolean | Open de tags when the writing is finished                                         |
| loop       | Boolean | Loop the animation                                                                |

### String
`<String />`

This component is only used to write strings, so you cannot specify any string if not through the **text** property.
| Properties | Type   | Description                                                               |
| ---------- | ------ | ------------------------------------------------------------------------- |
| text       | String | Define the string to write                                                |
| style      | Object | Style the defined text ( *this property will not appear during writing* ) |

## Usage
A simple usage with a simple **HelloWorld**.
```javascript
import React from 'react'
import { Tag, String } from 'react-html-writer'

const HelloWorld = () => (
    <Tag tagName="h1">
        <String text="Hello World !">
    </Tag>
)

export default HelloWorld
```
So the end result will look like this.
```html
<h1>Hello World !</h1>
```
For a full demo with animtions, try this [CodePen](https:// "Full Demo") or use the `demo.jsx` inside the **src** folder.

## Environment
This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).
