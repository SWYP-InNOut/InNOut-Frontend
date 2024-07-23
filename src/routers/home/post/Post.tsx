import Layout from '@components/common/layout/Layout';
import Txt from '@components/common/text/Txt';
import React from 'react';
import { CloseIcon } from '@icons/index';
import TextInput from '@components/common/input/TextInput';
import { FormProvider, useForm } from 'react-hook-form';
import { Col } from '@components/common/flex/Flex';
import TextArea from '@components/common/input/TextArea';
import PrimaryButton from '@components/common/button/PrimaryButton';
import Picture from '@components/home/post/Picture';
import { PostInputType } from '@constants/postFormConfig';

const Post = () => {
  const methods = useForm({
    mode: 'onChange',
    defaultValues: {
      pictures: [],
      mainPicture: null,
    },
  });
  const { handleSubmit } = methods;

  const onSubmit = (data: any) => {
    console.log(data);
  };
  return (
    <Layout
      hasHeader={true}
      HeaderCenter={<Txt variant="t20">새 게시물</Txt>}
      HeaderRight={<CloseIcon />}
    >
      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Col padding={'0 16px'} gap={'32'} margin={'32px 0 0 0'}>
            <Col gap={'8'}>
              <Txt variant="t20">제목</Txt>
              <TextInput
                id="title"
                placeholder="재밌는 제목을 붙여주세요"
                options={{ required: '제목은 필수입니다.' }}
                maxLength={20}
              />
            </Col>
            <Picture />

            <Col gap={'8'}>
              <Txt variant="t20">In! 하고 싶은 이유</Txt>
              <TextArea
                id="inContent"
                placeholder={`버릴 수 없는 이유를 알려주세요.\n자세히 들려줄수록 투표수가 올라가요.`}
                options={{ required: '내용은 필수입니다.' }}
              />
            </Col>
            <Col gap={'8'}>
              <Txt variant="t20">Out! 하고 싶은 이유</Txt>
              <TextArea
                id="outContent"
                placeholder={`버리고 싶은 이유를 알려주세요.\n자세히 들려줄수록 투표수가 올라가요.`}
                options={{ required: '내용은 필수입니다.' }}
              />
            </Col>
            <PrimaryButton title="등록" onClick={handleSubmit(onSubmit)} type="submit" />
          </Col>
        </form>
      </FormProvider>
    </Layout>
  );
};

export default Post;
