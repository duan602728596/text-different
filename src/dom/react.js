import React, { Component, createRef } from 'react';
import PropTypes from 'prop-types';
import hljs from 'highlightjs';
import textDifferent from 'text-different';

// 样式名称的基础
const classNameBasic: string = 'text-different';

class TextDifferentForReact extends Component{
  static propTypes: Object = {
    oldCode: PropTypes.string,
    newCode: PropTypes.string,
    type: PropTypes.string
  };
  static defaultProps: Object = {
    oldCode: '',
    newCode: '',
    type: ''
  };

  oldCodeRef: Object = createRef();
  newCodeRef: Object = createRef();

  componentDidMount(): void{
    const oldCode: string = this.props.oldCode;
    const newCode: string = this.props.newCode;

    const { oldCodeText, newCodeText }: {
      oldCodeText: string,
      newCodeText: string
    } = this.getCodeText(oldCode, newCode);

    this.oldCodeRef.current.innerHTML = oldCodeText;
    this.newCodeRef.current.innerHTML = newCodeText;

    hljs.initHighlightingOnLoad();

    this.numberLine(this.oldCodeRef.current);
    this.numberLine(this.newCodeRef.current);
  }
  // 获取旧文本和新文本
  getCodeText(oldCode: string, newCode: string): {
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
        case 0:
          oldCodeText += `<p class="${ classNameBasic }-line-normal">${ item.text }</p>\n`;
          newCodeText += `<p class="${ classNameBasic }-line-normal">${ item.text }</p>\n`;
          o++;
          n++;
          break;
        case 1:
          oldCodeText += `<p class="${ classNameBasic }-line-old">${ item.text }</p>\n`;
          newCodeText += `<p class="${ classNameBasic }-line-space" data-mark="space"></p>\n`;
          o++;
          break;
        case 2:
          oldCodeText += `<p class="${ classNameBasic }-line-space" data-mark="space"></p>\n`;
          newCodeText += `<p class="${ classNameBasic }-line-new">${ item.text }</p>\n`;
          n++;
          break;
        case 3:
          const textArr: string = item.text;
          let oldLineText: string = `<p class="${ classNameBasic }-line-old">`;
          let newLineText: string = `<p class="${ classNameBasic }-line-new">`;
          let oldCode: ?string = null;
          let newCode: ?string = null;
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
  numberLine(dom: Element): void{
    const line: string[] = dom.innerText.split('\n');
    if(line[line.length - 1] === ''){
      line.pop();
    }

    const lineLenStr: number = String(line.length).length;
    const width: number = 10 * lineLenStr;
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
  render(): Object{
    const type: string = this.props.type;
    return (
      <div className={ `${ classNameBasic }-main` }>
        {/* 旧代码 */}
        <pre className={ `${ classNameBasic }-content` }>
          <code className={ `${ classNameBasic }-code ${ type }` } ref={ this.oldCodeRef } />
        </pre>
        {/* 新代码 */}
        <pre className={ `${ classNameBasic }-content` }>
          <code className={ `${ classNameBasic }-code ${ type }` } ref={ this.newCodeRef } />
        </pre>
      </div>
    );
  }
}

export default TextDifferentForReact;