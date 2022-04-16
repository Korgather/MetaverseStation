export const handleSaveClick = (url: string, fileName: string) => {
  //이미자파일 타입 정의(default png, jpg ...)
  const link = document.createElement('a');
  link.href = url;
  link.download = fileName; //파일명
  link.click(); //이미지 주소가 담긴 a태그를 클릭해서 실행되도록 클릭되도록함
};
