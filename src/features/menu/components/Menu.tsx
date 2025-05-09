import { useEffect, useState } from 'react';
import styled from 'styled-components';

import DefaultButton from '../../../components/DefaultButton';
import ModalWindow from '../../../components/ModalWindow';
import SettingsWindow from './SettingsWindow';
import { useAppSelector } from '../../../store/store';
import { useNavigate } from 'react-router-dom';

function Menu() {
  const navigate = useNavigate();
  const id = useAppSelector(state => state.status.id);

  const [openModal, setOpenModal] = useState<boolean>(false);
  const handleOpenModal = () => setOpenModal(true);
  const handleCloseModal = () => setOpenModal(false);

  useEffect(() => {
    if (id) {
      navigate(`/chess/${id}`);
    }
  }, [navigate, id]);

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
