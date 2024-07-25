import { Col, Row } from '@components/common/flex/Flex';
import Layout from '@components/common/layout/Layout';
import Txt from '@components/common/text/Txt';
import { css } from '@emotion/react';
import { LogoIcon, MenuIcon, PencilIcon } from '@icons/index';
import { colors } from '@styles/theme';
import { ChattingBox } from './MyHome.styles';
import HomeMenuSlider from './HomeMenuSlider';
import { useState } from 'react';
import CardList from '@components/home/post/CardList';
import Filter from '@components/common/filter/Filter';
import styled from '@emotion/styled';
import PreviewChat from '@components/chat/PreviewChat';
import AlertModal from '@components/common/alert/AlertModal';
import PrimaryButton from '@components/common/button/PrimaryButton';
import ToastBar from '@components/common/alert/ToastBar';
import { useNavigate } from 'react-router-dom';

const MyHome = () => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [selectList, setSelectList] = useState(['최신순', 'In 많은순', 'Out 많은순', '오래된순']);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState('최신순');
  const [isShareOpenModal, setIsShareModal] = useState(false);
  const [toastVisible, setToastVisible] = useState(false);

  const toggleFilter = () => {
    setIsFilterOpen(!isFilterOpen);
  };

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleShareBtn = () => {
    setIsShareModal(!isShareOpenModal);
  };

  const handleToast = () => {
    setToastVisible(!toastVisible);
  };

  const handlePencilBtn = () => {
    console.log('pencil');
    navigate('/post');
  };
  return (
    <>
      <Layout
        Footer={true}
        overflow={isOpen ? 'hidden' : 'auto'}
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
        HeaderRight={
          <button
            css={css`
              width: 29px;
              cursor: pointer;
            `}
            onClick={handleShareBtn}
          >
            <Txt variant="b16" color={colors.yellow700}>
              공유
            </Txt>
          </button>
        }
      >
        <AlertModal
          isShare={true}
          isOpen={isShareOpenModal}
          close={handleShareBtn}
          content={
            <Col gap={'12'} alignItems="center">
              <Txt variant="t20">친구를 초대해요</Txt>

              <Col alignItems="center">
                <Txt variant="b16">이 링크로 초대받은 친구는</Txt>
                <div>
                  <Txt variant="t16">로그인 없이 홈에 놀러 와 투표할</Txt>
                  <Txt variant="b16">수 있으니</Txt>
                </div>
                <Txt variant="b16">친구들에게 공유해 보세요!</Txt>
                <br />
                <div>
                  <Txt variant="b16">
                    링크는
                    <Txt variant="t16"> 72시간 유효</Txt>
                    <Txt variant="b16">해요</Txt>
                  </Txt>
                </div>
              </Col>
            </Col>
          }
          button={
            <PrimaryButton
              title="링크 복사"
              color={colors.red600}
              fontColor={colors.white}
              onClick={handleToast}
            />
          }
        />
        <Col padding={'24px 28px'}>
          <Row gap={'4'} justifyContent="start" alignItems="end">
            <Txt variant="h28" lineHeight={42}>
              사용자닉네임최대길이
            </Txt>
            <Txt variant="t18" color={colors.lightGray}>
              님의 홈
            </Txt>
          </Row>
        </Col>
        <Col padding={'0 16px'}>
          <PreviewChat />
        </Col>
        <Row
          padding={'0 16px'}
          justifyContent={'flex-end'}
          css={css`
            width: 100%;
            cursor: pointer;
          `}
        >
          <Filter
            selectList={selectList}
            isOpen={isFilterOpen}
            handleIsOpen={toggleFilter}
            selected={selectedFilter}
            handleSelect={setSelectedFilter}
            onClick={toggleFilter}
          />
        </Row>
        <div
          css={css`
            padding: 0 16px 20px;
          `}
        >
          <CardList
            imgList={['https://via.placeholder.com/150', 'https://via.placeholder.com/150']}
          />
        </div>
        <HomeMenuSlider isOpen={isOpen} handleMenu={toggleMenu} />
        <StyledPencilIcon />
        <AddButton onClick={handlePencilBtn} />
        <ToastBar message="링크가 복사됐어요" isVisible={toastVisible} onHide={handleToast} />
      </Layout>
    </>
  );
};

export default MyHome;

const StyledPencilIcon = styled(PencilIcon)`
  width: 56px; /* 기본 너비 */
  height: 56px;
  position: fixed;
  bottom: 40px;
  right: 16px; /* 기본 위치 */
  filter: drop-shadow(0px 1px 8px rgba(165, 60, 14, 0.3))
    drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.3));
  @media (min-width: 513px) {
    right: calc((100vw - 512px) / 2 + 16px); /* 화면 너비가 512px을 초과할 때 조정 */
  }
`;

const AddButton = styled.button`
  width: 56px;
  height: 56px;
  position: fixed;
  bottom: 40px;
  right: 16px;
  z-index: 2;
  border-radius: 18px;
  &:active {
    background: rgba(97, 59, 42, 0.3);
  }
  @media (min-width: 513px) {
    right: calc((100vw - 512px) / 2 + 16px); /* 화면 너비가 512px을 초과할 때 조정 */
  }
`;
