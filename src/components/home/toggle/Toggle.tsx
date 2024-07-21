import { colors } from '@styles/theme';

import styled from '@emotion/styled';

const ToggleSwitch = ({ on, handleToggle }: { on: boolean; handleToggle: () => void }) => {
  return (
    <Container on={on} onClick={handleToggle}>
      <Circle on={on} />
    </Container>
  );
};

const Container = styled.div<{ on: boolean }>`
  position: relative;
  display: flex;
  align-items: center;
  width: 54px;
  height: 32px;
  border-radius: 132px;
  background-color: ${({ on }) => (on ? '#84cffa' : colors.gray200)};
`;

const Circle = styled.div<{ on: boolean }>`
  position: absolute;
  transition: transform 0.5s;
  transform: ${({ on }) => (on ? 'translateX(calc(100% - 7.6px))' : 'translateX(3.8px)')}
    translateY(-50%);
  top: 50%;
  width: 26px;
  height: 26px;
  border-radius: 13px;
  background-color: white;
`;

export default ToggleSwitch;
