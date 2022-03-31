import { IComment, IReply } from '@customTypes/comment';
import TextArea from 'antd/lib/input/TextArea';
import { FormikValues } from 'formik';
import React from 'react';
import * as S from './style';

interface AddReplyProrp {
  reply?: IReply;
  comment?: IComment;
  formik: FormikValues;
  updateInputState: boolean;
}

const UpdateInput: React.FC<AddReplyProrp> = ({ comment, formik, reply, updateInputState }) => {
  return (
    <div>
      {comment &&
        (updateInputState ? (
          <S.ContentWrapper large>
            <S.NickName large>{comment.User?.username}</S.NickName>
            <S.Content large>
              <TextArea
                name="content"
                id="content"
                onChange={formik.handleChange}
                value={formik.values.content}
              />
            </S.Content>
          </S.ContentWrapper>
        ) : (
          <S.ContentWrapper large>
            <S.NickName large>{comment.User?.username}</S.NickName>
            <S.Content large>{comment.content}</S.Content>
          </S.ContentWrapper>
        ))}
      {reply &&
        (updateInputState ? (
          <S.ContentWrapper>
            <S.NickName>{reply.User?.username}</S.NickName>
            <S.Content>
              <TextArea
                name="content"
                id="content"
                onChange={formik.handleChange}
                value={formik.values.content}
              />
            </S.Content>
          </S.ContentWrapper>
        ) : (
          <S.ContentWrapper>
            <S.NickName>{reply.User?.username}</S.NickName>
            <S.Content>{reply.content}</S.Content>
          </S.ContentWrapper>
        ))}
    </div>
  );
};

export default UpdateInput;
