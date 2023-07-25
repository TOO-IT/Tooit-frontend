import { useLocation } from 'react-router-dom';
import '../../styles/ShareModal.scss';
import share from '../../utils/share';

function ShareModal({
  modalVisible,
  title,
}: {
  modalVisible: boolean;
  title: string;
}) {
  const location = useLocation();
  const baseUrl = 'http://localhost:3000';
  //로컬 호스트일 경우 twitter공유시 link가 제대로 생성 안됨
  const url = baseUrl + location.pathname;

  const { shareKakao, shareTwitter, shareURL } = share();

  const shareList = [
    {
      name: '트위터',
      icon: 'twitter_share.png',
      alt: 'twitter_share',
      onClick: () => shareTwitter(title, url),
    },
    {
      name: '카카오톡',
      icon: 'kakao_share.png',
      alt: 'kakao_share',
      onClick: () => shareKakao(title, 10),
    },
    {
      name: 'URL복사',
      icon: 'link_share.png',
      alt: 'link_share',
      onClick: () => shareURL(url),
    },
  ];

  return (
    <section className={`share-modal ${modalVisible && 'visible'}`}>
      {shareList.map((item) => (
        <button className="share-modal__button" onClick={item.onClick}>
          <img alt={item.alt} src={item.icon} className="share-modal__icon" />
          <span className="share-modal__text">{item.name}</span>
        </button>
      ))}
    </section>
  );
}

export default ShareModal;