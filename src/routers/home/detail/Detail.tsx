import Layout from '@components/common/layout/Layout';
import React, {
  ChangeEventHandler,
  Dispatch,
  SetStateAction,
  useEffect,
  useRef,
  useState,
} from 'react';
import {
  TempImg,
  DateIcon,
  LeftArrowIcon,
  SquareLogoIcon,
  StoryIcon,
  TalkIcon,
  HomeIcon,
} from '@icons/index';
import Txt from '@components/common/text/Txt';
import { Col, Row } from '@components/common/flex/Flex';
import styled from '@emotion/styled';
import { css } from '@emotion/react';
import { colors } from '@styles/theme';
import ContentContainer from '@components/home/post/ContentContainer';
import ImagePicker from '@components/home/post/Image/ImagePicker';
import InOutVoting from '@components/home/\binout/InOutVoting';
import { useNavigate, useParams } from 'react-router-dom';
import { getMyRoomPost, getRoomPost } from '@apis/myroom';
import { useMutation } from 'react-query';
import useAuthStore from '@stores/auth';
import { GetDetailResponseDTO } from '@interfaces/api/room';
import PreviewChat from '@components/chat/PreviewChat';
import { iconSVGs } from '@constants/icons';
import _default from '../../../../vite.config.d';
import { ButtonContainer } from '../MyHome';
import { apiAnonymousClient } from '@apis/axios';

const Detail = () => {
  const navigate = useNavigate();
  const { postId } = useParams<{ postId: string }>();
  const anonymousToken = localStorage.getItem('anonymousToken');
  const memberId = useAuthStore((store) => store.memberId);
  const isLogin = useAuthStore((store) => store.isLoggedIn);
  const [postDetail, setPostDetail] = useState<GetDetailResponseDTO>();
  const myRoomMutation = useMutation(() => getMyRoomPost(memberId!, Number(postId)), {
    onSuccess: (data) => {
      if (data.code === 1000) {
        console.log('마이룸 상세 조회 성공:', data);
        setPostDetail(data.result);
      }
    },
    onError: (error) => {
      console.error('마이룸 상세 조회 실패:', error);
    },
  });

  const anonymousRoomMutation = useMutation(() => getRoomPost(postId || ''), {
    onSuccess: (data) => {
      if (data.code === 1000) {
        console.log('익명 상세 조회 성공:', data);
        setPostDetail(data.result);
      }
    },
    onError: (error) => {
      console.error('익명 상세 조회 실패:', error);
    },
  });

  useEffect(() => {
    if (anonymousToken) {
      apiAnonymousClient.defaults.headers.common['Authorization'] = `Bearer ${anonymousToken}`;
      anonymousRoomMutation.mutate();
    } else {
      if (memberId && postId) {
        myRoomMutation.mutate();
      }
    }
  }, [memberId, postId]);

  const handleArrowClick = () => {
    postDetail?.ownerId === memberId ? navigate('/') : navigate(-1);
  };

  const handleHomeClick = () => {
    if (anonymousToken) {
      navigate(`/other/${postDetail?.ownerId}?anonymousToken=${anonymousToken}`);
    } else {
      navigate('/');
    }
  };

  const handleModifyBtnClick = () => {
    navigate(`/post`, { state: { postDetail: postDetail, postId: postId } });
  };

  const handleProfileClick = () => {
    if (anonymousToken) {
      navigate(`/other/${postDetail?.ownerId}?anonymousToken=${anonymousToken}`);
    } else {
      navigate(`/other/${postDetail?.ownerId}`);
    }
  };

  return (
    <Layout
      HeaderLeft={
        <ButtonContainer
          onClick={handleArrowClick}
          css={css`
            cursor: pointer;
          `}
        >
          <LeftArrowIcon />
        </ButtonContainer>
      }
      HeaderCenter={
        postDetail?.ownerId !== memberId ? <Txt variant="t20">{postDetail?.ownerName}</Txt> : <></>
      }
      HeaderRight={
        postDetail?.ownerId === memberId ? (
          <ButtonContainer onClick={handleModifyBtnClick}>
            <Txt variant="b16" color={colors.yellow700}>
              수정
            </Txt>
          </ButtonContainer>
        ) : (
          <ButtonContainer onClick={handleHomeClick}>
            <HomeIcon />
          </ButtonContainer>
        )
      }
      Footer={true}
    >
      <div
        css={css`
          margin-top: 12px;
        `}
      >
        {postDetail && <ImagePicker images={postDetail.imageUrls} />}
      </div>

      <Col padding={'18px 16px 8px 16px'}>
        <Txt variant="t22">{postDetail?.title}</Txt>
      </Col>
      <Row padding={'0 16px 16px 16px'}>
        <Row padding={'8px 0px'} gap={'12'}>
          <ProfileImg onClick={handleProfileClick}>
            {postDetail?.ownerImageId !== undefined && (
              <SVGWrapper>
                {iconSVGs[postDetail.ownerImageId as keyof typeof iconSVGs]({
                  width: 40,
                  height: 40,
                })}
              </SVGWrapper>
            )}
          </ProfileImg>
          <Col>
            <Txt variant="c14" color={colors.darkGray}>
              {postDetail?.ownerName}
            </Txt>
            <Txt variant="c14" color={colors.lightGray}>
              {new Date(postDetail?.createdAt ?? '').toLocaleDateString()}
            </Txt>
          </Col>
        </Row>
        {postDetail?.ownerId !== memberId && (
          <OtherBtn onClick={handleProfileClick}>
            <Txt variant="b16" color={colors.red100}>
              방문
            </Txt>
          </OtherBtn>
        )}
      </Row>
      <Contour />
      <Col padding={'32px 16px'} gap={'32'} margin={'0 0 12px 0'}>
        <SquareLogoIcon />
        <InOutVoting
          initialInCount={postDetail?.inCount}
          initialOutCount={postDetail?.outCount}
          inOrOut={postDetail?.checkedIn ? 'In' : postDetail?.checkedOut ? 'Out' : 'None'}
          postId={Number(postId)}
        />
      </Col>
      <Contour />
      <Col padding={'32px 16px'} gap={'32'}>
        <Row gap={'8'}>
          <StoryIcon />
          <Txt variant="h24">사연 소개</Txt>
        </Row>
        <Col gap={'8'}>
          <Txt variant="t20">In! 하고 싶은 이유</Txt>
          <ContentContainer content={postDetail?.inContent ?? ''} />
        </Col>
        <Col gap={'8'}>
          <Txt variant="t20">Out! 하고 싶은 이유</Txt>
          <ContentContainer content={postDetail?.outContent ?? ''} />
        </Col>
      </Col>
      <Contour />
      <Col padding={'32px 16px'} gap={'32'}>
        <Row gap={'8'}>
          <TalkIcon />
          <Txt variant="h24">의견 티키타카</Txt>
        </Row>
        <PreviewChat isLogin={isLogin} />
      </Col>
    </Layout>
  );
};

export default Detail;

const Contour = styled.div`
  width: 100%;
  height: 8px;
  background-color: ${colors.gray100};
`;
const ProfileImg = styled.div`
  position: relative;
  width: 40px;
  height: 40px;
`;

const SVGWrapper = styled.div`
  border-radius: 50%;
  width: 100%;
  height: 100%;
  display: flex;
  overflow: hidden;
  cursor: pointer;
`;

const OtherBtn = styled.button`
  display: flex;
  margin: 9px 0px;
  border-radius: 12px;
  background-color: ${colors.red600};
  cursor: pointer;
  min-width: 45px;
  align-items: center;
  text-align: center;
  justify-content: center;
`;
