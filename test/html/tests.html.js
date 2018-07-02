describe('text-different-for-html测试用例', function(){
  describe('dom是否能够正确渲染渲染', function(){
    it('test: 0', function(){
      let root = document.createElement('div');
      const tdfh = new TextDifferentForHtml(root, 'python');
      tdfh.render({
        oldCode: 'def func():\n  a = 5',
        newCode: 'def func():\n  a = 32'
      });
      const pre = root.getElementsByTagName('pre');
      const code = root.getElementsByTagName('code');
      expect(pre.length).to.equal(2);
      expect(code.length).to.equal(2);
      root = null;
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
      let root = document.createElement('div');
      const tdfh = new TextDifferentForHtml(root, 'javascript');
      tdfh.render({
        oldCode: oldtext,
        newCode: newtext
      });
      const pre = root.getElementsByTagName('pre');
      const code = root.getElementsByTagName('code');
      const lineNew = code[1].querySelectorAll('.text-different-line-new');
      expect(pre.length).to.equal(2);
      expect(code.length).to.equal(2);
      expect(lineNew.length).to.equal(3);
      root = null;
    });

    it('test: 2', function(){
      const oldtext = '无边落木潇潇下，不尽长江滚滚去。';
      const newtext = '无边落木萧萧下，不尽长江滚滚来。';
      let root = document.createElement('div');
      const tdfh = new TextDifferentForHtml(root, 'javascript');
      tdfh.render({
        oldCode: oldtext,
        newCode: newtext
      });
      const lineOld = root.querySelectorAll('.text-different-line-old');
      const lineNew = root.querySelectorAll('.text-different-line-new');
      const oldChange = root.querySelectorAll('.text-different-line-old-change');
      const newChange = root.querySelectorAll('.text-different-line-new-change');
      expect(lineOld.length).to.equal(1);
      expect(lineNew.length).to.equal(1);
      expect(oldChange.length).to.equal(2);
      expect(newChange.length).to.equal(2);
      root = null;
    });
  });
});