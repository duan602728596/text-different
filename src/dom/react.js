import React, { Component, createRef } from 'react';
import PropTypes from 'prop-types';
import { init, classNameBasic } from './init';

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
    init(this.props.oldCode, this.props.newCode, this.oldCodeRef.current, this.newCodeRef.current);
  }
  componentDidUpdate(): void{
    init(this.props.oldCode, this.props.newCode, this.oldCodeRef.current, this.newCodeRef.current);
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