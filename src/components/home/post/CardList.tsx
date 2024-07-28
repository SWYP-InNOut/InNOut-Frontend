import { Col } from '@components/common/flex/Flex';
import Txt from '@components/common/text/Txt';
import styled from '@emotion/styled';
import { Charactor } from '@icons/index';
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
            <Card
              key={index}
              src={post.imgUrl}
              onClick={() => navigate(`/detail/${post.postId}`)}
            />
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
  width: 100%;
  aspect-ratio: 1 / 1;
  background-color: lightgray;
  border-radius: 2px;
`;
