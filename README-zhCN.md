# text-different

## 作用

比较文本的不同，并生成差异树。   
[text-different-for-html](#text-different-for-html)：提供原生的方法来展示代码。   
[text-different-for-react](#text-different-for-react)：提供React组件来展示代码。

![demo](https://raw.githubusercontent.com/duan602728596/text-different/master/example/image/demo2.png)

## 如何使用

```html
<script src="text-different/build/text-different.js"></script>
<script>
const oldText = '旧文本';
const newText = '新文本';

const tree = textDifferent(oldText, newText);
</script>
```

或

```javascript
import textDifferent from 'text-different'；
const oldText = '旧文本';
const newText = '新文本';

const tree = textDifferent(oldText, newText);
```

## 结果

对文本比较后会生成文本树，例如：

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

* 当`status`为0时，表示该段文字没有变化。
* 当`status`为1时，表示该段文字在旧文本中被删除。
* 当`status`为2时，表示该段文字在新文本中被添加。
* 当`status`为3时，表示该段文字在文本中被修改，其中，`text`属性是一个数组，表示该段文字中哪些文字是被修改（添加、删除）的。数组中每个数据都有属性`status`和`text`。

## 输出解析结果

该方法只提供文本解析树，如果想输出对比的解析结果，可以查看[example](https://github.com/duan602728596/text-different/tree/master/example)。

![demo](https://raw.githubusercontent.com/duan602728596/text-different/master/example/image/demo1.png)


## text-different-for-html

依赖**highlightjs**，你必须安装它。

### 样例代码

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
        document.getElementById('root'),   // 用来渲染展示代码的dom
        'python'                           // 代码的类型
      );
      tdfh.render({
        oldCode: 'def func():\n  x = 5',   // 旧代码
        newCode: 'def func():\n  x = 32',  // 新代码
        hasLineNumber: true                // 是否显示行号
      });
    </script>
  </body>
</html>
```

### 方法

* TextDifferentForHtml：初始化类   
  参数：
  * element { Element }：用来渲染展示代码的dom
  * type { string }：代码的类型
* .render { Function }：渲染代码
  参数：
  * object：
    * oldCode { string }：旧代码
    * newCode { string }：新代码

## text-different-for-react

依赖**highlightjs**、**react**、**react-dom**、**prop-types**，你必须安装它们。

### 样例代码

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

### 参数

| 参数         | 说明         | 类型    |
| ---          | ---          | ---     |
| type         | 代码类型     | string  |
| oldCode      | 旧代码       | string  |
| newCode      | 新代码       | string  |
| hasLineNumber| 是否显示行号 | boolean |



