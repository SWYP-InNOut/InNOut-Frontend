import { Col, Row } from '@components/common/flex/Flex';
import LottieContainer from '@components/common/lottie/LottieContainer';
import Txt from '@components/common/text/Txt';
import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { OthersStuffListResponseDTO } from '@interfaces/api/room';
import { colors } from '@styles/theme';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { iconSVGs } from '@constants/icons';

export interface StuffCard {
  imgUrl: string;
  name: string;
  profileImgUrl: string;
}

interface StuffCardProps {
  contentList: OthersStuffListResponseDTO[];
}

const StuffCardList = ({ contentList }: StuffCardProps) => {
  const navigate = useNavigate();
  const [innerWidth, setInnerWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      setInnerWidth(window.innerWidth);
    };
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [innerWidth]);

  const evenContentList = contentList.filter((_, index) => index % 2 === 0);
  const oddContentList = contentList.filter((_, index) => index % 2 !== 0);

  return (
    <CardContainer>
      <FirstColumn>
        {evenContentList.map((card, index) => (
          <Col key={index} gap={8} justifyContent="center" alignItems="center">
            <ImageCard src={card.imageUrl} onClick={() => navigate(`/detail/${card.postId}`)} />
            <Row gap={4} padding={'4px'} justifyContent="center" alignItems="center">
              <ProfileImg>
                {iconSVGs[card.memberImageId as keyof typeof iconSVGs]({
                  width: '100%',
                  height: '100%',
                })}
              </ProfileImg>
              <Txt variant="c14">{card.memberName}</Txt>
            </Row>
          </Col>
        ))}
      </FirstColumn>
      <SecondColumn>
        <DefaultCard maxWidth={(innerWidth - 40) / 2}>
          <div
            css={css`
              width: 61px;
              height: 61px;
              margin-bottom: -4px;
            `}
          >
            <LottieContainer path={'/In.json'} isPlay={true} />
          </div>
          <Txt variant="c14" color={colors.black}>
            나의 홈도 가득 채워봐요!
          </Txt>
        </DefaultCard>
        {oddContentList.map((card, index) => (
          <Col key={index} gap={8} justifyContent="center" alignItems="center">
            <ImageCard src={card.imageUrl} onClick={() => navigate(`/detail/${card.postId}`)} />
            <Row gap={4} padding={'4px'} justifyContent="center" alignItems="center">
              <ProfileImg>
                {iconSVGs[card.memberImageId as keyof typeof iconSVGs]({
                  width: '100%',
                  height: '100%',
                })}
              </ProfileImg>
              <Txt variant="c14">{card.memberName}</Txt>
            </Row>
          </Col>
        ))}
      </SecondColumn>
    </CardContainer>
  );
};

const DefaultCard = styled.div<{ maxWidth: number }>`
  width: 100%;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  padding-bottom: 6px;
  max-width: ${(props) => props.maxWidth}px;
  grid-row: 1;
  grid-column: 2;
  aspect-ratio: 2 / 1;
  background-color: ${colors.yellow200};
  border-radius: 8px;
  align-self: start; /* 요소를 상단으로 정렬 */
`;

const CardContainer = styled.div`
  width: 100%;
  gap: 8px;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-template-rows: masonry;
  grid-auto-flow: dense;
`;

const FirstColumn = styled.div`
  width: 100%;
  gap: 8px;
  display: flex;
  flex-direction: column;
`;

const SecondColumn = styled.div`
  width: 100%;
  gap: 8px;
  display: flex;
  flex-direction: column;
`;

const ImageCard = styled.img`
  width: 100%;
  object-fit: cover;
  aspect-ratio: 1 / 1;
  background-color: lightgray;
  border-radius: 8px;
  cursor: pointer;
`;

const ProfileImg = styled.div`
  width: 20px;
  height: 20px;
  border-radius: 50%;
  overflow: hidden;
`;

export default StuffCardList;
