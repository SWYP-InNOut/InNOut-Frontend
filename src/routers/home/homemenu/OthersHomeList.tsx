import Layout from '@components/common/layout/Layout';
import { css } from '@emotion/react';
import { LogoIcon, MenuIcon } from '@icons/index';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import HomeMenuSlider from './HomeMenuSlider';
import useAuthStore from '@stores/auth';
import StuffCardList, { StuffCard } from '@components/home/otherHome/StuffCardList';
import { Col } from '@components/common/flex/Flex';

const OthersHomeList = () => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const isPublic = useAuthStore((store) => store.isPublic);
  const contentList: StuffCard[] = [
    { profileImgUrl: '', name: '닉네임1', imgUrl: 'imgUrl1' },
    { profileImgUrl: '', name: '닉네임2', imgUrl: 'imgUrl2' },
    { profileImgUrl: '', name: '닉네임3', imgUrl: 'imgUrl3' },
    { profileImgUrl: '', name: '닉네임4', imgUrl: 'imgUrl4' },
    { profileImgUrl: '', name: '닉네임5', imgUrl: 'imgUrl5' },
    { profileImgUrl: '', name: '닉네임6', imgUrl: 'imgUrl6' },
    { profileImgUrl: '', name: '닉네임7', imgUrl: 'imgUrl7' },
    { profileImgUrl: '', name: '닉네임8', imgUrl: 'imgUrl8' },
  ];
  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };
  return (
    <Layout
      hasHeader={true}
      HeaderLeft={
        <button
          css={css`
            background-color: transparent;
            border: none;
            cursor: pointer;
          `}
          onClick={toggleMenu}
        >
          <MenuIcon />
        </button>
      }
      HeaderCenter={
        <div
          css={css`
            width: 104px;
          `}
        >
          <LogoIcon />
        </div>
      }
      Footer={false}
    >
      <Col alignItems="center" padding={'24px 16px 0'}>
        <StuffCardList contentList={contentList} />
      </Col>

      <HomeMenuSlider isOpen={isOpen} handleMenu={toggleMenu} isPublic={isPublic || true} />
    </Layout>
  );
};

export default OthersHomeList;
