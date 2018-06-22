const oldScript = `import React, { Component } from 'react';
import style from './style.sass';

class Text extends Component{
  constructor(){
    super(...arguments);
    
    this.state = {
      len: 0,
      loading: false,
      text: 'Hello, world!'
    };
  }
  render(){
    return (
      <div className={ style.text }>
        <h1>{ this.state.text }</h1>
      </div>
    );
  }
}

export default Text;`;

const newScript = `import React, { Component } from 'react';
import {
  Table,
  message,
  Button  
} from 'antd';
import style from './style.sass';

class Text extends Component{
  constructor(){
    super(...arguments);
    
    this.state = {
      text: 'Hello, world!'
    };
  }
  componentDidMount(){
    // Do something.
  }
  render(){
    return (
      <div className={ style.text }>
        <h2>{ this.state.text }</h2>
        <Button type="primary">Click</Button>
      </div>
    );
  }
}

export default Text;`;

const tree = textDifferent(oldScript, newScript);

// 循环构建文本
let oldCodeText = '';
let newCodeText = '';

for(let i = 0, j = tree.length, o = 1, n = 1; i < j; i++){
  const item = tree[i];
  switch(item.status){
    case 0:
      oldCodeText += `<div class="line-normal"><b class="line-number">${ o }</b>${ item.text }</div>`;
      newCodeText += `<div class="line-normal"><b class="line-number">${ n }</b>${ item.text }</div>`;
      o++;
      n++;
      break;
    case 1:
      oldCodeText += `<div class="line-old"><b class="line-number">${ o }</b>${ item.text }</div>`;
      newCodeText += `<div class="line-space"><b class="line-number"></b></div>`;
      o++;
      break;
    case 2:
      oldCodeText += `<div class="line-space"><b class="line-number"></b></div>`;
      newCodeText += `<div class="line-new"><b class="line-number">${ n }</b>${ item.text }</div>`;
      n++;
      break;
    case 3:
      const textArr = item.text;
      let oldLineText = `<div class="line-old"><b class="line-number">${ o }</b>`;
      let newLineText = `<div class="line-new"><b class="line-number">${ n }</b>`;
      let oldCode = null;
      let newCode = null;
      for(let i2 = 0, j2 = textArr.length; i2 < j2; i2++){
        const item2 = textArr[i2];
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
            oldCode = `<span class="line-old-change">${ item2.text }`;
          }
        }else if(item2.status === 2){
          if(newCode){
            newCode += item2.text;
          }else{
            newCode = `<span class="line-new-change">${ item2.text }`;
          }
        }
      }
      if(oldCode){
        oldLineText += `${ oldCode }</span>`;
      }
      if(newCode){
        newLineText += `${ newCode }</span>`;
      }
      oldCodeText += `${ oldLineText }</div>`;
      newCodeText += `${ newLineText }</div>`;
      o++;
      n++;
      break;
  }
}

document.getElementById('old-text-layout').innerHTML = oldCodeText;
document.getElementById('new-text-layout').innerHTML = newCodeText;