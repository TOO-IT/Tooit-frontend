import React, { useEffect, useRef, useState } from 'react';
import VotedSticker from './VotedSticker';
import useResponsive from '../../hooks/useResponsive';
import { VoteListItemProps } from '../../interfaces/VoteInterface';
import html2canvas from 'html2canvas';
import Icon from '../common/Icon';

function VoteListItem({
  index,
  stickerLocateHandler,
  item,
}: VoteListItemProps) {
  const imgItemRef = useRef<any>(null);
  const { isTablet } = useResponsive();
  const windowWidth: number = window.innerWidth;
  const windowHeight: number = window.innerHeight;
  const voteItemWidth: number = isTablet ? windowWidth : windowHeight * 0.7;

  const [isHover, setIsHover] = useState<boolean>(false);
  const [focusSticker, setFocusSticker] = useState<any>(null);
  const [stickerSize, setStickerSize] = useState<string>('10.4vh');
  const { image, stickerCount, name, content, id, stickerList } = item;

  function saveHandler() {
    html2canvas(imgItemRef?.current, {
      scale: 4,
      useCORS: true,
      allowTaint: true,
      ignoreElements: (element) =>
        element.className === 'vote-list__item-info-button',
    }).then((canvas) => {
      let link = document.createElement('a');
      document.body.appendChild(link);

      link.href = canvas.toDataURL('image/jpg');
      link.download = name + '.jpg';
      link.click();

      document.body.removeChild(link);
    });
  }

  function getStickerSize() {
    if (isTablet) return '16vw';

    const number = stickerList.length;
    if (number < 20) return '10.4vh';
    if (number >= 20 && number < 50) return '8.8vh';
    if (number >= 50 && number < 100) return '7.2vh';
    if (number >= 100) return '4.8vh';
    return '10.4vh';
  }

  useEffect(() => {
    setStickerSize(getStickerSize());
  }, [stickerList, isTablet]);

  const imgSrc = `https://d2j21jlzisi105.cloudfront.net/${
    image.split('.com/')[1]
  }?timestamp=${new Date().getTime()}`;

  return (
    <li className="vote-list__item">
      <div className="vote-list__item-header">
        <div className="vote-list__item-title">
          <div className="vote-list__item-number">{index}</div>
          {name}
          {!isTablet && (
            <span className="vote-list__item-percent">
              {stickerCount}표 (20%)
            </span>
          )}
        </div>
        <button type="button" onClick={saveHandler}>
          <Icon name="save" alt="save" />
        </button>
      </div>

      <div
        ref={imgItemRef}
        style={{
          position: 'relative',
        }}
        onClick={(e: any) => {
          const x = (e.nativeEvent.offsetX / voteItemWidth) * 100;
          const y = (e.nativeEvent.offsetY / voteItemWidth) * 100;
          stickerLocateHandler({ x, y, index, name, id });
        }}
        className="vote-list__item-img"
      >
        {!!image ? (
          <div
            className="vote-list__item-img__img"
            style={{
              backgroundImage: `url(${imgSrc})`,
              backgroundSize: 'cover',
              backgroundRepeat: 'no-repeat',
              backgroundPosition: 'center center',
            }}
          />
        ) : (
          <h1 className="vote-list__item-img__name">{name}</h1>
        )}
        {stickerList.map((sticker: any) => {
          return (
            <VotedSticker
              sticker={sticker}
              isFocused={sticker.id === focusSticker?.id}
              stickerFocusHandler={(focus: any) => setFocusSticker(focus)}
              stickerSize={stickerSize}
            />
          );
        })}

        <div
          className={`vote-list__item-description-background ${
            isHover && 'visible'
          }`}
        >
          <div className="vote-list__item-description">{content}</div>
        </div>
        <button
          onBlur={() => setIsHover(!isHover)}
          onClick={() => setIsHover(!isHover)}
          type="button"
          className="vote-list__item-info-button"
        >
          <Icon name="vote_item_info" alt="info" />
        </button>
      </div>
    </li>
  );
}

export default VoteListItem;
