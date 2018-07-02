import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import TextDifferentForReact from 'TextDifferentForReact';

const oldScript = `/*
666
 */

import React, { Component } from 'react';
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

const newScript = `/*
766
 */

import React, { Component } from 'react';
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

class Example extends Component{
  constructor(){
    super(...arguments);

    this.state = {
      oldCode: oldScript,
      newCode: newScript
    };
  }
  onChange(){
    this.setState({
      oldCode: 'var a = 5;',
      newCode: 'var a = 6;'
    });
  }
  render(){
    return (
      <TextDifferentForReact oldCode={ this.state.oldCode }
        newCode={ this.state.newCode }
        type="javascript"
      />
    );
  }
}

ReactDOM.render(
  <Example />,
  document.getElementById('root')
);