import React, { useState, SetStateAction, Dispatch } from 'react';
import { PlusOutlined } from '@ant-design/icons';
import { Tag } from 'antd';
import shortid from 'shortid';
import * as U from './style';

interface WriteTagProps {
  setTags: Dispatch<SetStateAction<string[]>>;
  tags: string[];
}

const WriteTag: React.FunctionComponent<WriteTagProps> = ({ tags, setTags }) => {
  const [inputVisible, setInputVisible] = useState<boolean>(false);
  const [inputValue, setInputValue] = useState<string>('');
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
  const handleInputConfirm = () => {
    // 중복태그 방지
    if (inputValue && tags.indexOf(inputValue) === -1) {
      setTags([...tags, inputValue]);
    }
    setInputVisible(false);
    setInputValue('');
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
        <U.TagInput
          onChange={handleInputChange}
          onBlur={handleInputConfirm}
          onPressEnter={handleInputConfirm}
          size="small"
        />
      )}
      {tags.length < 5 && (
        <U.TagPlus onClick={showInput}>
          <PlusOutlined /> New Tag
        </U.TagPlus>
      )}
    </div>
  );
};

export default WriteTag;
