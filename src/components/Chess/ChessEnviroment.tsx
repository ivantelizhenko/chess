import styled from 'styled-components';
import ChessBoard from './ChessBoard';
import ButtonDefault from '../Button';

function ChessEnviroment() {
  return (
    <Wrapper>
      <TimeBlack>10:00</TimeBlack>
      <ChessBoard />
      <TimeWhite>10:00</TimeWhite>

      <ButtonsBox>
        <IconButton>
          <span>Draw</span>
        </IconButton>
        <IconButton>
          <span>Surrender</span>
        </IconButton>
      </ButtonsBox>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr 3fr 1fr;
  grid-template-rows: auto minmax(0, 1fr) auto;
  grid-template-areas:
    '. timeBlack buttons'
    '. board buttons'
    '. timeWhite buttons';

  padding: 24px 64px;
  gap: 12px 32px;
  min-height: 0;
`;

const Time = styled.div`
  padding: 12px 16px;
  width: fit-content;
  height: fit-content;
  border-radius: 3px;
  font-weight: 600;
  font-size: 1.5rem;
`;

const TimeBlack = styled(Time)`
  background-color: var(--color-gray-900);
  color: var(--color-gray-400);
  grid-area: timeBlack;
`;
const TimeWhite = styled(Time)`
  color: var(--color-gray-900);
  background-color: var(--color-gray-400);
  grid-area: timeWhite;
`;

const ButtonsBox = styled.div`
  align-self: center;
  display: grid;
  row-gap: 24px;
  grid-area: buttons;
  justify-self: start;
`;

const IconButton = styled(ButtonDefault)`
  background-color: var(--color-gray-100);
  padding: 4px 8px;
  display: flex;
  gap: 12px;
  border-radius: 4px;
  width: fit-content;

  font-size: 1.25rem;
  letter-spacing: 3px;
  font-weight: 500;

  transition: background-color 0.2s;

  &:hover {
    text-decoration: underline;
  }

  &:active {
    background-color: var(--color-gray-300);
  }
`;

export default ChessEnviroment;
