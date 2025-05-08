import { useEffect } from 'react';
import styled from 'styled-components';

import { useAppDispatch, useAppSelector } from '../../../../store/store';
import { runTime } from '../../../store/timerSlice';
import {
  clearOfferDraw,
  setGameOver,
  toOfferDrawSend,
} from '../../../store/statusSlice';
import { openModalWindow } from '../../../store/uiSlice';
import { SideColor } from '../../../types/StatusTypes';

import useInterval from '../../../hooks/useInterval';

import ChessBoard from '../board/ChessBoard';
import GameOverWindow from '../../../modals/GameOverWindow';
import Question from '../../../modals/Question';
import Buttons from '../controls/Buttons';
import Time from '../controls/Time';
import ModalWindow from '../../../../components/ModalWindow';

function ChessEnviroment() {
  const dispatch = useAppDispatch();
  const time = useAppSelector(state => state.timer.time);
  const isOpenModalWindow = useAppSelector(state => state.ui.isOpenModalWindow);
  const { isGameOver, offerDraw, side } = useAppSelector(state => state.status);

  // Таймер гравців
  useInterval(() => dispatch(runTime()), isGameOver.is ? null : 1000);

  // Слідкування за часом
  useEffect(() => {
    if (time.white === 0) {
      dispatch(setGameOver({ message: 'White time is over', type: 'win' }));
      dispatch(openModalWindow('gameOver'));
    }
    if (time.black === 0) {
      dispatch(setGameOver({ message: 'Black time is over', type: 'win' }));
      dispatch(openModalWindow('gameOver'));
    }
  }, [time.white, time.black, dispatch]);

  // Функції модальних вікон(5)
  function handleSubmitSurrender() {
    const sideWord = side === 'w' ? 'White' : 'Black';
    dispatch(setGameOver({ message: `${sideWord} surrender`, type: 'win' }));
    dispatch(openModalWindow('gameOver'));
  }

  function handleSubmitOfferDrawSend() {
    dispatch(toOfferDrawSend());
    dispatch(openModalWindow('offerDrawGet'));
  }

  function handleSubmitOfferDrawGet() {
    dispatch(setGameOver({ message: `Draw`, type: 'draw' }));
    dispatch(openModalWindow('gameOver'));
  }
  function handleRejectOfferDrawGet() {
    dispatch(clearOfferDraw());
  }

  return (
    <Wrapper $side={side}>
      <Time type="b" />
      <ChessBoard />
      <Time type="w" />
      <Buttons />
      <ModalWindow isOpen={isOpenModalWindow === 'surrender'}>
        <Question onSubmit={handleSubmitSurrender}>
          Are you sure you want to surrender?
        </Question>
      </ModalWindow>
      <ModalWindow isOpen={isOpenModalWindow === 'offerDrawSend'}>
        <Question onSubmit={handleSubmitOfferDrawSend}>
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
