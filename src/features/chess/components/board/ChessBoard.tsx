import { useEffect } from 'react';
import styled from 'styled-components';

import { useAppDispatch, useAppSelector } from '../../../../store/store';
import {
  isGameOver as isGameOverChess,
  showPossibleMovesForPiece,
} from '../../../service/chess';

import {
  clearPossibleMoves,
  clearSelectedTile,
  setPossibleMovesForPiece,
} from '../../../store/boardSlice';
import { setCurrentTurn } from '../../../store/timerSlice';
import { setGameOver } from '../../../store/statusSlice';

import Tile from './Tile/Tile';
import Promotion from '../../../modals/Promotion';
import ModalWindow from '../../../../components/ModalWindow';
import { openModalWindow } from '../../../store/uiSlice';

function ChessBoard() {
  const dispatch = useAppDispatch();
  const side = useAppSelector(state => state.status.side);
  const isOpenModalWindow = useAppSelector(state => state.ui.isOpenModalWindow);
  const { selectedTile, board } = useAppSelector(state => state.board);

  // Вибирати елемент
  useEffect(() => {
    if (selectedTile && side === selectedTile.piece.color) {
      const possibleMoves = showPossibleMovesForPiece(
        selectedTile.column,
        selectedTile.row
      );

      dispatch(setPossibleMovesForPiece(possibleMoves));
    }
  }, [selectedTile, dispatch, side]);

  // 1) Очистити вибрану клітинку та можливі кроки
  // 2) Зміна кроку
  // 3) Завершення гри
  useEffect(() => {
    // Прибрати виділену фігуру та клітинки, на які може походити та ж виділена фігура
    dispatch(clearSelectedTile());
    dispatch(clearPossibleMoves());

    //  Всновити чий крок(Чорних чи Білих)
    dispatch(setCurrentTurn());

    // Перевірка, чи не завершилася гра
    if (isGameOverChess()) {
      const gameOverResults = isGameOverChess()!;
      dispatch(
        setGameOver({
          message: gameOverResults?.message,
          type: gameOverResults?.type,
        })
      );
      dispatch(openModalWindow('gameOver'));
    }
  }, [board, dispatch]);

  return (
    <Wrapper>
      {board.map(delegated => (
        <Tile key={delegated.column + delegated.row} {...delegated} />
      ))}

      <ModalWindow isOpen={isOpenModalWindow === 'promotion'}>
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
