import { IPost } from '@customTypes/post';
import { removeHtml } from './removeHtml';

export const kakaoShare = (postData: IPost) => {
  const { Kakao } = window;
  const shareURL = `https://www.modumeta.com/community/post/${postData.id}`;

  Kakao.Link.sendDefault({
    objectType: 'feed',
    content: {
      title: postData.title,
      description: removeHtml(postData.content as string),
      imageUrl: process.env.NEXT_PUBLIC_IMG_URL + postData.imageList[0].imagePath,
      link: {
        webUrl: shareURL,
        mobileWebUrl: shareURL,
      },
    },
    buttons: [
      {
        title: '웹으로 보기',
        link: {
          webUrl: shareURL,
          mobileWebUrl: shareURL,
        },
      },
    ],
  });
};
