import React from 'react';
import { SendEmailIcon, SendPwdIcon } from '@icons/index';
import Layout from '../layout/Layout';
import { Col } from '../flex/Flex';
import Txt from '../text/Txt';
import { colors } from '@styles/theme';

interface SendEmailProps {
  type: 'email' | 'pwd';
}

const SendEmail = ({ type }: SendEmailProps) => {
  const getContent = () => {
    if (type === 'email') {
      return {
        title: '인증 메일을 보냈어요\n확인하고 함께해주세요!',
        subtitle:
          '가입 시 작성한 이메일의 메일함을 확인해주세요\n이메일 인증이 완료되면 자동으로 가입이 완료돼요',
      };
    } else if (type === 'pwd') {
      return {
        title: '임시 비밀번호를 보냈어요\n확인하고 다시 함께해요',
        subtitle: '가입한 이메일의 메일함을 확인해주세요',
      };
    }
  };

  const content = getContent();
  return (
    <div>
      <Col gap={'4'}>
        <Txt variant="h32" styles={{ whiteSpace: 'pre-wrap' }}>
          {content?.title}
        </Txt>
        <Txt
          variant="b16"
          color={colors.lightGray}
          style={{ height: '48px', marginBottom: '31px', whiteSpace: 'pre-wrap' }}
        >
          {content?.subtitle}
        </Txt>
      </Col>
      {type === 'email' ? <SendEmailIcon /> : <SendPwdIcon />}
    </div>
  );
};

export default SendEmail;
