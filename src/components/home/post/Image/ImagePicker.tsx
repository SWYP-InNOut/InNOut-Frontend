import React, { useCallback, useEffect, useState } from 'react';
import styled from '@emotion/styled';
import { motion, useAnimation } from 'framer-motion';
import { colors } from '@styles/theme';

interface ImagePickerProps {
  images?: string[] | [];
}

const ImagePicker: React.FC<ImagePickerProps> = (props): JSX.Element => {
  const [pickIndex, setPickIndex] = useState<number>(0);
  const controls = useAnimation();
  const [dragStart, setDragStart] = useState<number | null>(null);

  const onPickIndex = useCallback(
    (idx: number): void => {
      if (pickIndex === idx) {
        return;
      }
      setPickIndex(idx);
    },
    [pickIndex]
  );

  const handleDragStart = (event: any) => {
    setDragStart(event.clientX || event.touches[0].clientX);
  };

  const handleDragEnd = (event: any) => {
    const clientX = event.clientX || (event.changedTouches && event.changedTouches[0].clientX);
    if (dragStart === null || clientX === undefined) return;
    const distance = dragStart - clientX;
    const minSwipeDistance = 50;

    if (distance > minSwipeDistance && pickIndex < (props.images ?? []).length - 1) {
      setPickIndex((prev) => prev + 1);
    } else if (distance < -minSwipeDistance && pickIndex > 0) {
      setPickIndex((prev) => prev - 1);
    }
    setDragStart(null);
  };

  useEffect(() => {
    controls.start({ x: -pickIndex * 100 + '%' });
  }, [pickIndex, controls]);

  return (
    <Container
      onMouseDown={handleDragStart}
      onMouseUp={handleDragEnd}
      onMouseLeave={handleDragEnd}
      onTouchStart={handleDragStart}
      onTouchEnd={handleDragEnd}
    >
      <ImageContainer animate={controls}>
        {props.images?.map((image, index) => (
          <ImageWrapper key={index}>
            <FillImage src={image} alt={`Image ${index + 1}`} />
          </ImageWrapper>
        ))}
      </ImageContainer>
      <PickerWrapper>
        {(props.images ?? []).map((_, idx: number) => (
          <Picker
            key={idx}
            onClick={() => onPickIndex(idx)}
            background={pickIndex === idx ? colors.red600 : 'white'}
            border={pickIndex === idx ? colors.red100 : colors.gray300}
          />
        ))}
      </PickerWrapper>
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

const ImageContainer = styled(motion.div)`
  display: flex;
  transition: transform 0.25s ease-out;
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
