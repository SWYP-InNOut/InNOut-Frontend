import Layout from '@components/common/layout/Layout';
import { css } from '@emotion/react';
import { LogoIcon, MenuIcon } from '@icons/index';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import HomeMenuSlider from './HomeMenuSlider';
import useAuthStore from '@stores/auth';
import StuffCardList from '@components/home/other/StuffCardList';
import { Col } from '@components/common/flex/Flex';
import { useMutation } from 'react-query';
import { OthersStuffListResponseDTO } from '@interfaces/api/room';
import { getOthers } from '@apis/others';
import { AxiosError } from 'axios';

const OthersStuffList = () => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const isPublic = useAuthStore((store) => store.isPublic);
  const [contentList, setContentList] = useState<OthersStuffListResponseDTO[]>([]);

  const getOthersStuffListMutation = useMutation(getOthers, {
    onSuccess: (data) => {
      console.log('다른사용자 게시물 리스트 성공:', data);
      setContentList(data.result);
    },
    onError: (error: AxiosError) => {
      console.error('다른사용자 게시물 실패:', error);
    },
  });

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    getOthersStuffListMutation.mutate();
  }, []);

  return (
    <Layout
      hasHeader={true}
      HeaderLeft={
        <button
          css={css`
            background-color: transparent;
            border: none;
            cursor: pointer;
          `}
          onClick={toggleMenu}
        >
          <MenuIcon />
        </button>
      }
      HeaderCenter={
        <div
          css={css`
            width: 104px;
            cursor: pointer;
          `}
          onClick={() => navigate('/')}
        >
          <LogoIcon />
        </div>
      }
      Footer={false}
    >
      <Col alignItems="center" padding={'24px 16px 0'}>
        <StuffCardList contentList={contentList} />
      </Col>

      <HomeMenuSlider isOpen={isOpen} handleMenu={toggleMenu} isPublic={isPublic || true} />
    </Layout>
  );
};

export default OthersStuffList;
