import styled from '@emotion/styled/macro';

const CardList = ({ imgList }: { imgList: string[] }) => {
  return (
    <CardContainer>
      <Card src="https://via.placeholder.com/150" />
      <Card src="https://via.placeholder.com/150" />
      <Card src="https://via.placeholder.com/150" />
      <Card src="https://via.placeholder.com/150" />
    </CardContainer>
  );
};

export default CardList;

const CardContainer = styled.div`
  width: 100%;
  padding: 20px 16px;
  gap: 8px;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
`;

const Card = styled.img`
  width: 100%;
  aspect-ratio: 1 / 1;
  background-color: lightgray;
  margin-bottom: 10px;
`;
