import styled from 'styled-components';

import { useAppDispatch, useAppSelector } from '../../store/store';
import DefaultButton from '../../components/DefaultButton';
import { useNavigate } from 'react-router-dom';
import { deleteId } from '../store/statusSlice';
import { closeModalWindow } from '../store/uiSlice';

function GameOverWindow() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const turn = useAppSelector(state => state.timer.turn);
  const { message, type } = useAppSelector(state => state.status.isGameOver);
  const sideWin = turn === 'w' ? 'Black' : 'White';

  const messageWin = `${sideWin} win. ${message}.`;
  const messageDraw = `${message}.`;

  function handleBackToMainMenu() {
    navigate('menu');
    dispatch(deleteId());
    dispatch(closeModalWindow());
  }

  return (
    <Wrapper>
      <p>{type === 'win' ? messageWin : messageDraw}</p>

      <Button onClick={handleBackToMainMenu}>Back to the main menu</Button>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  width: fit-content;
  height: fit-content;
  padding: 24px 48px;

  font-size: 2.5rem;
  text-transform: uppercase;

  display: grid;
  row-gap: 20px;
  text-align: center;
`;

const Button = styled(DefaultButton)`
  width: 100%;
  font-size: 1.25rem;
  padding: 8px 16px;
  background-color: var(--color-gray-300);

  &:hover {
    text-decoration: underline;
  }
`;

export default GameOverWindow;
