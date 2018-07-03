# text-different

[中文文档](https://github.com/duan602728596/text-different/blob/master/README-zhCN.md)

## Effect

Compare text differences and generate a difference tree.   
[text-different-for-html](#text-different-for-html): Provide native methods to display code.   
[text-different-for-react](#text-different-for-react): Provide React components to display code.

![demo](https://raw.githubusercontent.com/duan602728596/text-different/master/example/image/demo2.png)

## How to use

```html
<script src="text-different/build/text-different.js"></script>
<script>
const oldText = 'Old text';
const newText = 'New text';

const tree = textDifferent(oldText, newText);
</script>
```

or

```javascript
import textDifferent from 'text-different'；
const oldText = 'Old text';
const newText = 'New text';

const tree = textDifferent(oldText, newText);
```

## Result

After comparing the texts, a text tree is generated, for example:

```javascript
const tree = [
  {
    status: 0,
    text: 'string'
  },
  {
    status: 1,
    text: 'string'
  },
  {
    status: 2,
    text: 'string'
  },
  {
    status: 3,
    text: [
      {
        status: 0,
        text: 'string'
      },
      {
        status: 1,
        text: 'string'
      },
      {
        status: 2,
        text: 'string'
      },
      {
        status: 0,
        text: 'string'
      }
    ]
  },
  {
    status: 0,
    text: 'string'
  },
]
```

* When `status` is 0, there is no change in the text of the paragraph
* When `status` is 1, it means that the text is deleted in the old text.
* When `status` is 2, it means that the text is added in the new text.
* When `status` is 3, it means that the text is modified in the text, where the `text` attribute is an array indicating which text in the text is being modified (added, deleted). Each data in the array has the attributes `status` and `text`.

## Output analysis result

This method only provides a text parsing tree. If you want to output a parsed result, you can view [example](https://github.com/duan602728596/text-different/tree/master/example).

![demo](https://raw.githubusercontent.com/duan602728596/text-different/master/example/image/demo1.png)

## text-different-for-html

Depends on **highlightjs**, you have to install it.

### Sample code


```html
<html>
  <head>
    <link rel="stylesheet" href="highlightjs/styles/xcode.css">
    <link rel="stylesheet" href="text-different/build/style/text-different.css">
  </head>
  <body>
    <div id=root></div>
    <script src="highlightjs/highlight.pack.js"></script>
    <script src="text-different/build/text-different.js"></script>
    <script src="text-different/build/text-different-for-html.js"></script>
    <script>
      const tdfh = new TextDifferentForHtml(
        document.getElementById('root'),   // The dom used to render the display code
        'javascript'                       // Type of code
      );
      tdfh.render({
        oldCode: 'def func():\n  x = 5',   // Old code
        newCode: 'def func():\n  x = 32'   // New code
      });
    </script>
  </body>
</html>
```

### Methods

* TextDifferentForHtml：Initialization class   
  parameter：
  * element { Element }：The dom used to render the display code
  * type { string }：Type of code
* .render { Function }：Rendering code
  parameter：
  * object：
    * oldCode { string }：Old code
    * newCode { string }：New code

## text-different-for-react

Rely on **highlightjs**,**react**,**react-dom**,**prop-types**, you must install them.

### Sample code

```javascript
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import 'highlightjs/styles/xcode.css';
import 'text-different/build/style/text-different.css';
import TextDifferentForReact from 'text-different/lib/dom/react';

ReactDOM.render(
  <TextDifferentForReact type="python"
    oldCode={ 'def func():\n  x = 5' }
    newCode={ 'def func():\n  x = 32' }
  />,
  document.getElementById('root')
);
```

### Parameter

| 参数    | 说明         | 类型   |
| ---     | ---          | ---    |
| type    | Type of code | string |
| oldCode | Old code     | string |
| newCode | New code     | string |