import { IComment, IReply } from '@customTypes/comment';
import { IPost } from '@customTypes/post';

export const generateBetweenTime = (comment: IComment | IReply | IPost) => {
  if (comment.createdDate) {
    const today = new Date();
    const [year, month, date] = (comment.createdDate as string).split('-');
    const day = Number(date.slice(0, 2));
    const hour = Number(date.slice(3, 5));
    const min = Number(date.slice(6, 8));
    const sec = Number(date.slice(9, 11));
    const commentDate = new Date(Number(year), Number(month) - 1, day, hour, min, sec);
    const betweenTime = Math.floor((today.getTime() - commentDate.getTime()) / 1000 / 60);
    const betweenTimeHour = Math.floor(betweenTime / 60);
    const betweenTimeDay = Math.floor(betweenTimeHour / 24);
    if (betweenTime < 1) return '방금 전';
    if (betweenTime < 60) return `${betweenTime}분 전`;
    if (betweenTimeHour < 24) return `${betweenTimeHour}시간 전`;
    if (betweenTimeDay < 7) return `${betweenTimeDay}일 전`;
    return `${year}-${month}-${date.slice(0, 2)}`;
  }
};
