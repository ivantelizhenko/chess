import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../../store/store';
import { addIDs } from '../../store/statusSlice';
import { getIDsFromLocalStorage } from '../../utils/helpers';
import DefaultButton from '../../../components/DefaultButton';
import ModalWindow from '../../../components/ModalWindow';
import SettingsWindow from './SettingsWindow';

function Menu() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const gameId = useAppSelector(state => state.status.gameId);
  const { gameId: gameIdLS, userId: userIdLS } = getIDsFromLocalStorage();
  const [openModal, setOpenModal] = useState<boolean>(false);

  const handleOpenModal = () => setOpenModal(true);
  const handleCloseModal = () => setOpenModal(false);

  useEffect(() => {
    if (gameId) {
      navigate(`/chess/${gameId}`);
    }
  }, [navigate, gameId]);

  useEffect(() => {
    if (gameIdLS && userIdLS) {
      dispatch(addIDs({ gameId: gameIdLS, userId: userIdLS }));
    }
  }, [dispatch, gameIdLS, userIdLS]);

  return (
    <Wrapper>
      <MenuButton onClick={handleOpenModal}>Create game</MenuButton>
      <ModalWindow isOpen={openModal}>
        <SettingsWindow onClose={handleCloseModal} />
      </ModalWindow>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: grid;
`;

const MenuButton = styled(DefaultButton)`
  place-self: center;
  background-color: var(--color-gray-100);
  font-size: 3rem;
  padding: 16px 24px;
  text-transform: uppercase;
  letter-spacing: 2px;
  border-radius: 4px;

  &:hover {
    text-decoration: underline;
  }
`;

export default Menu;
