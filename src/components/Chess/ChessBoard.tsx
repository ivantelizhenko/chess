import styled from 'styled-components';

import Tile from './Tile';
import { useAppDispatch, useAppSelector } from '../../store/store';
import { useEffect } from 'react';
import {
  clearPossibleMoves,
  clearSelectedTile,
  runTime,
  setCurrentTurn,
  setGameOver,
  setPossibleMovesForPiece,
} from '../../store/chessSlice';
import {
  isGameOver as isGameOverchess,
  showPossibleMovesForPiece,
} from '../../service/chess';
import Promotion from '../Promotion';
import ModalWindow from '../ModalWindow';

import useInterval from '../hooks/useInterval';

function ChessBoard() {
  const dispatch = useAppDispatch();
  const {
    promotion,
    selectedTile,
    board: stateBoard,
    time,
    isGameOver,
  } = useAppSelector(state => state.chess);

  // Таймер гравців
  useInterval(() => dispatch(runTime()), isGameOver.is ? null : 1000);

  // Вибирати елемент
  useEffect(() => {
    if (selectedTile) {
      const possibleMoves = showPossibleMovesForPiece(
        selectedTile.column,
        selectedTile.row
      );

      dispatch(setPossibleMovesForPiece(possibleMoves));
    }
  }, [selectedTile, dispatch]);

  // Очистити вибрану клітинку та можливі кроки, зміна кроку та завершення гри
  useEffect(() => {
    // Прибрати виділену фігуру та клітинки, на які може походити та ж виділена фігура
    dispatch(clearSelectedTile());
    dispatch(clearPossibleMoves());

    //  Всновити чий крок(Чорних чи Білих)
    dispatch(setCurrentTurn());

    // Перевірка, чи не завершилася гра
    if (isGameOverchess()) {
      const gameOverMessage = isGameOverchess();
      dispatch(setGameOver(gameOverMessage!));
    }
  }, [stateBoard, dispatch]);

  // Слідкування за часом
  useEffect(() => {
    if (time.white === 0) {
      dispatch(setGameOver('White time is over.'));
    }
    if (time.black === 0) {
      dispatch(setGameOver('Black time is over.'));
    }
  }, [time.white, time.black, dispatch]);

  return (
    <Wrapper>
      {stateBoard.map(delegated => (
        <Tile key={delegated.column + delegated.row} {...delegated} />
      ))}

      <ModalWindow isOpen={promotion.isOpen}>
        <Promotion />
      </ModalWindow>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  max-height: 100%;
  max-width: 100%;
  min-height: 0;
  grid-area: board;

  aspect-ratio: 1/1;
  display: grid;
  grid-template-columns: repeat(8, 1fr);
  grid-template-rows: repeat(8, 1fr);
`;

export default ChessBoard;
