import React, { useEffect, useState } from 'react';
import '../../styles/voteModal.scss';
import Icon from '../common/Icon';
import { useQuery } from 'react-query';
import { getUserInfo } from '../../apis/user';

interface ModalProps {
  visible: boolean;
  stickerMessageHandler: (nickname: string, comment: string) => void;
  stickerHandler: () => void;
  backHandler: () => void;
}

interface InputProps {
  nickname: string;
  comment: string;
}

function VoteModal({
  visible,
  stickerMessageHandler,
  stickerHandler,
  backHandler,
}: ModalProps) {
  const [input, setInput] = useState<InputProps>({ nickname: '', comment: '' });
  const [isAnonymous, setIsAnonymouse] = useState<boolean>(false);
  const { data: userData } = useQuery(['userData'], getUserInfo);

  useEffect(() => {
    userData &&
      !isAnonymous &&
      setInput({ ...input, nickname: userData.nickname });
  }, [userData, isAnonymous]);

  function voteHandler() {
    stickerHandler();
  }

  function voteMessageHandler() {
    const { nickname, comment } = input ?? {};
    stickerMessageHandler(nickname, comment);
    setInput({ nickname: '', comment: '' });
  }

  function onChangeInputHandler(e: any) {
    setInput({ ...input, [e.target.name]: e.target.value });
  }

  function anonymouseHandler(e: any) {
    setIsAnonymouse(e.target.checked);
    if (e.target.checked) {
      setInput({ ...input, nickname: '익명' });
    } else {
      setInput({ ...input, nickname: '' });
    }
  }

  function modalBackHandler() {
    backHandler();
    setInput({ nickname: '', comment: '' });
    setIsAnonymouse(false);
  }

  return (
    <div className={`vote-modal ${visible && 'visible'}`}>
      <div className="vote-modal__background" />
      <div className="vote-input-box">
        <form className="vote-input-box__form">
          <button
            className="vote-input-box__back-btn"
            type="button"
            onClick={modalBackHandler}
          >
            <Icon name="arrow_back" alt="back" />
          </button>
          <div className="vote-input-box__title-box">
            <div className="vote-input-box__number">1</div>
            <div className="vote-input-box__vote-title">새우 껍질 주새우</div>
            <div className="vote-input-box__select">선택</div>
          </div>
          <div className="vote-input-box__input">
            <input
              name="nickname"
              value={input.nickname}
              onChange={onChangeInputHandler}
              className="vote-input-box__nickname"
              placeholder="닉네임을 입력해 주세요."
              disabled={isAnonymous}
              autoComplete="off"
            />
            <div className="vote-input-box__nickname-checkbox">
              <span>익명</span>
              <input
                type="checkbox"
                id="check"
                onChange={anonymouseHandler}
                checked={isAnonymous}
              />
              <label htmlFor="check" />
            </div>
          </div>
          <div className="vote-input-box__input">
            <textarea
              name="comment"
              value={input.comment}
              onChange={onChangeInputHandler}
              className="vote-input-box__comment"
              placeholder="투표에 대한 코멘트를 써주세요."
              maxLength={60}
            />
            <span className="vote-input-box__comment-length">
              {input.comment.length}/60
            </span>
          </div>
        </form>

        <div className="vote-input-box__button-box">
          <button
            onClick={voteHandler}
            type="button"
            className="vote-input-box__vote-btn"
          >
            그냥 투표하기
          </button>
          <button
            onClick={voteMessageHandler}
            type="button"
            className="vote-input-box__vote-btn"
          >
            확인
          </button>
        </div>
      </div>
    </div>
  );
}

export default VoteModal;
