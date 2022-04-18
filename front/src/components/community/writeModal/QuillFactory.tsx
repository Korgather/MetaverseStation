import React, { useEffect, useMemo } from 'react';
import styled from 'styled-components';
import { useAppSelector } from '@store/hook';
import axios from 'axios';
import { useQuill } from 'react-quilljs';
import { RangeStatic } from 'quill';
const formats = [
  'header',
  'font',
  'size',
  'bold',
  'italic',
  'underline',
  'strike',
  'blockquote',
  'list',
  'bullet',
  'indent',
  'link',
  'image',
];

const theme = 'snow';

interface IQuill {
  onChangeContent: (content: string) => void;
  prevData: {
    category: string | undefined;
    title: string | undefined;
    content: string | undefined;
  };
}

export default function QuillFactory({ onChangeContent, prevData }: IQuill) {
  const AccessToken = useAppSelector((state) => state.userSlice.AccessToken);
  const modules = useMemo(
    () => ({
      toolbar: {
        container: [
          [{ header: [1, 2, false] }],
          ['bold', 'italic', 'underline', 'strike', 'blockquote'],
          [{ list: 'ordered' }, { list: 'bullet' }, { indent: '-1' }, { indent: '+1' }],
          ['link', 'image'],
          ['clean'],
        ],
      },
      imageDropAndPaste: {
        handler: () => {
          return;
        },
      },
    }),
    [],
  );
  const { quill, quillRef, Quill } = useQuill({ theme, modules, formats });
  if (Quill && !quill) {
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const imageDropAndPaste = require('quill-image-drop-and-paste').default;
    Quill.register('modules/imageDropAndPaste', imageDropAndPaste);
  }
  console.log(quillRef.current);
  const insertToEditor = (url: string) => {
    const range = quill?.getSelection();
    quill?.insertEmbed((range as RangeStatic).index, 'image', url);
  };

  const saveToServer = async (file: File) => {
    const fd = new FormData();
    fd.append('data', file);
    const res = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/upload`, fd, {
      headers: {
        Authorization: `Bearer ${AccessToken}`,
        withCredentials: true,
      },
    });
    const imageURL = process.env.NEXT_PUBLIC_IMG_URL + res.data[0];
    insertToEditor(imageURL);
    return imageURL;
  };
  const selectLocalImage = () => {
    const input = document.createElement('input');
    input.setAttribute('type', 'file');
    input.setAttribute('accept', 'image/*');
    input.click();

    input.onchange = () => {
      if (input.files !== null) {
        const file = input.files[0];
        saveToServer(file);
      }
    };
  };

  useEffect(() => {
    if (quill) {
      const onImagePaste = (e: ClipboardEvent) => {
        if (e.clipboardData && e.clipboardData.files[0]) {
          const Url = saveToServer(e.clipboardData.files[0]);
          quill.deleteText(6, 4);
          quill.insertEmbed(10, 'image', Url);
          return quill.insertEmbed(10, 'image', Url);
        }
      };
      prevData.content && quill.clipboard.dangerouslyPasteHTML(`${prevData.content}`);
      quill.on('text-change', () => {
        onChangeContent(quill.root.innerHTML);
      });
      quill.getModule('toolbar').addHandler('image', selectLocalImage);
      quill.root.addEventListener('paste', onImagePaste, false);
    }
  }, [quill]);

  return (
    <Wrapper>
      <div ref={quillRef} />
    </Wrapper>
  );
}

const Wrapper = styled.div`
  margin: 20px 0;
  .ql-container.ql-snow {
    max-height: 500px;
    height: 40vh;
  }
`;
