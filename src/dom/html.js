import { init, classNameBasic } from './init';

class TextDifferentForHtml{
  element: Element;
  type: string;
  code: ?Array<Element>;

  constructor(element: Element, type: string = ''): void{
    this.element = element;
    this.type = type;
    this.code = null;

    this.init();
  }
  // 初始化容器
  init(): void{
    this.element.className += ((this.element.className === '' ? '' : ' ') + 'text-different-main');
    this.element.innerHTML = `<pre class="${ classNameBasic }-content"><code class="${ classNameBasic }-code ${ this.type }"></code></pre>`
                           + `<pre class="${ classNameBasic }-content"><code class="${ classNameBasic }-code ${ this.type }"></code></pre>`;
    this.code = this.element.getElementsByTagName('code');
  }
  // 渲染代码
  renderCode(oldCode: string, newCode: string, hasNumberLine: boolean): void{
    init(oldCode, newCode, this.code[0], this.code[1], hasNumberLine);
  }
  render({ oldCode = '', newCode = '', hasLineNumber }: { oldCode: string, newCode: string, hasLineNumber: ?boolean }): void{
    this.renderCode(oldCode, newCode, hasLineNumber);
  }
}

export default TextDifferentForHtml;