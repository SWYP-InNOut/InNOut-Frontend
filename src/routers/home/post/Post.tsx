import Layout from '@components/common/layout/Layout';
import Txt from '@components/common/text/Txt';
import React, { useCallback, useEffect, useState } from 'react';
import { CloseIcon } from '@icons/index';
import TextInput from '@components/common/input/TextInput';
import { FormProvider, useForm, useWatch } from 'react-hook-form';
import { Col } from '@components/common/flex/Flex';
import TextArea from '@components/common/input/TextArea';
import PrimaryButton from '@components/common/button/PrimaryButton';
import Picture from '@components/home/post/Picture';
import { css } from '@emotion/react';
import AlertModal from '@components/common/alert/AlertModal';
import { colors } from '@styles/theme';
import { useLocation, useNavigate } from 'react-router-dom';
import { useMutation } from 'react-query';
import { postMyRoomAddStuff, postMyRoomModifyStuff } from '@apis/myroom';
import axios, { AxiosError } from 'axios';
import useAuthStore from '@stores/auth';
import { GetDetailResponseDTO } from '@interfaces/api/room';
import { PictureType } from '@utils/pictureUtils';

const Post = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isCloseAlert, setIsCloseAlert] = useState(false);
  const [alertContent, setAlertContent] = useState<React.ReactNode>(null);
  const [alertBtn, setAlertBtn] = useState<React.ReactNode>(null);
  const postDetail: GetDetailResponseDTO = location.state?.postDetail;
  const postId = location.state?.postId;
  const isModify = postDetail ? true : false;
  const [pictures, setPictures] = useState<PictureType[]>([]);
  const methods = useForm<PostRequestDTO>({
    defaultValues: {
      fileList: [], // fileList를 빈 배열로 초기화
    },
    mode: 'all',
  });

  const { watch, setFocus, getValues, formState, setValue } = methods;
  const [title, fileList, inContent, outContent] = watch([
    'title',
    'fileList',
    'inContent',
    'outContent',
  ]);

  const ownerId = useAuthStore((store) => store.memberId);

  const postMyRoomAddStuffMutation = useMutation(postMyRoomAddStuff, {
    onSuccess: (data) => {
      console.log('게시물 등록 성공:', data.result);
      navigate('/');
    },
    onError: (error: AxiosError) => {
      console.error('게시물 등록 실패:', error);
    },
  });

  const postMyRoomModifyStuffMutation = useMutation(postMyRoomModifyStuff, {
    onSuccess: (data) => {
      console.log('게시물 수정 성공:', data.result);
      navigate(`/detail/${postId}`);
    },
    onError: (error: AxiosError) => {
      console.error('게시물 수정 실패:', error);
    },
  });

  const handleExitBtn = () => {
    navigate(-1);
  };

  //상단 X 표시 눌렀을 경우
  const handleCloseBtn = () => {
    setIsCloseAlert(true);
    setAlertBtn(
      <Col gap={'8'}>
        <PrimaryButton
          title="계속 작성"
          onClick={() => {
            setIsCloseAlert(false);
          }}
          color={colors.red600}
        />
        <PrimaryButton
          title="나가기"
          onClick={handleExitBtn}
          color={colors.gray100}
          fontColor={colors.lightGray}
        />
      </Col>
    );
    setAlertContent(
      <Col gap={'12'} alignItems="center" justifyContent="center">
        <Txt variant="t20">정말 나가시겠어요?</Txt>
        <Txt variant="b16" align="center">
          지금 페이지를 나가면
          <br />
          입력한 내용이 모두 없어져요
        </Txt>
      </Col>
    );
  };
  const handleValidation = () => {
    if (title === '' || title === undefined) {
      setAlertContent(
        <Txt variant="b16" align="center">
          제목은 필수!
        </Txt>
      );
      setAlertBtn(
        <PrimaryButton
          title="확인"
          onClick={() => {
            setIsCloseAlert(false);
            setFocus('title');
          }}
          color={colors.red600}
        />
      );
      setIsCloseAlert(true);
      return false;
    }
    if (fileList.length < 1) {
      setAlertContent(
        <Col gap={'12'} alignItems="center">
          <Txt variant="t20">사진은 중요!</Txt>
          <Txt variant="b16" align="center">
            최소 1장은 필수예요
          </Txt>
        </Col>
      );
      setAlertBtn(
        <PrimaryButton
          title="확인"
          onClick={() => {
            setIsCloseAlert(false);
          }}
          color={colors.red600}
        />
      );
      setIsCloseAlert(true);
      return false;
    }
    return true;
  };

  const onFormSubmit = () => {
    let validation = handleValidation();
    if (validation) {
      const formData = new FormData();
      if (inContent === '' || inContent === undefined) {
        setValue('inContent', ' ');
      }
      if (outContent === '' || outContent === undefined) {
        setValue('outContent', ' ');
      }

      let data = null;
      if (isModify) {
        data = {
          memberId: ownerId,
          title,
          inContent,
          outContent,
          postId: postId,
        };
      } else {
        data = {
          memberId: ownerId,
          title,
          inContent,
          outContent,
        };
      }

      const blob = new Blob([JSON.stringify(data)], { type: 'application/json' });
      formData.append('request', blob);
      fileList.forEach((file) => {
        formData.append('file', file);
      });

      if (isModify) {
        postMyRoomModifyStuffMutation.mutate(formData);
      } else {
        postMyRoomAddStuffMutation.mutate(formData);
      }
    }
  };

  async function downloadImageAsFile(s3Url: string): Promise<File> {
    try {
      const response = await axios.get(s3Url, {
        responseType: 'blob',
        headers: {
          'Cache-Control': 'no-cache',
        },
      });
      const blob = response.data;
      return new File([blob], 'downloaded_image.jpg', { type: blob.type });
    } catch (error) {
      console.error('Error downloading image:', error);
      throw error;
    }
  }

  async function processImageUrls(imageUrls: string[]): Promise<File[]> {
    if (imageUrls.length < 1 || imageUrls.length > 2) {
      throw new Error('Image URL array length must be between 1 and 2.');
    }

    try {
      const files = await Promise.all(imageUrls.map((url) => downloadImageAsFile(url)));
      return files;
    } catch (error) {
      console.error('Error processing image URLs:', error);
      throw error;
    }
  }

  useEffect(() => {
    if (postDetail) {
      setValue('title', postDetail.title);
      setValue('inContent', postDetail.inContent);
      setValue('outContent', postDetail.outContent);
      processImageUrls(postDetail.imageUrls).then((files) => {
        setPictures(files.map((file) => ({ url: URL.createObjectURL(file), file })));
      });
    }
  }, [postDetail, setValue]);

  return (
    <>
      <AlertModal isOpen={isCloseAlert} content={alertContent} button={alertBtn} />
      <Layout
        hasHeader={true}
        HeaderCenter={<Txt variant="t20">{postDetail ? '게시물 수정' : '새 게시물'}</Txt>}
        HeaderRight={
          <CloseIcon
            onClick={handleCloseBtn}
            css={css`
              cursor: pointer;
            `}
          />
        }
      >
        <FormProvider {...methods}>
          <form>
            <Col padding={'0 16px 0 16px'} gap={32} margin={'32px 0 0 0'}>
              <Col gap={'8'}>
                <Txt variant="t20">제목</Txt>
                <TextInput
                  id="title"
                  placeholder="재밌는 제목을 붙여주세요"
                  options={{ required: '제목은 필수입니다.' }}
                  maxLength={20}
                />
              </Col>
              <Picture pictures={pictures} setPictures={setPictures} />

              <Col gap={'8'}>
                <Txt variant="t20">In! 하고 싶은 이유</Txt>
                <TextArea
                  id="inContent"
                  placeholder={`버릴 수 없는 이유를 알려주세요.\n자세히 들려줄수록 투표수가 올라가요.`}
                />
              </Col>
              <Col gap={'8'}>
                <Txt variant="t20">Out! 하고 싶은 이유</Txt>
                <TextArea
                  id="outContent"
                  placeholder={`버리고 싶은 이유를 알려주세요.\n자세히 들려줄수록 투표수가 올라가요.`}
                />
              </Col>
            </Col>
          </form>
        </FormProvider>
        <div
          css={css`
            width: 100%;
            padding: 0 16px 38px;
            margin-top: 32px;
          `}
        >
          <PrimaryButton title={isModify ? '완료' : '등록'} onClick={onFormSubmit} />
        </div>
      </Layout>
    </>
  );
};

export default Post;
