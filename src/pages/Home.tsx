import React, { useEffect, useState } from 'react';
import SimpleSlider from '../components/Carousel';
import '../styles/home.scss';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useInView } from 'react-intersection-observer';
import { useInfiniteQuery } from 'react-query';

function Home() {
  const [category, setCategory] = useState<'new' | 'famous'>('new');
  const [responseData, setResponseData] = useState(null);
  const { ref, inView } = useInView({ threshold: 0.3 });

  const newBtnHandler = () => {
    setCategory('new');
    // TODO: 최신순 정렬
  };

  const famousBtnHandler = () => {
    setCategory('famous');
    // TODO: 인기순 정렬
  };

  const getPostInfoListInfinitely = async (
    lastPostId: number,
    size: number,
    category: string,
  ) => {
    try {
      if (category === 'new') {
        const response = await axios.get(
          `/tooit/vote?order=newest&lastPostId=${lastPostId}&size=${size}`,
        );
        return response.data;
      } else if (category === 'famous') {
        const response = await axios.get(
          `/tooit/vote?order=popularity&lastPostId=${lastPostId}&size=${size}`,
        );
        return response.data;
      }
    } catch (error) {
      throw new Error('Failed to fetch data'); // 에러 처리 필요
    }
  };

  const {
    data: postInfoList,
    fetchNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery(
    ['infinitePostList'],
    ({ pageParam = 999999 }) =>
      getPostInfoListInfinitely(pageParam, 20, category), // category 추가
    {
      getNextPageParam: (lastPage: { isLast: any; nestLastPostId: any }) =>
        !lastPage.isLast ? lastPage.nestLastPostId : undefined,
    },
  );

  useEffect(() => {
    if (inView && fetchNextPage) {
      fetchNextPage();
    }
  }, [inView]);

  return (
    <div>
      {SimpleSlider()}
      <div className="vote_container">
        <div className="vote_btn_container">
          <button
            type="button"
            className={`${category === 'new' && 'select'} new`}
            onClick={newBtnHandler}
          >
            최신순
          </button>
          <button
            type="button"
            className={`${category === 'famous' && 'select'} famous`}
            onClick={famousBtnHandler}
          >
            인기순
          </button>
        </div>

        <div className="vote_rows">
          <div className="cards_row">
            <div className="vote_card">
              <Link to="/vote">
                <div className="vote_header">
                  <div className="vote_image">
                    <img src="img\sampleImage1.png" />
                  </div>
                  <div className="vote_remain">D-day</div>
                </div>
                <div className="vote_title">저녁메뉴추천받아요</div>
                <div className="vote_description">오늘저녁뭐먹지</div>
                <div className="vote_footer">
                  <div className="vote_due">마감일 2023.05.14 13:00</div>
                  <div className="vote_number">
                    <img src="too_it_icon\png\Vote.png" />
                    23
                  </div>
                </div>
              </Link>
            </div>
            <div className="vote_card">
              <Link to="/vote">
                <div className="vote_header">
                  <div className="vote_image">
                    <img src="img\sampleImage1.png" />
                  </div>
                  <div className="vote_remain">D-day</div>
                </div>
                <div className="vote_title">저녁메뉴추천받아요</div>
                <div className="vote_description">오늘저녁뭐먹지</div>
                <div className="vote_footer">
                  <div className="vote_due">마감일 2023.05.14 13:00</div>
                  <div className="vote_number">
                    <img src="too_it_icon\png\Vote.png" />
                    23
                  </div>
                </div>
              </Link>
            </div>
            <div className="vote_card">
              <Link to="/vote">
                <div className="vote_header">
                  <div className="vote_image">
                    <img src="img\sampleImage1.png" />
                  </div>
                  <div className="vote_remain">D-day</div>
                </div>
                <div className="vote_title">저녁메뉴추천받아요</div>
                <div className="vote_description">오늘저녁뭐먹지</div>
                <div className="vote_footer">
                  <div className="vote_due">마감일 2023.05.14 13:00</div>
                  <div className="vote_number">
                    <img src="too_it_icon\png\Vote.png" />
                    23
                  </div>
                </div>
              </Link>
            </div>
            <div className="vote_card">
              <Link to="/vote">
                <div className="vote_header">
                  <div className="vote_image">
                    <img src="img\sampleImage1.png" />
                  </div>
                  <div className="vote_remain">D-day</div>
                </div>
                <div className="vote_title">저녁메뉴추천받아요</div>
                <div className="vote_description">오늘저녁뭐먹지</div>
                <div className="vote_footer">
                  <div className="vote_due">마감일 2023.05.14 13:00</div>
                  <div className="vote_number">
                    <img src="too_it_icon\png\Vote.png" />
                    23
                  </div>
                </div>
              </Link>
            </div>
          </div>
          <div className="cards_row">
            <div className="vote_card">
              <Link to="/vote">
                <div className="vote_header">
                  <div className="vote_image">
                    <img src="img\sampleImage1.png" />
                  </div>
                  <div className="vote_remain">D-day</div>
                </div>
                <div className="vote_title">저녁메뉴추천받아요</div>
                <div className="vote_description">오늘저녁뭐먹지</div>
                <div className="vote_footer">
                  <div className="vote_due">마감일 2023.05.14 13:00</div>
                  <div className="vote_number">
                    <img src="too_it_icon\png\Vote.png" />
                    23
                  </div>
                </div>
              </Link>
            </div>
            <div className="vote_card">
              <Link to="/vote">
                <div className="vote_header">
                  <div className="vote_image">
                    <img src="img\sampleImage1.png" />
                  </div>
                  <div className="vote_remain">D-day</div>
                </div>
                <div className="vote_title">저녁메뉴추천받아요</div>
                <div className="vote_description">오늘저녁뭐먹지</div>
                <div className="vote_footer">
                  <div className="vote_due">마감일 2023.05.14 13:00</div>
                  <div className="vote_number">
                    <img src="too_it_icon\png\Vote.png" />
                    23
                  </div>
                </div>
              </Link>
            </div>
            <div className="vote_card">
              <Link to="/vote">
                <div className="vote_header">
                  <div className="vote_image">
                    <img src="img\sampleImage1.png" />
                  </div>
                  <div className="vote_remain">D-day</div>
                </div>
                <div className="vote_title">저녁메뉴추천받아요</div>
                <div className="vote_description">오늘저녁뭐먹지</div>
                <div className="vote_footer">
                  <div className="vote_due">마감일 2023.05.14 13:00</div>
                  <div className="vote_number">
                    <img src="too_it_icon\png\Vote.png" />
                    23
                  </div>
                </div>
              </Link>
            </div>
            <div className="vote_card">
              <Link to="/vote">
                <div className="vote_header">
                  <div className="vote_image">
                    <img src="img\sampleImage1.png" />
                  </div>
                  <div className="vote_remain">D-day</div>
                </div>
                <div className="vote_title">저녁메뉴추천받아요</div>
                <div className="vote_description">오늘저녁뭐먹지</div>
                <div className="vote_footer">
                  <div className="vote_due">마감일 2023.05.14 13:00</div>
                  <div className="vote_number">
                    <img src="too_it_icon\png\Vote.png" />
                    23
                  </div>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </div>
      {isFetchingNextPage ? <span>내용</span> : <div ref={ref}>끝!</div>}
    </div>
  );
}

export default Home;
