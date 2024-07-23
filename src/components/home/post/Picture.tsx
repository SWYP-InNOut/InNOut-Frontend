import React, { useState, ChangeEvent, useRef } from 'react';
import { PictureIcon, PictureCloseIcon } from '@icons/index';
import { css } from '@emotion/react';
import { Col, Row } from '@components/common/flex/Flex';
import Txt from '@components/common/text/Txt';
import { colors } from '@styles/theme';
import styled from '@emotion/styled';
import { useFormContext } from 'react-hook-form';

interface PictureType {
  url: string;
  file: File;
}

const Picture: React.FC = () => {
  const { setValue } = useFormContext();
  const [pictures, setPictures] = useState<PictureType[]>([]);
  const [mainPicture, setMainPicture] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleAddPicture = (event: ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      const newPictures = Array.from(files).map((file) => ({
        url: URL.createObjectURL(file),
        file,
      }));
      setPictures((prevPictures) => {
        const updatedPictures = [...prevPictures, ...newPictures];
        if (updatedPictures.length === newPictures.length) {
          setMainPicture(newPictures[0].url);
        }
        setValue('pictures', updatedPictures);
        setValue('mainPicture', updatedPictures[0].url);
        return updatedPictures;
      });
    }
  };

  const handleRemovePicture = (url: string) => {
    setPictures((prevPictures) => {
      const updatedPictures = prevPictures.filter((picture) => picture.url !== url);
      if (mainPicture === url && updatedPictures.length > 0) {
        setMainPicture(updatedPictures[0].url);
        setValue('mainPicture', updatedPictures[0].url);
      } else if (updatedPictures.length === 0) {
        setMainPicture(null);
        setValue('mainPicture', null);
      }
      setValue('pictures', updatedPictures);
      return updatedPictures;
    });
  };

  const handleSetMainPicture = (url: string) => {
    setMainPicture(url);
    setValue('mainPicture', url);
  };

  const handleClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  return (
    <>
      <Row gap={'8'}>
        {/* 사진 업로드 div */}
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
              onChange={handleAddPicture}
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
              onClick={() => handleSetMainPicture(picture.url)}
            />
            <PictureCloseIcon
              css={css`
                position: absolute;
                top: 8px;
                right: 8px;
              `}
              onClick={() => handleRemovePicture(picture.url)}
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
