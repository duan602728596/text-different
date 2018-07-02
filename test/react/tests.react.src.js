import React, { Component } from 'react';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import TextDifferentForReact from 'TextDifferentForReact';

Enzyme.configure({
  adapter: new Adapter()
});

describe('text-different-for-react测试用例', function(){
  describe('组件的渲染', function(){
    it('test: 0', function(){
      const element = Enzyme.mount(<TextDifferentForReact type="python" oldCode={ 'def func():\n  a = 5' } newCode={ 'def func():\n  a = 32' } />);
      const pre = element.find('pre');
      const code = element.find('code');
      expect(pre.length).to.equal(2);
      expect(code.length).to.equal(2);
    });

    it('test: 1', function(){
      const oldtext = `import React, { Component } from 'react';
class Text extends Component{
}`;
      const newtext = `import React, { Component } from 'react';
class Text extends Component{
  render(){
    return 'Hello!';
  }
}`;
      const element = Enzyme.mount(<TextDifferentForReact type="javascript" oldCode={ oldtext } newCode={ newtext } />);
      const pre = element.find('pre');
      const code = element.find('code');
      const code1Ref = code.get(1).ref.current;
      const lineNew = code1Ref.querySelectorAll('.text-different-line-new');
      expect(pre.length).to.equal(2);
      expect(code.length).to.equal(2);
      expect(lineNew.length).to.equal(3);
    });

    it('test: 2', function(){
      const oldtext = `汉皇重色思倾国，
御宇多年求不得。
杨家有女初长成，
养在深闺人未识。
天生吏治难自弃，
一朝选在君王侧。
回眸一笑百媚生，
六宫粉黛无颜色。
春寒赐浴华清池，
温泉水滑洗凝脂。`;
      const newtext = `汉皇重色思倾国，
御宇多年求不得。
杨家有女初长成，
养在深闺人未识。
天生丽质难自弃，
一朝选在君王侧。
回眸一笑百媚生，
春寒赐浴华清池，
温泉水滑洗凝脂。
侍儿扶起娇无力，
始是新承恩泽时。`;
      const element = Enzyme.mount(<TextDifferentForReact oldCode={ oldtext } newCode={ newtext } />);
      const code = element.find('code');
      const code0Ref = code.get(0).ref.current;
      const code1Ref = code.get(1).ref.current;
      const lineOld = code0Ref.querySelectorAll('.text-different-line-old');
      const lineNew = code1Ref.querySelectorAll('.text-different-line-new');
      const oldChange = code0Ref.querySelectorAll('.text-different-line-old-change');
      const newChange = code1Ref.querySelectorAll('.text-different-line-new-change');
      expect(lineOld.length).to.equal(2);
      expect(lineNew.length).to.equal(3);
      expect(oldChange.length).to.equal(1);
      expect(newChange.length).to.equal(1);
    });
  });
});