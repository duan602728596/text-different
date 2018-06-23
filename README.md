# text-different

[中文文档](https://github.com/duan602728596/text-different/blob/master/README-zhCN.md)

## Effect

Compare text differences and generate a difference tree.

## How to use

```html
<script src="text-different.js"></script>
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

This method only provides a text parsing tree. If you want to enter a parsed result, you can view [example](https://github.com/duan602728596/text-different/tree/master/example).

![demo](https://raw.githubusercontent.com/duan602728596/text-different/master/example/demo.png)