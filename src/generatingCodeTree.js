/**
 * 生成代码树
 * 0: 不变
 * 1: 删除
 * 2：添加
 * 3：改变
 * @param { Array<string> } oldTextArray: 旧的代码数组
 * @param { Array<string> } newTextArray: 新的代码数组
 */
function generatingCodeTree(oldTextArray: string[], newTextArray: string): Array{
  const tree: [] = [];      // 文本树
  const oldTextLen: number = oldTextArray.length;
  const newTextLen: number = newTextArray.length;
  let oldIndex: number = 0;
  let newIndex: number = 0;
  let difference: number = 0;

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
    }else{
      // 碰到文本不同后获取下一个相同的行
      let oldFindIndex: number = oldIndex;
      let newFindIndex: number = newIndex;
      let isEqual: boolean = false;   // 是否出现相等的行

      for(; oldFindIndex < oldTextLen; oldFindIndex++){
        for(newFindIndex = newIndex; newFindIndex < newTextLen; newFindIndex++){
          if(oldTextArray[oldFindIndex] === newTextArray[newFindIndex]){
            isEqual = true;
            break;
          }
        }
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