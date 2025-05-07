import styled from 'styled-components';
import ChessBoard from './ChessBoard';

import Buttons from './Buttons';
import Time from './Time';
import useInterval from '../hooks/useInterval';
import { useAppDispatch, useAppSelector } from '../../store/store';
import {
  closeSurrenderWindow,
  runTime,
  setGameOver,
} from '../../store/chessSlice';
import { useEffect } from 'react';
import { SideColor } from '../../types/ChessTypes';
import ModalWindow from '../ModalWindow';
import Question from '../Question';

function ChessEnviroment() {
  const dispatch = useAppDispatch();
  const { isGameOver, time, side, surrenderWindowIsOpen } = useAppSelector(
    state => state.chess
  );

  // Таймер гравців
  useInterval(() => dispatch(runTime()), isGameOver.is ? null : 1000);

  // Слідкування за часом
  useEffect(() => {
    if (time.white === 0) {
      dispatch(setGameOver('White time is over.'));
    }
    if (time.black === 0) {
      dispatch(setGameOver('Black time is over.'));
    }
  }, [time.white, time.black, dispatch]);

  function handleSubmitSurrender() {
    const sideWord = side === 'w' ? 'White' : 'Black';
    dispatch(setGameOver(`${sideWord} surender`));
    dispatch(closeSurrenderWindow());
  }

  function handleDeclineSurrender() {
    dispatch(closeSurrenderWindow());
  }

  return (
    <Wrapper $side={side}>
      <Time type="b" />
      <ChessBoard />
      <Time type="w" />
      <Buttons />
      <ModalWindow isOpen={surrenderWindowIsOpen}>
        <Question
          onSubmit={handleSubmitSurrender}
          onReject={handleDeclineSurrender}
        >
          Are you sure you want to surrender?
        </Question>
      </ModalWindow>
    </Wrapper>
  );
}

const Wrapper = styled.div<{ $side: SideColor }>`
  --sideTransform: ${props => (props.$side === 'w' ? 'none' : 'scaleY(-1)')};

  display: grid;
  grid-template-columns: minmax(0, 1fr) 3fr 1.5fr;
  grid-template-rows: auto minmax(0, 1fr) auto;
  grid-template-areas:
    '. timeBlack buttons'
    '. board buttons'
    '. timeWhite buttons';

  padding: 24px 64px;
  gap: 12px 32px;
  min-height: 0;

  transform: var(--sideTransform);
`;

export default ChessEnviroment;
