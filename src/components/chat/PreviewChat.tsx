import PrimaryButton from '@components/common/button/PrimaryButton';
import styled from '@emotion/styled';
import { colors } from '@styles/theme';
import OpponentChatBox from './OpponentChatBox';
import MyChatBox from './MyChatBox';

const PreviewChat = () => {
  const chat = '2줄 이상의 긴 글에 대해서는 최대 가로 길이 228이 넘어갈 경우, 줄바꿈 처리됩니다.';
  return (
    <ChattingBoxContainer>
      <ChattingBox>
        <OpponentChatBox name="상대방" message={chat} time="오후 3:00" />
        <OpponentChatBox name="상대방" message={'짧은 워딩 제공 형태'} time="오후 00:00" />
        <MyChatBox
          message={
            '다른 사용자가 보낸 메시지는 다음과 같이 처리되어 보여집니다. 문자 및 기호 상관없이 100자까지 입력할 수 있으며, 현재 기입되어 있는 내용이 사용자 제공 최대 메시지 칸입니다.'
          }
          time="오후 00:00"
        />
      </ChattingBox>
      <TopBlur />
      <BottomBlur />
      <ButtonContainer>
        <PrimaryButton title="채팅 참여" height="40px" />
      </ButtonContainer>
    </ChattingBoxContainer>
  );
};

export default PreviewChat;

const ChattingBoxContainer = styled.div`
  position: relative;
  overflow-y: auto; // 채팅 내용이 많아지면 스크롤 가능
  height: 260px; // 또는 실제 높이에 맞게 조정
  border: 2px solid ${colors.gray200};
  background-color: ${colors.white};
  border-radius: 8px;
`;

const ChattingBox = styled.div`
  display: flex;
  flex-direction: column;
  padding: 12px 0 61px;
  gap: 8px;
  background-color: transparent;
  width: 100%;
  height: 100%;

  overflow-y: scroll;
  scrollbar-width: none;
  &::-webkit-scrollbar {
    display: none;
  }
`;

const TopBlur = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  width: 100%;
  height: 64px;
  border-top-left-radius: 8px;
  border-top-right-radius: 8px;
  background: linear-gradient(180deg, #fff 0%, rgba(255, 255, 255, 0) 100%);
`;

const BottomBlur = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  width: 100%;
  height: 104px;
  border-bottom-left-radius: 8px;
  border-bottom-right-radius: 8px;
  background: linear-gradient(180deg, rgba(255, 255, 255, 0) 0%, #fff 46.6%);
`;

const ButtonContainer = styled.div`
  position: absolute;
  padding: 0 16px;
  bottom: 16px;
  left: 0;
  right: 0;
  display: flex;
`;
