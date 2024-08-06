import { Col, Row } from '@components/common/flex/Flex';
import Txt from '@components/common/text/Txt';
import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { Charactor, EyesIcon } from '@icons/index';
import { Post } from '@interfaces/api/room';
import { colors } from '@styles/theme';
import { useNavigate } from 'react-router-dom';

const CardList = ({ postList }: { postList?: Post[] }) => {
  const navigate = useNavigate();
  return (
    <>
      {!postList || postList.length === 0 ? (
        <Col justifyContent="center" alignItems="center" gap={16} padding={'58px 0'}>
          <Charactor />
          <Col justifyContent="center" alignItems="center" gap={4}>
            <Txt variant="t20" color={colors.darkGray}>
              아직 등록된 게시물이 없어요
            </Txt>
            <Txt variant="b13" color={colors.lightGray}>
              버리고 싶은 물건을 등록하고 친구들과 함께 고민해요!
            </Txt>
          </Col>
        </Col>
      ) : (
        <CardContainer>
          {postList.map((post, index) => (
            <div
              css={css`
                position: relative;
                display: flex;
                justify-content: center;
                align-items: center;
              `}
            >
              <Card key={index} src={post.imgUrl} />
              <CardHoverStyle onClick={() => navigate(`/detail/${post.postId}`)}>
                <Col justifyContent="center" alignItems="center">
                  <Row justifyContent="center" alignItems="center" gap={4}>
                    <div
                      css={css`
                        font-size: 3.2rem;
                        font-weight: 600;
                        line-height: 42px;
                        font-family: 'Hancom Sans';
                        color: ${colors.white};
                      `}
                    >
                      In&Out
                    </div>
                    <EyesIcon />
                  </Row>
                  <Txt variant="t16" color={colors.lightGray}>
                    투표하러가기
                  </Txt>
                </Col>
              </CardHoverStyle>
            </div>
          ))}
        </CardContainer>
      )}
    </>
  );
};

export default CardList;

const CardContainer = styled.div`
  width: 100%;
  gap: 8px;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-template-rows: auto;
`;

const Card = styled.img`
  position: relative;
  width: 100%;
  object-fit: cover;
  aspect-ratio: 1 / 1;
  background-color: lightgray;
  border-radius: 2px;
`;

const CardHoverStyle = styled.div`
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  top: 0;
  left: 0;
  right: 0;
  width: 100%;
  aspect-ratio: 1 / 1;
  background-color: transparent;
  border-radius: 2px;
  border: transparent;
  cursor: pointer;
  opacity: 0;
  &:hover {
    background-color: rgba(0, 0, 0, 0.7);
    border: 2px solid ${colors.yellow900};
    opacity: 1;
  }
  &:active {
    background-color: rgba(0, 0, 0, 0.7);
    border: 2px solid ${colors.yellow900};
    opacity: 1;
  }
`;
