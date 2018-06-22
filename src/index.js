import generatingCodeTree from './generatingCodeTree';
import oneLineComparison from './oneLineComparison';

/**
 * @param { string } oldText: 旧代码
 * @param { string } newText: 新代码
 * @returns { Array }
 */
function textDifferent(oldText: string, newText: string): Array{
  // 转义
  const ot: string = oldText.replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
  const nt: string = newText.replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');

  /* 将文本解析成一行一行的数组 */
  const oldTextArray: string[] = ot.split(/\r?\n/);
  const newTextArray: string[] = nt.split(/\r?\n/);

  const codeTree: {
    tree: Array,
    difference: number
  } = generatingCodeTree(oldTextArray, newTextArray);

  /* 对数组内的每行代码块进行解析 */
  const codeTree2: Array = oneLineComparison(codeTree.tree);
  return codeTree2;
}

export default textDifferent;