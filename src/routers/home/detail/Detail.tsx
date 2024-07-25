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
} from '@icons/index';
import Txt from '@components/common/text/Txt';
import { Col, Row } from '@components/common/flex/Flex';
import styled from '@emotion/styled';
import LottieContainer from '@components/common/lottie/LottieContainer';
import { css } from '@emotion/react';
import { colors } from '@styles/theme';
import ScrollProgress from '@components/home/post/ScrollProgress';
import TextArea from '@components/common/input/TextArea';
import ContentContainer from '@components/home/post/ContentContainer';
import ImagePicker from '@components/home/post/Image/ImagePicker';
import InOutVoting from '@components/home/\binout/InOutVoting';

const Detail = () => {
  const inContent: string =
    '사용자가 작성한 내용부분은 inout을 작성할 때, 사용자가 작성한 내용 중 긴 내용에 해당하는 텍스트 박스 사이즈로 통일됩니다. ';
  const outContent: string =
    '사용자가 작성한 내용부분은 inout을 작성할 때, 사용자가 작성한 내용 중 긴 내용에 해당하는 텍스트 박스 사이즈로 통일됩니다. 사용자가 작성한 내용부분은 inout을 작성할 때, 사용자가 작성한 내용 중 긴 내용에 해당하는 텍스트 박스 사이즈로 통일됩니다. ';
  const [heightSize, setHeightSize] = useState<number>(0);

  return (
    <Layout HeaderLeft={<LeftArrowIcon />} HeaderRight={<Txt variant="b16">수정</Txt>}>
      <div
        css={css`
          margin-top: 12px;
        `}
      >
        <ImagePicker />
      </div>

      <Col padding={'32px 16px'} gap={'4'}>
        <Txt variant="t22">사연을 대표해 줄 재밌는 제목을 등록</Txt>
        <Row gap={'4'}>
          <DateIcon />
          <Txt variant="c14" color={colors.lightGray}>
            0000.00.00 (등록일자)
          </Txt>
        </Row>
      </Col>
      <Contour />
      <Col padding={'32px 16px'} gap={'32'} margin={'0 0 12px 0'}>
        <SquareLogoIcon />
        <InOutVoting />
      </Col>
      <Contour />
      <Col padding={'32px 16px'} gap={'32'}>
        <Row gap={'8'}>
          <StoryIcon />
          <Txt variant="h24">사연 소개</Txt>
        </Row>
        <Col gap={'8'}>
          <Txt variant="t20">In! 하고 싶은 이유</Txt>
          <ContentContainer content={inContent} />
        </Col>
        <Col gap={'8'}>
          <Txt variant="t20">Out! 하고 싶은 이유</Txt>
          <ContentContainer content={outContent} />
        </Col>
      </Col>
      <Contour />
      <Col padding={'32px 16px'} gap={'32'}>
        <Row gap={'8'}>
          <TalkIcon />
          <Txt variant="h24">의견 티키타카</Txt>
        </Row>
      </Col>
    </Layout>
  );
};

export default Detail;

const Logo32 = styled.span`
  color: #000;
  text-align: center;
  font-family: 'Hancom Sans';
  font-size: 32px;
  font-style: normal;
  font-weight: 600;
  line-height: 42px;
`;
const Contour = styled.div`
  width: 100%;
  height: 8px;
  background-color: ${colors.gray100};
`;
