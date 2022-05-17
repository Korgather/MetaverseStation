import { IComment, IReply } from '@customTypes/comment';
import { handleResizeHeight } from '@lib/textareaResizeHeight';
import React, { useRef } from 'react';
import { useFormContext } from 'react-hook-form';
import * as S from './style';

interface AddReplyProrp {
  reply?: IReply;
  comment?: IComment;
  updateInputState: boolean;
}

const UpdateInput: React.FC<AddReplyProrp> = ({ comment, reply, updateInputState }) => {
  const { register } = useFormContext();
  const { ref, ...rest } = register('content');
  const textRef = useRef<HTMLElement | null>(null);

  return (
    <div>
      {comment &&
        (updateInputState ? (
          <S.ContentWrapper large>
            <S.NickName large>{comment.username}</S.NickName>
            <S.Content large>
              <S.UpdateTextArea
                spellCheck="false"
                {...rest}
                ref={(e) => {
                  ref(e);
                  textRef.current = e;
                }}
                onInput={() => handleResizeHeight(textRef)}
                defaultValue={comment.content}
                id="content"
              />
            </S.Content>
          </S.ContentWrapper>
        ) : (
          <S.ContentWrapper large>
            <S.NickName large>{comment.username}</S.NickName>
            <S.Detail style={{ whiteSpace: 'pre-wrap' }}>{comment.content}</S.Detail>
          </S.ContentWrapper>
        ))}
      {reply &&
        (updateInputState ? (
          <S.ContentWrapper>
            <S.NickName>{reply.username}</S.NickName>
            <S.Content>
              <S.UpdateTextArea
                spellCheck="false"
                {...rest}
                ref={(e) => {
                  ref(e);
                  textRef.current = e;
                }}
                onInput={() => handleResizeHeight(textRef)}
                defaultValue={reply.content}
              />
            </S.Content>
          </S.ContentWrapper>
        ) : (
          <S.ContentWrapper>
            <S.NickName>{reply.username}</S.NickName>
            <S.Detail style={{ whiteSpace: 'pre-wrap' }}>{reply.content}</S.Detail>
          </S.ContentWrapper>
        ))}
    </div>
  );
};

export default UpdateInput;
