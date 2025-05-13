import { FormEvent } from 'react';
import styled from 'styled-components';
import { nanoid } from '@reduxjs/toolkit';
import { SideColor } from '../../types/StatusTypes';
import { useAppDispatch } from '../../../store/store';
import { addIDs } from '../../store/statusSlice';
import {
  convertGameTimeToMinutesAndExtraSeconds,
  createBoard,
  setIDsToLocalStorage,
} from '../../utils/helpers';
import { MENU_SELECT_DATA } from '../../utils/constants';
import useCreateGame from '../../hooks/useCreateGame';
import DefaultButton from '../../../components/DefaultButton';
import Select from './Select';

function SettingsWindow({ onClose }: { onClose: () => void }) {
  const dispatch = useAppDispatch();
  const { createGame } = useCreateGame();

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    // 1) Отримати і обробити дані з форми
    const form = e.target;
    const data = new FormData(form as HTMLFormElement);
    const { time, side } = Object.fromEntries(data);

    // 2) Інші необхідні дані
    const gameId = nanoid();
    const userId = nanoid();
    const board = createBoard();

    const [minutes, extraSeconds] = convertGameTimeToMinutesAndExtraSeconds(
      time as string
    );

    // 3) Додати IDs для ідентифікації
    dispatch(addIDs({ gameId, userId }));
    setIDsToLocalStorage(gameId, userId);

    // 4) Додати гру на сервер на сервері
    createGame({
      gameId,
      userId,
      side: side as SideColor,
      board,
      time: minutes,
      extraSeconds,
    });

    // Закрити модальне вікно
    onClose();
  }

  return (
    <Wrapper onSubmit={handleSubmit}>
      <ButtonClose type="button" onClick={onClose}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="lucide lucide-x-icon lucide-x"
        >
          <path d="M18 6 6 18" />
          <path d="m6 6 12 12" />
        </svg>
      </ButtonClose>
      <Select options={MENU_SELECT_DATA.times} name="time" required />
      <Select options={MENU_SELECT_DATA.sides} name="side" required />
      <Button type="submit">Create</Button>
    </Wrapper>
  );
}

const Wrapper = styled.form`
  position: relative;
  display: grid;
  justify-items: center;
  padding: 48px;
  row-gap: 16px;
  border-radius: 16px;
`;

const Button = styled(DefaultButton)`
  background-color: var(--color-gray-500);
  color: var(--color-gray-100);
  font-size: 2rem;
  border-radius: 8px;
  width: 100%;
  margin-top: 1.5rem;
`;

const ButtonClose = styled(DefaultButton)`
  transform: translate(50%, -50%);
  position: absolute;
  top: 0;
  right: 0;
  border-radius: 50%;
  padding: 12px 16px;
  background-color: var(--color-gray-100);
  aspect-ratio: 1/1;

  &:hover {
    background-color: var(--color-gray-300);
  }
`;

export default SettingsWindow;
