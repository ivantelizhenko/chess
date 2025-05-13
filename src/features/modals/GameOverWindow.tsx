import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../store/store';
import { reset as resetStatus } from '../store/statusSlice';
import { reset as resetBoard } from '../store/boardSlice';
import { reset as resetTimer } from '../store/timerSlice';
import { closeModalWindow } from '../store/uiSlice';
import { reset as resetChess } from '../service/chess';
import { clearIDsFromLocalStorage } from '../utils/helpers';
import DefaultButton from '../../components/DefaultButton';
import useDeleteGame from '../hooks/useDeleteGame';
import { useEffect } from 'react';

function GameOverWindow() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { deleteGame } = useDeleteGame();
  const turn = useAppSelector(state => state.timer.turn);
  const {
    isGameOver: { is: isGameOver, message, type },
    gameId,
  } = useAppSelector(state => state.status);

  const sideWin = turn === 'w' ? 'Black' : 'White';
  const messageWin = `${sideWin} win. ${message}.`;
  const messageDraw = `${message}.`;

  useEffect(() => {
    if (isGameOver) {
      deleteGame(gameId!);
      clearIDsFromLocalStorage();
    }
  }, [isGameOver, gameId, deleteGame]);

  function handleBackToMainMenu() {
    navigate('menu');
    resetChess();
    dispatch(resetStatus());
    dispatch(resetBoard());
    dispatch(resetTimer());
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
