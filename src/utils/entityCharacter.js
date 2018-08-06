/**
 * 将文本中的某些字符转义成实体字符
 */

function entityCharacter(text: string): string{
  return text.replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

export default entityCharacter;