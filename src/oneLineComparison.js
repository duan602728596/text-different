import generatingCodeTree from './generatingCodeTree';

/* 单行对比 */
function oneLineComparison(codeTree: Array): Array{
  const len: number = codeTree.length;
  let oldIndex: number = 0;  // 定义旧文本块的游标
  let newIndex: number = 0;  // 定义新文本块的游标

  while(oldIndex < len && newIndex < len){
    const item: Object = codeTree[oldIndex];
    if(item.status === 0){
      oldIndex++;
      newIndex++;
    }else{
      // 获取到代码块范围
      // oldIndex ~ oi，oi + 1 ~ ni
      let oi: number = oldIndex;
      let oiLen: number = 0;  // 判断数量
      for(; oi < len; oi++){
        if(codeTree[oi].status !== 1){
          break;
        }else{
          oiLen++;
        }
      }
      let ni: number = oi;
      let niLen: number = 0;
      for(; ni < len; ni++){
        if(codeTree[ni].status !== 2){
          break;
        }else{
          niLen++;
        }
      }
      // 在范围块内判断差异性
      if(oiLen > 0 && niLen > 0){
        for(let i: number = oldIndex; i < oi; i++){
          let i2: number = oi;
          while(i2 < ni){
            // 对比差异
            const st: {
              tree: Array,
              difference: number
            } = generatingCodeTree(codeTree[i].text.split(''), codeTree[i2].text.split(''));
            if(st.difference === 0){
              i2++;
            }else{
              codeTree[i].status = 3;
              codeTree[i].text = st.tree;
              codeTree.splice(i2, 1);
              ni--;
              break;
            }
          }
        }
      }
      oldIndex = oi;
      newIndex = ni;
      break;
    }
  }

  return codeTree;
}

export default oneLineComparison;