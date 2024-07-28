import PrimaryButton from '@components/common/button/PrimaryButton';
import styled from '@emotion/styled';
import { colors } from '@styles/theme';
import OpponentChatBox from './OpponentChatBox';
import MyChatBox from './MyChatBox';
import { Col } from '@components/common/flex/Flex';
import Txt from '@components/common/text/Txt';
import { css } from '@emotion/react';
import { Chat } from '@interfaces/api/room';

interface PreviewChatProps {
  isLogin: boolean;
  chats?: Chat[];
}

const PreviewChat = ({ isLogin, chats }: PreviewChatProps) => {
  return (
    <ChattingBoxContainer>
      {!chats || chats.length === 0 ? (
        <Col justifyContent="center" alignItems="center" padding={'86px 28px'}>
          <Txt variant="t20" color={colors.darkGray}>
            아직 채팅이 시작되지 않았어요
          </Txt>
          <Txt variant="b13" color={colors.lightGray}>
            친구들과 속닥속닥 의견을 나눠봐요
          </Txt>
        </Col>
      ) : (
        <>
          <ChattingBox>
            <OpponentChatBox
              name="상대방"
              message={
                '2줄 이상의 긴 글에 대해서는 최대 가로 길이 228이 넘어갈 경우, 줄바꿈 처리됩니다.'
              }
              time="오후 3:00"
            />
            <OpponentChatBox name="상대방" message={'짧은 워딩 제공 형태'} time="오후 00:00" />
            <MyChatBox
              message={
                '다른 사용자가 보낸 메시지는 다음과 같이 처리되어 보여집니다. 문자 및 기호 상관없이 100자까지 입력할 수 있으며, 현재 기입되어 있는 내용이 사용자 제공 최대 메시지 칸입니다.'
              }
              time="오후 00:00"
            />
          </ChattingBox>
          {isLogin ? (
            <>
              <TopBlur />
              <BottomBlur />
            </>
          ) : (
            <Blur />
          )}
        </>
      )}
      <ButtonContainer>
        <PrimaryButton
          title="채팅 참여"
          height="40px"
          onClick={() => alert('채팅 기능은 준비중입니다.')}
        />
      </ButtonContainer>
    </ChattingBoxContainer>
  );
};

export default PreviewChat;

const ChattingBoxContainer = styled.div`
  position: relative;
  height: 260px;
  border: 2px solid ${colors.gray200};
  background-color: ${colors.white};
  border-radius: 8px;
`;

const ChattingBox = styled.div`
  display: flex;
  flex-direction: column;
  padding: 12px 0 0;
  gap: 8px;
  background-color: white;
  border-radius: 8px;
  width: 100%;
  height: 199px;
  overflow-y: scroll;
  scrollbar-width: none;
  &::-webkit-scrollbar {
    display: none;
  }
  box-sizing: border-box;
`;

const Blur = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  width: 100%;
  height: 199px;
  border-radius: 8px;
  background: linear-gradient(180deg, rgba(255, 255, 255, 1) 0%, rgba(255, 255, 255, 0) 73.1%);
  backdrop-filter: blur(5px);
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
