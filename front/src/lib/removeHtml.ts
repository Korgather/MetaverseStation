export const removeHtml = (text: string) => {
  text = text.replace(/<br>/gi, '\n'); // <br>을 엔터로 변경
  text = text.replace(/&nbsp;/gi, ' '); // 공백
  // HTML 태그제거
  text = text.replace(/<(\/)?([a-zA-Z]*)(\s[a-zA-Z]*=[^>]*)?(\s)*(\/)?>/gi, '');
  // shkim.add.
  text = text.replace(/<(no)?script[^>]*>.*?<\/(no)?script>/gi, '');
  text = text.replace(/<style[^>]*>.*<\/style>/gi, '');
  // eslint-disable-next-line no-useless-escape
  text = text.replace(/<(\"[^\"]*\"|\'[^\']*\'|[^\'\">])*>/gi, '');
  text = text.replace(/<\\w+\\s+[^<]*\\s*>/gi, '');
  text = text.replace(/&[^;]+;/gi, '');
  text = text.replace(/\\s\\s+/gi, '');

  return text;
};
