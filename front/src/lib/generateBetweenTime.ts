import { IComment, IReply } from '@customTypes/comment';
import { IPost } from '@customTypes/post';

export const generateBetweenTime = (comment: IComment | IReply | IPost) => {
  if (comment.createdDate && comment.createdDate.length >= 5) {
    return `${comment.createdDate[0]}-${comment.createdDate[1]}-${comment.createdDate[2]} ${comment.createdDate[3]}:${comment.createdDate[4]}`;
  }
};
