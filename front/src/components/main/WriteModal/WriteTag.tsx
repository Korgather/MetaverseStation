import React, { useState, SetStateAction } from 'react';
import { PlusOutlined } from '@ant-design/icons';
import { Input, Tag } from 'antd';
import shortid from 'shortid';
import styled from 'styled-components';

const WriteTag = () => {
  console.log(shortid.generate());
  const [tags, setTags] = useState<string[]>([]);
  const [inputVisible, setInputVisible] = useState<boolean>(false);
  const [inputValue, setInputValue] = useState<string>('');
  const [editInputValue, editSetInputValue] = useState<string>('');
  const [editInputIndex, editSetInputIndex] = useState<number>(-1);
  const handleClose = (removeTag: string) => {
    const filteredTags: SetStateAction<string[]> = tags.filter((tag) => tag !== removeTag);
    setTags(filteredTags);
  };
  const showInput = () => {
    setInputVisible(true);
  };
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };
  const handleEditInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    editSetInputValue(e.target.value);
  };
  const handleInputConfirm = () => {
    // 중복태그 방지
    if (inputValue && tags.indexOf(inputValue) === -1) {
      setTags([...tags, inputValue]);
    }
    setInputVisible(false);
    setInputValue('');
  };

  const handleEditInputConfirm = () => {
    const newTags = [...tags];
    newTags[editInputIndex] = editInputValue;
    return {
      tags: newTags,
      editInputIndex: -1,
      editInputValue: '',
    };
  };

  return (
    <div>
      {tags.map((tag, i) => (
        <>
          <Tag key={shortid.generate()} closable onClose={() => handleClose(tag)}>
            {tag.length >= 10 ? `${tag.slice(0, 10)}...` : tag}
          </Tag>
        </>
      ))}
      {inputVisible && (
        <TagInput
          onChange={handleInputChange}
          className="tag-input"
          size="small"
          onBlur={handleInputConfirm}
          onPressEnter={handleInputConfirm}
        />
      )}
      {tags.length < 5 && (
        <TagPlus className="site-tag-plus" onClick={showInput}>
          <PlusOutlined /> New Tag
        </TagPlus>
      )}
    </div>
  );
};

export default WriteTag;

const TagPlus = styled(Tag)`
  background: #fff;
  border-style: dashed;
  cursor: pointer;
`;

const TagInput = styled(Input)`
  width: 78px;
  margin-right: 8px;
  vertical-align: top;
  cursor: pointer;
`;
