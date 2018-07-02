describe('text-different测试用例', function(){
  describe('验证文本一致时的差异性', function(){
    it('test: 0', function(){
      const text = ['abc', 'bcd', 'cde', 'efg'].join('\n');
      expect(textDifferent(text, text)).to.eql([
        { status: 0, text: 'abc' },
        { status: 0, text: 'bcd' },
        { status: 0, text: 'cde' },
        { status: 0, text: 'efg' }
      ]);
    });

    it('test: 1', function(){
      const text = '祥云迷凤阁，瑞气罩龙楼。含烟御柳拂旌旗，带露宫花迎剑戟。\r\n天香影里，玉簪珠履聚丹墀；仙乐声中，绣袄锦衣扶御驾。\r\n'
                 + '珍珠帘卷，黄金殿上现金舆；凤尾扇开，白玉阶前停宝辇。\r\n隐隐净鞭三下响，层层文武两班齐。';
      expect(textDifferent(text, text)).to.eql([
        { status: 0, text: '祥云迷凤阁，瑞气罩龙楼。含烟御柳拂旌旗，带露宫花迎剑戟。\r' },
        { status: 0, text: '天香影里，玉簪珠履聚丹墀；仙乐声中，绣袄锦衣扶御驾。\r' },
        { status: 0, text: '珍珠帘卷，黄金殿上现金舆；凤尾扇开，白玉阶前停宝辇。\r' },
        { status: 0, text: '隐隐净鞭三下响，层层文武两班齐。' }
      ]);
    });
  });

  describe('验证文本删除字符的差异性', function(){
    it('test: 0', function(){
      const oldtext = 'a\nb\nc\nd\ne\nf\ng\nh\n';
      const newtext = 'a\nc\nd\ne\nh';
      expect(textDifferent(oldtext, newtext)).to.eql([
        { status: 0, text: 'a' },
        { status: 1, text: 'b' },
        { status: 0, text: 'c' },
        { status: 0, text: 'd' },
        { status: 0, text: 'e' },
        { status: 1, text: 'f' },
        { status: 1, text: 'g' },
        { status: 0, text: 'h' }
      ]);
    });

    it('test 1', function(){
      const oldtext = ['鹅，鹅，鹅，', '曲项向天歌。', '白毛浮绿水，', '红掌拨清波。'].join('\n');
      const newtext = ['曲项向天歌。', '红掌拨清波。'].join('\n');
      expect(textDifferent(oldtext, newtext)).to.eql([
        { status: 1, text: '鹅，鹅，鹅，' },
        { status: 0, text: '曲项向天歌。' },
        { status: 1, text: '白毛浮绿水，' },
        { status: 0, text: '红掌拨清波。' }
      ]);
    });
  });

  describe('验证文本新加字符的差异性', function(){
    it('test: 0', function(){
      const oldtext = ['a', 'b', 'c', 'd', 'e'].join('\n');
      const newtext = ['a', 'b', 'c', 'g', 'd', 'e'].join('\n');
      expect(textDifferent(oldtext, newtext)).to.eql([
        { status: 0, text: 'a' },
        { status: 0, text: 'b' },
        { status: 0, text: 'c' },
        { status: 2, text: 'g' },
        { status: 0, text: 'd' },
        { status: 0, text: 'e' }
      ]);
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
      expect(textDifferent(oldtext, newtext)).to.eql([
        { status: 0, text: `import React, { Component } from 'react';` },
        { status: 0, text: 'class Text extends Component{' },
        { status: 2, text: '  render(){' },
        { status: 2, text: `    return 'Hello!';` },
        { status: 2, text: '  }' },
        { status: 0, text: '}' }
      ]);
    });
  });

  describe('验证文本修改字符的差异性', function(){
    it('test: 0', function(){
      const oldtext = ['11', '22', '33', '44', '55', '66', '77', '88', '99'].join('\n');
      const newtext = ['11', '22', '34', '44', '55', '76', '77', '89', '99'].join('\n');
      expect(textDifferent(oldtext, newtext)).to.eql([
        { status: 0, text: '11' },
        { status: 0, text: '22' },
        { status: 3, text: [
            { status: 0, text: '3' },
            { status: 1, text: '3' },
            { status: 2, text: '4' }
          ] },
        { status: 0, text: '44' },
        { status: 0, text: '55' },
        { status: 3, text: [
            { status: 1, text: '6' },
            { status: 2, text: '7' },
            { status: 0, text: '6' }
          ] },
        { status: 0, text: '77' },
        { status: 3, text: [
            { status: 0, text: '8' },
            { status: 1, text: '8' },
            { status: 2, text: '9' }
          ] },
        { status: 0, text: '99' }
      ]);
    });

    it('test: 1', function(){
      const oldtext = '无边落木潇潇下，不尽长江滚滚去。';
      const newtext = '无边落木萧萧下，不尽长江滚滚来。';
      expect(textDifferent(oldtext, newtext)).to.eql([
        { status: 3, text: [
            { status: 0, text: '无' },
            { status: 0, text: '边' },
            { status: 0, text: '落' },
            { status: 0, text: '木' },
            { status: 1, text: '潇' },
            { status: 1, text: '潇' },
            { status: 2, text: '萧' },
            { status: 2, text: '萧' },
            { status: 0, text: '下' },
            { status: 0, text: '，' },
            { status: 0, text: '不' },
            { status: 0, text: '尽' },
            { status: 0, text: '长' },
            { status: 0, text: '江' },
            { status: 0, text: '滚' },
            { status: 0, text: '滚' },
            { status: 1, text: '去' },
            { status: 2, text: '来' },
            { status: 0, text: '。' }
          ] }
      ]);

    });
  });

  describe('混合测试', function(){
    it('test: 0', function(){
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
      expect(textDifferent(oldtext, newtext)).to.eql([
        { status: 0, text: '汉皇重色思倾国，' },
        { status: 0, text: '御宇多年求不得。' },
        { status: 0, text: '杨家有女初长成，' },
        { status: 0, text: '养在深闺人未识。' },
        { status: 3, text: [
            { status: 0, text: '天' },
            { status: 0, text: '生' },
            { status: 1, text: '吏' },
            { status: 1, text: '治' },
            { status: 2, text: '丽' },
            { status: 2, text: '质' },
            { status: 0, text: '难' },
            { status: 0, text: '自' },
            { status: 0, text: '弃' },
            { status: 0, text: '，' }
          ] },
        { status: 0, text: '一朝选在君王侧。' },
        { status: 0, text: '回眸一笑百媚生，' },
        { status: 1, text: '六宫粉黛无颜色。' },
        { status: 0, text: '春寒赐浴华清池，' },
        { status: 0, text: '温泉水滑洗凝脂。' },
        { status: 2, text: '侍儿扶起娇无力，' },
        { status: 2, text: '始是新承恩泽时。' }
      ]);
    });
  });
});