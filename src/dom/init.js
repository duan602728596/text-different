import hljs from 'highlightjs';
import textDifferent from 'text-different';

// 样式名称的基础
export const classNameBasic: string = 'text-different';

export function init(oldCode: string, newCode: string, oldElement: Element, newElement: Element): void{
  const { oldCodeText, newCodeText }: {
    oldCodeText: string,
    newCodeText: string
  } = getCodeText(oldCode, newCode);

  oldElement.innerHTML = oldCodeText;
  newElement.innerHTML = newCodeText;

  hljs.highlightBlock(oldElement);
  hljs.highlightBlock(newElement);

  numberLine(oldElement);
  numberLine(newElement);
}

// 获取旧文本和新文本
export function getCodeText(oldCode: string, newCode: string): {
  oldCodeText: string,
  newCodeText: string
}{
  const tree: Array = textDifferent(oldCode, newCode);
  // 循环构建文本
  let oldCodeText: string = '';
  let newCodeText: string = '';

  for(let i: number = 0, j: number = tree.length, o: number = 1, n: number = 1; i < j; i++){
    const item: Object = tree[i];
    switch(item.status){
      // 普通
      case 0:
        oldCodeText += `<p class="${ classNameBasic }-line-normal">${ item.text }</p>\n`;
        newCodeText += `<p class="${ classNameBasic }-line-normal">${ item.text }</p>\n`;
        o++;
        n++;
        break;
      // 左侧旧代码
      case 1:
        oldCodeText += `<p class="${ classNameBasic }-line-old">${ item.text }</p>\n`;
        newCodeText += `<p class="${ classNameBasic }-line-space" data-mark="space"></p>\n`;
        o++;
        break;
      // 右侧新代码
      case 2:
        oldCodeText += `<p class="${ classNameBasic }-line-space" data-mark="space"></p>\n`;
        newCodeText += `<p class="${ classNameBasic }-line-new">${ item.text }</p>\n`;
        n++;
        break;
      // 行代码内部分发生变化
      case 3:
        const textArr: string = item.text;
        let oldLineText: string = `<p class="${ classNameBasic }-line-old">`;
        let newLineText: string = `<p class="${ classNameBasic }-line-new">`;
        let oldCode: ?string = null;   // 旧代码缓存
        let newCode: ?string = null;   // 新代码缓存
        for(let i2: number = 0, j2: number = textArr.length; i2 < j2; i2++){
          const item2: Object = textArr[i2];
          if(item2.status === 0){
            if(oldCode){
              oldLineText += `${ oldCode }</span>`;
              oldCode = null;
            }
            if(newCode){
              newLineText += `${ newCode }</span>`;
              newCode = null;
            }
            oldLineText += item2.text;
            newLineText += item2.text;
          }else if(item2.status === 1){
            if(oldCode){
              oldCode += item2.text;
            }else{
              oldCode = `<span class="${ classNameBasic }-line-old-change">${ item2.text }`;
            }
          }else if(item2.status === 2){
            if(newCode){
              newCode += item2.text;
            }else{
              newCode = `<span class="${ classNameBasic }-line-new-change">${ item2.text }`;
            }
          }
        }
        if(oldCode){
          oldLineText += `${ oldCode }</span>`;
        }
        if(newCode){
          newLineText += `${ newCode }</span>`;
        }
        oldCodeText += `${ oldLineText }</p>\n`;
        newCodeText += `${ newLineText }</p>\n`;
        o++;
        n++;
        break;
    }
  }

  return {
    oldCodeText,
    newCodeText
  };
}

// 生成行号
export function numberLine(dom: Element): void{
  const line: string[] = dom.innerText.split('\n');
  if(line[line.length - 1] === ''){
    line.pop();
  }

  const lineLenStr: number = String(line.length).length;
  const width: number = 15 * lineLenStr;
  const left: number = width + 8;

  const p: Element = dom.getElementsByTagName('p');
  let div: Element = document.createElement('div');
  div.className = `${ classNameBasic }-line-number-box`;

  for(let i: number = 0, j: number = p.length, k: number = 1; i < j; i++){
    p[i].style.paddingLeft = left + 'px';
    let num: Element = document.createElement('b');
    num.style.width = width + 'px';
    num.className = `${ classNameBasic }-line-number`;
    num.innerText = p[i].getAttribute('data-mark') === 'space' ? ' ' : k++;
    div.appendChild(num);
    num = null;
  }
  dom.appendChild(div);
  div = null;
}