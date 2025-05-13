import { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { useAppDispatch, useAppSelector } from '../../../../store/store';
import {
  runTime,
  setActiveTime,
  setExtraSeconds,
} from '../../../store/timerSlice';
import {
  addIDs,
  clearOfferDraw,
  setGameOver,
  setSide,
  toOfferDrawSend,
} from '../../../store/statusSlice';
import { openModalWindow } from '../../../store/uiSlice';
import { setBoard } from '../../../store/boardSlice';
import useInterval from '../../../hooks/useInterval';
import useGetGame from '../../../hooks/useGetGame';
import useRealtimeGameById from '../../../hooks/useRealtimeGameById';
import useUpdateTime from '../../../hooks/useUpdateTime';
import { SideColor } from '../../../types/StatusTypes';
import GameOverWindow from '../../../modals/GameOverWindow';
import Question from '../../../modals/Question';
import Buttons from '../controls/Buttons';
import Time from '../controls/Time';
import ModalWindow from '../../../../components/ModalWindow';
import Spinner from '../../../../components/Spinner';
import ChessBoard from '../board/ChessBoard';

import {
  clearIDsFromLocalStorage,
  getIDsFromLocalStorage,
} from '../../../utils/helpers';

function ChessEnviroment() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { isGameOver, offerDraw, side, gameId } = useAppSelector(
    state => state.status
  );
  const { time, isStartTimer } = useAppSelector(state => state.timer);
  const isOpenModalWindow = useAppSelector(state => state.ui.isOpenModalWindow);
  const { data: newGame, isLoading } = useGetGame();
  const { updateTime } = useUpdateTime();

  useRealtimeGameById();

  // Встановлення гри
  // Взяття gameId з localStorage, якщо воно там є. Але працює тільки при перезавантажені сторінки.
  useEffect(() => {
    if (!gameId) {
      const { gameId: gameIdLS, userId: userIdLS } = getIDsFromLocalStorage();

      if (gameIdLS && userIdLS) {
        dispatch(addIDs({ gameId: gameIdLS, userId: userIdLS }));
      }

      if (!gameIdLS) {
        navigate('/menu');
      }
    }
  }, [dispatch, gameId, navigate]);

  // Якщо немає id, то перенаправлення на сторінку меню
  useEffect(() => {
    if (gameId) {
      navigate(`/chess/${gameId}`);
    } else navigate('/menu');
  }, [navigate, gameId]);

  // Якщо є gameId і гра за цим id, то беруться дані з сервера
  const onlyOneTimeGetNewGameData = useRef<boolean>(false);
  useEffect(() => {
    if (!onlyOneTimeGetNewGameData.current) {
      if (newGame && newGame.length === 1) {
        onlyOneTimeGetNewGameData.current = true;
        const { sideWhite, extraSeconds, board, timeWhite, timeBlack } =
          newGame[0];
        const sideAPI = sideWhite ? 'w' : 'b';

        dispatch(setActiveTime({ timeWhite, timeBlack }));
        dispatch(setExtraSeconds(extraSeconds));
        dispatch(setSide(sideAPI as SideColor));
        dispatch(setBoard(board));
      }
      if (newGame && newGame.length === 0) {
        clearIDsFromLocalStorage();
      }
    }
  }, [isLoading, dispatch, newGame, navigate]);

  // Таймер гравців
  function handleRunTime() {
    dispatch(runTime());
    updateTime();
  }
  useInterval(handleRunTime, isGameOver.is && !isStartTimer ? null : 1000);

  // Слідкування за часом
  useEffect(() => {
    if (isStartTimer) {
      if (time.white <= 0) {
        dispatch(setGameOver({ message: 'White time is over', type: 'win' }));
        dispatch(openModalWindow('gameOver'));
      }
      if (time.black <= 0) {
        dispatch(setGameOver({ message: 'Black time is over', type: 'win' }));
        dispatch(openModalWindow('gameOver'));
      }
    }
  }, [time.white, time.black, dispatch, isStartTimer]);

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

  if (isLoading) return <Spinner />;

  return (
    <Wrapper $side={side!}>
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
