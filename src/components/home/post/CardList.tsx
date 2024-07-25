import styled from '@emotion/styled';

const CardList = ({ imgList }: { imgList: string[] }) => {
  return (
    <CardContainer>
      {imgList.map((img, index) => (
        <Card key={index} src={img} />
      ))}
    </CardContainer>
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
