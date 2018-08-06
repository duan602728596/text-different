import generatingCodeTree from './utils/generatingCodeTree';
import oneLineComparison from './utils/oneLineComparison';
import entityCharacter from './utils/entityCharacter';

/**
 * @param { string } oldText: 旧代码
 * @param { string } newText: 新代码
 * @returns { Array }
 */
function textDifferent(oldText: string, newText: string): Array{
  // 转义
  const ot: string = entityCharacter(oldText);
  const nt: string = entityCharacter(newText);

  /* 将文本解析成一行一行的数组 */
  const oldTextArray: string[] = ot.split(/\n/);
  const newTextArray: string[] = nt.split(/\n/);

  if(oldTextArray[oldTextArray.length - 1] === '') oldTextArray.pop();
  if(newTextArray[newTextArray.length - 1] === '') newTextArray.pop();

  const codeTree: {
    tree: Array,
    difference: number
  } = generatingCodeTree(oldTextArray, newTextArray);

  /* 对数组内的每行代码块进行解析 */
  const codeTree2: Array = oneLineComparison(codeTree.tree);
  return codeTree2;
}

export default textDifferent;