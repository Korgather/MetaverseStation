import { IUser } from './user';

export interface IReply {
  content?: string;
  postid: number | undefined;
  commentId: number | undefined;
  id?: number;
  replyId: number;
  userId: number;
  username: string;
  profileImageUrl?: string;
  createdDate?: string;
  modifiedDate?: string;
}

export interface IComment {
  createdDate?: string | Date;
  content?: string;
  id?: number;
  postCommentReplyList: IReply[];
  userId: number;
  profileImageUrl: string;
  postid?: number;
  username: string;
  commentId: number | undefined;
}

export interface AddReply {
  content: string;
  postid: number | undefined;
  User: IUser | null;
  id: number;
  AccessToken: string | null;
}
export type TAddComment = Pick<IComment, 'postid' | 'content'>;
export type TUpdateReply = Pick<IReply, 'replyId' | 'content'>;
export type TUpdateComment = Pick<IComment, 'commentId' | 'content'>;
