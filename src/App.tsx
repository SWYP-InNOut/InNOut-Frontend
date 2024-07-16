import styled from '@emotion/styled';
import icon from './assets/pic.svg';
interface ImgBoxProps {
  borderRadius: string;
}

function App() {
  return (
    <Div>
      <Top></Top>
      <div>
        <MainTitle>
          만나서 반가워요,
          <br />
          함께하는 물건 작별, in&out
        </MainTitle>
        <SubTtitle>닉네임은 프로필로 표시되며, 언제든 다시 바꿀 수 있어요</SubTtitle>
      </div>
      <ImgBoxWrapper>
        <ImgBox borderRadius="20px">
          <img src={icon} alt="icon" style={{ marginBottom: '24px' }} />
          이미지가 삽입되는 부분입니다.
          <br /> 이미지는 svg로 제작할 예정이지만,
          <br />
          png 형태로 삽입할 예정입니다.
        </ImgBox>
        <ImgBox borderRadius="16px">
          <img src={icon} alt="icon" style={{ marginBottom: '24px' }} />
          이미지가 삽입되는 부분입니다.
          <br /> 이미지는 svg로 제작할 예정이지만,
          <br />
          png 형태로 삽입할 예정입니다.
        </ImgBox>
        <ImgBox borderRadius="8px">
          <img src={icon} alt="icon" style={{ marginBottom: '24px' }} />
          이미지가 삽입되는 부분입니다.
          <br /> 이미지는 svg로 제작할 예정이지만,
          <br />
          png 형태로 삽입할 예정입니다.
        </ImgBox>
      </ImgBoxWrapper>
      <Label>닉네임</Label>
      <NicknameBox>자동 생성된 닉네임 제공</NicknameBox>
      <HelpersWrapper>
        <HelperWrapper>
          <CheckBox>체크 표시</CheckBox>
          <HelperText>한글(초성/중성X)/영어/숫자</HelperText>
        </HelperWrapper>
        <HelperWrapper>
          <CheckBox>체크 표시</CheckBox>
          <HelperText>공백 포함 2자 이상 16자 이하 입력</HelperText>
        </HelperWrapper>
      </HelpersWrapper>
      <SelectBtn>이걸로 결정했어요</SelectBtn>
    </Div>
  );
}

export default App;

const Div = styled.div`
  width: 648px;
  height: 1080px;
  border: 1px solid black;
  padding: 0px 47px;
  box-sizing: border-box;
  margin: 0 auto;
`;
const Top = styled.div`
  width: 220px;
  height: 80px;
  flex-shrink: 0;
  background-color: #d8d8d8;
`;

const MainTitle = styled.div`
  margin: 42px 0 16px 0;
  color: #000;
  font-family: 'Spoqa Han Sans Neo';
  font-size: 48px;
  font-style: normal;
  font-weight: 700;
  line-height: 72px; /* 150% */
  letter-spacing: -0.96px;
`;

const SubTtitle = styled.div`
  color: #898989;
  font-family: 'Spoqa Han Sans Neo';
  font-size: 24px;
  font-style: normal;
  font-weight: 500;
  line-height: 24px; /* 100% */
  letter-spacing: -0.48px;
`;
const ImgBox = styled.div<ImgBoxProps>`
  display: flex;
  width: 176px;
  height: 240px;
  padding: 28px 0px;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  flex-shrink: 0;
  border-radius: ${(props) => props.borderRadius};
  background: #d8d8d8;
  color: #000;
  text-align: center;
  font-family: 'Spoqa Han Sans Neo';
  font-size: 12px;
  font-style: normal;
  font-weight: 400;
  line-height: 18px; /* 150% */
  letter-spacing: -0.24px;
  padding: 0px;
`;

const ImgBoxWrapper = styled.div`
  display: flex;
  gap: 13px;
  margin: 36px 0;
`;

const NicknameBox = styled.div`
  margin: 16px 0 32px 0;
  display: flex;
  height: 56px;
  padding: 0px 24px;
  align-items: center;
  gap: 24px;
  flex: 1 0 0;
  background: #d9d9d9;
  color: #989898;
  font-family: 'Spoqa Han Sans Neo';
  font-size: 24px;
  font-style: normal;
  font-weight: 500;
  line-height: 24px; /* 100% */
  letter-spacing: -0.48px;
`;

const SelectBtn = styled.button`
  background: #000;
  display: flex;
  width: 100%;
  height: 80px;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  flex-shrink: 0;
  color: #fff;
  font-family: 'Spoqa Han Sans Neo';
  font-size: 24px;
  font-style: normal;
  font-weight: 500;
  line-height: 24px; /* 100% */
  letter-spacing: -0.48px;
  border: none;
  margin-top: 72px;
`;

const CheckBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 40px;
  height: 40px;
  flex-shrink: 0;
  background: #bfbfbf;
  color: #000;
  font-family: 'Spoqa Han Sans Neo';
  font-size: 6px;
  font-style: normal;
  font-weight: 700;
  line-height: 8px;
  letter-spacing: -0.12px;
  text-align: center;
`;

const HelperText = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  color: #000;
  font-family: 'Spoqa Han Sans Neo';
  font-size: 24px;
  font-style: normal;
  font-weight: 500;
  line-height: 24px; /* 100% */
  letter-spacing: -0.48px;
`;

const HelperWrapper = styled.div`
  display: flex;
  gap: 12px;
`;

const HelpersWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const Label = styled.div`
  color: #000;
  font-family: 'Spoqa Han Sans Neo';
  font-size: 36px;
  font-style: normal;
  font-weight: 700;
  line-height: 36px; /* 100% */
  letter-spacing: -0.72px;
`;
