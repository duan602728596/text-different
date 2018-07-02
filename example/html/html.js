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


const tdfh = new TextDifferentForHtml(document.getElementById('root'), 'javascript');
tdfh.render({
  oldCode: oldScript,
  newCode: newScript
});