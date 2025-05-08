import styled from 'styled-components';
import ChessBoard from './ChessBoard';

import Buttons from './Buttons';
import Time from './Time';
import useInterval from '../hooks/useInterval';
import { useAppDispatch, useAppSelector } from '../../store/store';
import {
  closeModalWindow,
  toOfferDraw,
  runTime,
  setGameOver,
  clearOfferDraw,
} from '../../store/chessSlice';
import { useEffect } from 'react';
import { SideColor } from '../../types/ChessTypes';
import ModalWindow from '../ModalWindow';
import Question from '../Question';
import GameOverWindow from '../GameOverWindow';

function ChessEnviroment() {
  const dispatch = useAppDispatch();
  const { isGameOver, time, side, isOpenModalWindow, offerDraw } =
    useAppSelector(state => state.chess);

  // Таймер гравців
  useInterval(() => dispatch(runTime()), isGameOver.is ? null : 1000);

  // Слідкування за часом
  useEffect(() => {
    if (time.white === 0) {
      dispatch(setGameOver({ message: 'White time is over', type: 'win' }));
    }
    if (time.black === 0) {
      dispatch(setGameOver({ message: 'Black time is over', type: 'win' }));
    }
  }, [time.white, time.black, dispatch]);

  // Функції модальних вікон(5)
  function handleSubmitSurrender() {
    const sideWord = side === 'w' ? 'White' : 'Black';
    dispatch(setGameOver({ message: `${sideWord} surrender`, type: 'win' }));
  }

  function handleCloseModal() {
    dispatch(closeModalWindow());
  }

  function handleSubmitOfferDrawSend() {
    dispatch(toOfferDraw());
    console.log(offerDraw.from, side);
  }

  function handleSubmitOfferDrawGet() {
    dispatch(setGameOver({ message: `Draw`, type: 'draw' }));
  }
  function handleRejectOfferDrawGet() {
    dispatch(clearOfferDraw());
    dispatch(closeModalWindow());
  }

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
        <Question
          onSubmit={handleSubmitOfferDrawSend}
          onReject={handleCloseModal}
        >
          Are you sure you want to offer the draw?
        </Question>
      </ModalWindow>
      <ModalWindow
        isOpen={isOpenModalWindow === 'offerDrawGet' && offerDraw.from !== side}
      >
        <Question
          onSubmit={handleSubmitOfferDrawGet}
          onReject={handleRejectOfferDrawGet}
        >
          Are you agree with draw?
        </Question>
      </ModalWindow>
      <ModalWindow isOpen={isOpenModalWindow === 'gameOver'}>
        <GameOverWindow />
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
