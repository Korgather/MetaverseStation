import { IComment, IReply } from '@customTypes/comment';
import { IPost } from '@customTypes/post';

export const generateBetweenTime = (comment: IComment | IReply | IPost) => {
  if (comment.createdDate && comment.createdDate.length >= 5) {
    const FormatedCreatedDate = comment.createdDate.map((el) =>
      String(el).padEnd(2, '0')
    );
    return `${FormatedCreatedDate[0]}-${FormatedCreatedDate[1]}-${FormatedCreatedDate[2]} ${FormatedCreatedDate[3]}:${FormatedCreatedDate[4]}`;
  }
};
