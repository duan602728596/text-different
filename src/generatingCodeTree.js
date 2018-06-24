/**
 * 生成代码树
 * 0：不变
 * 1：删除
 * 2：添加
 * 3：改变
 * @param { Array<string> } oldTextArray: 旧的代码数组
 * @param { Array<string> } newTextArray: 新的代码数组
 */
function generatingCodeTree(oldTextArray: string[], newTextArray: string): { tree: Array, difference: number }{
  const tree: [] = [];                              // 最后的文本树
  const oldTextLen: number = oldTextArray.length;   // 旧文本的行数
  const newTextLen: number = newTextArray.length;   // 新文本的行数
  let oldIndex: number = 0;                         // 旧文本数组循环的游标
  let newIndex: number = 0;                         // 新文本数组循环的游标
  let difference: number = 0;                       // 不变文本的数量

  while(oldIndex < oldTextLen && newIndex < newTextLen){
    // 文本相同，不变
    if(oldTextArray[oldIndex] === newTextArray[newIndex]){
      tree.push({
        text: oldTextArray[oldIndex],
        status: 0
      });
      difference++;
      oldIndex++;
      newIndex++;
    }else if(oldTextArray[oldIndex + 1] === newTextArray[newIndex + 1]){
      // 当前文本行不同，但是下一个文本行相同的情况
      tree.push({
        text: oldTextArray[oldIndex],
        status: 1
      });
      tree.push({
        text: newTextArray[newIndex],
        status: 2
      });
      oldIndex++;
      newIndex++;
    }else{
      // 碰到文本不同后获取下一个相同的行
      let oldFindIndex: number = oldIndex;
      let newFindIndex: number = newIndex;
      let isEqual: boolean = false;   // 是否出现相等的行

      for(; oldFindIndex < oldTextLen; oldFindIndex++){
        for(newFindIndex = newIndex; newFindIndex < newTextLen; newFindIndex++){
          // 如果出现相同的行，停止循环
          if(oldTextArray[oldFindIndex] === newTextArray[newFindIndex]){
            isEqual = true;
            break;
          }
        }
        // 如果出现相同的行，停止循环
        if(isEqual){
          break;
        }
      }

      // 将行添加到数组
      for(; oldIndex < (isEqual ? oldFindIndex : oldTextLen); oldIndex++){
        tree.push({
          text: oldTextArray[oldIndex],
          status: 1
        });
      }

      for(; newIndex < (isEqual ? newFindIndex : newTextLen); newIndex++){
        tree.push({
          text: newTextArray[newIndex],
          status: 2
        });
      }
    }
  }

  // 如果末尾有数据，还要添加末尾数据
  for(; oldIndex < oldTextLen; oldIndex++){
    tree.push({
      text: oldTextArray[oldIndex],
      status: 1
    });
  }
  for(; newIndex < newTextLen; newIndex++){
    tree.push({
      text: newTextArray[newIndex],
      status: 2
    });
  }

  return {
    tree,
    difference
  };
}

export default generatingCodeTree;