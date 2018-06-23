# text-different

## 作用

比较文本的不同，并生成差异树。

## 如何使用

```html
<script src="text-different.js"></script>
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

该方法只提供文本解析树，如果想输入对比的解析结果，可以查看[example](https://github.com/duan602728596/text-different/tree/master/example)。

![demo](https://raw.githubusercontent.com/duan602728596/text-different/master/example/demo.png)

