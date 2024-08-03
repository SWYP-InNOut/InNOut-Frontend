import React, { useCallback, useEffect, useState } from 'react';
import styled from '@emotion/styled';
import { colors } from '@styles/theme';

interface ImagePickerProps {
  images?: string[] | [];
}

const ImagePicker: React.FC<ImagePickerProps> = (props): JSX.Element => {
  const [pickers, setPickers] = useState<JSX.Element[]>([]);
  const [pickIndex, setPickIndex] = useState<number>(0);
  const [startX, setStartX] = useState<number | null>(null);
  const [endX, setEndX] = useState<number | null>(null);

  const minSwipeDistance = 50;

  const onPickIndex = useCallback(
    (idx: number): void => {
      if (pickIndex === idx) {
        return;
      }
      setPickIndex(idx);
    },
    [pickIndex]
  );

  const handleStart = (clientX: number) => {
    setEndX(null);
    setStartX(clientX);
  };

  const handleMove = (clientX: number) => {
    setEndX(clientX);
  };

  const handleEnd = () => {
    if (!startX || !endX) return;
    const distance = startX - endX;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;

    if (isLeftSwipe && pickIndex < (props.images ?? []).length - 1) {
      setPickIndex((prev) => prev + 1);
    }
    if (isRightSwipe && pickIndex > 0) {
      setPickIndex((prev) => prev - 1);
    }
  };

  // Touch events
  const onTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    handleStart(e.touches[0].clientX);
  };

  const onTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    handleMove(e.touches[0].clientX);
  };

  const onTouchEnd = () => {
    handleEnd();
  };

  // Mouse events
  const onMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    handleStart(e.clientX);
  };

  const onMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (startX === null) return; // Only move if we've started
    handleMove(e.clientX);
  };

  const onMouseUp = () => {
    handleEnd();
    setStartX(null); // Reset start position
  };

  const onMouseLeave = () => {
    if (startX !== null) {
      handleEnd();
      setStartX(null);
    }
  };

  useEffect(() => {
    setPickers(
      (props.images ?? []).map((_: string, idx: number) => {
        return (
          <Picker
            key={idx}
            onClick={() => onPickIndex(idx)}
            background={pickIndex === idx ? colors.red600 : 'white'}
            border={pickIndex === idx ? colors.red100 : colors.gray300}
          />
        );
      })
    );
  }, [onPickIndex, pickIndex, props.images]);

  return (
    <Container
      onTouchStart={onTouchStart}
      onTouchMove={onTouchMove}
      onTouchEnd={onTouchEnd}
      onMouseDown={onMouseDown}
      onMouseMove={onMouseMove}
      onMouseUp={onMouseUp}
      onMouseLeave={onMouseLeave}
    >
      <ImageContainer translateX={-pickIndex * 100}>
        {props.images?.map((image, index) => (
          <ImageWrapper key={index}>
            <FillImage src={image} alt={`Image ${index + 1}`} />
          </ImageWrapper>
        ))}
      </ImageContainer>
      <PickerWrapper>{pickers}</PickerWrapper>
    </Container>
  );
};

export default ImagePicker;

const Container = styled.div`
  width: 100%;
  height: 100%;
  overflow: hidden;
  position: relative;
  cursor: pointer;
`;

const ImageContainer = styled.div<{ translateX: number }>`
  display: flex;
  transition: transform 0.25s ease-out;
  transform: translateX(${(props) => props.translateX}%);
`;

const ImageWrapper = styled.div`
  width: 100%;
  height: 100%;
  overflow: hidden;
  flex-shrink: 0;
`;

const FillImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  aspect-ratio: 1/1;
`;

const PickerWrapper = styled.div`
  /* height: 100%; */
  align-items: center;
  justify-content: center;
  display: flex;
  transform: translate(0, -25px);
`;

const Picker = styled.div<{ background: string; border: string }>`
  width: 10px;
  height: 10px;
  border: 1px solid ${(props) => props.border};
  border-radius: 50%;
  background-color: ${(props) => props.background};
  margin: 0 6px;
  cursor: pointer;
`;
