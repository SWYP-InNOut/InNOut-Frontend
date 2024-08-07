import styled from '@emotion/styled';
import { Row } from '../flex/Flex';
import Txt from '../text/Txt';
import { css } from '@emotion/react';
import { DownArrowIcon, FilterCheckIcon, UpArrowIcon } from '@icons/index';
import { colors } from '@styles/theme';

interface FilterProps {
  selectList: string[];
  selected: number;
  handleSelect: (selected: number) => void;
  isOpen: boolean;
  handleIsOpen: () => void;
  onClick: () => void;
}
const Filter = ({ selectList, isOpen, selected, handleSelect, handleIsOpen }: FilterProps) => {
  return (
    <Row
      gap={'4'}
      alignItems="center"
      margin={'24px 0 27px'}
      onClick={() => handleIsOpen()}
      css={css`
        width: 92px;
        position: relative;
      `}
    >
      <Txt
        variant="c14"
        align="end"
        color={colors.darkGray}
        css={css`
          width: 72px;
        `}
      >
        {selectList[selected]}
      </Txt>
      <DownArrowIcon
        css={css`
          transform: ${isOpen ? 'rotate(180deg)' : 'rotate(0deg)'};
          transition: transform 0.3s ease-in-out;
          cursor: pointer;
        `}
      />
      {isOpen && (
        <Blur size={selectList.length * 37}>
          {selectList.map((item, index) => (
            <Selector
              key={index}
              last={index === selectList.length - 1}
              selected={selected === index}
              onClick={(event) => {
                event.stopPropagation(); // 이벤트 버블링 중지
                handleSelect(index);
                handleIsOpen();
              }}
            >
              <div
                css={css`
                  display: flex;
                  visibility: ${selected === index ? 'visible' : 'hidden'};
                  align-items: center;
                `}
              >
                <FilterCheckIcon />
              </div>

              <Txt variant="c14" color={selected === index ? colors.white : colors.gray400}>
                {item}
              </Txt>
            </Selector>
          ))}
        </Blur>
      )}
    </Row>
  );
};

const Selector = styled.div<{ last: boolean; selected: boolean }>`
  width: 100%;
  gap: 2px;
  display: flex;
  flex-direction: row;
  padding: 8px 12px 8px 8px;
  height: 37px;
  justify-content: flex-start;
  align-items: center;
  border-bottom: ${({ last }) => (last ? 'none' : `1px solid ${colors.gray800}`)};
  background-color: transparent;
  border-radius: 4px;
  cursor: ${({ selected }) => (selected ? 'default' : 'pointer')};
  z-index: 100;
`;

const Blur = styled.div<{ isOpen?: boolean; size: number }>`
  position: absolute;
  top: 32px;
  right: 0;
  width: 132px;
  border-radius: 10px;
  height: ${({ size }) => size}px;
  backdrop-filter: blur(1px);
  background: rgba(0, 0, 0, 0.85);
  z-index: 99;
`;

export default Filter;
