import React, { useState, ChangeEvent, useRef, useEffect } from 'react';
import { PictureIcon, PictureCloseIcon } from '@icons/index';
import { css } from '@emotion/react';
import { Col, Row } from '@components/common/flex/Flex';
import Txt from '@components/common/text/Txt';
import { colors } from '@styles/theme';
import styled from '@emotion/styled';
import { usePictureHandlers, PictureType } from '@utils/pictureUtils';
import { useFormContext } from 'react-hook-form';

const Picture = ({
  pictures,
  setPictures,
}: {
  pictures: PictureType[];
  setPictures: React.Dispatch<React.SetStateAction<PictureType[]>>;
}) => {
  const [mainPicture, setMainPicture] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const { register, setValue, watch, getValues } = useFormContext();

  const { handleAddPicture, handleRemovePicture, handleSetMainPicture } = usePictureHandlers();

  const handleClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  useEffect(() => {
    console.log('images:', pictures);
    setPictures(pictures);
    setMainPicture(pictures[0]?.url);
  }, [pictures]);
  return (
    <>
      <Row gap={'8'}>
        {pictures.length < 2 && (
          <Col
            gap={'8'}
            padding={'24px 30.5px'}
            css={css`
              background-color: ${colors.gray100};
              width: 50%;
              height: 50%;
              aspect-ratio: 1 / 1;
              border-radius: 8px;
              cursor: pointer;
              z-index: 1;
            `}
            alignItems="center"
            justifyContent="center"
            onClick={handleClick}
          >
            <PictureIcon />
            <Txt variant="b16" color={colors.darkGray}>
              사진 추가 ({pictures.length}/2)
            </Txt>
            <input
              type="file"
              accept="image/*"
              multiple
              onChange={(e) => handleAddPicture(e, setPictures, setMainPicture)}
              css={css`
                display: none;
              `}
              ref={fileInputRef}
            />
          </Col>
        )}
        {pictures.map((picture, index) => (
          <PictureWrapper key={index}>
            <Img
              src={picture.url}
              alt="Uploaded"
              onClick={() => handleSetMainPicture(picture.url, setMainPicture)}
            />
            <PictureCloseIcon
              css={css`
                position: absolute;
                top: 8px;
                right: 8px;
              `}
              onClick={() =>
                handleRemovePicture(picture.url, setPictures, setMainPicture, mainPicture)
              }
            />
            {mainPicture === picture.url && (
              <MainPicture>
                <Txt variant="b16" color={colors.white}>
                  대표사진
                </Txt>
              </MainPicture>
            )}
          </PictureWrapper>
        ))}
      </Row>
    </>
  );
};

export default Picture;

const Img = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  cursor: pointer;
`;

const PictureWrapper = styled.div`
  position: relative;
  width: 50%;
  height: 50%;
  aspect-ratio: 1 / 1;
  cursor: pointer;
  overflow: hidden;
  border-radius: 8px;
  z-index: 2;
`;

const MainPicture = styled.div`
  position: absolute;
  bottom: 0;
  width: 100%;
  background: rgba(0, 0, 0, 0.8);
  color: white;
  text-align: center;
  padding: 8px 0;
`;
