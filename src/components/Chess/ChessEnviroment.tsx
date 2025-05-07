import styled from 'styled-components';
import ChessBoard from './ChessBoard';

import Buttons from './Buttons';
import Time from './Time';
import useInterval from '../hooks/useInterval';
import { useAppDispatch, useAppSelector } from '../../store/store';
import { closeModalWindow, runTime, setGameOver } from '../../store/chessSlice';
import { useEffect } from 'react';
import { SideColor } from '../../types/ChessTypes';
import ModalWindow from '../ModalWindow';
import Question from '../Question';

function ChessEnviroment() {
  const dispatch = useAppDispatch();
  const { isGameOver, time, side, isOpenModalWindow } = useAppSelector(
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
    dispatch(setGameOver(`${sideWord} surrender`));
    dispatch(closeModalWindow());
  }

  function handleCloseModal() {
    dispatch(closeModalWindow());
  }

  function handleSubmitOfferDrawSend() {}

  return (
    <Wrapper $side={side}>
      <Time type="b" />
      <ChessBoard />
      <Time type="w" />
      <Buttons />
      <ModalWindow isOpen={isOpenModalWindow === 'surrender'}>
        <Question onSubmit={handleSubmitSurrender} onReject={handleCloseModal}>
          Are you sure you want to surrender?
        </Question>
      </ModalWindow>
      <ModalWindow isOpen={isOpenModalWindow === 'offerDrawSend'}>
        <Question onSubmit={handleSubmitSurrender} onReject={handleCloseModal}>
          Are you sure you want to offer the draw?
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
