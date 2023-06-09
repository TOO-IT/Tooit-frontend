import React, { useState, useCallback } from 'react';
import { Link } from 'react-router-dom';
import Wrapper from '../components/Wrapper';
import '../styles/my.scss';
import MessageModal from '../components/MessageModal';
import CommentModal from '../components/my/CommentModal';

const votes = [1, 2, 3, 4, 5];

function My() {
  const [category, setCategory] = useState<'made' | 'vote'>('made');
  const [selected, setSelected] = useState<number[]>([]);

  const [deleteModalVisible, setDeleteModalVisible] = useState<boolean>(false);
  const [closeModalVisible, setCloseModalVisible] = useState<boolean>(false);
  const [commentModalVisible, setCommentModalVisible] =
    useState<boolean>(false);

  function selectHandler(id: number) {
    const items = selected.includes(id)
      ? selected.filter((item) => item !== id)
      : [...selected, id];
    setSelected(items);
  }

  const deleteVoteHandler = useCallback(() => {
    // TODO : 투표 삭제 기능
    setDeleteModalVisible(false);
  }, []);

  const closeVoteHandler = useCallback(() => {
    // TODO : 투표 마감 기능
    setCloseModalVisible(false);
  }, []);

  const submitCommentHandler = useCallback(() => {
    // TODO : 코멘트 입력 기능
    setCommentModalVisible(false);
  }, []);

  return (
    <>
      <Wrapper>
        <main className="my">
          <section className="my__profile-box">
            <div className="my__profile-img">
              <img alt="profile" />
            </div>

            <div>
              <div className="my__profile-email">akdsjfh</div>
              <div className="my__profile-name">일이삼사오육칠팔구십 님</div>
              <Link to="/account" className="my__profile-button">
                내 정보 관리
              </Link>
            </div>
          </section>
          <section className="vote-control-box">
            <div className="vote-control-box__button-box">
              <button
                onClick={() => setCategory('made')}
                type="button"
                className={`${category === 'made' && 'select'}`}
              >
                내가 제작한 투표
              </button>
              <button
                onClick={() => setCategory('vote')}
                type="button"
                className={`${category === 'vote' && 'select'}`}
              >
                내가 참여한 투표
              </button>
            </div>

            <div className="vote-control-box__vote-control">
              <input
                type="checkbox"
                onChange={(e) =>
                  e.target.checked ? setSelected(votes) : setSelected([])
                }
              />
              <div
                className={`vote-control-box__control-button ${
                  selected.length > 0 && 'active'
                }`}
              >
                <button
                  type="button"
                  onClick={() =>
                    selected.length > 0 && setCloseModalVisible(true)
                  }
                >
                  투표 마감
                </button>
                <button
                  type="button"
                  onClick={() =>
                    selected.length > 0 && setDeleteModalVisible(true)
                  }
                >
                  투표 삭제
                </button>
              </div>
            </div>

            <ul className="vote-control-box__list">
              {votes.map((item) => (
                // TODO : voteItem 컴포넌트 분리
                <div
                  key={item}
                  className={`vote-control-box__list-item ${
                    selected.includes(item) && 'select'
                  }`}
                >
                  <input
                    type="checkbox"
                    onChange={() => selectHandler(item)}
                    checked={selected.includes(item)}
                  />
                  <button type="button" className="item-detail__thumbnail">
                    <img alt="vote-thumbnail" />
                  </button>
                  <div className="item-detail">
                    <button type="button">
                      <h2 className="item-detail__title">저녁 메뉴를 골라줘</h2>
                    </button>

                    <p className="item-detail__description">
                      일주일 동안 고생한 나, 저녁 메뉴를 골라줘!
                    </p>
                    <div className="item-detail__result">
                      <div>000명 참여</div>
                      <div>최다 득표 선택자: 마라탕</div>
                    </div>
                  </div>
                  <div className="item-detail__type-box">
                    {/* <div className="d-day">D-30</div> */}
                    {/* <div className="review-done">소감 작성 완료</div> */}
                    <button
                      type="button"
                      className="review"
                      onClick={() => setCommentModalVisible(true)}
                    >
                      소감 작성
                    </button>
                  </div>
                  <div className="item-detail__line" />
                </div>
              ))}
            </ul>
          </section>
        </main>
      </Wrapper>

      <MessageModal
        message="선택한 투표글을 삭제하시겠습니까?"
        visible={deleteModalVisible}
        buttonText="삭제"
        buttonColor="#EA5400"
        cancelHandler={() => setDeleteModalVisible(false)}
        buttonHandler={deleteVoteHandler}
      />
      <MessageModal
        message="선택한 투표글을 마감하시겠습니까?"
        visible={closeModalVisible}
        buttonText="마감"
        buttonColor="#52588B"
        cancelHandler={() => setCloseModalVisible(false)}
        buttonHandler={closeVoteHandler}
      />
      <CommentModal
        visible={commentModalVisible}
        cancelHandler={() => setCommentModalVisible(false)}
        submitHandler={submitCommentHandler}
      />
    </>
  );
}

export default My;
