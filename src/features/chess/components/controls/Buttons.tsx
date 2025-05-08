import styled from 'styled-components';
import DefaultButton from '../../../../components/DefaultButton';
import { useAppDispatch } from '../../../../store/store';
import { openModalWindow } from '../../../store/uiSlice';

function Buttons() {
  const dispatch = useAppDispatch();

  function handleOpenSurrenderWindow() {
    dispatch(openModalWindow('surrender'));
  }
  function handleOpenOfferDrawSendWindow() {
    dispatch(openModalWindow('offerDrawSend'));
  }

  return (
    <Wrapper>
      <ChessButton onClick={handleOpenOfferDrawSendWindow}>
        <span>Draw</span>
      </ChessButton>
      <ChessButton onClick={handleOpenSurrenderWindow}>
        <span>Surrender</span>
      </ChessButton>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  align-self: center;
  display: grid;
  row-gap: 24px;
  grid-area: buttons;
  justify-self: start;
`;

const ChessButton = styled(DefaultButton)`
  background-color: var(--color-gray-100);
  padding: 4px 8px;
  display: flex;
  gap: 12px;
  border-radius: 4px;

  transform: var(--sideTransform);

  font-size: 1.25rem;
  letter-spacing: 2px;
  font-weight: 500;

  transition: background-color 0.2s;

  &:hover {
    text-decoration: underline;
  }

  &:active {
    background-color: var(--color-gray-300);
  }
`;

export default Buttons;
